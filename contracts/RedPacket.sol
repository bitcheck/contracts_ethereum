/**
 *  $$$$$$\  $$\                 $$\                           
 * $$  __$$\ $$ |                $$ |                          
 * $$ /  \__|$$$$$$$\   $$$$$$\  $$ |  $$\  $$$$$$\   $$$$$$\  
 * \$$$$$$\  $$  __$$\  \____$$\ $$ | $$  |$$  __$$\ $$  __$$\ 
 *  \____$$\ $$ |  $$ | $$$$$$$ |$$$$$$  / $$$$$$$$ |$$ |  \__|
 * $$\   $$ |$$ |  $$ |$$  __$$ |$$  _$$<  $$   ____|$$ |      
 * \$$$$$$  |$$ |  $$ |\$$$$$$$ |$$ | \$$\ \$$$$$$$\ $$ |      
 *  \______/ \__|  \__| \_______|\__|  \__| \_______|\__|
 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
 * ____________________________________________________________
*/

pragma solidity >=0.4.23 <0.6.0;

import "./interfaces/RedpacketVaultInterface.sol";
import "./interfaces/ERC20Interface.sol";
import "./interfaces/ShakerTokenManagerInterface.sol";

import "./ReentrancyGuard.sol";
import "./Mocks/SafeMath.sol";
import "./Mocks/TransferHelper.sol";

contract RedPacket is ReentrancyGuard {
    using TransferHelper for *;
    using SafeMath for uint256;

    address public operator;
    address public tokenAddress;        // USDT token
    address public redpacketVaultAddress;
    address public tokenManager;
    uint256 public hoursInterval = 25;

    constructor (
        address _redpacketVaultAddress,
        address _tokenAddress
    ) public {
        operator = msg.sender;
        redpacketVaultAddress = _redpacketVaultAddress;
        tokenAddress = _tokenAddress;
    }

    modifier onlyOperator {
        require(msg.sender == operator, "Only operator can call this function.");
        _;
    }
    
    function deposit (
        bytes32 _hashKey,
        uint256 _amount,
        uint256 _cliff,
        string calldata _memo
    ) external nonReentrant {
        RedpacketVaultInterface vault = RedpacketVaultInterface(redpacketVaultAddress);
        require(vault.getStatus(_hashKey) == 0, "The commitment has been submitted or used out.");
        require(_amount > 0);
        
        uint256 allowance = ERC20Interface(tokenAddress).allowance(msg.sender, address(this));
        require(allowance >= _amount, "allowance of redpacket manager to sender is not enough");
        TransferHelper.safeTransferFrom(tokenAddress, msg.sender, redpacketVaultAddress, _amount);
        
        vault.setStatus(_hashKey, 1);
        vault.setAmount(_hashKey, _amount);
        vault.setSender(_hashKey, msg.sender);
        vault.setTimestamp(_hashKey, block.timestamp);
        vault.setCliff(_hashKey, _cliff);
        vault.setMemo(_hashKey, _memo);
        vault.initTakenAddresses(_hashKey);

        vault.addTotalAmount(_amount);
        vault.addTotalBalance(_amount);
        

        vault.sendRedpacketDepositEvent(msg.sender, _hashKey, _amount, block.timestamp);
    }
    
    function withdraw (bytes32 _hashkey) external nonReentrant {
        RedpacketVaultInterface vault = RedpacketVaultInterface(redpacketVaultAddress);
        require(vault.getAmount(_hashkey) > 0, 'The commitment of this recipient is not exist or used out');
        require(!vault.isTaken(_hashkey, msg.sender), 'this address has taken red packet');
        (,uint256 amount,,,) = this.getAmount(_hashkey);
        require(amount > 0, "redpacket amount is zero");
        uint256 refundAmount = amount < vault.getAmount(_hashkey) ? amount : vault.getAmount(_hashkey); //Take all if _refund == 0
        require(refundAmount > 0, "Refund amount can not be zero");
    
        uint256 allowance = ERC20Interface(tokenAddress).allowance(redpacketVaultAddress, address(this));
        require(allowance >= refundAmount, "allowance of redpacket manager to vault is not enough");
        TransferHelper.safeTransferFrom(tokenAddress, redpacketVaultAddress, msg.sender, refundAmount);
    
        vault.setAmount(_hashkey, vault.getAmount(_hashkey).sub(refundAmount));
        vault.setStatus(_hashkey, vault.getAmount(_hashkey) <= 0 ? 0 : 1);
        vault.setWithdrawTimes(_hashkey, vault.getWithdrawTimes(_hashkey).add(1));
        vault.subTotalBalance(refundAmount);
    
        vault.addTakenAddress(_hashkey, msg.sender);

        uint256 decimals = ERC20Interface(tokenAddress).decimals();
        ShakerTokenManagerInterface(tokenManager).sendRedpacketBonus(refundAmount, decimals, hoursInterval, vault.getSender(_hashkey));

        vault.sendRedpacketWithdrawEvent(vault.getSender(_hashkey), msg.sender, _hashkey, refundAmount, block.timestamp);
    }
    
    function revoke (bytes32 _hashkey) external nonReentrant {
        RedpacketVaultInterface vault = RedpacketVaultInterface(redpacketVaultAddress);
        uint256 amount = vault.getAmount(_hashkey);
        require(amount > 0, 'The commitment of this recipient is not exist or used out');
        require(msg.sender == vault.getSender(_hashkey), 'The revoke must be operated by sender');

        uint256 allowance = ERC20Interface(tokenAddress).allowance(redpacketVaultAddress, address(this));
        require(allowance >= amount, "allowance of redpacket manager to vault is not enough");
        TransferHelper.safeTransferFrom(tokenAddress, redpacketVaultAddress, msg.sender, amount);
    
        vault.setAmount(_hashkey, 0);
        vault.setStatus(_hashkey, 0);
        vault.subTotalBalance(amount);
    }
    
    function getAmount(bytes32 _hashkey) external view returns(uint256, uint256, uint256, uint256, string memory) {
        RedpacketVaultInterface vault = RedpacketVaultInterface(redpacketVaultAddress);
        uint256 balance = vault.getAmount(_hashkey);
        uint256 times = vault.getWithdrawTimes(_hashkey);
        uint256 cliff = vault.getCliff(_hashkey);
        string memory memo = vault.getMemo(_hashkey);
        if(balance == 0) return (0,0,times,cliff,memo);
        else return(balance, cal(balance, times, cliff), times, cliff, memo);
    }

    function cal(uint256 balance, uint256 times, uint256 cliff) internal pure returns(uint256) {
        return ((uint256(100).sub(cliff))**times).mul(cliff).mul(balance).div(100**(times+1));
    }
    
    function updateTokenAddress(address _tokenAddress) external nonReentrant onlyOperator {
        tokenAddress = _tokenAddress;
    }
    
    function updateRedpacketVaultAddress(address _vaultAddress) external nonReentrant onlyOperator {
        redpacketVaultAddress = _vaultAddress;
    }
    
    function updateTokenManager(address _tokenManager) external nonReentrant onlyOperator {
        tokenManager = _tokenManager;
    }
    
    function updateHoursInterval(uint256 _interval) external nonReentrant onlyOperator {
        hoursInterval = _interval;
    }
}
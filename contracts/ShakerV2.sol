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

import "./interfaces/ShakerTokenManagerInterface.sol";
import "./interfaces/VaultInterface.sol";
import "./interfaces/DisputeInterface.sol";
import "./interfaces/ERC20Interface.sol";

import "./ReentrancyGuard.sol";
import "./StringUtils.sol";
import "./Mocks/SafeMath.sol";

contract ShakerV2 is ReentrancyGuard, StringUtils {
    using SafeMath for uint256;

    address public operator;            // Super operator account to control the contract
    address public councilAddress;      // Council address of DAO
    address public tokenAddress;        // USDT token
    uint256 public councilJudgementFee = 0; // Council charge for judgement
    uint256 public councilJudgementFeeRate = 1700; // If the desired rate is 17%, commonFeeRate should set to 1700
    uint256 public compensationRate = 2000;
    uint256 public minReplyHours = 24;

    ShakerTokenManagerInterface public tokenManager;
    
    address public vaultAddress;
    VaultInterface public vault;
    
    address public disputeAddress;
    DisputeInterface public dispute;
    
    mapping(address => address) private relayerWithdrawAddress;
    
    // If the msg.sender(relayer) has not registered Withdrawal address, the fee will send to this address
    address public commonWithdrawAddress; 
    
    modifier onlyOperator {
        require(msg.sender == operator, "Only operator can call this function.");
        _;
    }

    modifier onlyRelayer {
        require(relayerWithdrawAddress[msg.sender] != address(0x0), "Only relayer can call this function.");
        _;
    }
    
    modifier onlyCouncil {
        require(msg.sender == councilAddress, "Only council account can call this function.");
        _;
    }
    
    constructor(
        address _operator,
        address _commonWithdrawAddress,
        address _vaultAddress,
        address _disputeAddress,
        address _tokenAddress
    ) public {
        operator = _operator;
        councilAddress = _operator;
        commonWithdrawAddress = _commonWithdrawAddress;
        vaultAddress = _vaultAddress;
        vault = VaultInterface(vaultAddress);
        disputeAddress = _disputeAddress;
        dispute = DisputeInterface(disputeAddress);
        tokenAddress = _tokenAddress;
    }

    function depositERC20Batch(
        bytes32[] calldata _hashKey,
        uint256[] calldata _amounts, 
        uint256[] calldata _effectiveTime
    ) external payable nonReentrant {
        for(uint256 i = 0; i < _amounts.length; i++) {
            _deposit(_hashKey[i], _amounts[i], _effectiveTime[i]);
        }
    }
  
    function _deposit(
        bytes32 _hashKey,
        uint256 _amount, 
        uint256 _effectiveTime
    ) internal {
        require(vault.getStatus(_hashKey) == 0, "The commitment has been submitted or used out.");
        require(_amount > 0);
        
        _processDeposit(_amount, vaultAddress);
        
        vault.setStatus(_hashKey, 1);
        vault.setAmount(_hashKey, _amount);
        vault.setSender(_hashKey, msg.sender);
        vault.setEffectiveTime(_hashKey, _effectiveTime < block.timestamp ? block.timestamp : _effectiveTime);
        vault.setTimestamp(_hashKey, block.timestamp);
        vault.setCanEndorse(_hashKey, 0);
        vault.setLockable(_hashKey, 1);
        
        vault.addTotalAmount(_amount);
        vault.addTotalBalance(_amount);

        // emit Deposit(msg.sender, _hashKey, _amount, block.timestamp);
        vault.sendDepositEvent(msg.sender, _hashKey, _amount, block.timestamp);
    }

    function _processDeposit(uint256 _amount, address _to) internal;
    function _safeErc20TransferFrom(address _from, address _to, uint256 _amount) internal;

    function withdrawERC20Batch(
        bytes32[] calldata _commitments,
        uint256[] calldata _amounts,
        uint256[] calldata _fees,
        address[] calldata _relayers
    ) external payable nonReentrant {
        for(uint256 i = 0; i < _commitments.length; i++) _withdraw(bytes32ToString(_commitments[i]), _amounts[i], _fees[i], _relayers[i]);
    }
    
    function _withdraw(
        string memory _commitment,
        uint256 _amount,                // Withdrawal amount
        uint256 _fee,                    // Fee caculated by relayer
        address _relayer                // Relayer address
    ) internal {
        bytes32 _hashkey = getHashkey(_commitment);
        require(vault.getAmount(_hashkey) > 0, 'The commitment of this recipient is not exist or used out');
        require(dispute.getStatus(_hashkey) != 1, 'This deposit was locked');
        uint256 refundAmount = _amount < vault.getAmount(_hashkey) ? _amount : vault.getAmount(_hashkey); //Take all if _refund == 0
        require(refundAmount > 0, "Refund amount can not be zero");
        require(block.timestamp >= vault.getEffectiveTime(_hashkey), "The deposit is locked until the effectiveTime");
        require(refundAmount >= _fee, "Refund amount should be more than fee");

        address relayer = relayerWithdrawAddress[_relayer] == address(0x0) ? commonWithdrawAddress : relayerWithdrawAddress[_relayer];
        uint256 _fee1 = tokenManager.getFee(refundAmount);
        require(_fee1 <= refundAmount, "The fee can not be more than refund amount");
        uint256 _fee2 = relayerWithdrawAddress[_relayer] == address(0x0) ? _fee1 : _fee; // If not through relay, use commonFee
        _processWithdraw(msg.sender, relayer, _fee2, refundAmount);
    
        vault.setAmount(_hashkey, vault.getAmount(_hashkey).sub(refundAmount));
        vault.setStatus(_hashkey, vault.getAmount(_hashkey) <= 0 ? 0 : 1);
        vault.subTotalBalance(refundAmount);

        uint256 _hours = (block.timestamp.sub(vault.getTimestamp(_hashkey))).div(3600);
        tokenManager.sendBonus(refundAmount, _hours, vault.getSender(_hashkey), msg.sender);
        
        vault.sendWithdrawEvent(_commitment, _fee, refundAmount, block.timestamp);
    }

    function _processWithdraw(address payable _recipient, address _relayer, uint256 _fee, uint256 _refund) internal;
    function _safeErc20Transfer(address _to, uint256 _amount) internal;
    
    function getHashkey(string memory _commitment) internal view returns(bytes32) {
        string memory commitAndTo = concat(_commitment, addressToString(msg.sender));
        return keccak256(abi.encodePacked(commitAndTo));
    }

    function endorseERC20Batch(
        uint256[] calldata _amounts,
        bytes32[] calldata _oldCommitments,
        bytes32[] calldata _newHashKeys,
        uint256[] calldata _effectiveTimes
    ) external payable nonReentrant {
        for(uint256 i = 0; i < _amounts.length; i++) _endorse(_amounts[i], bytes32ToString(_oldCommitments[i]), _newHashKeys[i], _effectiveTimes[i]);
    }
    
    function _endorse(
        uint256 _amount, 
        string memory _oldCommitment, 
        bytes32 _newHashKey, 
        uint256 _effectiveTime
    ) internal {
        bytes32 _oldHashKey = getHashkey(_oldCommitment);
        require(dispute.getStatus(_oldHashKey) != 1, 'This deposit was locked');
        require(vault.getStatus(_oldHashKey) == 1, "Old commitment can not find");
        require(vault.getStatus(_newHashKey) == 0, "The new commitment has been submitted or used out");
        require(vault.getCanEndorse(_oldHashKey) == 1, "Old commitment can not endorse");
        require(vault.getAmount(_oldHashKey) > 0, "No balance amount of this proof");
        uint256 refundAmount = _amount < vault.getAmount(_oldHashKey) ? _amount : vault.getAmount(_oldHashKey); //Take all if _refund == 0
        require(refundAmount > 0, "Refund amount can not be zero");

        if(_effectiveTime > 0 && block.timestamp >= vault.getEffectiveTime(_oldHashKey)) vault.setEffectiveTime(_oldHashKey,  _effectiveTime); // Effective
        else vault.setEffectiveTime(_newHashKey, vault.getEffectiveTime(_oldHashKey)); // Not effective
        
        vault.setStatus(_newHashKey, 1);
        vault.setAmount(_newHashKey, refundAmount);
        vault.setSender(_newHashKey, msg.sender);
        vault.setTimestamp(_newHashKey, block.timestamp);
        vault.setCanEndorse(_newHashKey, 0);
        vault.setLockable(_newHashKey, 1);
        
        vault.setAmount(_oldHashKey, vault.getAmount(_oldHashKey).sub(refundAmount));
        vault.setStatus(_oldHashKey, vault.getAmount(_oldHashKey) <= 0 ? 0 : 1);

        vault.sendWithdrawEvent(_oldCommitment,  0, refundAmount, block.timestamp);
        vault.sendDepositEvent(msg.sender, _newHashKey, refundAmount, block.timestamp);
    }
    
    /** @dev whether a note is already spent */
    function isSpent(bytes32 _hashkey) public view returns(bool) {
        return vault.getAmount(_hashkey) == 0 ? true : false;
    }

    /** @dev whether an array of notes is already spent */
    function isSpentArray(bytes32[] calldata _hashkeys) external view returns(bool[] memory spent) {
        spent = new bool[](_hashkeys.length);
        for(uint i = 0; i < _hashkeys.length; i++) spent[i] = isSpent(_hashkeys[i]);
    }

    /** @dev operator can change his address */
    function updateOperator(address _newOperator) external nonReentrant onlyOperator {
        operator = _newOperator;
    }

    /** @dev update authority relayer */
    function updateRelayer(address _relayer, address _withdrawAddress) external nonReentrant onlyOperator {
        relayerWithdrawAddress[_relayer] = _withdrawAddress;
    }
    
    /** @dev get relayer Withdrawal address */
    function getRelayerWithdrawAddress() view external onlyRelayer returns(address) {
        return relayerWithdrawAddress[msg.sender];
    }
    
    /** @dev update commonWithdrawAddress */
    function updateCommonWithdrawAddress(address _commonWithdrawAddress) external nonReentrant onlyOperator {
        commonWithdrawAddress = _commonWithdrawAddress;
    }
    
    /** @dev set council address */
    function setCouncial(address _councilAddress) external nonReentrant onlyOperator {
        councilAddress = _councilAddress;
    }
    
    function setMinReplyHours(uint256 _hours) external nonReentrant onlyOperator {
        minReplyHours = _hours;
    }

    /** @dev lock commitment, this operation can be only called by note holder */
    function lockERC20Batch (
        bytes32             _hashkey,
        uint256             _refund,
        string   calldata   _description,
        address payable     _recipient,
        uint256             _replyHours
    ) external payable nonReentrant {
        _lock(_hashkey, _refund, _description, _recipient, _replyHours);
    }
    
    function _lock(
        bytes32 _hashkey,
        uint256 _refund,
        string memory _description,
        address payable _recipient,
        uint256 _replyHours
    ) internal {
        require(msg.sender == vault.getSender(_hashkey), 'Locker must be sender');
        require(vault.getLockable(_hashkey) == 1, 'This commitment must be lockable');
        require(vault.getAmount(_hashkey) >= _refund, 'Balance amount must be enough');
        require(_replyHours >= minReplyHours, 'The reply days less than minReplyHours');
        
        // lock arbitration margin to Dispute contract
        uint256 balance = ERC20Interface(tokenAddress).balanceOf(msg.sender);
        uint256 refund = _refund == 0 ? vault.getAmount(_hashkey) : _refund;
        uint256 judgementFee = getJudgementFee(refund);
        require(balance >= judgementFee, "Sender balance is enough for arbitration ");
        _safeErc20TransferFrom(msg.sender, disputeAddress, judgementFee);

        dispute.setLockReason(
            _hashkey,
            _description, 
            1,
            _replyHours * 3600 + block.timestamp,
            refund,
            msg.sender,
            _recipient,
            judgementFee,
            0,
            0
        );
    }
    
    // function unlockByCouncil(bytes32 _hashkey, uint8 _result) external nonReentrant onlyCouncil {
    //     // _result = 1: sender win
    //     // _result = 2: recipient win
    //     require(_result == 1 || _result == 2);
        
    //     if(dispute.getStatus(_hashkey) == 1 && dispute.getToCouncil(_hashkey) == 1) {
    //         dispute.setStatus(_hashkey, 3);
    //         // If the council decided to return back money to the sender
    //         uint256 councilFee = dispute.getFee(_hashkey);//getJudgementFee(dispute.getRefund(_hashkey));
    //         uint256 compensation = councilFee.mul(compensationRate).div(10000);
    //         if(_result == 1) {
    //             uint256 refund = dispute.getRefund(_hashkey);
    //             address payable sender = dispute.getLocker(_hashkey);
    //             _processWithdraw(sender, address(0x0), 0, refund); // return back all refund
    //             dispute.sendFeeTo(tokenAddress, sender, councilFee.add(compensation)); // return back arbitration fee deposit and compensation from recipient
    //             dispute.sendFeeTo(tokenAddress, councilAddress, councilFee.sub(compensation)); // send arbitration fee from recipient to councilAddress
    //             vault.subTotalBalance(refund);
    //             vault.setAmount(_hashkey, vault.getAmount(_hashkey).sub(refund));
    //             vault.setStatus(_hashkey, vault.getAmount(_hashkey) == 0 ? 0 : 1);
    //         } else {
    //             dispute.setStatus(_hashkey, 3);
    //             address recipient = dispute.getRecipient(_hashkey);
    //             dispute.sendFeeTo(tokenAddress, recipient, councilFee.add(compensation));  // return back arbitration fee and compensation from sender to recipient
    //             dispute.sendFeeTo(tokenAddress, councilAddress, councilFee.sub(compensation));  // send arbitration fee from sender to councilAddress
    //             vault.subTotalBalance(councilFee);
    //             vault.setAmount(_hashkey, vault.getAmount(_hashkey).sub(councilFee));
    //             vault.setStatus(_hashkey, vault.getAmount(_hashkey) == 0 ? 0 : 1);
    //         }
    //     }
    // }
    
    /**
     * recipient should agree to let sender refund, otherwise, will bring to the council to make a judgement
     * This is 1st step if dispute happend
     * status: 1 - deny, 2 - accept, 3 - dealing time passed
     */
    function unlockByRecipent(bytes32 _hashkey, bytes32 _commitment, uint8 _status) external nonReentrant {
        bytes32 _recipientHashKey = getHashkey(bytes32ToString(_commitment));
        uint256 isSender = msg.sender == vault.getSender(_hashkey) ? 1 : 0;
        uint256 isRecipent = _hashkey == _recipientHashKey ? 1 : 0;

        require(isSender == 1 || isRecipent == 1, 'Must be called by recipient or original sender');
        require(_status == 1 || _status == 2 || _status == 3, 'params can only be 1,2,3');
        require(dispute.getStatus(_hashkey) == 1, 'This commitment is not locked');

        if(isSender == 1 && block.timestamp >= dispute.getDatetime(_hashkey) && _status != 3) {
            // Sender accept to keep cheque available
            dispute.setStatus(_hashkey, _status == 2 ? 4 : 1);
            dispute.setToCouncil(_hashkey, _status == 1 ? 1 : 0);
            if(_status == 2) {
                // cancel refund and return back arbitration fee ######
                dispute.sendFeeTo(tokenAddress, dispute.getLocker(_hashkey), dispute.getFee(_hashkey)); 
            }
        } else if(isSender == 1 && block.timestamp >= dispute.getReplyDeadline(_hashkey) && _status == 3) {
            // Sender can refund after reply deadline
            dispute.setStatus(_hashkey, 5);
        } else if(isRecipent == 1 && block.timestamp >= dispute.getDatetime(_hashkey) && block.timestamp <= dispute.getReplyDeadline(_hashkey)) {
            // recipient accept or refuse to refund back to sender
            if(_status == 1) {
                // refuse to refund
                address payable recipient = dispute.getRecipient(_hashkey);
                uint256 balance = ERC20Interface(tokenAddress).balanceOf(recipient);
                uint256 judgementFee =  getJudgementFee(dispute.getRefund(_hashkey));
                require(balance >= judgementFee, "recipient balance is enough for arbitration ");
                _safeErc20TransferFrom(msg.sender, disputeAddress, judgementFee);
            }
            dispute.setStatus(_hashkey, _status);
            dispute.setRecipientAgree(_hashkey, _status == 2 ? 1 : 0);
            dispute.setToCouncil(_hashkey, _status == 1 ? 1 : 0);
        }
        // return back to sender
        if(dispute.getStatus(_hashkey) == 2 || dispute.getStatus(_hashkey) == 5) {
            uint256 refund = dispute.getRefund(_hashkey);
            _processWithdraw(vault.getSender(_hashkey), address(0x0), 0, refund);
            dispute.sendFeeTo(tokenAddress, vault.getSender(_hashkey), dispute.getFee(_hashkey));
            vault.subTotalBalance(refund);
            vault.setAmount(_hashkey, vault.getAmount(_hashkey).sub(refund));
            vault.setStatus(_hashkey, vault.getAmount(_hashkey) == 0 ? 0 : 1);
        }
    }
    
    /**
     * Cancel effectiveTime and change cheque to at sight
     */
    function changeToAtSight(bytes32 _hashkey) external nonReentrant returns(bool) {
        require(msg.sender == vault.getSender(_hashkey), 'Only sender can change this cheque to at sight');
        if(vault.getEffectiveTime(_hashkey) > block.timestamp) {
          vault.setEffectiveTime(_hashkey, block.timestamp);
          vault.setLockable(_hashkey, 0);
          vault.setCanEndorse(_hashkey, 1);
        }
        return true;
    }
    
    function setCanEndorse(bytes32 _hashkey, uint256 status) external nonReentrant returns(bool) {
        require(msg.sender == vault.getSender(_hashkey), 'Only sender can change endorsable');
        vault.setCanEndorse(_hashkey, status);
        return true;
    }

    function setLockable(bytes32 _hashKey, uint256 status) external nonReentrant returns(bool) {
        require(msg.sender == vault.getSender(_hashKey), 'Only sender can change lockable');
        require(vault.getLockable(_hashKey) == 1 && status == 0, 'Can only change from lockable to non-lockable');
        vault.setLockable(_hashKey, status);
        vault.setCanEndorse(_hashKey, 1);
        return true;
    }

    function getDepositDataByHashkey(bytes32 _hashkey) external view returns(uint256 effectiveTime, uint256 amount, uint256 lockable, uint256 canEndorse) {
        effectiveTime = vault.getEffectiveTime(_hashkey);
        amount = vault.getAmount(_hashkey);
        lockable = vault.getLockable(_hashkey);
        canEndorse = vault.getCanEndorse(_hashkey);
    }
    
    function updateCouncilJudgementFee(uint256 _fee, uint256 _rate) external nonReentrant onlyOperator {
        councilJudgementFee = _fee;
        councilJudgementFeeRate = _rate;
    }
    
    function updateCompensationRate(uint256 _rate) external nonReentrant onlyOperator {
        compensationRate = _rate;
    }
    
    function updateBonusTokenManager(address _BonusTokenManagerAddress) external nonReentrant onlyOperator {
        tokenManager = ShakerTokenManagerInterface(_BonusTokenManagerAddress);
    }
    
    function updateVault(address _vaultAddress) external nonReentrant onlyOperator {
        vaultAddress = _vaultAddress;
        vault = VaultInterface(_vaultAddress);
    }
    
    function updateDispute(address _disputeAddress) external nonReentrant onlyOperator {
        disputeAddress = _disputeAddress;
        dispute = DisputeInterface(_disputeAddress);
    }

    function getJudgementFee(uint256 _amount) internal view returns(uint256) {
        return _amount * councilJudgementFeeRate / 10000 + councilJudgementFee;        
    }
}

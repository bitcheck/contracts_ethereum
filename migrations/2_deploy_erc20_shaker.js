/* 该脚本用于部署新的Token */
/* 使用该脚本前提是：
   1- BTCH合约已经部署
   2- BCT合约已经部署
   3- TokenLocker已经部署
   4- ShakerTokenManage已经部署
*/
require('dotenv').config({ path: '../.env' })
const Token = artifacts.require('./Mocks/Token.sol')
const BTCHToken = artifacts.require('./Mocks/BTCHToken.sol')
const BCTToken = artifacts.require('./Mocks/BCTToken.sol');
const TokenLocker = artifacts.require('./Mocks/TokenLocker.sol');
const ERC20ShakerV2 = artifacts.require('./ERC20ShakerV2');
const ShakerTokenManager = artifacts.require('./ShakerTokenManager.sol');
const DividendPool = artifacts.require('./DividendPool.sol');
const Vault = artifacts.require('./Vault.sol');
const Dispute = artifacts.require('./Dispute');
const DisputeManager = artifacts.require('./DisputeManager.sol');
const RedPacket = artifacts.require('./RedPacket.sol');
const RedpacketVault = artifacts.require('./RedpacketVault.sol');
const RedpacketVaultV2 = artifacts.require('./RedpacketVaultV2.sol');

function toWeiString(numStr, decimal) {
	numStr = numStr.toString();
	let zheng = numStr.substring(0, numStr.indexOf('.'));
	if(numStr.indexOf('.') > 0) zheng = parseInt(zheng) === 0 ? "" : zheng;
	else zheng = numStr;
	let xiao, xiaoLength;
	if(numStr.indexOf('.') > 0) {
		xiao = numStr.substr(numStr.indexOf('.') + 1, numStr.length - zheng.length - 1)
	} else {
		xiao = "";
	}
	
	if(xiao.length > decimal) {
		xiaoLength = decimal;
		xiao = xiao.substring(0, decimal);
	} else {
		xiaoLength = xiao.length;
	}
	const xiaoNew = xiao + ("0").repeat(decimal - xiaoLength)
	const result = zheng + xiaoNew;
	let i;
	for(i = 1; i < decimal; i++) {
		if(result.substring(0, i) !== ("0").repeat(i)) {
			break;
		}
	}
	return(result.substring(i - 1));
}

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { ERC20_TOKEN, FEE_ADDRESS, BTCH_TOKEN, TOKEN_MANAGER, DECIMALS, TAX_BEREAU, BCT_TOKEN, TOKEN_LOCKER, DISPUTE_MANAGER_ALLOWANCE, SHAKER_ALLOWANCE, REDPACKET_ALLOWANCE, EXCHANGE_RATE, MAX_REDPACKET_AMOUNT } = process.env

    const vault = await deployer.deploy(
      Vault,
      ERC20_TOKEN
    )
    console.log('Vault\'s address \n===> ', vault.address);

    const dispute = await deployer.deploy(Dispute);
    console.log('Dispute\'s address \n===> ', dispute.address);

    const dividendPool = await deployer.deploy(
      DividendPool, 
      BTCH_TOKEN,
      ERC20_TOKEN,
      FEE_ADDRESS
    );
    console.log('DividendPool\`s address \n===> ', dividendPool.address);

    const shaker = await deployer.deploy(
      ERC20ShakerV2,
      FEE_ADDRESS,
      ERC20_TOKEN,
      vault.address
    )
    await shaker.updateBonusTokenManager(TOKEN_MANAGER);
    await shaker.updateExchangeRate(EXCHANGE_RATE);
    console.log('ShakerV2\'s address \n===> ', shaker.address)

    const disputeManager = await deployer.deploy(
      DisputeManager,
      shaker.address,
      ERC20_TOKEN,
      vault.address,
      dispute.address
    )
    console.log('DisputeManager\'s address \n===> ', disputeManager.address);

    await shaker.updateDisputeManager(disputeManager.address);
    await dispute.updateDisputeManager(disputeManager.address);
    await vault.updateDisputeManager(disputeManager.address, toWeiString(DISPUTE_MANAGER_ALLOWANCE, DECIMALS));
    await vault.updateShakerAddress(shaker.address, toWeiString(SHAKER_ALLOWANCE, DECIMALS));

    const redpacketVault = await deployer.deploy(
      RedpacketVault,
      ERC20_TOKEN
    )
    console.log('RedpacketVault\'s address \n===> ', redpacketVault.address);

    const redpacketVaultV2 = await deployer.deploy(
      RedpacketVaultV2,
      ERC20_TOKEN
    )
    console.log('RedpacketVaultV2\'s address \n===> ', redpacketVaultV2.address);

    const redpacket = await deployer.deploy(
      RedPacket,
      redpacketVault.address,
      redpacketVaultV2.address,
      ERC20_TOKEN,
      FEE_ADDRESS
    );
    console.log('Redpacket\'s address \n===> ', redpacket.address);
    await redpacket.updateTokenManager(TOKEN_MANAGER);
    await redpacket.updateExchangeRate(EXCHANGE_RATE);
    await redpacket.updateMaxAmount(MAX_REDPACKET_AMOUNT);

    await redpacketVault.updateRedpacketManagerAddress(redpacket.address, toWeiString(REDPACKET_ALLOWANCE, DECIMALS));
    await redpacketVaultV2.updateRedpacketManagerAddress(redpacket.address, toWeiString(REDPACKET_ALLOWANCE, DECIMALS));

    console.log('==========================================');
    console.log('以下手动操作:');
    console.log('请登陆手续费账户，在BTCH中授权' + dividendPool.address + '合约');
    console.log('请将shaker合约地址: ' + shaker.address + ' 加入到TokenManager合约' + TOKEN_MANAGER + '中');
    console.log('请将redpacket合约地址: ' + redpacket.address + ' 加入到TokenManager合约' + TOKEN_MANAGER + '中');
    console.log('==========================================');
    // const tokenManager = await ShakerTokenManager.deployed();
    // await tokenManager.setShakerContractAddress(shaker.address);
    // await tokenManager.setRedpacketAddress(redpacket.address);
  })
}

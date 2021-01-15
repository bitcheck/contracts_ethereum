/* 该脚本用于部署新的Token */
/* 使用该脚本前提是：
   1- BTCH合约已经部署
   2- BCT合约已经部署
   3- TokenLocker已经部署
   4- ShakerTokenManage已经部署
*/
require('dotenv').config({ path: '../.env' })
const Token = artifacts.require('./Mocks/Token.sol')
const ERC20ShakerV2 = artifacts.require('./ERC20ShakerV2')
const BTCHToken = artifacts.require('./Mocks/BTCHToken.sol')
const ShakerTokenManager = artifacts.require('./ShakerTokenManager.sol')
const DividendPool = artifacts.require('./DividendPool.sol');
const Vault = artifacts.require('./Vault.sol');
const Dispute = artifacts.require('./Dispute');
const DisputeManager = artifacts.require('./DisputeManager.sol');
const BCTToken = artifacts.require('./Mocks/BCTToken.sol');
const TokenLocker = artifacts.require('./Mocks/TokenLocker.sol');
const RedPacket = artifacts.require('./RedPacket.sol');
const RedpacketVault = artifacts.require('./RedpacketVault.sol');
const RedpacketVaultV2 = artifacts.require('./RedpacketVaultV2.sol');

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { ERC20_TOKEN, FEE_ADDRESS, BTCH_TOKEN, TOKEN_MANAGER, TAX_BEREAU, BCT_TOKEN, TOKEN_LOCKER, DISPUTE_MANAGER_ALLOWANCE, SHAKER_ALLOWANCE } = process.env

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
    console.log('请别忘了在BTCH中授权该账户');

    const shaker = await deployer.deploy(
      ERC20ShakerV2,
      FEE_ADDRESS,  // commonWithdrawAddress
      ERC20_TOKEN,
      vault.address
    )
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
    await vault.updateDisputeManager(disputeManager.address,DISPUTE_MANAGER_ALLOWANCE * 10**DECIMALS )
    await vault.updateShakerAddress(shaker.address, SHAKER_ALLOWANCE * 10**DECIMALS)

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
    redpacket.updateTokenManager(TOKEN_MANAGER);
    redpacketVault.updateRedpacketManagerAddress(redpacketManager.address, REDPACKET_ALLOWANCE * 10**DECIMALS);
    redpacketVaultV2.updateRedpacketManagerAddress(redpacketManager.address, REDPACKET_ALLOWANCE * 10**DECIMALS);

    const tokenManager = await ShakerTokenManager.deployed();
    await tokenManager.setShakerContractAddress(shaker.address);
    await tokenManager.setRedpacketAddress(redpacket.address);

    await shaker.updateBonusTokenManager(tokenManager.address);
    await shaker.updateExchangeRate(EXCHANGE_RATE * 10**DECIMALS);
    await redpacket.updateExchangeRate(EXCHANGE_RATE * 10**DECIMALS);

  })
}

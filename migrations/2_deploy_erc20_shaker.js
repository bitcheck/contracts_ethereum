/* global artifacts */
require('dotenv').config({ path: '../.env' })
const Token = artifacts.require('./Mocks/Token.sol')
const ERC20ShakerV2 = artifacts.require('ERC20ShakerV2')
const BTCHToken = artifacts.require('./Mocks/BTCHToken.sol')
const ShakerTokenManager = artifacts.require('./Mocks/ShakerTokenManager.sol')

module.exports = function(deployer, network, accounts) {
  return deployer.then(async () => {
    const { ERC20_TOKEN, SHAKER_ADDRESS, FEE_ADDRESS, BTCH_TOKEN, BTCH_TOKEN_MANAGER } = process.env

    // Step 1: Deploy Test USDT, if on mainnet, set the real USDT address in .env
    let token = ERC20_TOKEN
    if(token === '') token = (await deployer.deploy(Token)).address
    console.log('Test USDT Token\'s address\n===> ', token);

    // Step 2: Deploy main shaker contract
    let shaker = SHAKER_ADDRESS
    if(shaker === '') {
      shaker = await deployer.deploy(
      ERC20ShakerV2,
      accounts[0],
      FEE_ADDRESS,
      token,
    )} else {
      shaker = await ERC20ShakerV2.deployed();
    }
    console.log('ShakerV2\'s address \n===> ', shaker.address)

    // Step 3: Deploy BTCHToken Manager
    let btchTokenManager = BTCH_TOKEN_MANAGER
    if(btchTokenManager === '') {
      btchTokenManager = await deployer.deploy(
      ShakerTokenManager, 
      shaker.address
    )} else {
      btchTokenManager = await ShakerTokenManager.deployed()
    }
    console.log('BitCheck Token(BTCH) Manager\'s address \n===> ', btchTokenManager.address)
    console.log('BTCH Manager has bound ERC20 Shaker\'s address\n===> ', shaker.address)

    // Step 4: Deploy BTCHToken
    let btchToken = BTCH_TOKEN
    if(btchToken === '') {
      btchToken = await deployer.deploy(
      BTCHToken, 
      btchTokenManager.address
    )}else {
      btchToken = await BTCHToken.deployed();
    }
    console.log('BTCH Token\'s address\n===> ', btchToken.address);
    console.log('BTCH Token has bound Token Manager\'s address \n===> ', btchTokenManager.address);

    // Step 5: 
    btchTokenManager = await ShakerTokenManager.deployed();
    await btchTokenManager.setTokenAddress(btchToken.address);
    console.log('Token Manager has bound BTCH Token\'s address\n===> ', btchToken.address);

    // Step 6: 
    shaker = await ERC20ShakerV2.deployed();
    await shaker.updateBonusTokenManager(btchTokenManager.address);
    console.log('Shaker has bound Token Manager\'s address\n===> ', btchTokenManager.address);
    await btchTokenManager.setShakerContractAddress(shaker.address);
    console.log('Token Manager has bound Shaker \'s address\n===> ', shaker.address);

    // Testing
    // console.log('\n====== TEST ======\n')
    // btchToken = await BTCHToken.deployed();
    // const mintAmount = await btchTokenManager.getMintAmount(1000000000, 23);
    // console.log('mint amount', mintAmount.toString());
  })
}

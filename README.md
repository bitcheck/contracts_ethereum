## Smart contracts for bitcheck ethereum

### Deployment
Prepare the following accounts:
* SUPER_OPERATOR_ACCOUNT
* FEE_ADDRESS
* TAX_BEREAU
  
  The SUPER_OPERATOR_ACCOUNT is the:
* Operator of ERC20ShakerV2 contract
* Operator of ShakerTokenManager
* Operator of BTCH Token
* Operator of DividendPool

  The FEE_ADDRESS is the:
* Recipent's account of ransaction fee
* Sender's account of dividend

  The TAX_BEREAU is the:
* Recipent's account of mining tax

All operators' address can be modified by `updateOperator` by old operator.

In `.env`, set `PRIVATE_KEY_Network` by `SUPER_OPERATOR_ACCOUNT`'s private key, and set `FEE_ADDRESS`.

Make sure the following params is empty if do dew deployment:
```
SHAKER_ADDRESS=
BTCH_TOKEN_MANAGER=
BTCH_TOKEN=
DIVIDEND_POOL=
```

Set ERC20 Token address, if USDT on mainnet:
```
ERC20_TOKEN=0xdac17f958d2ee523a2206206994597c13d831ec7
```

Run
```
yarn migrate:rinkeby --reset
or
yarn migrate:mainnet --reset
```

Set the new contract address after deployment to 
```
SHAKER_ADDRESS=
BTCH_TOKEN_MANAGER=
BTCH_TOKEN=
DIVIDEND_POOL=
```

Set the `config.js` in client repo and build the client by `yarn build`.

In FEE_ADDRESS, approve DIVIDEND_POOL address to use ERC20_TOKEN(USDT) big amount, like 100000000000


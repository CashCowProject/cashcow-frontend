import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'COW',
    lpAddresses: {
      97: '0xe6096cf01a22a5f03a40f6481c70a83911c36fb9',  // COW BUSD LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x1c24dE5292bB3fA5E58105291f925d95A3c8bd06', // COW
      56: '',
    },
     quoteTokenSymbol: QuoteToken.BUSD,
     quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 2,
    risk: 1,
    isTokenOnly: false,
    lpSymbol: 'COW-BNB LP',
    lpAddresses: {
      97: '0x87ba4e2ebebd9aa1c521f58537f51f0b84b7d9d5', // COW-BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x1c24dE5292bB3fA5E58105291f925d95A3c8bd06', // COW
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 4,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'MILK',
    lpAddresses: {
      97: '0x8089c6d637ad10254439c65629ae8d81f7ffff87', // MILK-USD LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xBc2A01a87C3365080df793F4dc47F3A906DF313e', // Milk
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 5, // Never remove this pool, it's used for calculating the dollar price!
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'MILK-BNB LP',
    lpAddresses: {
      97: '0x77f2e4b1bc055ff20fc979379877157a841cb2e6', // MILK-BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xBc2A01a87C3365080df793F4dc47F3A906DF313e', // Milk
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 6, 
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'COW-BUSD LP',
    lpAddresses: {
      97: '0xe6096cf01a22a5f03a40f6481c70a83911c36fb9', // COW-BUSD LP'
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x1c24dE5292bB3fA5E58105291f925d95A3c8bd06', // COW
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 7,
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'MILK-BUSD LP',
    lpAddresses: {
      97: '0x8089c6d637ad10254439c65629ae8d81f7ffff87', // MILK-BUSD LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xBc2A01a87C3365080df793F4dc47F3A906DF313e', // MILK
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 8, // Has zero aloc, we use this just to calculate USD price
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xe0e92035077c39594793e61802a350347c320cf2',
      // 97: '0x53d8ccf38134ce0960ef709b125368381e824f78',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 9, // Old Cow 9 decimals
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'COW-BUSD',
    lpAddresses: {
      97: '0xe82f20fdcd4327ba85bdd8effec869f0f1f14a90',
      // 97: '0x53d8ccf38134ce0960ef709b125368381e824f78',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 10, // Old Cow 9 decimals
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'COW',
    decimals: 9,
    lpAddresses: {
      97: '0xe82f20fdcd4327ba85bdd8effec869f0f1f14a90',
      // 97: '0x53d8ccf38134ce0960ef709b125368381e824f78',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4',
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms

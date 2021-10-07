import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'COW',
    lpAddresses: {
      97: '0xc0fa2384b67d715aa0efd3c8c453d3cbc17e6ca3',  // COW BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4', // COW
      56: '',
    },
     quoteTokenSymbol: QuoteToken.BNB,
     quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 1,
    risk: 1,
    isTokenOnly: false,
    lpSymbol: 'COW-BNB LP',
    lpAddresses: {
      97: '0xc0fa2384b67d715aa0efd3c8c453d3cbc17e6ca3', // COW-BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4', // COW
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 2,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'MILK',
    lpAddresses: {
      97: '0xc5E6577876cAB36705346ECBd5C8e9EB3FB9B06C', // MILK-BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xF544828F224630d6fEE099a65743E3F683F4F2Cd', // Milk
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },

  {
    pid: 3, // Never remove this pool, it's used for calculating the dollar price!
    risk: 3,
    isTokenOnly: false,
    lpSymbol: 'MILK-BNB LP',
    lpAddresses: {
      97: '0xc5E6577876cAB36705346ECBd5C8e9EB3FB9B06C', // MILK-BNB LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'MILK',
    tokenAddresses: {
      97: '0xF544828F224630d6fEE099a65743E3F683F4F2Cd', // Milk
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }
]

export default farms

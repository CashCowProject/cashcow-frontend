import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  // {
  //   pid: 0,
  //   risk: 5,
  //   lpSymbol: 'EGG-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
  //   },
  //   tokenSymbol: 'EGG',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },

  {
    pid: 0,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'COW',
    lpAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4', // COW
      // 97: '0xc0fa2384b67d715aa0efd3c8c453d3cbc17e6ca3',  // COW LP
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      // 97: '0xf544828f224630d6fee099a65743e3f683f4f2cd', // MILK
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4', // COW
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    // quoteTokenSymbol: QuoteToken.BNB,
    // quoteTokenAdresses: contracts.wbnb,

    quoteTokenSymbol: QuoteToken.COW,
    quoteTokenAdresses: contracts.cow,
  },

  {
    pid: 1,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'COW-BNB LP',
    lpAddresses: {
      97: '0xc0fa2384b67d715aa0efd3c8c453d3cbc17e6ca3',
      56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
    },
    tokenSymbol: 'COW',
    tokenAddresses: {
      97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4',
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    // quoteTokenSymbol: QuoteToken.BNB,
    // quoteTokenAdresses: contracts.wbnb,

    quoteTokenSymbol: QuoteToken.COW,
    quoteTokenAdresses: contracts.cow,
  },

  // 0xc5E6577876cAB36705346ECBd5C8e9EB3FB9B06C

  // {
  //   pid: 1,
  //   risk: 1,
  //   isTokenOnly: true,
  //   lpSymbol: 'MILK',
  //   lpAddresses: {
  //     97: '0xf544828f224630d6fee099a65743e3f683f4f2cd',
  //     56: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
  //   },
  //   tokenSymbol: 'MILK',
  //   tokenAddresses: {
  //     97: '0xf544828f224630d6fee099a65743e3f683f4f2cd',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },

  // {
  //   pid: 2,
  //   risk: 3,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '0x53d8ccf38134ce0960ef709b125368381e824f78',
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
  //   },
  //   tokenSymbol: 'BNB',
  //   tokenAddresses: {
  //     97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 0,
  //   risk: 3,
  //   lpSymbol: 'COW-MILK',
  //   lpAddresses: {
  //     // 97: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
  //     97: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4', // Cash Cow
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
  //   },
  //   tokenSymbol: 'COWT2',
  //   tokenAddresses: {
  //     // 97: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //     97: '0xf544828f224630d6fee099a65743e3f683f4f2cd',
  //     56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  //   },
  //   quoteTokenSymbol: QuoteToken.MILK,
  //   quoteTokenAdresses: contracts.milk,
  // },
]

export default farms

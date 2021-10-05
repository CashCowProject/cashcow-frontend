import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'COW',
    stakingTokenName: QuoteToken.COW,
    stakingTokenAddress: '0x3d774e309b63c28ad0c19bf69de4f65d0538f0a4',
    contractAddress: {
      97: '0xea5f97a28f0263fb1cb3d246727e1a1459373dbe',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://cashcow.finance/',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 9,
  },

  {
    sousId: 2,
    tokenName: 'MILK',
    stakingTokenName: QuoteToken.MILK,
    stakingTokenAddress: '0xf544828f224630d6fee099a65743e3f683f4f2cd',
    contractAddress: {
      97: '0xea5f97a28f0263fb1cb3d246727e1a1459373dbe',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://cashcow.finance/',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 2,
    isFinished: false,
    tokenDecimals: 18,
  },

  // {
  //   sousId: 0,
  //   tokenName: 'CAKE',
  //   stakingTokenName: QuoteToken.CAKE,
  //   stakingTokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   contractAddress: {
  //     97: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
  //     56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://pancakeswap.finance/',
  //   harvest: true,
  //   tokenPerBlock: '10',
  //   sortOrder: 1,
  //   isFinished: false,
  //   tokenDecimals: 18,
  // },
  // {
  //   sousId: 1,
  //   tokenName: 'TWT',
  //   stakingTokenName: QuoteToken.SYRUP,
  //   stakingTokenAddress: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
  //   contractAddress: {
  //     97: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af5633061A',
  //     56: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af5633061A',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://trustwallet.com/',
  //   harvest: true,
  //   tokenPerBlock: '20',
  //   sortOrder: 999,
  //   isFinished: true,
  //   tokenDecimals: 18,
  // },
]

export default pools

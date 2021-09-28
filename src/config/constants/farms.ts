import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 3,
    lpSymbol: 'COW-BNB',
    lpAddresses: {
      97: '0xF544828F224630d6fEE099a65743E3F683F4F2Cd',
      56: '',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x3D774E309B63C28ad0c19BF69DE4F65D0538F0A4',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 1,
    risk: 3,
    lpSymbol: 'COW-BNB',
    lpAddresses: {
      97: '0xF544828F224630d6fEE099a65743E3F683F4F2Cd',
      56: '',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x3D774E309B63C28ad0c19BF69DE4F65D0538F0A4',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'COW-BNB',
    lpAddresses: {
      97: '0xF544828F224630d6fEE099a65743E3F683F4F2Cd',
      56: '',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0x3D774E309B63C28ad0c19BF69DE4F65D0538F0A4',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
]

export default farms
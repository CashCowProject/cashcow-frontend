import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  eggPerBlock?: number
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface SortOrderType {
  field: string
  direction: string
}

export interface MarketState {
  sortOrder: SortOrderType
  collectionType: SortOrderType
}

// Slices states

export interface FarmsState {
  data: Farm[]
}

export interface PoolsState {
  data: Pool[]
}
export interface LandState {
  landItemCount: number
  updated: boolean
}
export interface CowState {
  cowItemCount: number
  updated: boolean
}
export interface BullState {
  bullItemCount: number
  updated: boolean
}

// Global state


export interface State {
  farms: FarmsState
  pools: PoolsState
  markets: MarketState
  land: LandState
  cow: CowState
  bull: BullState
}

import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import marketsReducer from './markets'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    markets: marketsReducer,
  },
})

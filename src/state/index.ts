import { configureStore } from '@reduxjs/toolkit'
import farmsReducer from './farms'
import poolsReducer from './pools'
import marketsReducer from './markets'
import landReducer from './landManagement'
import cowReducer from './cowManagement'
import bullReducer from './bullManagement'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    pools: poolsReducer,
    markets: marketsReducer,
    land:landReducer,
    cow:cowReducer,
    bull: bullReducer
  },
})

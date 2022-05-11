/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  sortOrder: {
    field: 'RecentlyListed',
    direction: 'desc'
  },
  collectionType: {
    field: 'All',
    direction: 'asc'
  },
  bullItemCount: 0,
  updated:false
 }

export const BullSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setCollectionType: (state, action) => {
      state.collectionType = action.payload
    },
    setBullNftCount:(state, action) =>{
      state.bullItemCount = action.payload
    },
    updating:(state, action) =>{
      state.updated = action.payload;
    }
  },
})

// Actions
export const { setSortOrder, setCollectionType, setBullNftCount, updating } = BullSlice.actions

export default BullSlice.reducer

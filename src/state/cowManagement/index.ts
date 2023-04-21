/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sortOrder: {
    field: 'RecentlyListed',
    direction: 'desc',
  },
  collectionType: {
    field: 'All',
    direction: 'asc',
  },
  cowItemCount: 0,
  updated: false,
}

export const CowSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setCollectionType: (state, action) => {
      state.collectionType = action.payload
    },
    setCowNftCount: (state, action) => {
      state.cowItemCount = action.payload
    },
    updating: (state, action) => {
      state.updated = action.payload
    },
  },
})

// Actions
export const { setSortOrder, setCollectionType, setCowNftCount, updating } = CowSlice.actions

export default CowSlice.reducer

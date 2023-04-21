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
  landItemCount: 0,
  updated: false,
}

export const LandSlice = createSlice({
  name: 'Game',
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
    },
    setCollectionType: (state, action) => {
      state.collectionType = action.payload
    },
    setLandNftCount: (state, action) => {
      state.landItemCount = action.payload
    },
    updating: (state, action) => {
      state.updated = action.payload
    },
  },
})

// Actions
export const { setSortOrder, setCollectionType, setLandNftCount, updating } = LandSlice.actions

export default LandSlice.reducer

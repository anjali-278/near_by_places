import { createSlice } from '@reduxjs/toolkit';

const locationAddressSlice = createSlice({
  name: "locationAddress",
  initialState: {
    loading : false,
    address : [],
    error : null,
  },
  reducers: {
    addressRequested : (state) => {
    state.loading = true;
    },
    addressSuccess : (state, action) => {
      state.address = action.payload;
      state.loading = false;
    },
    addressFailed : (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

const {actions, reducer} = locationAddressSlice;
const locationAddressReducer = reducer;

export const {addressRequested, addressSuccess, addressFailed} = actions;
export default locationAddressReducer;
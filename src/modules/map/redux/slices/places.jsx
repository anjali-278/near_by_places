import { createSlice } from '@reduxjs/toolkit';


const placeSlice = createSlice({
  name: "places",
  initialState: {
    loading : false,
    places : [],
    error : null,
  },
  reducers: {
    placesRequested : (state, action) => {
      state.loading = true;
    },
    placesSuccess : (state, action) => {
      state.places = action.payload;
      state.loading = false;
      state.error = null;
    },
    placesFailed : (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

const {actions, reducer} = placeSlice;
const placeReducer = reducer;

export const {placesRequested, placesSuccess, placesFailed} = actions;
export default placeReducer;
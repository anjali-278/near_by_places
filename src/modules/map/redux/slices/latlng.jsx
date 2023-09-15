import {createSlice} from '@reduxjs/toolkit';

const latlngSlice = createSlice({
  name : "latlng",
  initialState : {
    latitude: "",
    longitude: "",
  },
  reducers : {
    getLatlng : (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  },
})

const {actions, reducer} = latlngSlice;
const latlngReducer = reducer;

export const {getLatlng} = actions;
export default latlngReducer;

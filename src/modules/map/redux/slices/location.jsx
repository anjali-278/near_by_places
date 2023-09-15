import {createSlice} from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name : "location",
    initialState : {},
    reducers : {
        getLocation : (state, action) => {
         state.location = action.payload;
        }
    }
})

const {actions, reducer} = locationSlice;
const locationReducer = reducer;

export const {getLocation} = actions;
export default locationReducer;
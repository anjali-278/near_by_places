import {createSlice} from '@reduxjs/toolkit';

const locationPermissionSlice = createSlice({
    name : "locationPermission",
    initialState : {
        locationPermission : false,
    },
    reducers : {
        permissionGranted : (state) => {
            state.locationPermission = true;
        }
    }
})

const {actions, reducer} = locationPermissionSlice;
const locationPermissionReducer = reducer;

export const { permissionGranted } = actions;
export default locationPermissionReducer;
import { combineReducers } from "@reduxjs/toolkit";

import locationPermissionReducer from "../modules/map/redux/slices/locationPermission";
import locationReducer from "../modules/map/redux/slices/location";
import latlngReducer from "../modules/map/redux/slices/latlng";
import locationAddressReducer from "../modules/map/redux/slices/currentLocationAddress";
import placeReducer from "../modules/map/redux/slices/places";
import authReducer from "../modules/login/redux/authSlice";
import userInfoReducer from "../modules/profile/redux/userInfoSlice";
import selectedPlaceReducer from "../modules/map/redux/slices/selectedPlace";

const rootReducer = combineReducers({
    locationPermission : locationPermissionReducer,
    location : locationReducer,
    latLng : latlngReducer,
    locationAddress : locationAddressReducer,
    places : placeReducer,
    selectedPlace : selectedPlaceReducer,
    auth : authReducer,
    userInfo : userInfoReducer,
})

export default rootReducer;
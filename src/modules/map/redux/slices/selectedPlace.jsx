import { createSlice } from "@reduxjs/toolkit";

const selectedPlaceSlice = createSlice({
    name: "selectedPlace",
    initialState : {
        address : "",
    },
    reducers: {
        setSelectedPlace : (state , action) => {
            state.address = action.payload;
        },
        clearPlace : (state) => {
            state.address = "";
        },
    }
})

export const {setSelectedPlace, clearPlace} = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;

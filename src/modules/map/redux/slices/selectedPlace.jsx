import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address: "",
}

const selectedPlaceSlice = createSlice({
	name: "selectedPlace",
	initialState,
	reducers: {
		setSelectedPlace: (state, action) => {
			state.address = action.payload;
		},
		clearPlace: (state) => {
			state.address = initialState.address;
		},
	}
})

export const { setSelectedPlace, clearPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;

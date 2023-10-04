import { createSlice } from "@reduxjs/toolkit";

const modalVisibleSlice = createSlice({
    name : "modalVisible",
    initialState : {
        show : false,
    },
    reducers : {
        showModal : (state) => {
            state.show = true;
        },
        hideModal : (state) => {
            state.show = false;
        }
    }
})

export const {showModal, hideModal} = modalVisibleSlice.actions;

export default modalVisibleSlice.reducer;
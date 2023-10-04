import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiver_id: null,
  receiver_name : "",
  message: "",
  receiver_location: {
    latitude : "",
    longitude : "",
    address : "",
  },
};



const messageDraftSlice = createSlice({
  name: "messageDraft",
  initialState,
  reducers: {
    setDraftValue: (state, action) => {
      const { receiver_location, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        receiver_location: {
          ...state.receiver_location,
          ...(receiver_location || {}),
        },
      };
    },
    clearDraft: () => {
      return initialState;
    },
  },
});

export const { setDraftValue, clearDraft } = messageDraftSlice.actions;
export default messageDraftSlice.reducer;

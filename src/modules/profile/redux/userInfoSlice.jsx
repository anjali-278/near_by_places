import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  dob: "",
  gender: "",
  phone_number: "",
  address: "",
  imageUri : "",
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setImageUri : (state, action) => {
     state.imageUri = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phone_number = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    resetUserInfo: () => initialState
  }
})

export const {
  setName,
  setEmail,
  setPassword,
  setDob,
  setGender,
  setPhoneNumber,
  setAddress,
  resetUserInfo,
  setImageUri,
} = userInfoSlice.actions
export default userInfoSlice.reducer;
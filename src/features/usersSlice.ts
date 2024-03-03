import { createSlice } from "@reduxjs/toolkit";
import {IUserState} from "../type";
import {signUp} from "./userThunk";

const initialState: IUserState = {
  user: null,
  signInLoading: false,
  signUpLoading: false,
};

const UsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.signUpLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.signUpLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.signUpLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const {} = UsersSlice.actions;

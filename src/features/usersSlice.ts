import { createSlice } from "@reduxjs/toolkit";
import {IUserState} from "../type";
import {signIn, signUp} from "./userThunk";

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

    builder.addCase(signIn.pending, (state) => {
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.signInLoading = false;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.signInLoading = false;
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const {} = UsersSlice.actions;

import {createSlice} from "@reduxjs/toolkit";
import {IUserState} from "../type";
import {signIn, signUp} from "./userThunk";

const initialState: IUserState = {
  user: "",
  signInLoading: false,
  signUpLoading: false,
  authorizationError: "",
  authorizationMessage: "",
};

const UsersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.user = '';
      state.signUpLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, {payload: res}) => {
      state.signUpLoading = false;
      state.user = res.token || '';
      state.authorizationMessage = res.message;
    });
    builder.addCase(signUp.rejected, (state, {payload: error}) => {
      state.signUpLoading = false;
      state.authorizationError = error?.error || '';
    });

    builder.addCase(signIn.pending, (state) => {
      state.user = '';
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, {payload: res}) => {
      state.signInLoading = false;
      state.user = res?.token || '';
      state.authorizationMessage = res.message;
    });
    builder.addCase(signIn.rejected, (state, {payload: error}) => {
      state.signInLoading = false;
      state.authorizationError = error?.error || '';
    });
  },
});

export const userReducer = UsersSlice.reducer;
export const {logout} = UsersSlice.actions;

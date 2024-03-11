import {createAsyncThunk} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import {ISignIn, ISignUp, ISignUpRes, ValidationError} from "../type";
import axiosApi from "../axiosApi";

export const signUp = createAsyncThunk<
  ISignUpRes,
  ISignUp,
  { rejectValue: ValidationError }
>("user/signUp", async (userData, {rejectWithValue}) => {
  try {
    const response = await axiosApi.post<ISignUpRes>("/register/", userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const signIn = createAsyncThunk<
  ISignUpRes,
  ISignIn,
  { rejectValue: ValidationError }
>("user/signIn", async (userData, {rejectWithValue}) => {
  try {
    const response = await axiosApi.post<ISignUpRes>("/login/", userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
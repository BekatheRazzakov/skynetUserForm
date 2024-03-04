import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {isAxiosError} from "axios";
import {ISignIn, ISignUp, ISignUpRes, ValidationError} from "../type";

export const signUp = createAsyncThunk<
  ISignUpRes,
  ISignUp,
  { rejectValue: ValidationError }
>("user/signUp", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<ISignUpRes>("http://10.1.2.10:8001/register/", userData);
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
>("user/signIn", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<ISignUpRes>("http://10.1.2.10:8001/login/", userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
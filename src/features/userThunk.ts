import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ISignIn, ISignUp} from "../type";

export const signUp = createAsyncThunk(
  'users/signUp',
  async (userData: ISignUp) => {
    try {
      const req = await axios.post<ISignUp>('http://10.1.2.10:8001/register/', userData);
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (userData: ISignIn) => {
    try {
      const req = await axios.post<ISignUp>('http://10.1.2.10:8001/login/', userData);
      return req.data;
    } catch (e) {
      console.log(e);
    }
  }
);
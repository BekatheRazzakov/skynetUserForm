import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ISignUp} from "../type";

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
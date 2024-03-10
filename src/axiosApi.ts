import axios, { AxiosHeaders } from 'axios';
import { Store } from '@reduxjs/toolkit';
import {RootState} from "./app/store";
import {apiUrl} from "./constants";

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config) => {
    const token = store.getState().userState.user;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', `Token ${token}`);
    return config;
  });
};

const axiosApi = axios.create({
  baseURL: apiUrl,
});

export default axiosApi;

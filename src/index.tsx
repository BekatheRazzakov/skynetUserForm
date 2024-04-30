import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";
import {Provider} from "react-redux";
import {addInterceptors} from "./axiosApi";
import {ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles'
import './index.css';

const theme = createTheme({
  logLevel: 'error',
} as {});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

addInterceptors(store);

root.render(
  <ThemeProvider theme={theme}>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </ThemeProvider>
);

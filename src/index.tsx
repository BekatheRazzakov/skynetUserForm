import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store";
import {Provider} from "react-redux";
import './index.css';
import {addInterceptors} from "./axiosApi";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

addInterceptors(store);

root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </PersistGate>
);

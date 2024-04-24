import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import {
  RouterProvider,
} from "react-router-dom";


import { Provider } from "react-redux";
import configureStore from "./redux/store";
// import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from "./redux/reducer/rootReducer";

import { legacy_createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'

const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// const store = configureStore();

// const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)
// const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer)

// const store = createStore(rootReducer, undefined, composedEnhancers)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    {/* </PersistGate> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

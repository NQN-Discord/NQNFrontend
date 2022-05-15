import React from 'react';
import { hydrate, render } from "react-dom";
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./reducers";
import App from "./main";
import './globals.css';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunkMiddleware),
  )
);


const rootElement = document.getElementById("root");
const toRender = (
  <Provider store={store}>
    <App/>
  </Provider>
);

if (rootElement.hasChildNodes()) {
  hydrate(toRender, rootElement);
} else {
  render(toRender, rootElement);
}
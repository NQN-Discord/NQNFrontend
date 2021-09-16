import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";
import { Provider } from 'react-redux';
import rootReducer from "./reducers";
import App from "./main";
import './nitropay.css';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunkMiddleware),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

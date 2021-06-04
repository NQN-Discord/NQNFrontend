import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, compose, createStore} from "redux";
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';

import rootReducer from "./reducers";
import App from "./main";
import './nitropay.css';
import {sentryDns} from "./config";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (sentryDns !== "") {
  Sentry.init({dsn: sentryDns});
}

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunkMiddleware),
    Sentry.createReduxEnhancer({})
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

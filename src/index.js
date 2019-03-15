import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";
import { Provider } from 'react-redux';

import rootReducer from "./reducers";
import App from "./main";

import './index.css';


const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

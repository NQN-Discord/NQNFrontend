import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_REFRESH = "RECEIVE_REFRESH";

export function readStorageState() {
    return function(dispatch) {
        const token = localStorage.getItem("refreshToken") || "";
        dispatch(receiveRefresh(token))
    }
}

export function setRefreshToken(refreshToken) {
    return function(dispatch) {
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(receiveRefresh(refreshToken));
    }
}

export function receiveRefresh(refreshToken) {
    return {
        type: RECEIVE_REFRESH,
        refreshToken
    }
}

export function exchangeCode(code) {
    return function(dispatch) {
        axios.get(`${api_url}/login`, {params: {code}}).then(response => {
            dispatch(setRefreshToken(response.data.refresh_token));
        });
    };
}

export function logout() {
    return function(dispatch) {
        dispatch(setRefreshToken(""));
    }
}
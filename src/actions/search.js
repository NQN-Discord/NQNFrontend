import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";


export function receiveSearch(refreshToken) {
    return {
        type: RECEIVE_SEARCH,
        refreshToken
    }
}

export function search(term, page, page_size) {
    return function(dispatch) {
        axios.get(`${api_url}/search`, {params: {
                term,
                page,
                page_size
        }}).then(response => {
            dispatch(receiveSearch(response.data));
        });
    };
}
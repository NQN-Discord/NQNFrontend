import {combineReducers} from 'redux'
import update from 'immutability-helper';

import {RECEIVE_REFRESH} from "./actions/auth";
import {RECEIVE_SEARCH} from "./actions/search";

function auth(state = {
    refreshToken: "",
    loggedIn: false
}, action) {
    switch (action.type) {
        case RECEIVE_REFRESH:
            console.log("Refresh token: " + action.refreshToken);
            return update(state,
                {$merge: {
                        refreshToken: action.refreshToken,
                        loggedIn: action.refreshToken !== ""
                }}
            );
        default:
            return state;
    }
}

function search(state = {
    shownResults: [],
    totalResults: 0,
    term: "",
    page: 0
}, action) {
    switch (action.type) {
        case RECEIVE_SEARCH:
            return update(state,
                {$merge: {
                        shownResults: action.results.posts,
                        totalResults: action.results.total,
                        term: action.term,
                        page: action.page
                }}
            );
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    auth,
    search
});

export default rootReducer;
import {combineReducers} from 'redux'
import update from 'immutability-helper';

import {RECEIVE_REFRESH} from "./actions/auth";

function auth(state = {
    refreshToken: "",
    loggedIn: false
}, action) {
    switch (action.type) {
        case RECEIVE_REFRESH:
            console.log("Refresh token" + action.refreshToken);
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

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
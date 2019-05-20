import {combineReducers} from 'redux'
import update from 'immutability-helper';

import {RECEIVE_REFRESH} from "./actions/auth";
import {RECEIVE_GUILDS} from "./actions/user";

import axios from "axios";

function auth(state = {
    refreshToken: "",
    loggedIn: null
}, action) {
    switch (action.type) {
        case RECEIVE_REFRESH:
            console.log("Refresh token: " + action.refreshToken);
            axios.defaults.headers.common['Authorization'] = action.refreshToken;
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

function user(state = {
    guilds: {},
    name_map: {},
    guild_icons: {},
    emotes: {}
}, action) {
    switch (action.type) {
        case RECEIVE_GUILDS:
            return update(state,
                {$merge: {
                        guilds: action.guilds,
                        guild_icons: action.icons,
                        name_map: action.names
                    }}
            );
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    auth,
    user
});

export default rootReducer;
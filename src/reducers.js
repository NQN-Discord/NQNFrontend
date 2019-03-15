import {combineReducers} from 'redux'
import update from 'immutability-helper';

function auth(state = {
    token: ""
}, action={}) {
    return state;
}

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
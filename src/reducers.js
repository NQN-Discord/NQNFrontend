import {combineReducers} from 'redux'
import update from 'immutability-helper';

import {RECEIVE_REFRESH} from "./actions/auth";
import {ADD_ALIASES, DEL_ALIASES, RECEIVE_EMOTES, RECEIVE_GUILDS} from "./actions/user";
import {RECEIVE_GUILD_SETTINGS} from "./actions/guild";

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
  packs: {},
  user_packs: [],
  user_emotes: {},
  user_aliases: []
}, action) {
  switch (action.type) {
    case RECEIVE_GUILDS:
      return update(state, {$merge: {guilds: action.guilds}});
    case ADD_ALIASES:
      return update(state,
        {$merge: {
            user_aliases:
              state.user_aliases.filter(({id}) => !action.aliases.some(({aliasID}) => aliasID === id))
                .concat(action.aliases)
          }}
      );
    case DEL_ALIASES:
      return update(state,
        {$merge: {
            user_aliases:
              state.user_aliases.filter(({name}) => !action.aliases.includes(name))
          }}
      );
    case RECEIVE_EMOTES:
      return update(state,
        {$merge: {
            packs: action.packs,
            user_packs: action.user_packs,
            user_emotes: action.user_emotes,
            user_aliases: action.user_aliases
          }}
      );
    case RECEIVE_GUILD_SETTINGS:
      return update(state,
        {guilds: {[action.guild]: {$merge: action.settings}}}
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
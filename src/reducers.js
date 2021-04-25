import {combineReducers} from 'redux'
import update from 'immutability-helper';

import {RECEIVE_REFRESH} from "./actions/auth";
import {ADD_ALIASES, DEL_ALIASES, RECEIVE_EMOTES, RECEIVE_GUILD_EMOTES, JOIN_GROUPS, LEAVE_GROUPS, RECEIVE_PREMIUM_USER} from "./actions/user";
import {RECEIVE_GUILDS, RECEIVE_GUILD_CHANNELS, RECEIVE_GUILD_SETTINGS, RECEIVE_GUILD_LOGS} from "./actions/guild";

import axios from "axios";
import {RECEIVE_COMMANDS} from "./actions/commands";

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
  guild_emotes: {},
  guild_aliases: {},
  user_aliases: [],
  commands: {},
  required_permissions: [],
  premium_user: null,
  personas: [],
  user: null
}, action) {
  switch (action.type) {
    case RECEIVE_GUILDS:
      Object.keys(action.guilds).forEach(k =>
        action.guilds[k].loaded_channels = false
      );
      return update(state, {$merge: {guilds: action.guilds, required_permissions: action.required_perms}});
    case RECEIVE_GUILD_CHANNELS:
      return update(state,
        {guilds: {[action.guild]: {$merge: {
          channels: action.channels,
          loaded_channels: true,
          username: action.username
        }}}}
      );
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
    case JOIN_GROUPS:
      return update(state,
        {$merge: {
            user_packs:
              state.user_packs.concat(action.groups)
          }}
      );
    case LEAVE_GROUPS:
      return update(state,
        {$merge: {
            user_packs:
              state.user_packs.filter((name) => !action.groups.includes(name))
          }}
      );
    case RECEIVE_EMOTES:
      return update(state,
        {$merge: {
            packs: action.packs,
            user_packs: action.user_packs,
            guild_emotes: action.guild_emotes,
            guild_aliases: action.guild_aliases,
            user_aliases: action.user_aliases,
            premium_user: action.premium_user,
            personas: action.personas,
            user: action.user
          }}
      );
    case RECEIVE_PREMIUM_USER:
      return update(state,
        {$merge: {
            premium_user: action.premium_user
          }}
      );
    case RECEIVE_GUILD_EMOTES:
      return update(state,
        {$merge: {
            guild_emotes: update(state.guild_emotes, {$merge: {[action.guild]: action.emotes}}),
          }}
      );
    case RECEIVE_GUILD_SETTINGS:
      return update(state,
        {guilds: {[action.guild]: {$merge: action.settings}}}
      );
    case RECEIVE_GUILD_LOGS:
      return update(state,
        {guilds: {[action.guild]: {$merge: {auditLog: action.logs}}}}
      );
    case RECEIVE_COMMANDS:
      return update(state,
        {$merge: {commands: action.commands}}
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
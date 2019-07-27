import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";
export const RECEIVE_EMOTES = "RECEIVE_EMOTES";
export const ADD_ALIASES = "ADD_ALIASES";
export const DEL_ALIASES = "DEL_ALIASES";


export function receiveGuilds(guild_names) {
  return {
    type: RECEIVE_GUILDS,
    guilds: guild_names.guilds,
    icons: guild_names.icons,
    names: guild_names.names
  }
}

export function receiveEmotes(emotes) {
  return {
    type: RECEIVE_EMOTES,
    packs: emotes.packs,
    user_packs: emotes.user_packs,
    user_emotes: emotes.user_emotes,
    user_aliases: emotes.aliases
  }
}

function addAliases(aliases) {
  return {
    type: ADD_ALIASES,
    aliases
  }
}

function delAliases(aliases) {
  return {
    type: DEL_ALIASES,
    aliases
  }
}

export function setAliases(aliases) {
  return function(dispatch) {
    axios.put(`${api_url}/emotes`, {emotes: Object.fromEntries(aliases.map(({id, name}) => {return [name, id]}))});
    dispatch(addAliases(aliases));
  };
}

export function changeAliases(aliases) {
  return function(dispatch) {
    axios.put(`${api_url}/emotes`, {emotes: Object.fromEntries(aliases.map(({id, name}) => {return [name, id]}))});
    axios.delete(`${api_url}/emotes`, {data: {emotes: aliases.map(({oldName}) => oldName)}});
    dispatch(addAliases(aliases.map(({id, name, animated}) => {return {id, name, animated}})));
    dispatch(delAliases(aliases.map(({oldName}) => oldName)));
  };
}

export function unsetAliases(aliases) {
  return function(dispatch) {
    axios.delete(`${api_url}/emotes`, {data: {emotes: aliases}});
    dispatch(delAliases(aliases));
  };
}

export function fetchGuilds() {
  return function(dispatch) {
    axios.get(`${api_url}/user/guilds`).then(response => {
      dispatch(receiveGuilds(response.data));
    });
  };
}

export function fetchEmotes() {
  return function(dispatch) {
    axios.get(`${api_url}/user/emotes`).then(response => {
      dispatch(receiveEmotes(response.data));
    });
  };
}

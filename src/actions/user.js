import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";
export const RECEIVE_GUILD_EMOTES = "RECEIVE_GUILD_EMOTES";
export const RECEIVE_EMOTES = "RECEIVE_EMOTES";
export const ADD_ALIASES = "ADD_ALIASES";
export const DEL_ALIASES = "DEL_ALIASES";
export const LEAVE_GROUPS = "LEAVE_GROUPS";
export const JOIN_GROUPS = "JOIN_GROUPS";


export function receiveGuilds(guild_names) {
  return {
    type: RECEIVE_GUILDS,
    guilds: guild_names.guilds,
    names: guild_names.names
  }
}

export function receiveEmotes(emotes) {
  return {
    type: RECEIVE_EMOTES,
    packs: emotes.packs,
    user_packs: emotes.user_packs,
    guild_emotes: emotes.guild_emotes,
    guild_aliases: emotes.guild_aliases,
    user_aliases: emotes.aliases
  }
}

export function receiveGuildEmotes(guild, emotes) {
  return {
    type: RECEIVE_GUILD_EMOTES,
    guild,
    emotes,
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
    axios.delete(`${api_url}/emotes`, {data: {emotes: aliases.map(alias => alias.name)}});
    dispatch(delAliases(aliases.map(({name}) => name)));
  };
}

export function leaveGroups(groups) {
  return function(dispatch) {
    axios.delete(`${api_url}/groups`, {data: {groups}});
    dispatch({
      type: LEAVE_GROUPS,
      groups
    });
  };
}

export function joinGroups(groups) {
  return function(dispatch) {
    axios.put(`${api_url}/groups`, {groups});
    dispatch({
      type: JOIN_GROUPS,
      groups
    });
  };
}

export function fetchGuilds() {
  return function(dispatch) {
    axios.get(`${api_url}/user/guilds`).then(response => {
      if (response) {
        dispatch(receiveGuilds(response.data));
      }
    });
  };
}

export function fetchEmotes() {
  return function(dispatch) {
    axios.get(`${api_url}/user/emotes`).then(response => {
      if (response) {
        dispatch(receiveEmotes(response.data));
      }
    });
  };
}

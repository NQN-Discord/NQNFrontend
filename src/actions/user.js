import axios from 'axios';
const {api_url} = window.env

export const RECEIVE_GUILD_EMOTES = "RECEIVE_GUILD_EMOTES";
export const RECEIVE_PREMIUM_USER = "RECEIVE_PREMIUM_USER";
export const RECEIVE_EMOTES = "RECEIVE_EMOTES";
export const ADD_ALIASES = "ADD_ALIASES";
export const DEL_ALIASES = "DEL_ALIASES";
export const LEAVE_GROUPS = "LEAVE_GROUPS";
export const JOIN_GROUPS = "JOIN_GROUPS";


export function receiveEmotes(emotes) {
  return {
    type: RECEIVE_EMOTES,
    packs: emotes.packs,
    user_packs: emotes.user_packs,
    guild_emotes: emotes.guild_emotes,
    guild_aliases: emotes.guild_aliases,
    user_aliases: emotes.aliases,
    premium_user: emotes.premium_user,
    personas: emotes.personas,
    user: emotes.user
  }
}

export function receivePatreonUser(data) {
  return {
    type: RECEIVE_PREMIUM_USER,
    premium_user: data.premium_user
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


function renderEmote(alias) {
  if (alias.animated) {
    return [alias.name, `<a:${alias.name}:${alias.id}>`]
  }
  return [alias.name, `<:${alias.name}:${alias.id}>`]
}

export function setAliases(aliases) {
  return function(dispatch) {
    axios.put(`${api_url}/aliases`, {emotes: Object.fromEntries(aliases.map(renderEmote))});
    dispatch(addAliases(aliases));
  };
}

export function changeAliases(aliases) {
  return function(dispatch) {
    axios.put(`${api_url}/aliases`, {emotes: Object.fromEntries(aliases.map(renderEmote))});
    axios.delete(`${api_url}/aliases`, {data: {emotes: aliases.map(({oldName}) => oldName)}});
    dispatch(addAliases(aliases.map(({id, name, animated}) => {return {id, name, animated}})));
    dispatch(delAliases(aliases.map(({oldName}) => oldName)));
  };
}

export function unsetAliases(aliases) {
  return function(dispatch) {
    axios.delete(`${api_url}/aliases`, {data: {emotes: aliases.map(alias => alias.name)}});
    dispatch(delAliases(aliases.map(({name}) => name)));
  };
}

export function leaveGroups(packs) {
  return function(dispatch) {
    axios.delete(`${api_url}/packs`, {data: {groups: packs}});
    dispatch({
      type: LEAVE_GROUPS,
      groups: packs
    });
  };
}

export function joinGroups(packs) {
  return function(dispatch) {
    axios.put(`${api_url}/packs`, {groups: packs});
    dispatch({
      type: JOIN_GROUPS,
      groups: packs
    });
  };
}

export function joinPackServer(pack) {
  return function(dispatch) {
    window.open(`${api_url}/join_server/${pack}`, "_blank");
  }
}

export function fetchEmotes() {
  return function(dispatch) {
    axios.get(`${api_url}/emotes`).then(response => {
      if (response) {
        dispatch(receiveEmotes(response.data));
      }
    });
  };
}


export function fetchPremiumUser() {
  return function(dispatch) {
    axios.get(`${api_url}/patreon`).then(response => {
      if (response) {
        dispatch(receivePatreonUser(response.data));
      }
    });
  };
}

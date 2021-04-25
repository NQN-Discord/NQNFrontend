import axios from "axios";
import {api_url, guildBuilderApiURL} from "../config";

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";
export const RECEIVE_GUILD_CHANNELS = "RECEIVE_GUILD_CHANNELS";
export const RECEIVE_GUILD_SETTINGS = "RECEIVE_GUILD_SETTINGS";
export const RECEIVE_GUILD_LOGS = "RECEIVE_GUILD_LOGS";


export function receiveGuilds(guilds) {
  return {
    type: RECEIVE_GUILDS,
    guilds: guilds.guilds,
    required_perms: guilds.required_perms
  }
}

export function receiveGuildChannels(guild, channels, username) {
  return {
    type: RECEIVE_GUILD_CHANNELS,
    guild,
    channels,
    username
  }
}

function receiveGuildSettings(guild, settings) {
  return {
    type: RECEIVE_GUILD_SETTINGS,
    guild,
    settings
  }
}


function receiveGuildLogs(guild, logs) {
  return {
    type: RECEIVE_GUILD_LOGS,
    guild,
    logs
  }
}

export function fetchGuilds() {
  return function(dispatch) {
    axios.get(`${api_url}/guilds`).then(response => {
      if (response) {
        dispatch(receiveGuilds(response.data));
      }
    });
  };
}

export function fetchChannels(guildID) {
  return function(dispatch) {
    axios.get(`${api_url}/guilds/${guildID}/channels`).then(response => {
      if (response) {
        dispatch(receiveGuildChannels(guildID, response.data.channels, response.data.username));
      }
    });
  };
}


export function postGuildSettings(guildID, prefix, boostChannel, auditChannel) {
  return function(dispatch) {
    axios.put(`${api_url}/guilds/${guildID}/settings`, {
      prefix,
      audit_channel: auditChannel || 0
    });
    dispatch(receiveGuildSettings(guildID, {prefix, boostChannel}));
  };
}

export function fetchGuildLogs(guildID, page=0, author=0, channel=0) {
  return function(dispatch) {
    axios.get(`${api_url}/guilds/${guildID}/logs`, {params: {author, channel, page}}).then(response => {
      dispatch(receiveGuildLogs(guildID, response.data));
    });
  };
}

export function postGuildFeedback(guildID, reason, details, callback) {
  return function(dispatch) {
    axios.post(`${api_url}/guilds/${guildID}/feedback`, {reason, details}).then(response => {
      callback();
    });
  };
}

export function postGuildEmotes(guildID, emotes, callback) {
  return function(dispatch) {
    axios.put(`${api_url}/guilds/${guildID}/emotes`, {emotes}).then(response => {
      callback(response.data.ids);
    });
  };
}

export function createGuild(aliases, code, templateCode, callback) {
  return function(dispatch) {
    axios.post(`${guildBuilderApiURL}/guild`, {
      emotes: aliases,
      code,
      template_code: templateCode
    }).then(response => {
      callback(response.data.uuid);
    });
  }
}
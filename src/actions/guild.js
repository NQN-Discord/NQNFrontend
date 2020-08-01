import axios from "axios";
import {api_url, guildBuilderApiURL} from "../config";

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";
export const RECEIVE_GUILD_CHANNELS = "RECEIVE_GUILD_CHANNELS";
export const RECEIVE_GUILD_SETTINGS = "RECEIVE_GUILD_SETTINGS";
export const RECEIVE_GUILD_LOGS = "RECEIVE_GUILD_LOGS";


export function receiveGuilds(guild_names) {
  return {
    type: RECEIVE_GUILDS,
    guilds: guild_names.guilds,
    names: guild_names.names
  }
}

export function receiveGuildChannels(guild, channels) {
  return {
    type: RECEIVE_GUILD_CHANNELS,
    guild,
    channels
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
        dispatch(receiveGuildChannels(guildID, response.data.channels));
      }
    });
  };
}


export function postGuildSettings(guildID, prefix, announcementChannel, boostChannel, auditChannel) {
  return function(dispatch) {
    axios.put(`${api_url}/guilds/${guildID}/settings`, {
      prefix,
      announcement_channel: announcementChannel,
      boost_channel: boostChannel,
      audit_channel: auditChannel
    });
    dispatch(receiveGuildSettings(guildID, {prefix, announcementChannel, boostChannel}));
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

export function createGuild(aliases, code, callback) {
  return function(dispatch) {
    axios.post(`${guildBuilderApiURL}/create_guild`, {emotes: aliases, code}).then(response => {
      callback();
    });
  }
}
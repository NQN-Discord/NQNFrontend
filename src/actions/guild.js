import axios from "axios";
import {api_url} from "../config";

export const RECEIVE_GUILD_SETTINGS = "RECEIVE_GUILD_SETTINGS";
export const RECEIVE_GUILD_LOGS = "RECEIVE_GUILD_LOGS";


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
import axios from "axios";
import {api_url} from "../config";

export const RECEIVE_GUILD_SETTINGS = "RECEIVE_GUILD_SETTINGS";


function receiveGuilds(guild, settings) {
  return {
    type: RECEIVE_GUILD_SETTINGS,
    guild,
    settings
  }
}

export default function postGuildSettings(guildID, prefix, announcementChannel, boostChannel) {
  return function(dispatch) {
    axios.put(`${api_url}/guilds/${guildID}/settings`, {
      prefix,
      announcement_channel: announcementChannel,
      boost_channel: boostChannel
    });
    dispatch(receiveGuilds(guildID, {prefix, announcementChannel, boostChannel}));
  };
}
import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";
export const RECEIVE_EMOTES = "RECEIVE_EMOTES";


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

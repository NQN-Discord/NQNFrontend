import axios from 'axios';
import {api_url} from '../config.js';

export const RECEIVE_GUILDS = "RECEIVE_GUILDS";


export function receiveGuilds(guild_names) {
    return {
        type: RECEIVE_GUILDS,
        guilds: guild_names.guilds,
        icons: guild_names.icons,
        names: guild_names.names
    }
}

export function fetchGuilds() {
    return function(dispatch) {
        axios.get(`${api_url}/user/guilds`).then(response => {
            dispatch(receiveGuilds(response.data));
        });
    };
}

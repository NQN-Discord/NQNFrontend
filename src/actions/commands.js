import axios from "axios";
import {api_url} from "../config";

export const RECEIVE_COMMANDS = "RECEIVE_COMMANDS";


export function receiveCommands(commands) {
  return {
    type: RECEIVE_COMMANDS,
    commands
  }
}

export function fetchCommands() {
  return function(dispatch) {
    axios.get(`${api_url}/commands`).then(response => {
      if (response) {
        dispatch(receiveCommands(response.data.commands));
      }
    });
  };
}
import axios from "axios";
const {api_url} = window.env;

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
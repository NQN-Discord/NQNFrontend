import axios from "axios";
import Alert from "react-s-alert";
const {api_url} = window.env

export default function postMessage(guild, channel, message, persona) {
  return function(dispatch) {
    axios.post(`${api_url}/message`, {guild, channel, message, persona}).catch(err => {
      if (err.response.status === 403) {
        Alert.error(err.response.data.message);
      }
    });
  };
}
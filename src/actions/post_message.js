import axios from "axios";
import {api_url} from "../config";

export default function postMessage(channel, message) {
  return function(dispatch) {
    axios.post(`${api_url}/message`, {channel, message});
  };
}
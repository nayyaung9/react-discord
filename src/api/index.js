import axios from "axios";

export const apiEndpoint = "https://api-discord-clone.herokuapp.com";

export default axios.create({
  baseURL: apiEndpoint,
});

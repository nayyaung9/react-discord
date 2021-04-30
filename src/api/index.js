import axios from "axios";

export const apiEndpoint = "https://api-discord-clone.herokuapp.com";
// export const apiEndpoint = 'http://localhost:8000';

export default axios.create({
  baseURL: apiEndpoint,
});

import axios from "axios";

const apiEndpoint = "http://localhost:8000";

export default axios.create({
  baseURL: apiEndpoint,
});

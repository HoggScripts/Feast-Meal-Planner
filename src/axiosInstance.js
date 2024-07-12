import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5271/api",
  withCredentials: true, // Important to include cookies in requests
});

export default api;

// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5271/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This allows cookies to be sent with each request
});

export default api;

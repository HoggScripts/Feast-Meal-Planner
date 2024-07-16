/**
 * api.js
 *
 * Purpose:
 * - Configures the axios instance used for making API requests.
 *
 * Example:
 * - Sets the base URL and common headers for API requests.
 * - Ensures cookies are included with each request for authentication purposes.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5271/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

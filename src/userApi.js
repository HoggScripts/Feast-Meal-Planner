/**
 * userApi.js
 *
 * Purpose:
 * - Provides functions to interact with user-related endpoints in the API, such as login, registration,
 *   fetching current user information, and accessing protected endpoints.
 *
 * Functions:
 * - loginUser({ username, password }): Logs in a user by making a POST request to "/users/login".
 * - registerUser({ username, email, password, firstName, lastName }): Registers a new user by making a POST request to "/users/register".
 * - fetchUserInfo(): Retrieves current user information by making a GET request to "/users/current-user".
 * - fetchProtectedData(): Fetches data from a protected endpoint by making a GET request to "/users/protected-endpoint".
 *   Includes credentials to send cookies with the request.
 *
 * Example:
 * - Used in various components and hooks to manage user authentication, registration, and profile data.
 */

import api from "./api";
import useTokenStore from "./useTokenStore";

export const loginUser = async ({ username, password, rememberMe }) => {
  const response = await api.post("/users/login", {
    username,
    password,
    rememberMe,
  });
  return response.data;
};

export const registerUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
}) => {
  const response = await api.post("/users/register", {
    username,
    email,
    password,
    firstName,
    lastName,
  });
  return response.data;
};

export const fetchUserInfo = async () => {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  console.log("fetchUserInfo token:", token); // CHANGED HERE
  const response = await api.get("/users/current-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchProtectedData = async () => {
  const response = await api.get("/users/protected-endpoint", {
    withCredentials: true,
  });
  return response.data.message;
};

export const logoutUser = async () => {
  try {
    const { token } = useTokenStore.getState(); // CHANGED HERE: Access the token from the store
    const requestConfig = {
      method: "POST",
      url: "/users/logout",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`, // CHANGED HERE: Include the token in the headers
      },
    };
    console.log("Sending logout request with config:", requestConfig);

    const response = await api(requestConfig);
    console.log("Logout request sent:", response.config); // Log the request config
    return response.data;
  } catch (error) {
    console.error(
      "Logout request failed:",
      error.response?.data || error.message
    ); // Log the error response or message
    throw error;
  }
};

export const requestResetPassword = async ({ email }) => {
  const response = await api.post("/users/reset-password", { email });
  return response.data;
};

export const confirmResetPassword = async ({ email, token, newPassword }) => {
  const response = await api.post("/users/confirm-reset-password", {
    email,
    token,
    newPassword,
  });
  return response.data;
};

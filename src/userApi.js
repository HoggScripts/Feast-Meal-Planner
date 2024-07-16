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

export const loginUser = async ({ identifier, password, rememberMe }) => {
  const response = await api.post("/users/login", {
    identifier,
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
  const response = await api.get("/users/current-user");
  return response.data;
};

export const fetchProtectedData = async () => {
  const response = await api.get("/users/protected-endpoint", {
    withCredentials: true,
  });
  return response.data.message;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/users/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
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

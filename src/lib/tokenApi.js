/**
 * tokenApi.js
 *
 * Purpose:
 * - Provides a function to refresh the user's authentication token by making a POST request to "/users/refresh-token".
 * - Includes credentials to send cookies with the request.
 *
 * Example:
 * - Used to obtain a new access token to maintain user session validity.
 */

import api from "../api";

export const refreshToken = async () => {
  const { data } = await api.post("/users/refresh-token", null, {
    withCredentials: true, // Include credentials to send cookies
  });
  return data.accessToken; // Return the accessToken string directly
};

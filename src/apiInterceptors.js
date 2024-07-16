/**
 * apiInterceptors.js
 *
 * Purpose:
 * - Configures and manages axios interceptors for API requests.
 * - Handles attaching tokens to requests and refreshing tokens on 401 responses.
 *
 * Example:
 * - setupInterceptors: Sets up request and response interceptors.
 * - ejectInterceptors: Removes the interceptors when they are no longer needed.
 */

import api from "./api";
import { toast } from "react-toastify";
import { refreshToken as refreshAuthToken } from "./tokenApi";

export const setupInterceptors = ({ token, setToken, isRefreshing }) => {
  const authInterceptor = api.interceptors.request.use((config) => {
    if (token && !config._retry) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("API request token:", token);
    }
    console.log("Auth Interceptor: Config Headers", config.headers);
    return config;
  });

  const refreshInterceptor = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefreshing
      ) {
        originalRequest._retry = true;
        console.log("Response error 401, attempting token refresh...");

        try {
          const newToken = await refreshAuthToken();
          console.log("Token refreshed successfully:", newToken);

          setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (error) {
          console.log("Token refresh failed during response handling.");
          setToken(null);
          toast.error("Session expired. Please log in again.");
        }
      }
      console.log("Response Interceptor: Error", error);
      return Promise.reject(error);
    }
  );

  return { authInterceptor, refreshInterceptor };
};

export const ejectInterceptors = (authInterceptor, refreshInterceptor) => {
  api.interceptors.request.eject(authInterceptor);
  api.interceptors.response.eject(refreshInterceptor);
};

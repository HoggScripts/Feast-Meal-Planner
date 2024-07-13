import api from "./api";
import { toast } from "react-toastify";

export const setupInterceptors = ({
  token,
  refreshToken,
  setToken,
  isRefreshing,
}) => {
  const authInterceptor = api.interceptors.request.use((config) => {
    if (token && !config._retry) {
      config.headers.Authorization = `Bearer ${token}`;
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

        if (await refreshToken()) {
          // Wait for refresh token response
          console.log("Retrying original request with new token...");
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // Trigger the original request again
        } else {
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

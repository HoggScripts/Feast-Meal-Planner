import { useState, useEffect, useLayoutEffect } from "react";
import api from "./api";
import { toast } from "react-toastify";
import useAuthStore from "./authStore";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

export const AuthProvider = ({ children }) => {
  const { token, setToken } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshToken = async () => {
    setIsRefreshing(true);
    try {
      console.log("Attempting to refresh token...");
      const response = await api.post("/users/refresh-token", null, {
        withCredentials: true, // Include credentials in the request
      });
      setToken(response.data.accessToken); // Step 6: Set the new access token
      console.log("Token refreshed successfully:", response.data.accessToken);
      setIsRefreshing(false);
      return true;
    } catch (error) {
      console.log("Failed to refresh token:", error);
      setToken(null); // Clear token on refresh failure
      setIsRefreshing(false);
      return false;
    }
  };

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token && !config._retry) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log("Auth Interceptor: Config Headers", config.headers);
      return config;
    });

    return () => {
      console.log("Ejecting auth interceptor");
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
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
            // Step 4 & 5: Wait for refresh token response
            console.log("Retrying original request with new token...");
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest); // Step 7: Trigger the original request again
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

    return () => {
      console.log("Ejecting refresh interceptor");
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token, isRefreshing]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AuthProvider;

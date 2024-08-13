import api from "./api";
import { refreshToken as refreshAuthToken } from "./lib/tokenApi";
import { useNavigate } from "react-router-dom";

export const setupInterceptors = ({
  token,
  setToken,
  isRefreshing,
  maxRetries = 3,
}) => {
  let retryCount = 0;

  const authInterceptor = api.interceptors.request.use((config) => {
    if (token && !config._retry) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Interceptor used. Sending JWT ${token} to the backend.`);
    } else {
      console.log(
        "Interceptor used but no token available or request is a retry."
      );
    }
    return config;
  });

  const refreshInterceptor = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 ||
        (error.response?.status === 400 &&
          !originalRequest._retry &&
          !isRefreshing)
      ) {
        if (retryCount >= maxRetries) {
          console.log("Max retry attempts reached. Logging out...");
          setToken(null);
          isRefreshing = false;

          const navigate = useNavigate(); // This is problematic since it should be used in a React component
          navigate("/"); // Navigate to the login page

          return Promise.reject(error);
        }

        originalRequest._retry = true;
        console.log("Response error 401, attempting token refresh...");

        try {
          isRefreshing = true;
          retryCount++;
          const newToken = await refreshAuthToken();
          console.log("Token refreshed successfully:", newToken);

          setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError) {
          console.log("Token refresh failed during response handling.");
          setToken(null);
          isRefreshing = false;
          retryCount = 0;

          const navigate = useNavigate(); // Problematic here as well
          navigate("/"); // Navigate to the login page

          return Promise.reject(refreshError);
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

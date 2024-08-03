import api from "./api";
import { toast } from "react-toastify";
import { refreshToken as refreshAuthToken } from "./lib/tokenApi";
import { useNavigate } from "react-router-dom";

export const setupInterceptors = ({ token, setToken, isRefreshing }) => {
  const authInterceptor = api.interceptors.request.use((config) => {
    if (token && !config._retry) {
      config.headers.Authorization = `Bearer ${token}`;
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
        originalRequest._retry = true;
        console.log("Response error 401, attempting token refresh...");

        try {
          isRefreshing = true;
          const newToken = await refreshAuthToken();
          console.log("Token refreshed successfully:", newToken);

          setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          return api(originalRequest);
        } catch (error) {
          console.log("Token refresh failed during response handling.");
          setToken(null);
          isRefreshing = false;

          const navigate = useNavigate();
          navigate("/login");
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

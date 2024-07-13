import { useState } from "react";
import useAuthStore from "./authStore";
import api from "./api";

const useAuth = () => {
  const { token, setToken } = useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshToken = async () => {
    setIsRefreshing(true);
    try {
      console.log("Attempting to refresh token...");
      const response = await api.post("/users/refresh-token", null, {
        withCredentials: true, // Include credentials in the request
      });
      setToken(response.data.accessToken); // Set the new access token
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

  return { token, setToken, isRefreshing, refreshToken };
};

export default useAuth;

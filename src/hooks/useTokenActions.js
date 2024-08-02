import { useState } from "react";
import useTokenStore from "./useTokenStore";
import { refreshToken as refreshAuthToken } from "../lib/tokenApi";

const useTokenActions = () => {
  const { token, setToken } = useTokenStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshToken = async () => {
    setIsRefreshing(true);
    try {
      console.log("Attempting to refresh token...");
      const newToken = await refreshAuthToken(); // Use the imported refreshToken function
      setToken(newToken); // Set the new access token
      console.log("Token refreshed successfully:", newToken);
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

export default useTokenActions;

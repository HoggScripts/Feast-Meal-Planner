/**
 * useTokenActions.js
 *
 * Purpose:
 * - Manages token-related actions for user authentication, including token state management and token refreshing.
 *
 * Functionality:
 * - Uses a custom hook `useTokenStore` to manage token state.
 * - Provides `refreshToken` function to asynchronously refresh the access token using `refreshAuthToken` from `tokenApi`.
 * - Handles token refreshing state with `isRefreshing` flag to indicate when token refresh is in progress.
 *
 * Example Usage:
 * - Used in conjunction with React components to handle token-related actions, such as automatic token refreshing.
 */

import { useState } from "react";
import useTokenStore from "./useTokenStore";
import { refreshToken as refreshAuthToken } from "./tokenApi"; // Import the refreshToken function

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

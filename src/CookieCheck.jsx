import { useEffect, useState } from "react";
import useTokenActions from "./hooks/useTokenActions";

const CookieCheck = () => {
  const { refreshToken } = useTokenActions();
  const [hasCheckedToken, setHasCheckedToken] = useState(false); // State to track if we've attempted to refresh the token

  useEffect(() => {
    if (!hasCheckedToken) {
      const attemptTokenRefresh = async () => {
        await refreshToken();
        setHasCheckedToken(true); // Mark that we've checked the token
      };

      attemptTokenRefresh();
    }
  }, [hasCheckedToken, refreshToken]);

  return null; // No need to render anything
};

export default CookieCheck;

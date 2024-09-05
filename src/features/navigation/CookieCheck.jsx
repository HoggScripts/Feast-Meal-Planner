import { useEffect, useState } from "react";
import useTokenActions from "../../hooks/useTokenActions";

const CookieCheck = () => {
  const { refreshToken } = useTokenActions();
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  useEffect(() => {
    if (!hasCheckedToken) {
      const attemptTokenRefresh = async () => {
        await refreshToken();
        setHasCheckedToken(true);
      };

      attemptTokenRefresh();
    }
  }, [hasCheckedToken, refreshToken]);

  return null;
};

export default CookieCheck;

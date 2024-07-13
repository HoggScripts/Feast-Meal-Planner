import { useLayoutEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { setupInterceptors, ejectInterceptors } from "./apiInterceptors";
import useTokenManager from "./useAuth";

export const AuthProvider = ({ children }) => {
  const { token, setToken, isRefreshing, refreshToken } = useTokenManager();

  useLayoutEffect(() => {
    const { authInterceptor, refreshInterceptor } = setupInterceptors({
      token,
      refreshToken,
      setToken,
      isRefreshing,
    });

    return () => {
      console.log("Ejecting interceptors");
      ejectInterceptors(authInterceptor, refreshInterceptor);
    };
  }, [token, isRefreshing]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AuthProvider;

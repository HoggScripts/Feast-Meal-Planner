import { useLayoutEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../lib/queryClient";
import { setupInterceptors, ejectInterceptors } from "../../apiInterceptors";
import useTokenActions from "./features/auth/hooks/useTokenActions";

export const AuthProvider = ({ children }) => {
  const { token, setToken, isRefreshing, refreshToken } = useTokenActions();

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

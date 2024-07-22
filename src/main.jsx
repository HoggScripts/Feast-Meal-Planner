import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globalStyles.css";
import App from "./App";
import queryClient from "./lib/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { setupInterceptors, ejectInterceptors } from "./apiInterceptors"; // Import interceptors
import useTokenStore from "./features/auth/hooks/useTokenStore"; // Import token store

const AppWithInterceptors = () => {
  const { token, setToken } = useTokenStore(); // Access token and setToken function
  const isRefreshing = false; // Add this if you have a mechanism to check if a refresh is in progress

  useEffect(() => {
    const { authInterceptor, refreshInterceptor } = setupInterceptors({
      token,
      setToken,
      isRefreshing,
    });

    return () => {
      ejectInterceptors(authInterceptor, refreshInterceptor);
    };
  }, [token, setToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppWithInterceptors />
);

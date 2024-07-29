import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import queryClient from "./lib/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { setupInterceptors, ejectInterceptors } from "./apiInterceptors"; // Import interceptors

import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import useTokenStore from "./hooks/useTokenStore";

const AppWithInterceptors = () => {
  const { token, setToken } = useTokenStore(); // Access token and setToken function
  const isRefreshing = false;

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
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
        </QueryClientProvider>
      </main>
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppWithInterceptors />
);

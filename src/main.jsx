import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import queryClient from "./lib/queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { setupInterceptors, ejectInterceptors } from "./apiInterceptors";

import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import useTokenStore from "./stores/useTokenStore";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const AppWithInterceptors = () => {
  const { token, setToken } = useTokenStore();
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
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
          <ToastContainer />
        </QueryClientProvider>
      </main>
    </NextUIProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppWithInterceptors />
);

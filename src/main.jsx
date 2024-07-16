import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globalStyles.css";

import App from "./App";
import queryClient from "./queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>
);

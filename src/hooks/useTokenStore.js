import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: sessionStorage.getItem("token") || localStorage.getItem("token"),
  setToken: (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }
    set({ token });
    console.log("Token set:", token);
  },
  clearToken: () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    set({ token: null });
    console.log("Token cleared");
  },
}));

export default useTokenStore;

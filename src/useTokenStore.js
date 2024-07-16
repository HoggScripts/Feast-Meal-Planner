/**
 * useTokenStore.js
 *
 * Purpose:
 * - Manages token state using Zustand, a minimalistic state management library.
 *
 * Functionality:
 * - Provides state management for `token`, allowing setting and clearing of the token.
 * - Utilizes Zustand's `create` function to create a custom hook for managing token state.
 *
 * Example Usage:
 * - Used across the application to store and access token information, ensuring state consistency.
 */

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

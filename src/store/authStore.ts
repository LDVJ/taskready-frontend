import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, token: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      // Sets both user data and the token after a successful login
      setAuth: (user, accessToken) => {
        localStorage.setItem("access_token", accessToken);
        set({ user, accessToken });
      },

      // Used by the Axios interceptor to update the token during an auto-refresh
      setToken: (accessToken) => {
        localStorage.setItem("access_token", accessToken);
        set({ accessToken });
      },

      // Clears everything on logout
      logout: () => {
        localStorage.removeItem("access_token");
        set({ user: null, accessToken: null });
        // Optional: window.location.href = "/login";
      },
    }),
    {
      name: "taskready-auth", // Unique name for the item in localStorage
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken 
      }),
    }
  )
);
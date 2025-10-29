import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  names: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isUser: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isUser: false,

      // ✅ Save user and token
      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: !!token && !!user,
          isUser: true
        });
      },

      // ✅ Clear everything on logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isUser: false
        });
      },
    }),
    {
      name: "auth-user-storage", // key in localStorage
      // ✅ This ensures it doesn’t crash during SSR
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isUser: true
      }),
    }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../../type";

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // ✅ Set token and user, and automatically set isAuthenticated
      setAuth: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: !!token && !!user,
        });
      },

      // ✅ Clear everything on logout
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);




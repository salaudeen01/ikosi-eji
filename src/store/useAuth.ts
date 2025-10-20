import { persist } from "zustand/middleware";
import { create } from "zustand";
import { AuthState } from "../../type";

// interface AuthState {
//   token: string | null;
//   setToken: (token: string) => void;
//   clearToken: () => void;
// }

// export const useAuth = create<AuthState>((set) => ({
//   token: null,
//   setToken: (token) => {
//     localStorage.setItem("token", token);
//     set({ token });
//   },
//   clearToken: () => {
//     localStorage.removeItem("token");
//     set({ token: null });
//   },
// }));

// export const useAuth = create<AuthState>((set) => ({
//   token: null,
//   user: null,
//   setAuth: (token, user) => {
//     set({ token, user });
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//   },
//   logout: () => {
//     set({ token: null, user: null });
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   },
// }));

// src/store/useAuthStore.ts
// import { create } from "zustand";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface AuthState {
//   token: string | null;
//   user: User | null;
//   setAuth: (token: string, user: User) => void;
//   logout: () => void;
// }

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => {
        set({ token, user });
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage", // key name in localStorage
    }
  )
);



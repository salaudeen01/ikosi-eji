import axios from "axios";
import { useAuth } from "@/store/useAuth"; // for admin
import { useAuthStore } from "@/store/clients/useAuthStore"; // for clients

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Client API (for logged-in website users)
export const clientApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

clientApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
      if (typeof window !== "undefined") window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ✅ Admin API
export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

authApi.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      const { logout } = useAuth.getState();
      logout();
      if (typeof window !== "undefined") window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

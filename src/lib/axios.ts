import axios from "axios";
import { useAuth } from "@/store/useAuth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to all private requests
authApi.interceptors.request.use((config) => {
  const token = useAuth.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle expired or invalid token globally
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      // Token expired or invalid
      const { logout } = useAuth.getState();
      logout();

      // Redirect to login page safely (client only)
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

// import { useAuth } from "@/store/useAuth";
// import axios from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// export const publicApi = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const authApi = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token for private requests
// authApi.interceptors.request.use((config) => {
//   const token = useAuth.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


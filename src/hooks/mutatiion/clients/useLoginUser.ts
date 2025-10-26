import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/clients/useAuthStore";
import { publicApi } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: number;
    names: string;
    email: string;
  };
  token: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useLoginUser() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: async (data) => {
      const res = await publicApi.post("/login", data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      // ✅ Store token & user in Zustand
      setAuth(data.user, data.token);

      // ✅ Show success toast
      toast({
        title: "Welcome back ✅",
        description: `${variables.email} logged in successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed ❌",
        description:
          error?.response?.data?.message || "Invalid email or password.",
        variant: "destructive",
      });
    },
  });
}

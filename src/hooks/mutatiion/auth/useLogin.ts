// src/hooks/auth/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { LoginPayload, LoginResponse } from "../../../../type";

interface ApiError {
  response?: { data?: { message?: string } };
}

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setAuth } = useAuth();

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: login,

    onSuccess: (data) => {
      // ✅ Store token + user in Zustand
      setAuth(data.token, data.user);

      toast({
        title: "Login successful 🎉",
        description: `Welcome back, ${data.user.name}!`,
      });
      
      // router.push("/admin/dashboard");
      router.push("/admin/article");
    },

    onError: (error) => {
      toast({
        title: "Login failed ❌",
        description: error?.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });
};

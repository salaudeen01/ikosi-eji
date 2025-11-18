// src/hooks/auth/useLogin.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { ForgetPass, login, ResetPass } from "@/api/auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { LoginPayload, LoginResponse, ResetPayload } from "../../../../type";

interface ApiError {
  response?: { data?: { message?: string } };
}

interface UseCreateAdminOptions {
  onSuccessCallback?: () => void;
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



export const useForget = ({ onSuccessCallback }: UseCreateAdminOptions = {}) => {
  const { toast } = useToast();

  return useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: ForgetPass,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Reset password successful 🎉",
        description: `A reset link has been sent to, ${data.user.email}!`,
      });

      if (onSuccessCallback) onSuccessCallback();
    },

    onError: (error) => {
      toast({
        title: "Reset Password failed ❌",
        description: error?.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });
};

export const useReset = ({ onSuccessCallback }: UseCreateAdminOptions = {}) => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation<LoginResponse, ApiError, ResetPayload>({
    mutationFn: ResetPass,

    onSuccess: () => {
      toast({
        title: "Password Reset successful 🎉",
        description: `Login with your email and new password!`,
      });

      if (onSuccessCallback) onSuccessCallback();
      
      router.push("/admin/login");
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


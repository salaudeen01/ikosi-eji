// src/api/auth.ts
import { publicApi } from "@/lib/axios";
import { LoginPayload, LoginResponse, ResetPayload } from "../../type";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await publicApi.post("/auth/login", payload);
  return data;
};

export const ForgetPass = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await publicApi.post("/auth/forget-password", payload);
  return data;
};

export const ResetPass = async (payload: ResetPayload): Promise<LoginResponse> => {
  const { data } = await publicApi.post("/auth/resetPassword", payload);
  return data;
};
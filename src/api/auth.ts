// src/api/auth.ts
import { publicApi } from "@/lib/axios";
import { LoginPayload, LoginResponse } from "../../type";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await publicApi.post("/auth/login", payload);
  return data;
};

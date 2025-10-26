import { publicApi } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface RegisterPayload {
  names: string;
  email: string;
  password: string;
}

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const res = await publicApi.post("/register", data);
      return res.data;
    },
  });
}

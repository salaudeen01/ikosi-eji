/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginUser } from "@/hooks/mutatiion/clients/useLoginUser";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AuthProps{
  // isLogin: boolean;
  // setIsLogin: (isLogin: boolean) => void;
  closeLogin: () => void;
}

export default function LoginPage({closeLogin}:AuthProps) {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate, isPending, isSuccess, isError, error } = useLoginUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  useEffect(() => {
    if (isSuccess) {
      closeLogin()
    }
  }, [closeLogin, isSuccess])
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
          placeholder="••••••••"
          minLength={6}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Loading..." : "Login" }
      </Button>
    </form>
  );
}

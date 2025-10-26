import { useRegisterUser } from "@/hooks/mutatiion/clients/useRegisterUser";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AuthProps{
  // isLogin: boolean;
  // setIsLogin: (isLogin: boolean) => void;
  closeLogin: () => void;
}

export default function RegisterPage({closeLogin}:AuthProps) {
  const [form, setForm] = useState({ names: "", email: "", password: "" });
  const { mutate, isPending, isSuccess } = useRegisterUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
    closeLogin()
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.names}
            onChange={(e) => setForm({ ...form, names: e.target.value })}
            className="w-full border p-2 rounded"
          />
  
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
  
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded"
          />
  
          <button
            type="submit"
            disabled={isPending}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            {isPending ? "Creating account..." : "Register"}
          </button>
  
          {isSuccess && <p className="text-green-600 mt-2">Account created successfully!</p>}
        </form> */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="full_Name"
          type="text"
          value={form.names}
          onChange={(e) => setForm({...form, names: e.target.value})}
          required
          placeholder="you@example.com"
        />
      </div>
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
        {isPending ? "Creating account..." : "Register"}
      </Button>
      {isSuccess && <p className="text-green-600 mt-2">Account created successfully!</p>}
    </form>
  );
}

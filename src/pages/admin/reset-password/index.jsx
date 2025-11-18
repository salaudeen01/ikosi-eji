import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForget, useReset } from "@/hooks/mutatiion/auth/useLogin";
import { validatePassword } from "@/lib/passwordvalidation";
import { useRouter } from "next/router";
import { EyeClosed, EyeIcon } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ confirm: "", password: "", token: "" });
  const [view, setView] = useState(false);
  const params = useRouter();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setForm({ ...form, token: params.query.token || "" });
  }, [params.query]);

  const { valid, errors } = validatePassword(form?.password);
  const match = form?.confirm.length > 0 && form?.password === form?.confirm;

  const resetMutation = useReset({
    onSuccessCallback: () =>{ 
      setLoading(false);
      setForm({...form, email: ''});
    },
  });

  const handleResetPassword = async (e) => {
      e.preventDefault();
    resetMutation.mutate(form);
    setLoading(true);
  }

  // Check if we're in reset password mode from URL
  // const urlParams = new URLSearchParams(window.location.search);
  // const isResetMode = urlParams.get("mode") === "reset";

    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2 relative">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={view ? "text":"password"}
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
                <button onClick={()=>setView(!view)} className="absolute top-1 right-0">
                    {view ?
                    <EyeIcon /> : <EyeClosed />
                    }
                </button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type={view ? "text":"password"}
                  value={form.confirm}
                  onChange={(e) => setForm({...form, confirm: e.target.value})}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
};

export default Login;

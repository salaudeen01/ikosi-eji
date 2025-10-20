import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "@/hooks/mutatiion/auth/useLogin";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState("");
  const loginMutation = useLogin();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(form);
    setLoading(true);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSession('')
    // try {
    //   const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //     redirectTo: `${window.location.origin}/auth?mode=reset`,
    //   });
    //   if (error) throw error;
    //   toast.success("Password reset link sent to your email!");
    //   setIsForgotPassword(false);
    // } catch (error: any) {
    //   toast.error(error.message || "An error occurred");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // try {
    //   const { error } = await supabase.auth.updateUser({
    //     password: password,
    //   });
    //   if (error) throw error;
    //   toast.success("Password updated successfully!");
    //   navigate("/");
    // } catch (error: any) {
    //   toast.error(error.message || "An error occurred");
    // } finally {
    //   setLoading(false);
    // }
  };

  if (session) {
    return null;
  }

  // Check if we're in reset password mode from URL
  // const urlParams = new URLSearchParams(window.location.search);
  // const isResetMode = urlParams.get("mode") === "reset";

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
  }

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Send Reset Link"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm text-primary hover:underline"
              >
                Back to login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access the admin panel"
              : "Create an account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
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
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

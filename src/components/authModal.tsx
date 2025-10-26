import React, { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { useLoginModalStore } from '@/store/useLoginModalStore';
import LoginPage from './userAuth/login';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import RegisterPage from './userAuth/register';

const AuthModal = () => {
  const { isOpen, closeLogin } = useLoginModalStore();
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Dialog open={isOpen} onOpenChange={closeLogin}>
      <DialogContent>
        <div className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your Login details"
                : "Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ?
              <LoginPage closeLogin={closeLogin} />:
              <RegisterPage closeLogin={closeLogin} />
            }
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
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
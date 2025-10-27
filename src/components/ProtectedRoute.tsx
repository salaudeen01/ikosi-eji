"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for rehydration before checking
    const timeout = setTimeout(() => {
      if (!token || !isAuthenticated || !user?.role) {
        router.replace("/admin/login");
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [token, isAuthenticated, router, user?.role]);

  if (!token) return null; // Prevent flashing before redirect
  return <>{children}</>;
}



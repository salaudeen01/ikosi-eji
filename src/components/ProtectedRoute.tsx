"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

// export default function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { token } = useAuth();
//   const router = useRouter();
//   console.log(token)

//   useEffect(() => {
//     if (!token) {
//       router.replace("/admin/login");
//     }
//   }, [token, router]);

//   if (!token) return null; // or a loader while redirecting

//   return <>{children}</>;
// }


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!token) router.push("/login");
    }, 100); // small delay to allow rehydration
    return () => clearTimeout(timeout);
  }, [token, router]);

  if (!token) return null; // Don’t flash UI before token check finishes
  return <>{children}</>;
}


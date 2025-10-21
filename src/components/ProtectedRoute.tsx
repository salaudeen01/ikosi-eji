// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/store/useAuth";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { token } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (!token) router.push("/login");
//     }, 100); // small delay to allow rehydration
//     return () => clearTimeout(timeout);
//   }, [token, router]);

//   if (!token) return null; // Don’t flash UI before token check finishes
//   return <>{children}</>;
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for rehydration before checking
    const timeout = setTimeout(() => {
      if (!token || !isAuthenticated) {
        router.replace("/login");
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [token, isAuthenticated, router]);

  if (!token) return null; // Prevent flashing before redirect
  return <>{children}</>;
}


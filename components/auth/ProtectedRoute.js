"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/AuthProvider";

const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const dashboardHomeRoute = "/wedding";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!user && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    if (user && isPublicRoute) {
      router.replace(dashboardHomeRoute);
    }
  }, [loading, pathname, router, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f7]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#eee8e8] bg-white px-5 py-3 shadow-sm">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#7a0719]/30 border-t-[#7a0719]" />
          <span className="text-sm font-medium text-[#171717]">Loading your session...</span>
        </div>
      </div>
    );
  }

  if (!user && !publicRoutes.includes(pathname)) {
    return null;
  }

  return children;
}

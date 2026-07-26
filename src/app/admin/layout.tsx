"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    fetch("/api/auth", { method: "DELETE" }).then(() => {
      // Check if token exists by trying to access a protected route
      fetch("/api/books").then(() => {
        setAuthorized(true);
      }).catch(() => {
        router.push("/admin/login");
      });
    });

    // Simple check - if we're on admin pages (not login), verify auth
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/content");
        if (res.ok) {
          setAuthorized(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    };

    if (pathname !== "/admin/login") {
      checkAuth();
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center font-arabic">
        <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-arabic">
      <AdminHeader />
      <main className="flex-1 lg:mr-72 p-6 md:p-8 lg:p-10 pt-20 lg:pt-10">
        {children}
      </main>
    </div>
  );
}

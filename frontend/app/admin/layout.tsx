"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Cek Login (Satpam)
  useEffect(() => {
    const token = Cookies.get("access_token");
    const userStr = Cookies.get("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const isAuthPage = pathname === "/admin/login";

    if (isAuthPage) {
      if (token && user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        setAuthorized(false);
        setLoading(false);
      }
    } else {
      if (!token || user?.role !== "admin") {
        router.push("/admin/login");
      } else {
        setAuthorized(true);
        setLoading(false);
      }
    }
  }, [pathname, router]);

  const isAuthPage = pathname === "/admin/login";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-400 font-bold text-xs tracking-widest animate-pulse">MEMVERIFIKASI AKSES...</p>
        </div>
      </div>
    );
  }

  // 2. Logika Tampilan: Hilangkan Sidebar di Login
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {children}
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  // 3. Tampilan normal untuk Dashboard, Reports, Claims
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
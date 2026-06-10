"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // 1. Cek Login (Satpam)
  useEffect(() => {
    const token = Cookies.get("access_token");
    const userStr = Cookies.get("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const isAuthPage = pathname === "/admin/login";

    // Jika tidak ada token atau bukan admin, tendang ke login
    if ((!token || user?.role !== "admin") && !isAuthPage) {
      router.push("/admin/login");
    }

    // Jika sudah login dan berniat akses halaman login, lempar ke dashboard
    if (token && user?.role === "admin" && isAuthPage) {
      router.push("/admin/dashboard");
    }
  }, [pathname, router]);

  // 2. Logika Tampilan: Hilangkan Sidebar di Login
  const isAuthPage = pathname === "/admin/login";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {children}
      </div>
    );
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
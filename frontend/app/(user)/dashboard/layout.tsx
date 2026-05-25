"use client";

import { SIDEBAR_MENU } from "../../../constants/sidebar";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const { isLogin, user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isLogin) {
      router.push("/login");
    }
  }, [isLogin, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium animate-pulse">Memverifikasi Sesi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r p-8 sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-blue-600 tracking-tighter">
            DRAGON<span className="text-gray-900">PARK</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Lost & Found System
          </p>
        </div>

        <div className="mb-10 p-5 rounded-2xl bg-gray-50 border border-gray-100">
          <h2 className="font-bold text-gray-900 truncate">
            {user?.fullName || "User Dragonpark"}
          </h2>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {user?.email}
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          {SIDEBAR_MENU.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === menu.href
                  ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-bold hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            Keluar Aplikasi
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-6 bg-white border-b flex items-center justify-between">
          <h1 className="text-xl font-black text-blue-600 tracking-tighter">
            DRAGON<span className="text-gray-900">PARK</span>
          </h1>
          <button onClick={logout} className="text-red-500 p-2">
            <LogOut size={20} />
          </button>
        </div>
        
        <div className="p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
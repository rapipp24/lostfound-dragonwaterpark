"use client";

import { SIDEBAR_MENU } from "../../../constants/sidebar";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const router = useRouter();

  const {
    isLogin,
    user,
    logout,
  } = useAuth();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, [isLogin]);

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="hidden md:block w-72 bg-white border-r p-6">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Lost & Found
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Dragon Waterpark
          </p>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-gray-100">

          <h2 className="font-semibold">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {user?.email}
          </p>
        </div>

        <nav className="space-y-3">

          {SIDEBAR_MENU.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition ${
                pathname === menu.href
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {menu.icon} {menu.label}
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full text-left flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-8">

        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold">
            Lost & Found
          </h1>

          <p className="text-gray-500 text-sm">
            Dragon Waterpark
          </p>
        </div>

        {children}
      </main>
    </div>
  );
}
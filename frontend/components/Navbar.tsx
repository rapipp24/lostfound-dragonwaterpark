"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isLogin, loading, user } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center gap-1">
              <span className="text-2xl font-black text-blue-600 tracking-tighter transition-transform group-hover:-rotate-2">
                DRAGON
              </span>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                PARK
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {/* Menu Publik: Selalu Muncul */}
              <Link href="/" className="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors">Home</Link>
              <Link href="/reports" className="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors">Found Items</Link>
              
              {/* Menu Admin: Sembunyikan hanya jika di halaman Auth */}
              {!isAuthPage && isLogin && user?.role === "admin" && (
                <Link 
                  href="/admin/reports" 
                  className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-xs font-black tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                >
                  ADMIN PANEL
                </Link>
              )}
            </div>

            {!loading && (
              <Link 
                href={isLogin ? "/dashboard" : "/login"} 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-black tracking-wide hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
              >
                {isLogin ? "DASHBOARD" : "LOGIN"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import React from "react";
import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

  const {
    isLogin,
    loading,
  } = useAuth();

  const pathname =
    usePathname();

  const router =
    useRouter();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register";

  function handleLogout() {

    localStorage.removeItem(
      "isLogin"
    );

    localStorage.removeItem(
      "user"
    );

    toast.success(
      "Logout berhasil!"
    );

    router.push("/login");
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-20 items-center">

          <div className="flex items-center">

            <Link
              href="/reports"
              className="group flex items-center gap-1"
            >

              <span className="text-2xl font-black text-blue-600 tracking-tighter transition-transform group-hover:-rotate-2">
                DRAGON
              </span>

              <span className="text-2xl font-black text-gray-900">
                PARK
              </span>

            </Link>

          </div>

          <div className="flex items-center space-x-6">

            <div className="hidden md:flex items-center space-x-6">

              <Link
                href="/reports"
                className="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors"
              >
                Found Items
              </Link>

              {isLogin && (

                <Link
                  href="/reports/create"
                  className="text-gray-500 hover:text-blue-600 text-sm font-bold transition-colors"
                >
                  Report Lost Item
                </Link>

              )}

            </div>

            {!loading && (

              isLogin ? (

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-black tracking-wide hover:bg-red-600 transition-all active:scale-95"
                >
                  LOGOUT
                </button>

              ) : (

                !isAuthPage && (

                  <Link
                    href="/login"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-black tracking-wide hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
                  >
                    LOGIN
                  </Link>

                )

              )

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}
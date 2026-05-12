"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal login");
      }

      // Validasi apakah dia admin
      if (data.user.role !== "admin") {
        throw new Error("Anda tidak memiliki akses ke panel admin!");
      }

      // Simpan Token & Data User
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan koneksi!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Admin Login</h2>
        <p className="text-center text-gray-500">Dragon Waterpark CMS</p>

        {/* Notifikasi Error */}
        {error && (
          <div className="p-3 text-sm text-white bg-red-500 rounded-md text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Masukan Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Masukan Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 font-bold"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/admin/register" className="text-blue-600 hover:underline font-semibold">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
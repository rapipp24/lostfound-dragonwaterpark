"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Gagal login");

      // Validasi role admin
      if (data.user.role.toLowerCase() !== "admin") {
        throw new Error("Akses ditolak! Anda bukan Administrator.");
      }

      // Simpan Data
      Cookies.set("access_token", data.access_token);
      Cookies.set("user", JSON.stringify(data.user));

      toast.success("Selamat datang, Admin!");
      router.push("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md p-10 space-y-8 bg-blue-50 border border-blue-100 rounded-[2rem] shadow-xl shadow-blue-950/10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-blue-600 text-white text-3xl font-bold">
            LF
          </div>
          <h2 className="text-3xl font-black text-blue-900">Admin Panel</h2>
          <p className="text-blue-700 mt-2">Dragon Waterpark Management System</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <Input
            label="Administrator Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@dragon.com"
            required
          />

          <Input
            label="Secret Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Authorize Login"}
          </Button>
        </form>

        <div className="pt-6 border-t border-blue-100 text-center">
          <p className="text-xs text-blue-400 uppercase tracking-widest">
            Restricted Area • Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
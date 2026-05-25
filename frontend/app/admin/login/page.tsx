"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
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
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
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
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-[2rem] shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-slate-900 text-white text-3xl font-bold">
            LF
          </div>
          <h2 className="text-3xl font-black text-slate-900">Admin Panel</h2>
          <p className="text-slate-500 mt-2">Dragon Waterpark Management System</p>
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
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Authorize Login"}
          </Button>
        </form>

        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Restricted Area • Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
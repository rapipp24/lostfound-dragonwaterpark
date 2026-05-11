"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAdmin } from "../services/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulasi atau Panggil API
      console.log("Mendaftarkan:", { name, email, password });
      
      // Jika ingin simulasi sukses:
      alert("Akun berhasil dibuat! Silakan login.");
      router.push("/admin/login");
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal mendaftar. Coba lagi.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Admin Register</h2>
        <p className="text-center text-gray-500">Buat akun pengelola baru</p>

        {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">{error}</p>}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 text-black"
              placeholder="Contoh: Budi Santoso"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 text-black"
              placeholder="admin@dragon.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 text-black"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Sudah punya akun? <a href="/admin/login" className="text-blue-600 hover:underline font-semibold">Login di sini</a>
        </p>
      </div>
    </div>
  );
}
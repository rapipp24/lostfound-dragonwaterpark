"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { registerUser } from "../../../services/auth.service";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(fullName, email, password);
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Registrasi gagal!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-8 border rounded-3xl shadow-xl bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Daftar Akun</h1>
          <p className="text-gray-500 mt-2 text-sm">Buat akun untuk melacak laporan barang hilang Anda.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            label="Nama Lengkap"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Kata Sandi"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button className="w-full py-3" disabled={loading}>
              {loading ? "Mendaftar..." : "Daftar Sekarang"}
            </Button>
          </div>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

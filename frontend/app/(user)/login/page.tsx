"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginUser } from "@/services/auth.service";
import { setCookie } from "../../../utils/cookies";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { isLogin, loading } = useAuth();

  useEffect(() => {
    if (!loading && isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin, loading]);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      setCookie("access_token", data.access_token);
      setCookie("user", JSON.stringify(data.user));
      
      toast.success("Login Berhasil!");
      
      router.push("/dashboard");

    } catch (error: any) {
      toast.error(error.message || "Login gagal! Periksa koneksi Anda.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-6 border rounded-2xl shadow-sm bg-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />

          <Button className="w-full py-3">
            Login
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Daftar gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
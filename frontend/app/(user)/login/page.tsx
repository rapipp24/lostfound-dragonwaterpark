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

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const router =
    useRouter();

  const {
    isLogin,
    loading,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      isLogin
    ) {

      router.push(
        "/reports"
      );
    }

  }, [
    isLogin,
    loading,
    router,
  ]);

  async function handleLogin(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      const data =
        await loginUser(
          email,
          password
        );

      setCookie(
        "access_token",
        data.access_token
      );

      setCookie(
        "user",
        JSON.stringify(
          data.user
        )
      );

      toast.success(
        "Login Berhasil!"
      );

      router.push(
        "/reports"
      );

    } catch (error: any) {

      toast.error(
        error.message ||
        "Login gagal! Periksa koneksi Anda."
      );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">

      <div className="w-full max-w-md p-8 border rounded-3xl shadow-sm bg-white dark:bg-zinc-900/70 backdrop-blur-xl">

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
            LF
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login untuk mencari barang Anda
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            required
          />

          <Button className="w-full py-3">
            Login
          </Button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-500">

          Belum punya akun?{" "}

          <Link
            href="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Daftar gratis
          </Link>

        </p>

      </div>

    </div>
  );
}
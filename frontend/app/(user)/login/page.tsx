"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginUser } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [isLogin]);

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      toast.success("Login berhasil!");

      localStorage.setItem(
        "isLogin",
        "true"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Guest User",
          email,
        })
      );

      router.push("/dashboard");

    } catch (error) {
      toast.error("Login gagal!");
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
          />

          <Input
            type="password"
            placeholder="Password"
          />

          <Button>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
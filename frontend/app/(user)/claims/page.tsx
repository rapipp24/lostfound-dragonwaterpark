"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { createClaim } from "@/services/claim.service";
import { useAuth } from "@/hooks/useAuth";

export default function ClaimsPage() {

  const [claimerName, setClaimerName] =
    useState("");

  const [claimerPhone, setClaimerPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const router =
    useRouter();

  const {
    isLogin,
    loading: authLoading,
  } = useAuth();

  useEffect(() => {

    if (
      !authLoading &&
      !isLogin
    ) {

      router.push("/login");
    }

  }, [
    isLogin,
    authLoading,
    router,
  ]);

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      await createClaim({
        claimerName,
        claimerPhone,
        reportId: 1,
      });

      toast.success(
        "Claim berhasil dikirim"
      );

      setClaimerName("");
      setClaimerPhone("");

    } catch (error: any) {

      toast.error(
        error.message ||
        "Gagal mengirim claim"
      );

    } finally {

      setLoading(false);
    }
  }

  if (authLoading) {

    return (
      <div className="max-w-3xl mx-auto py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Claim Barang
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 border p-6 rounded-2xl shadow-sm"
      >

        <Input
          placeholder="Nama Lengkap"
          value={claimerName}
          onChange={(e) =>
            setClaimerName(
              e.target.value
            )
          }
          required
        />

        <Input
          placeholder="Nomor WhatsApp"
          value={claimerPhone}
          onChange={(e) =>
            setClaimerPhone(
              e.target.value
            )
          }
          required
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Mengirim..."
            : "Submit Claim"}
        </Button>

      </form>

    </div>
  );
}
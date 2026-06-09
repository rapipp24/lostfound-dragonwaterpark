"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getClaims } from "@/services/claim.service";
import { useAuth } from "@/hooks/useAuth";

export default function ClaimHistoryPage() {

  const [claims, setClaims] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const router =
    useRouter();

  const {
    isLogin,
    loading: authLoading,
  } = useAuth();

  const getStatusStyle = (
    status: string
  ) => {

    switch (
      status?.toLowerCase()
    ) {

      case "approved":
        return "bg-green-100 text-green-600";

      case "rejected":
        return "bg-red-100 text-red-600";

      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

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

  useEffect(() => {

    if (
      authLoading ||
      !isLogin
    ) {
      return;
    }

    async function fetchClaims() {

      try {

        const data =
          await getClaims();

        setClaims(
          Array.isArray(data)
            ? data
            : data.data || []
        );

      } catch (error) {

        console.error(
          "ERROR CLAIMS:",
          error
        );

      } finally {

        setLoading(false);
      }
    }

    fetchClaims();

  }, [
    authLoading,
    isLogin,
  ]);

  if (
    authLoading ||
    loading
  ) {

    return (
      <div className="max-w-4xl mx-auto py-20 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Riwayat Claim
      </h1>

      {claims.length === 0 ? (

        <div className="border rounded-xl p-10 text-center">

          <div className="text-5xl mb-4">
            📦
          </div>

          <h2 className="font-bold text-xl mb-2">
            Belum Ada Claim
          </h2>

          <p className="text-gray-500">
            Claim yang kamu kirim akan muncul di sini
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {claims.map((claim) => (

            <div
              key={claim.id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >

              <h2 className="font-bold text-lg">
                {claim.claimerName}
              </h2>

              <p className="text-gray-600">
                {claim.claimerPhone}
              </p>

              <div className="mt-3">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                    claim.status
                  )}`}
                >
                  {claim.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
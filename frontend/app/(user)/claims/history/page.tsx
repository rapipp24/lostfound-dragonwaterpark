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

        console.log(
          "CLAIMS:",
          data
        );

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
      <div className="max-w-4xl mx-auto py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        Riwayat Claim
      </h1>

      {claims.length === 0 ? (

        <div className="border rounded-xl p-6 text-center text-gray-500">
          Belum ada data claim
        </div>

      ) : (

        <div className="space-y-4">

          {claims.map((claim) => (

            <div
              key={claim.id}
              className="border rounded-xl p-4 shadow-sm"
            >

              <h2 className="font-bold text-lg">
                {claim.claimerName}
              </h2>

              <p>
                {claim.claimerPhone}
              </p>

              <p className="mt-2">
                Status:
                <span className="font-semibold ml-2">
                  {claim.status}
                </span>
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
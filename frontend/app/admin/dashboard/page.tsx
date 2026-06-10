"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DashboardCard from "../components/DashboardCard";

type DashboardSummary = {
  totalReports: number;
  totalClaims: number;
  pendingClaims: number;
  claimedReports: number;
  approvedClaims: number;
  rejectedClaims: number;
  foundReports: number;
  pendingReports: number;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = Cookies.get("access_token");

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

        const response = await fetch(`${API_URL}/dashboard/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Gagal mengambil data dashboard");

        const data = await response.json();
        setSummary(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-bold">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Total Reports" value={summary?.totalReports ?? 0} />
        <DashboardCard title="Total Claims" value={summary?.totalClaims ?? 0} />
        <DashboardCard title="Pending Claims" value={summary?.pendingClaims ?? 0} />
        <DashboardCard title="Approved Claims" value={summary?.approvedClaims ?? 0} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Found Reports" value={summary?.foundReports ?? 0} />
        <DashboardCard title="Pending Reports" value={summary?.pendingReports ?? 0} />
        <DashboardCard title="Claimed Reports" value={summary?.claimedReports ?? 0} />
        <DashboardCard title="Rejected Claims" value={summary?.rejectedClaims ?? 0} />
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { Report } from "../types/report";
import ReportsTable from "../components/ReportsTable";
import { useEffect, useState, useCallback } from "react";
import { getReports } from "../../../services/report.service";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchReportsData = useCallback(async () => {
    setLoading(true);
    try {
      // Kirim search dan status ke API
      const responseData = await getReports(status || undefined, search || undefined);
      const reportsArray = responseData.data || [];

      const mappedData = reportsArray.map((r: any) => ({
        id: r.id,
        item: r.item,
        location: r.location,
        status: r.status,
        description: r.description || "",
        image: r.image || "",
        createdAt: r.createdAt || "",
        user: r.user || null,
      }));

      setReports(mappedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  // Fetch ulang setiap kali search atau status berubah (debounce sederhana via useEffect)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReportsData();
    }, 400); // delay 400ms agar tidak spam request saat user mengetik

    return () => clearTimeout(timer);
  }, [fetchReportsData]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Management</h1>

        <Link href="/admin/reports/add">
          <Button>Add Report</Button>
        </Link>
      </div>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cari nama barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-11 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">Semua Status</option>
            <option value="Pending">Pending</option>
            <option value="Found">Found</option>
            <option value="Claimed">Claimed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400">Memuat data...</div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          {/* onRefresh → re-fetch data setelah update status dari tabel */}
          <ReportsTable reports={reports} onRefresh={fetchReportsData} />
        </div>
      )}
    </div>
  );
}
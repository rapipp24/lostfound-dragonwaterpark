"use client";

import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { Report } from "../types/report";
import ReportsTable from "../components/ReportsTable";
import { useEffect, useState } from "react";
import { getReports } from "../../../services/report.service";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      // Kirim search ke API — BE mendukung ?search=... untuk filter nama barang
      const responseData = await getReports(undefined, search || undefined);
      const reportsArray = responseData.data || [];

      const mappedData = reportsArray.map((r: any) => ({
        id: r.id,
        item: r.item,
        location: r.location,
        status: r.status,
      }));

      setReports(mappedData);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ulang setiap kali search berubah (debounce sederhana via useEffect)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReportsData();
    }, 400); // delay 400ms agar tidak spam request saat user mengetik

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Management</h1>

        <Link href="/admin/reports/add">
          <Button>Add Report</Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Cari nama barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
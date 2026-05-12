"use client";

import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { Report } from "../types/report";
import ReportsTable from "../components/ReportsTable";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/reports");
        const data = await response.json();
        
        const mappedData = data.map((r: any) => ({
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

    fetchReports();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        
        {/* Tombol Add Report kita bungkus dengan Link agar berfungsi */}
        <Link href="/admin/reports/add">
          <Button>Add Report</Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input placeholder="Search reports..." />
      </div>

      <div className="bg-white rounded-lg shadow">
        <ReportsTable reports={reports} />
      </div>
    </div>
  );
}
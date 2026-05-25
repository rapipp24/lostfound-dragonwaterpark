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

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const responseData = await getReports();
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

    fetchReportsData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports Management</h1>
        
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

      {loading && <div className="p-10 text-center text-gray-400">Memuat data...</div>}
    </div>
  );
}
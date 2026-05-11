"use client";

import Link from "next/link";
import Input from "../components/Input";
import Button from "../components/Button";
import { Report } from "../types/report";
import ReportsTable from "../components/ReportsTable";

export default function ReportsPage() {
  const reports: Report[] = [
    {
      id: 1,
      item: "Dompet",
      location: "Kolam Anak",
      status: "Pending",
    },
    {
      id: 2,
      item: "HP",
      location: "Water Slide",
      status: "Approved",
    },
  ];

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
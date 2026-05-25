import React from "react";
import Link from "next/link";
import StatusBadge from "../shared/StatusBadge";

export default function ReportCard({ report }: { report: any }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800">{report.item}</h3>
        <StatusBadge status={report.status} />
      </div>
      <p className="text-sm text-gray-500 mb-4">{report.location}</p>
      <Link 
        href={`/reports/${report.id}`}
        className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-2 border-t pt-2"
      >
        View Detail
      </Link>
    </div>
  );
}

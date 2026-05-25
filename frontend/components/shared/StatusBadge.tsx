import React from "react";

export default function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Found: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Claimed: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm ${styles[status] || "bg-gray-50 text-gray-500"}`}>
      <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
        status === 'Found' ? 'bg-emerald-500' : 
        status === 'Pending' ? 'bg-amber-500' : 'bg-blue-500'
      }`}></span>
      {status}
    </span>
  );
}

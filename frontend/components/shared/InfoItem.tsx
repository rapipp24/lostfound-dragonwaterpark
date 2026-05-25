import React from "react";

interface InfoItemProps {
  label: string;
  value: string;
  className?: string;
}

export default function InfoItem({ label, value, className = "" }: InfoItemProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
        {label}
      </p>
      <p className="text-gray-900 font-bold text-lg leading-tight">
        {value || "-"}
      </p>
    </div>
  );
}

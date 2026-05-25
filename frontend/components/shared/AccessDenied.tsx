"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function AccessDenied() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl shadow-blue-900/10 p-12 text-center border border-red-50 relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

        {/* Icon */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-[2rem] text-red-500 mb-8 animate-bounce">
          <ShieldAlert size={48} />
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
          Akses <span className="text-red-600">Ditolak!</span>
        </h1>
        <p className="text-gray-500 font-medium leading-relaxed mb-10">
          Maaf, halaman ini hanya bisa diakses oleh tim Administrator Dragon Waterpark. Kamu tidak memiliki izin yang cukup.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => router.push("/dashboard")}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            <Home size={18} />
            BALIK KE DASHBOARD
          </button>
          
          <button 
            onClick={() => router.back()}
            className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            KEMBALI KE SEBELUMNYA
          </button>
        </div>

        <p className="mt-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          Dragon Park Security System v2.0
        </p>
      </div>
    </div>
  );
}

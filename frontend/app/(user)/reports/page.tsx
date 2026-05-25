"use client";

import { useState } from "react";
import Link from "next/link";
import { useReports } from "../../../hooks/useReports";
import LoadingCard from "../../../components/shared/LoadingCard";
import EmptyState from "../../../components/shared/EmptyState";
import Container from "../../../components/shared/Container";
import { Search, MapPin, Image as ImageIcon } from "lucide-react";

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const { reports, loading, error } = useReports("Found", false, search);

  return (
    <Container className="bg-gray-50/50 min-h-screen">
      <div className="py-12 md:py-20 max-w-6xl mx-auto">
        
        {/* Header Section - Clean & Centered on Mobile */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Found <span className="text-blue-600">Items.</span>
          </h1>
          <p className="text-gray-500 font-medium">Katalog barang temuan resmi Dragon Waterpark.</p>
        </div>

        {/* Search Bar - More Elegant */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Cari barang yang hilang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-100 py-4.5 pl-14 pr-6 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-gray-900 font-medium placeholder:text-gray-300"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => <LoadingCard key={i} />)}
          </div>
        ) : error ? (
          <EmptyState message={`Terjadi kesalahan: ${error}`} />
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-20 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tidak Ada Hasil</h2>
            <p className="text-gray-500">Coba gunakan kata kunci lain.</p>
          </div>
        ) : (
          /* Grid with max-width per card to prevent giant cards */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
            {reports.map((report) => (
              <Link key={report.id} href={`/reports/${report.id}`} className="group max-w-[300px] w-full mx-auto">
                <div className="bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1 border border-gray-100 flex flex-col h-full relative">
                  
                  {/* Image Holder - Better Ratio */}
                  <div className="aspect-square bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gray-50">
                    <ImageIcon size={40} className="text-gray-200 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Status Pill */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-emerald-600 border border-white">
                        {report.status}
                      </span>
                    </div>
                  </div>

                  {/* Content - Compact & Clean */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                      {report.item}
                    </h3>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-5">
                      Ref ID: #LF-{report.id.toString().padStart(3, '0')}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100/50">
                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Lokasi</p>
                        <p className="text-[10px] font-bold text-gray-600 truncate">{report.location}</p>
                      </div>
                      <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100/50 text-center">
                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Tanggal</p>
                        <p className="text-[10px] font-bold text-gray-600">12 Mei</p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-blue-600 font-black text-[10px] uppercase tracking-widest">
                      <span>Lihat Detail</span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Search size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
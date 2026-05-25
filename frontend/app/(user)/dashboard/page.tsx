"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Card from "@/components/shared/Card";
import { useReports } from "@/hooks/useReports";
import { Plus, Search, ChevronRight, PackageCheck, MessageCircle } from "lucide-react";

export default function DashboardPage() {
  const { user, isLogin, loading: authLoading } = useAuth();
  const router = useRouter();

  const { reports, loading: reportsLoading } = useReports(
    undefined, 
    true, 
    undefined, 
    !authLoading && isLogin
  );

  useEffect(() => {
    if (!authLoading && !isLogin) {
      router.push("/login");
    }
  }, [isLogin, authLoading, router]);

  if (authLoading) {
    return (
      <Container className="py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      </Container>
    );
  }

  if (!isLogin) return null;

  const firstName = user?.fullName?.split(" ")[0] || "User";

  return (
    <Container>
      <div className="py-12 max-w-4xl mx-auto">
        {/* Modern Welcome Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Selamat datang, <span className="text-blue-600">{firstName}</span>
          </h1>
          <div className="h-1.5 w-12 bg-blue-600 rounded-full mt-4"></div>
        </div>

        {/* Clean Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Link href="/reports/create" className="group">
            <div className="bg-blue-600 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-100 transition-all hover:shadow-blue-200 hover:-translate-y-1 active:scale-[0.98] text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">Lapor Kehilangan</h2>
            </div>
          </Link>

          <Link href="/reports" className="group">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 active:scale-[0.98] text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Search size={36} className="text-blue-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Cari Barang</h2>
            </div>
          </Link>
        </div>

        {/* Tracking Section (Clean List) */}
        {reports.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Laporan Aktif</h3>
              <Link href="/reports" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Semua Laporan</Link>
            </div>
            
            <div className="grid gap-3">
              {reports.slice(0, 3).map((report) => (
                <Link key={report.id} href={`/reports/${report.id}`}>
                  <div className="p-6 flex items-center justify-between bg-white border border-gray-50 rounded-[2rem] hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center transition-colors">
                        <PackageCheck size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{report.item}</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase mt-0.5 tracking-tight">📍 {report.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl">{report.status}</span>
                      <ChevronRight size={20} className="text-gray-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Help Link */}
        <div className="mt-16 flex justify-center">
          <a 
            href="https://wa.me/628123456789" 
            className="flex items-center gap-3 text-gray-400 hover:text-blue-600 transition-all font-bold text-sm bg-gray-50/50 px-6 py-3 rounded-2xl border border-transparent hover:border-blue-100"
          >
            <MessageCircle size={20} />
            Bantuan Petugas
          </a>
        </div>
      </div>
    </Container>
  );
}
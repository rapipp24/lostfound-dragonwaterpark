"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InfoItem from "@/components/shared/InfoItem";
import Container from "@/components/shared/Container";
import Card from "@/components/shared/Card";
import StatusBadge from "@/components/shared/StatusBadge";
import ReportDetailSkeleton from "@/components/reports/ReportDetailSkeleton";
import ImageFallback from "@/components/shared/ImageFallback";
import { getReportById } from "@/services/report.service";
import { ArrowLeft, Share2, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const data = await getReportById(params.id as string);
        setReport(data);
      } catch (error) {
        console.error("Failed to fetch report:", error);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchReport();
  }, [params.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Lost & Found: ${report?.item}`,
        text: `Ditemukan ${report?.item} di ${report?.location}. Apakah ini milik Anda?`,
        url: window.location.href,
      });
    } else {
      alert("Link disalin ke clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <ReportDetailSkeleton />
      </Container>
    );
  }

  if (!report) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-xl font-bold text-gray-800">Barang tidak ditemukan</h1>
        <Link href="/reports" className="text-blue-600 mt-4 inline-block hover:underline"> Kembali ke daftar </Link>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10 max-w-5xl mx-auto">
        {/* Simple Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-8 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          Kembali ke Daftar
        </button>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image Section - Compact Size (4/12 columns) */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative group">
              <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm cursor-pointer">
                  src={report.image}
                  alt={report.item}
                  className="w-full h-full object-cover"
              </div>
              <div className="absolute top-4 left-4 bg-white dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/50">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">REF #LF-{report.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>

          {/* Detail Section - (8/12 columns) */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="mb-6">
              <StatusBadge status={report.status} />
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">
                {report.item}
              </h1>
              <p className="text-gray-400 text-sm font-bold mt-1">
                Dilaporkan pada {new Date(report.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </p>
            </div>

            <Card className="p-6 md:p-8 !rounded-[2rem] border-gray-100 shadow-sm bg-white dark:bg-zinc-900/50">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <InfoItem
                  label="Lokasi Penemuan"
                  value={report.location}
                  className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 shadow-sm"
                />
                <InfoItem
                  label="Status"
                  value={report.status === 'Found' ? 'Siap Diklaim' : 'Selesai'}
                  className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 shadow-sm"
                />
              </div>
              
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-3">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {report.description || "Tidak ada deskripsi tambahan."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {report.status === "Found" && (
              <a
                href={`https://wa.me/628123456789?text=Halo Admin Dragon Waterpark, saya ingin mengklaim barang ${report.item} (ID: #LF-${report.id})`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                <MessageCircle size={18} />
                  Klaim via WhatsApp
            </a>
            )}
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 text-gray-700 border border-gray-100 py-4 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
                >
                  <Share2 size={18} />
                  Bagikan
                </button>
              </div>
            </Card>

            <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
              <p className="text-blue-700 text-[11px] leading-relaxed font-bold">
                PENTING: Siapkan bukti kepemilikan seperti foto asli atau ciri khusus barang saat menghubungi petugas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
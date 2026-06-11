"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import Input from "../components/Input";
import { Claim } from "../types/claim";
import ClaimsTable from "../components/ClaimsTable";
import { Report } from "../types/report";
import { getClaims, createClaim, updateClaimStatus } from "../../../services/claim.service";
import { getReports } from "../../../services/report.service";
import toast from "react-hot-toast";

type ClaimApiResponse = {
  id: number;
  claimerName: string;
  claimerPhone: string;
  status: string;
  report?: {
    item: string;
  };
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  return fallback;
};

export default function Page() {
  const router = useRouter();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const [claimerName, setClaimerName] = useState("");
  const [claimerPhone, setClaimerPhone] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<number | "">("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const claimsResponse = await getClaims();
      const claimsArray: ClaimApiResponse[] = claimsResponse.data ?? [];

      setClaims(claimsArray.map((c) => ({
        id: c.id,
        claimer: c.claimerName,
        phone: c.claimerPhone,
        item: c.report?.item || "Unknown",
        status: c.status
      })));

      const reportsResponse = await getReports("Found");
      setReports(reportsResponse.data || []);

    } catch (error: unknown) {
      console.error("Error fetching data:", error);
      toast.error(getErrorMessage(error, "Gagal mengambil data"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClaim = async () => {
    if (!claimerName || !claimerPhone || !selectedReportId) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    try {
      await createClaim({
        claimerName,
        claimerPhone,
        reportId: Number(selectedReportId)
      });

      toast.success("Klaim berhasil didaftarkan!");
      setIsModalOpen(false);
      setClaimerName("");
      setClaimerPhone("");
      setSelectedReportId("");
      fetchData();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Gagal menambah klaim");
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateClaimStatus(id, status);
      toast.success(`Klaim ${status}!`);
      fetchData();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Gagal update status");
    }
  };

  const filteredClaims = claims.filter((claim) =>
    claim.claimer.toLowerCase().includes(search.toLowerCase()) ||
    claim.item.toLowerCase().includes(search.toLowerCase()) ||
    claim.status.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-gray-800">Claims Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add New Claim</Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search claims..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-black text-gray-800 mb-6 text-center text-blue-600">
              Register Claim
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Nama Pengambil</label>
                <Input
                  placeholder="Nama Lengkap"
                  value={claimerName}
                  onChange={(e) => setClaimerName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">No. WhatsApp</label>
                <Input
                  placeholder="0812..."
                  value={claimerPhone}
                  onChange={(e) => setClaimerPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Pilih Barang Temuan</label>
                <select
                  className="w-full border border-gray-100 p-4 rounded-2xl bg-gray-50 focus:ring-4 focus:ring-blue-50 focus:border-blue-200 outline-none text-black font-medium transition-all"
                  value={selectedReportId}
                  onChange={(e) => setSelectedReportId(Number(e.target.value))}
                >
                  <option value="">-- Pilih Barang --</option>
                  {reports.map((r) => (
                    <option key={r.id} value={r.id}>{r.item} (ID: {r.id})</option>
                  ))}
                </select>
                {reports.length === 0 && <p className="text-xs text-red-500 mt-2 font-bold">* Tidak ada barang berstatus Found</p>}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-100"
                  onClick={handleAddClaim}
                >
                  Submit Klaim
                </button>
                <button
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-black hover:bg-gray-200 transition active:scale-95"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ClaimsTable
        claims={filteredClaims}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

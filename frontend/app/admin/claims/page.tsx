"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Claim } from "../types/claim";
import ClaimsTable from "../components/ClaimsTable";
import { Report } from "../types/report";

export default function Page() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [reports, setReports] = useState<Report[]>([]); // Barang yang bisa diklaim
  const [loading, setLoading] = useState(true);

  const [claimerName, setClaimerName] = useState("");
  const [claimerPhone, setClaimerPhone] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<number | "">("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const fetchData = async () => {
    try {
      // Ambil data klaim
      const claimsRes = await fetch("http://localhost:3000/claims", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const claimsData = await claimsRes.json();
      setClaims(claimsData.map((c: any) => ({
        id: c.id,
        claimer: c.claimerName,
        phone: c.claimerPhone,
        item: c.report?.item || "Unknown",
        status: c.status
      })));

      // Ambil data barang yang statusnya 'Found' untuk didaftarkan klaim
      const reportsRes = await fetch("http://localhost:3000/reports");
      const reportsData = await reportsRes.json();
      setReports(reportsData.filter((r: any) => r.status === "Found"));
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClaim = async () => {
    if (!claimerName || !claimerPhone || !selectedReportId) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          claimerName,
          claimerPhone,
          reportId: Number(selectedReportId)
        }),
      });

      if (response.ok) {
        alert("Klaim berhasil didaftarkan!");
        setIsModalOpen(false);
        setClaimerName("");
        setClaimerPhone("");
        setSelectedReportId("");
        fetchData();
      }
    } catch (error) {
      alert("Gagal menambah klaim");
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/claims/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Klaim ${status}!`);
        fetchData();
      }
    } catch (error) {
      alert("Gagal update status");
    }
  };

  const filteredClaims = claims.filter((claim) =>
    claim.claimer.toLowerCase().includes(search.toLowerCase()) ||
    claim.item.toLowerCase().includes(search.toLowerCase()) ||  
    claim.status.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Loading data...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Claims Management</h1>
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-[450px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center text-blue-600">
              Register Claim
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Pengambil</label>
                <Input
                  placeholder="Nama Lengkap"
                  value={claimerName}
                  onChange={(e) => setClaimerName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">No. WhatsApp</label>
                <Input
                  placeholder="0812..."
                  value={claimerPhone}
                  onChange={(e) => setClaimerPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pilih Barang Temuan</label>
                <select 
                  className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none text-black"
                  value={selectedReportId}
                  onChange={(e) => setSelectedReportId(Number(e.target.value))}
                >
                  <option value="">-- Pilih Barang --</option>
                  {reports.map((r) => (
                    <option key={r.id} value={r.id}>{r.item} (ID: {r.id})</option>
                  ))}
                </select>
                {reports.length === 0 && <p className="text-xs text-red-500 mt-1">* Tidak ada barang berstatus 'Found'</p>}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                  onClick={handleAddClaim}
                >
                  Submit Klaim
                </button>
                <button 
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
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
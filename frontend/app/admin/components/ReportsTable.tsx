import { useState } from "react";
import { Report } from "../types/report";
import { updateReportStatus, deleteReport } from "../../../services/report.service";
import toast from "react-hot-toast";
import { Eye, X, Calendar, MapPin, User, FileText, Camera } from "lucide-react";

type Props = {
  reports: Report[];
  onRefresh: () => void;
};

export default function ReportsTable({ reports, onRefresh }: Props) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await updateReportStatus(id, newStatus);
      toast.success(`Status berhasil diubah ke "${newStatus}"!`);
      
      // If modal is open for this report, update its status in state
      if (selectedReport && selectedReport.id === id) {
        setSelectedReport({
          ...selectedReport,
          status: newStatus,
        });
      }

      onRefresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Gagal update status";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        await deleteReport(id);
        toast.success("Laporan berhasil dihapus!");
        
        // If modal is open for this report, close it
        if (selectedReport && selectedReport.id === id) {
          setSelectedReport(null);
        }

        onRefresh();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Gagal menghapus laporan";
        toast.error(errorMessage);
      }
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Item</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="p-4">{report.id}</td>
              <td className="p-4 font-semibold">{report.item}</td>
              <td className="p-4">{report.location}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : report.status === "Found"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {report.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 border border-slate-200"
                  >
                    <Eye size={13} />
                    Detail
                  </button>
                  {report.status === "Pending" && (
                    <button
                      onClick={() => handleUpdateStatus(report.id, "Found")}
                      className="text-xs bg-green-500 text-white px-2 py-1.5 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                    >
                      Mark Found
                    </button>
                  )}
                  {report.status === "Found" && (
                    <button
                      onClick={() => handleUpdateStatus(report.id, "Claimed")}
                      className="text-xs bg-blue-500 text-white px-2 py-1.5 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                    >
                      Mark Claimed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-xs bg-red-500 text-white px-2 py-1.5 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reports.length === 0 && (
        <div className="p-10 text-center text-slate-500">Tidak ada data laporan.</div>
      )}

      {/* Detail Modal Dialog */}
      {selectedReport && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedReport(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-lg text-slate-800">Detail Laporan Barang</h3>
                <p className="text-xs text-slate-400">ID Laporan: #{selectedReport.id}</p>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* Image Preview Block */}
              <div className="w-full">
                {selectedReport.image ? (
                  <div className="relative aspect-video w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <img 
                      src={selectedReport.image} 
                      alt={selectedReport.item}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Camera size={32} className="stroke-[1.5]" />
                    <span className="text-xs font-semibold">Tidak ada foto terlampir</span>
                  </div>
                )}
              </div>

              {/* Status and Primary Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedReport.item}</h2>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    <span>Ditemukan di: <strong className="text-slate-700 font-semibold">{selectedReport.location}</strong></span>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                      selectedReport.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : selectedReport.status === "Found"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {selectedReport.status}
                  </span>
                </div>
              </div>

              {/* Metadata Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex gap-2.5 items-start">
                  <Calendar size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Tanggal Ditemukan</span>
                    <span className="font-semibold text-slate-700">{formatDate(selectedReport.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <User size={16} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Dilaporkan Oleh</span>
                    <span className="font-semibold text-slate-700">
                      {selectedReport.user ? (
                        `${selectedReport.user.fullName} (${selectedReport.user.email})`
                      ) : (
                        "Guest / Anonim"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <FileText size={14} />
                  <span>Deskripsi Lengkap</span>
                </div>
                <div className="text-sm text-slate-700 leading-relaxed bg-white border border-slate-100 p-4 rounded-xl whitespace-pre-wrap">
                  {selectedReport.description || "Tidak ada deskripsi lengkap untuk barang ini."}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              {selectedReport.status === "Pending" && (
                <button
                  onClick={() => handleUpdateStatus(selectedReport.id, "Found")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  Tandai Ditemukan (Found)
                </button>
              )}
              {selectedReport.status === "Found" && (
                <button
                  onClick={() => handleUpdateStatus(selectedReport.id, "Claimed")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  Tandai Dikembalikan (Claimed)
                </button>
              )}
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
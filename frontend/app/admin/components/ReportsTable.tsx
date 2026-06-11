import { Report } from "../types/report";
import { updateReportStatus } from "../../../services/report.service";
import toast from "react-hot-toast";

type Props = {
  reports: Report[];
  onRefresh: () => void;
};

export default function ReportsTable({ reports, onRefresh }: Props) {
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      // Pakai service yang sudah ada, bukan fetch manual
      await updateReportStatus(id, newStatus);
      toast.success(`Status berhasil diubah ke "${newStatus}"!`);
      onRefresh(); // callback ke parent untuk re-fetch data
    } catch (error: any) {
      toast.error(error.message || "Gagal update status");
    }
  };

  return (
    <div className="bg-white text-gray-800 rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">ID</th>
            <th className="text-left p-4">Item</th>
            <th className="text-left p-4">Location</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{report.id}</td>
              <td className="p-4 font-semibold">{report.item}</td>
              <td className="p-4">{report.location}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${report.status === "Pending"
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
                <div className="flex gap-2">
                  {report.status === "Pending" && (
                    <button
                      onClick={() => handleUpdateStatus(report.id, "Found")}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      Mark Found
                    </button>
                  )}
                  {report.status === "Found" && (
                    <button
                      onClick={() => handleUpdateStatus(report.id, "Claimed")}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      Mark Claimed
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reports.length === 0 && (
        <div className="p-10 text-center text-gray-400">Tidak ada data laporan.</div>
      )}
    </div>
  );
}
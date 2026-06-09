import { Report } from "../types/report";
import Cookies from "js-cookie";

type Props = {
  reports: Report[];
};

export default function ReportsTable({ reports }: Props) {
  const updateStatus = async (id: number, newStatus: string) => {
    const token = Cookies.get("access_token");
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${API_URL}/reports/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        alert("Status berhasil diperbarui!");
        window.location.reload(); // Refresh halaman untuk melihat perubahan
      }
    } catch (error) {
      console.error("Gagal update status:", error);
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
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${report.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  report.status === 'Found' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                  {report.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  {report.status === "Pending" && (
                    <button
                      onClick={() => updateStatus(report.id, "Found")}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Mark Found
                    </button>
                  )}
                  {report.status === "Found" && (
                    <button
                      onClick={() => updateStatus(report.id, "Claimed")}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
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
    </div>
  );
}
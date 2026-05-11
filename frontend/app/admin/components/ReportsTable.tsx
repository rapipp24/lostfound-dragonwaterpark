import { Report } from "../types/report";

type Props = {
  reports: Report[];
};

export default function ReportsTable({ reports }: Props) {
  return (
    <div className="bg-white text-gray-800 rounded-lg shadow overflow-hidden">
    <table className="w-full">
    <thead className="bg-gray-100">
    <tr>
    <th className="text-left p-4 text-gray-800">ID</th>
    <th className="text-left p-4 text-gray-800" >Claimer</th>
    <th className="text-left p-4 text-gray-800">Item</th>
    <th className="text-left p-4 text-gray-800">Status</th>
    </tr>
    </thead>

    <tbody>
        {reports.map((report) => (
        <tr key={report.id} className="border-t">
        <td className="p-4">{report.id}</td>
        <td className="p-4">{report.item}</td>
        <td className="p-4">{report.location}</td>
        <td className="p-4">{report.status}</td>
        </tr>
        ))}
    </tbody>
    </table>
    </div>
  );
}
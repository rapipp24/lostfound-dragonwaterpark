import Link from "next/link";
import { Report } from "../../types/report";
import { REPORT_STATUS } from "../../constants/report";
import Card from "../shared/Card";

type ReportCardProps = {
  report: Report;
};

export default function ReportCard({
  report,
}: ReportCardProps) {
  return (
    <Link href={`/reports/${report.id}`}>
      <Card>

        <img
          src={report.image}
          alt={report.name}
          className="w-full h-48 object-cover rounded-xl mb-5"
        />

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">
            {report.name}
          </h2>

          <span
            className={`text-sm px-3 py-1 rounded-full ${
              report.status === REPORT_STATUS.FOUND
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {report.status}
          </span>
        </div>

        <p className="text-gray-500">
          Lokasi: {report.location}
        </p>
      </Card>
    </Link>
  );
}
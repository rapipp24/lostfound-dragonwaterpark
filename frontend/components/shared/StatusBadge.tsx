import { REPORT_STATUS } from "../../constants/report";

type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {

  const isFound =
    status === REPORT_STATUS.FOUND;

  return (
    <span
      className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
        isFound
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );
}
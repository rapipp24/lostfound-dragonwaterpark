type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="bg-white border border-blue-200 p-5 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-blue-600">{value}</h2>
    </div>
  );
}
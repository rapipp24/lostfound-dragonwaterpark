type DashboardCardProps = {
  title: string;
  value: number;
};

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-lg shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
    </div>
  );
}
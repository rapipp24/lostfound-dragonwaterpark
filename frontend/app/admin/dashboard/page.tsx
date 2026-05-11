import DashboardCard from "../components/DashboardCard";
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2x1 font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

  <div className="grid grid-cols-3 gap-4">
  <DashboardCard title="Total Reports" value={12} />
  <DashboardCard title="Pending Claims" value={5} />
  <DashboardCard title="Approved Claims" value={7} />
  </div>
  </div>
  );
}
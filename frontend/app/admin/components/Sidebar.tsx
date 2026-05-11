import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-x1 font-bold mb-6">
        Admin Menu
      </h1>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className="block rounded px-3 py-2 hover:bg-gray-700">
          Dashboard
        </Link>

        <Link href="/admin/reports" className="block rounded px-3 py-2 hover:bg-gray-700">
          Reports
        </Link>

        <Link href="/admin/claims" className="block rounded px-3 py-2 hover:bg-gray-700">
          Claims
        </Link>
      </nav>
    </aside>
  );
}
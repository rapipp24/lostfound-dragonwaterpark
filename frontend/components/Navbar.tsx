import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <h1 className="text-xl font-bold">
        Lost & Found
      </h1>

      <div className="flex gap-6">
        <Link
          href="/login"
          className="hover:text-blue-600"
        >
          Login
        </Link>

        <Link
          href="/reports"
          className="hover:text-blue-600"
        >
          Reports
        </Link>

        <Link
          href="/claims"
          className="hover:text-blue-600"
        >
          Claims
        </Link>
      </div>
    </nav>
  );
}
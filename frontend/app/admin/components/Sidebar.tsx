"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div style={{ width: "200px", padding: "10px", background: "#ddd"}}>
      <h2>Admin Menu</h2>

      <ul>
        <li style={{ fontWeight: pathname === "/admin/dashboard" ? "bold" : "normal"}}>
        <Link href="/admin/dashboard">Dashboard</Link>
        </li>

        <li style={{ fontWeight: pathname === "/admin/reports" ? "bold" : "normal"}}>
        <Link href="/admin/reports">Reports</Link>
        </li>

        <li style={{ fontWeight: pathname === "/admin/claims" ? "bold" : "normal"}}>
        <Link href="/admin/claims">Claims</Link>
        </li>
    </ul>
    </div>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CheckSquare } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/claims", label: "Claims", icon: CheckSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white text-slate-700 border-r border-slate-200 flex flex-col">
      {/* Logo / Brand */}
      <div className="px-6 py-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm">
            LF
          </div>
          <div>
            <p className="font-black text-slate-900 text-sm leading-none">Lost & Found</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 mb-3">
          Menu
        </p>

        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Icon size={18} />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center">
          Dragon Waterpark © 2025
        </p>
      </div>
    </aside>
  );
}
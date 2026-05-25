"use client";

import { Bell, User, LogOut } from "lucide-react";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-30">
      <div className="flex flex-col">
        <h1 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Overview
        </h1>
        <p className="text-xl font-black text-gray-900">
          Admin Control Center
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Notification - Clean Style */}
        <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

        {/* Admin Profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">System Admin</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Superuser</p>
          </div>
          <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold shadow-lg shadow-gray-200">
            A
          </div>
          <button 
            onClick={handleLogout}
            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Keluar"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
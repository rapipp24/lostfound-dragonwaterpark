import React from "react";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />
      <main className="flex-grow py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-zinc-900 border-t py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Dragon Waterpark - Lost and Found System</p>
      </footer>
      <Toaster position="bottom-right" />
    </div>
  );
}
import React from "react";
import Navbar from "../../components/Navbar";
import { Toaster } from "react-hot-toast";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="p-6">
        {children}
      </main>

      <Toaster position="top-right" />
    </>
  );
}
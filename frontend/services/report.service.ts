"use client";

import { Report } from "../types/report";

export async function getReports(): Promise<Report[]> {
  return [
    {
      id: 1,
      name: "iPhone 13",
      location: "Kolam Utama",
      status: "Belum Ditemukan",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: 2,
      name: "Dompet Hitam",
      location: "Area Food Court",
      status: "Ditemukan",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93",
    },
  ];
}

export async function getReportById(
  id: string
) {
  return {
    id,
    name: "iPhone 13",
    location: "Kolam Utama",
    date: "5 Mei 2026",
    description:
      "iPhone warna hitam dengan casing transparan.",
    status: "Belum Ditemukan",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  };
}
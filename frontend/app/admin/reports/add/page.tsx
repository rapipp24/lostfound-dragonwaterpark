"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddReportPage() {
  const router = useRouter();
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sementara kita console log dulu datanya
    console.log({ item, location, description });
    alert("Laporan Berhasil Ditambahkan!");
    router.push("/admin/reports"); // Balik ke halaman tabel
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Tambah Laporan Barang Temuan</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nama Barang</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Contoh: Kacamata Renang"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Lokasi Penemuan</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Contoh: Area Lazy River"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Deskripsi Barang</label>
          <textarea 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Warna, merk, atau ciri khusus..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-4 mt-6">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
          >
            SIMPAN LAPORAN
          </button>
          <button 
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
          >
            BATAL
          </button>
        </div>
      </form>
    </div>
  );
}
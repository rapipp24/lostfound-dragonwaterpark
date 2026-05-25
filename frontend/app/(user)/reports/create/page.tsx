"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import Card from "@/components/shared/Card";
import { createReport } from "@/services/report.service";
import toast from "react-hot-toast";
import { Package, MapPin, AlignLeft, Camera, Send, ArrowLeft, X } from "lucide-react";

export default function CreateReportPage() {
  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar (Maks 5MB)");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("item", item);
      formData.append("location", location);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      await createReport(formData);
      toast.success("Laporan berhasil dikirim!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Gagal mengirim laporan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="bg-gray-50/50 min-h-screen py-10 md:py-20">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-8 text-sm font-bold group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
            Lapor <span className="text-blue-600">Kehilangan.</span>
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Berikan detail yang akurat untuk membantu tim Dragon Waterpark menemukan barang Anda lebih cepat.
          </p>
        </div>

        <Card className="p-8 md:p-10 !rounded-[2.5rem] border-none shadow-2xl shadow-blue-100/50 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Nama Barang */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nama Barang</label>
              <div className="relative group">
                <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Misal: iPhone 13 Pro Max, Dompet Kulit..."
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent py-4.5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Lokasi Terakhir Terlihat</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Misal: Dekat Kolam Ombak, Food Court..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent py-4.5 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Deskripsi & Ciri Khusus</label>
              <div className="relative group">
                <AlignLeft className="absolute left-5 top-6 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <textarea
                  placeholder="Jelaskan detail seperti warna, merk, atau isi di dalamnya..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-50 border border-transparent py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-900 resize-none"
                  required
                />
              </div>
            </div>

            {/* Photo Upload with Real Logic */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Foto Barang (Opsional)</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {!preview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-all cursor-pointer hover:bg-blue-50/30"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <Camera size={26} className="text-gray-300 group-hover:text-blue-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-500 mb-1">Pilih Foto Barang</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Format JPG, PNG (Maks 5MB)</p>
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-lg group">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Foto Terpilih</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={20} />
                  Kirim Laporan Sekarang
                </>
              )}
            </button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
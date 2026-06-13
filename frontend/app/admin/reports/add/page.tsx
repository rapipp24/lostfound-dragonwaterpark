"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import Container from "../../../../components/shared/Container";
import AccessDenied from "../../../../components/shared/AccessDenied";
import { PackagePlus, ArrowLeft, Save, MapPin, AlignLeft, ShieldAlert, Camera, X } from "lucide-react";
import toast from "react-hot-toast";
import { createReport } from "../../../../services/report.service";

export default function AddReportPage() {
  const router = useRouter();
  const { isLogin, user, loading: authLoading } = useAuth();

  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const allowedFileExtensions = [
      "jpg",
      "jpeg",
      "png",
      "webp"
    ];

    if (
      !allowedTypes.includes(file.type) ||
      !fileExtension ||
      !allowedFileExtensions.includes(fileExtension)
    ) {
      alert(`Format file ${fileExtension ? `.${fileExtension.toUpperCase()}` : ""} tidak didukung untuk foto barang! Silakan pilih file gambar dengan format JPG, JPEG, atau PNG.`);

      setImage(null);
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File terlalu besar. Maksimal 2MB.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasAccess = authLoading || (isLogin && !user)
    ? null
    : !!(isLogin && user && user.role === "admin");

  useEffect(() => {
    if (!authLoading && isLogin && user && user.role !== "admin") {
      toast.error("Akses Ditolak: Kamu bukan Admin!");
    }
  }, [authLoading, isLogin, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedItem = item.trim();
    const trimmedLocation = location.trim();
    const trimmedDescription = description.trim();

    if (!trimmedItem || !trimmedLocation || !trimmedDescription) {
      toast.error("Nama barang, lokasi, dan deskripsi tidak boleh hanya berupa spasi kosong!");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("item", trimmedItem);
      formData.append("location", trimmedLocation);
      formData.append("description", trimmedDescription);
      if (image) {
        formData.append("image", image);
      }

      await createReport(formData);

      toast.success("Barang temuan berhasil dicatat!");
      router.push("/admin/reports");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Gagal menyimpan laporan";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // State Memuat (Sabar menunggu data user muncul)
  if (authLoading || (isLogin && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-400 font-bold text-xs tracking-widest animate-pulse">MEMVERIFIKASI AKSES...</p>
        </div>
      </div>
    );
  }

  // State Gagal Akses (Exception)
  if (hasAccess === false) {
    return <AccessDenied />;
  }

  // State Berhasil (Admin View)
  return (
    <Container className="bg-gray-50/50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold text-sm mb-8 transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          KEMBALI
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-10 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <PackagePlus size={24} />
              </div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                Admin Entry
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Catat Barang Temuan</h1>
            <p className="text-blue-100 mt-2 font-medium">Pastikan detail barang akurat untuk memudahkan proses klaim.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid gap-8">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wider">
                  <PackagePlus size={16} className="text-blue-600" />
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-none p-5 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  placeholder="Misal: Kacamata Renang Speedo Biru"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wider">
                  <MapPin size={16} className="text-blue-600" />
                  Lokasi Penemuan
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-none p-5 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  placeholder="Misal: Dekat Pancuran Area Anak"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wider">
                  <AlignLeft size={16} className="text-blue-600" />
                  Deskripsi & Ciri Khusus
                </label>
                <textarea
                  className="w-full bg-gray-50 border-none p-5 rounded-3xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-gray-700 placeholder:text-gray-300 min-h-[150px]"
                  placeholder="Tuliskan warna, merk, kondisi, atau ciri khusus lainnya..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wider">
                  <Camera size={16} className="text-blue-600" />
                  Foto Barang Temuan (Opsional)
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .doc, .docx, .pdf"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 hover:bg-gray-50/50 hover:border-blue-400 transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer"
                >
                  <Camera className="text-gray-400 group-hover:text-blue-600 transition-colors" size={28} />
                  <span className="text-xs font-bold text-gray-500 group-hover:text-blue-600 transition-colors">
                    Klik untuk memilih atau mengambil foto
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Format JPG, JPEG, atau PNG (Maks 5MB)
                  </span>
                </button>

                {imagePreview && (
                  <div className="relative mt-4 border border-gray-100 rounded-2xl overflow-hidden shadow-md group max-w-sm">
                    <img
                      src={imagePreview}
                      alt="Pratinjau Foto"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center"
                      title="Hapus Foto"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600">
                <ShieldAlert size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Aksi ini bersifat permanen</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-10 py-4.5 rounded-2xl text-sm font-black tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 disabled:opacity-50 disabled:scale-100"
              >
                {isSubmitting ? "MENYIMPAN..." : (
                  <>
                    <Save size={18} />
                    SIMPAN LAPORAN
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
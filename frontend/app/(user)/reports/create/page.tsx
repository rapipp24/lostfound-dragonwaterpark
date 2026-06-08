"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import Container from "@/components/shared/Container";
import Card from "@/components/shared/Card";
import AccessDenied from "@/components/shared/AccessDenied";

import { createReport } from "@/services/report.service";


import toast from "react-hot-toast";

import {
  Package,
  MapPin,
  AlignLeft,
  Camera,
  Send,
  ArrowLeft,
  X,
} from "lucide-react";

export default function CreateReportPage() {

  const {
  user,
  isLogin,
  loading: authLoading,
} = useAuth();

  const [item, setItem] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const router =
    useRouter();

  useEffect(() => {

    if (
      !authLoading &&
      !isLogin
    ) {

      toast.error(
        "Silakan login terlebih dahulu"
      );

      router.push(
        "/login"
      );
    }

  }, [
    isLogin,
    authLoading,
    router,
  ]);

  if (authLoading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (!isLogin) {
    return null;
  }

  if (
    isLogin &&
    user &&
    user.role !== "USER"
  ) {
    return <AccessDenied />;
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (file) {

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        toast.error(
          "Ukuran file terlalu besar (Maks 5MB)"
        );

        return;
      }

      setImage(file);

      const reader =
        new FileReader();

      reader.onloadend =
        () => {

          setPreview(
            reader.result as string
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  };

  const removeImage = () => {

    setImage(null);

    setPreview(null);

    if (
      fileInputRef.current
    ) {

      fileInputRef.current.value =
        "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "item",
        item
      );

      formData.append(
        "location",
        location
      );

      formData.append(
        "description",
        description
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      await createReport(
        formData
      );

      toast.success(
        "Laporan berhasil dikirim!"
      );

      router.push(
        "/reports"
      );

    } catch (error: any) {

      toast.error(
        error.message ||
        "Gagal mengirim laporan"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <Container className="bg-gray-50/50 min-h-screen py-10 md:py-20">

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() =>
            router.back()
          }
          className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors mb-8 text-sm font-bold group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Kembali
        </button>

        <div className="mb-10 text-center md:text-left">

          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">

            Lapor{" "}

            <span className="text-blue-600">
              Kehilangan.
            </span>

          </h1>

          <p className="text-gray-500 font-medium leading-relaxed">
            Berikan detail yang akurat untuk membantu tim Dragon Waterpark menemukan barang Anda lebih cepat.
          </p>

        </div>

        <Card className="p-8 md:p-10 !rounded-[2.5rem] border-none shadow-2xl shadow-blue-100/50 bg-white dark:bg-zinc-900 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 relative z-10"
          >

            <div className="space-y-2">

              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Nama Barang
              </label>

              <div className="relative group">

                <Package
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Misal: iPhone 13 Pro Max"
                  value={item}
                  onChange={(e) =>
                    setItem(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-50 py-4 pl-14 pr-6 rounded-2xl"
                  required
                />

              </div>

            </div>

            <div className="space-y-2">

              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Lokasi Terakhir Terlihat
              </label>

              <div className="relative group">

                <MapPin
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Misal: Food Court"
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-50 py-4 pl-14 pr-6 rounded-2xl"
                  required
                />

              </div>

            </div>

            <div className="space-y-2">

              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Deskripsi
              </label>

              <div className="relative group">

                <AlignLeft
                  className="absolute left-5 top-6 text-gray-300"
                  size={20}
                />

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full bg-gray-50 py-5 pl-14 pr-6 rounded-3xl resize-none"
                  required
                />

              </div>

            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="w-full border-2 border-dashed rounded-3xl p-6"
            >
              <Camera className="mx-auto mb-2" />
              Upload Foto
            </button>

            {preview && (

              <div className="relative">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-3xl"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                >
                  <X size={18} />
                </button>

              </div>

            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3"
            >

              {loading ? (

                "Mengirim..."

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
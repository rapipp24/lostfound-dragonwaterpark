import { fetchWithAuth } from "../utils/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getMyReports = async () => {
  const response = await fetchWithAuth("/reports/me");
  if (!response.ok) throw new Error("Gagal mengambil laporan Anda");
  return response.json();
};

export const getReports = async (status?: string, search?: string) => {
  let url = `${BASE_URL}/reports?`;
  if (status) url += `status=${status}&`;
  if (search) url += `search=${search}&`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Gagal mengambil daftar laporan");
  return response.json();
};

export const getReportById = async (id: string | number) => {
  const response = await fetch(`${BASE_URL}/reports/${id}`);
  if (!response.ok) throw new Error("Gagal mengambil detail laporan");
  return response.json();
};

export const createReport = async (formData: FormData) => {
  // Catatan: Jangan tambahkan "Content-Type" manual saat mengirim FormData, 
  // Biarkan browser yang menentukannya secara otomatis termasuk boundary-nya.
  const response = await fetchWithAuth("/reports", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal membuat laporan");
  }
  return response.json();
};

export const updateReportStatus = async (id: number, status: string) => {
  const response = await fetchWithAuth(`/reports/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Gagal memperbarui status");
  return response.json();
};

export const deleteReport = async (id: number | string) => {
  const response = await fetchWithAuth(`/reports/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Gagal menghapus laporan");
  return response.json();
};

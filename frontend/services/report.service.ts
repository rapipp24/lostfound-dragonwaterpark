import { getCookie, removeCookie } from "../utils/cookies";

const BASE_URL = "http://localhost:3000";

const getHeaders = () => {
  const token = getCookie("access_token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getMyReports = async () => {
  const response = await fetch(`${BASE_URL}/reports/me`, {
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
  });
  
  if (response.status === 401) {
    removeCookie("access_token");
    removeCookie("user");
    throw new Error("Sesi Anda berakhir. Silakan login kembali.");
  }

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
  const response = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: getHeaders(),
    body: formData,
  });
  
  if (response.status === 401) {
    removeCookie("access_token");
    removeCookie("user");
    throw new Error("Sesi berakhir. Silakan login kembali.");
  }

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Gagal membuat laporan");
  }
  return response.json();
};

export const updateReportStatus = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}/reports/${id}/status`, {
    method: "PATCH",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Gagal memperbarui status");
  return response.json();
};

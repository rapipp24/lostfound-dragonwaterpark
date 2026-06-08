import { getCookie, removeCookie } from "../utils/cookies";

const BASE_URL = "http://localhost:3001";

const getHeaders = () => {
  const token = getCookie("access_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getClaims = async () => {
  const response = await fetch(`${BASE_URL}/claims`, {
    headers: getHeaders(),
  });
  
  if (response.status === 401) {
    removeCookie("access_token");
    removeCookie("user");
    throw new Error("Sesi Anda berakhir. Silakan login kembali.");
  }

  if (!response.ok) throw new Error("Gagal mengambil daftar klaim");
  return response.json();
};

export const createClaim = async (data: { claimerName: string; claimerPhone: string; reportId: number }) => {
  const response = await fetch(`${BASE_URL}/claims`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (response.status === 401) {
    removeCookie("access_token");
    removeCookie("user");
    throw new Error("Sesi berakhir. Silakan login kembali.");
  }

  if (!response.ok) throw new Error("Gagal mendaftarkan klaim");
  return response.json();
};

export const updateClaimStatus = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}/claims/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  if (response.status === 401) {
    removeCookie("access_token");
    removeCookie("user");
    throw new Error("Sesi berakhir. Silakan login kembali.");
  }

  if (!response.ok) throw new Error("Gagal memperbarui status klaim");
  return response.json();
};

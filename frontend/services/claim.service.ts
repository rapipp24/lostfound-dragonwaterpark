import { fetchWithAuth } from "../utils/api";

export const getClaims = async () => {
  const response = await fetchWithAuth("/claims");
  if (!response.ok) throw new Error("Gagal mengambil daftar klaim");
  return response.json();
};

export const createClaim = async (data: { claimerName: string; claimerPhone: string; reportId: number }) => {
  const response = await fetchWithAuth("/claims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Gagal mendaftarkan klaim");
  return response.json();
};

export const updateClaimStatus = async (id: number, status: string) => {
  const response = await fetchWithAuth(`/claims/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error("Gagal memperbarui status klaim");
  return response.json();
};

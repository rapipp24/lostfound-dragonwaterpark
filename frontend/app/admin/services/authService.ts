import { fetchWithAuth } from "../../../utils/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ⚠️ File ini sudah legacy — login admin kini pakai fetch langsung di admin/login/page.tsx
// Dipertahankan untuk kompatibilitas, namun diperbaiki agar sesuai BE API

export const loginAdmin = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // BE: LoginDto expects { email, password }
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Email atau Password salah!");
  }

  const data = await response.json();
  // BE returns: { access_token, user: { fullName, email, role } }
  return data;
};

export const registerAdmin = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const response = await fetchWithAuth("/auth/create-admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // BE: RegisterDto expects { fullName, email, password } — bukan 'name'!
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Gagal mendaftar. Email mungkin sudah terdaftar.");
  }

  return await response.json();
};

export const getUsers = async () => {
  const response = await fetchWithAuth("/auth/users");

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Gagal mengambil data user");
  }

  return await response.json();
};

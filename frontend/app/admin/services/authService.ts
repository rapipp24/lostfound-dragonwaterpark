const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Email atau Password salah!");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("admin_token", data.token);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const registerAdmin = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Gagal mendaftar. Email mungkin sudah terdaftar.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

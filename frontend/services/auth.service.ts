const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface UserResponse {
  fullName: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: UserResponse;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.toLowerCase().trim(),
      password
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const registerUser = async (fullName: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email: email.toLowerCase().trim(),
      password
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

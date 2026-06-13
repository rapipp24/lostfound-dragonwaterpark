import { getCookie, setCookie, removeCookie } from "./cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const handleLogout = () => {
  removeCookie("access_token");
  removeCookie("refresh_token");
  removeCookie("user");
  if (typeof window !== "undefined") {
    const isAdmin = window.location.pathname.startsWith("/admin");
    window.location.href = isAdmin ? "/admin/login" : "/login";
  }
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getCookie("access_token");
  
  const headers = new Headers(options.headers || {});
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const finalOptions = {
    ...options,
    headers,
  };

  const targetUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const response = await fetch(targetUrl, finalOptions);

  if (response.status === 401) {
    const refreshToken = getCookie("refresh_token");
    if (!refreshToken) {
      handleLogout();
      throw new Error("Sesi Anda berakhir. Silakan login kembali.");
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          const retryHeaders = new Headers(options.headers || {});
          retryHeaders.set("Authorization", `Bearer ${newToken}`);
          resolve(fetch(targetUrl, {
            ...options,
            headers: retryHeaders,
          }));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!refreshResponse.ok) {
        throw new Error("Refresh token expired");
      }

      const data = await refreshResponse.json();
      
      // Save new tokens (refresh endpoint returns access_token & refresh_token)
      setCookie("access_token", data.access_token);
      if (data.refresh_token) {
        setCookie("refresh_token", data.refresh_token);
      }

      isRefreshing = false;
      onRefreshed(data.access_token);

      // Retry original request with new token
      const retryHeaders = new Headers(options.headers || {});
      retryHeaders.set("Authorization", `Bearer ${data.access_token}`);
      
      return await fetch(targetUrl, {
        ...options,
        headers: retryHeaders,
      });
    } catch (err) {
      isRefreshing = false;
      handleLogout();
      throw new Error("Sesi Anda berakhir. Silakan login kembali.");
    }
  }

  return response;
};

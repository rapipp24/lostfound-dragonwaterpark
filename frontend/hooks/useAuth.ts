import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie } from "../utils/cookies";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // SEBELUM: Mengambil dari localStorage
    // SESUDAH: Mengambil dari Cookie (Mendukung Subdomain)
    const token = getCookie("access_token");
    const userData = getCookie("user");
    
    if (token) {
      setIsLogin(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error("Failed to parse user data");
        }
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    // Hapus dari Cookie
    removeCookie("access_token");
    removeCookie("user");
    
    setIsLogin(false);
    setUser(null);
    router.push("/login");
  };

  return { user, isLogin, loading, logout };
};

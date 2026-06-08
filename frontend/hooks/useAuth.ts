import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, removeCookie } from "../utils/cookies";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = getCookie("access_token");
    const userData = getCookie("user");

    if (token) {
      setIsLogin(true);

      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Failed to parse user");
        }
      }
    }

    setLoading(false);
  }, []);

  const logout = () => {
    removeCookie("access_token");
    removeCookie("user");

    setUser(null);
    setIsLogin(false);

    router.push("/login");
  };

  return {
    user,
    isLogin,
    loading,
    logout,
  };
};
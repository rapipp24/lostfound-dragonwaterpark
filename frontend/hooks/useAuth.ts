"use client";

import { useEffect, useState } from "react";

export function useAuth() {

  const [isLogin, setIsLogin] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLogin");

    setIsLogin(!!loginStatus);

    const userData =
      localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  function logout() {
    localStorage.removeItem(
      "isLogin"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/login";
  }

  return {
    isLogin,
    user,
    logout,
  };
}
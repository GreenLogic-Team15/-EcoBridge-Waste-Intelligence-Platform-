import React, { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const initialUserType =
    typeof window !== "undefined" ? localStorage.getItem("userType") : "";

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialToken));
  const [userType, setUserType] = useState(initialUserType || "");

  const login = (type, token) => {
    const nextType = type || "";
    setUserType(nextType);
    setIsAuthenticated(true);

    if (token) localStorage.setItem("token", token);
    if (nextType) localStorage.setItem("userType", nextType);
  };

  const logout = () => {
    setUserType("");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userType,
      login,
      logout,
    }),
    [isAuthenticated, userType],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


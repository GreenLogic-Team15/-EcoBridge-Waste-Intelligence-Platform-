import React, { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");

  const login = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserType("");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


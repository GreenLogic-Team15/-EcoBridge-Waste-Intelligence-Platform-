import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { api } from "../services/apiClient";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const initialToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const initialUserType =
    typeof window !== "undefined" ? localStorage.getItem("userType") : "";

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialToken));
  const [userType, setUserType] = useState(initialUserType || "");
  const [user, setUser] = useState(null); // Store full user profile
  const [loading, setLoading] = useState(false);

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    if (!initialToken) return;

    try {
      setLoading(true);
      const response = await api.get("/api/auth/me");
      const userData = response.data;
      setUser(userData);

      // Store email and name in localStorage for sidebar
      if (userData.email) {
        localStorage.setItem("userEmail", userData.email);
      }
      if (userData.fullName || userData.name) {
        localStorage.setItem("userName", userData.fullName || userData.name);
      }
      if (userData.businessName) {
        localStorage.setItem("businessName", userData.businessName);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  }, [initialToken]);

  // Fetch profile on mount if token exists
  useEffect(() => {
    if (initialToken && !user) {
      fetchUserProfile();
    }
  }, [initialToken, user, fetchUserProfile]);

  const login = (type, token) => {
    const nextType = type || "";
    setUserType(nextType);
    setIsAuthenticated(true);

    if (token) {
      localStorage.setItem("token", token);
      // Fetch profile immediately after login
      setTimeout(() => fetchUserProfile(), 0);
    }
    if (nextType) localStorage.setItem("userType", nextType);
  };

  const logout = () => {
    setUserType("");
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("businessName");
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      userType,
      user, // Full user object
      loading,
      login,
      logout,
      fetchUserProfile, // Expose for manual refresh
    }),
    [isAuthenticated, userType, user, loading, fetchUserProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

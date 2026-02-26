import api from "./apiClient";

// SME Registration
export const registerSME = async (userData) => {
  const response = await api.post("/auth/register/businesses", userData);
  return response.data;
};

// Partner Registration
export const registerPartner = async (userData) => {
  const response = await api.post("/auth/register/partner", userData);
  return response.data;
};

// Admin Registration
export const registerAdmin = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login (works for all roles)
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
  }
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (resetData) => {
  const response = await api.post("/auth/reset-password", resetData);
  return response.data;
};

// Google OAuth
export const googleAuth = () => {
  window.location.href = `http://localhost:5000/api/auth/google`;
};

// Google OAuth Callback Handler
export const handleGoogleCallback = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  return { token, role };
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

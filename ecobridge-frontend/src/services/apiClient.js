import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ecobridge-backend-x2uh.onrender.com/api";

export const api = axios.create({
  baseURL,
});

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

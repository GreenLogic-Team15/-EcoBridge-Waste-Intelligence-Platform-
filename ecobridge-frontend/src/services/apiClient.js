import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ecobridge-backend-x2uh.onrender.com/api";

// Remove trailing space if present
const cleanBaseURL = baseURL.trim();

export const api = axios.create({
  baseURL: cleanBaseURL,
  timeout: 30000, // ⏱️ 30 second timeout (prevents infinite hanging)
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout - backend may be slow or unavailable");
    }
    if (error.response?.status === 403) {
      console.error("Auth error: Token may be invalid or expired");
      // Optionally redirect to login on 403
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

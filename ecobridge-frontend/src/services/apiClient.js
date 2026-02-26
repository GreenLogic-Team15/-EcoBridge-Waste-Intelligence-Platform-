import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
});

// #region agent log
fetch("http://127.0.0.1:7464/ingest/2a841099-073f-46d7-a902-0212580c75c7", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Debug-Session-Id": "1a8dc5",
  },
  body: JSON.stringify({
    sessionId: "1a8dc5",
    runId: "signup-debug",
    hypothesisId: "H1-H2",
    location: "src/services/apiClient.js:baseURL",
    message: "apiClient baseURL",
    data: { baseURL },
    timestamp: Date.now(),
  }),
}).catch(() => {});
// #endregion agent log

// Attach auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


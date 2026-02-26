import api from "./apiClient";

// Get user history (SME)
export const getUserHistory = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.type) params.append("type", filters.type); // logs|pickups
  if (filters.status) params.append("status", filters.status); // All|Requested|Accepted|Completed
  if (filters.startDate) params.append("startDate", filters.startDate); // YYYY-MM-DD
  if (filters.endDate) params.append("endDate", filters.endDate); // YYYY-MM-DD
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);
  
  const response = await api.get(`/history?${params.toString()}`);
  return response.data;
};

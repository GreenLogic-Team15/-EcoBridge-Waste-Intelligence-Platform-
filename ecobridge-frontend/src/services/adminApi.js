import api from "./apiClient";

// Get admin dashboard data
export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

// Update pickup status
export const updatePickupStatusAdmin = async (id, statusData) => {
  const response = await api.patch(`/pickups/${id}/status`, statusData);
  return response.data;
};

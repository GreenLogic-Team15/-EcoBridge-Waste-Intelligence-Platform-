import api from "./apiClient";

// Create pickup request
export const requestPickup = async (pickupData) => {
  const response = await api.post("/pickups", pickupData);
  return response.data;
};

// Get all pickup requests
export const getAllPickups = async () => {
  const response = await api.get("/pickups");
  return response.data;
};

// Get specific pickup by ID
export const getPickupById = async (id) => {
  const response = await api.get(`/pickups/${id}`);
  return response.data;
};

// Update pickup status (Admin only)
export const updatePickupStatus = async (id, statusData) => {
  const response = await api.patch(`/pickups/${id}/status`, statusData);
  return response.data;
};

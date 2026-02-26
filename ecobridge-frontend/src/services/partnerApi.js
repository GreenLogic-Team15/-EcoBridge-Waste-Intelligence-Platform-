import api from "./apiClient";

// Get all available wastes for partner
export const getAvailableWastes = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append("category", filters.category);
  if (filters.urgent) params.append("urgent", filters.urgent);
  if (filters.nearby) params.append("nearby", filters.nearby);
  if (filters.maxDistance) params.append("maxDistance", filters.maxDistance);
  
  const response = await api.get(`/partner/wastes?${params.toString()}`);
  return response.data;
};

// Partner accepts/requests a specific pickup
export const requestPartnerPickup = async (pickupId) => {
  const response = await api.post("/partner/request-pickup", { pickupId });
  return response.data;
};

// Get partner's accepted pickups
export const getPartnerPickups = async () => {
  const response = await api.get("/pickups");
  return response.data;
};

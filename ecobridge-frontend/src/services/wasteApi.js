import api from "./apiClient";

// Create waste log
export const createWasteLog = async (wasteData) => {
  const response = await api.post("/waste", wasteData);
  return response.data;
};

// Get user's waste logs
export const getMyWasteLogs = async () => {
  const response = await api.get("/waste/my-logs");
  return response.data;
};

// Update waste log
export const updateWasteLog = async (id, updateData) => {
  const response = await api.put(`/waste/${id}`, updateData);
  return response.data;
};

// Analyze waste image
export const analyzeWasteImage = async (formData) => {
  const response = await api.post("/waste/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete waste log
export const deleteWasteLog = async (id) => {
  const response = await api.delete(`/waste/${id}`);
  return response.data;
};

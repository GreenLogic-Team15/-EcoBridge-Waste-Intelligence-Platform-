import axios from "axios";

// create reusable axios instance
const api = axios.create({
  baseURL: "https://ecobridge-backend-x2uh.onrender.com",
});

export const submitWasteLog = async (wasteData) => {
  const response = await api.post("/posts", wasteData);
  return response.data;
};

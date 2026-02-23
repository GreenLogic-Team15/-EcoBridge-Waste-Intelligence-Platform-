import axios from "axios";

// create reusable axios instance
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const submitWasteLog = async (wasteData) => {
  const response = await api.post("/posts", wasteData);
  return response.data;
};

import api from "./apiClient";

// Get all notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (id) => {
  const response = await api.put(`/notifications/${id}/read`);
  return response.data;
};

// Get unread notification count
export const getUnreadCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data;
};

import api from "./apiClient";

// Send a message
export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};

// Get all messages in a conversation
export const getConversationMessages = async (conversationId) => {
  const response = await api.get(`/messages/conversation/${conversationId}`);
  return response.data;
};

// Get inbox (all conversations)
export const getInbox = async () => {
  const response = await api.get("/messages/inbox");
  return response.data;
};

// Create or get conversation
export const createOrGetConversation = async (conversationData) => {
  const response = await api.post("/messages/conversation", conversationData);
  return response.data;
};

// Mark pickup as successful (SME only)
export const markPickupSuccessful = async (conversationId, partnerId) => {
  const response = await api.put(
    `/messages/conversation/${conversationId}/successful`,
    { partnerId }
  );
  return response.data;
};

// Mark pickup as completed (SME only)
export const markPickupCompleted = async (conversationId) => {
  const response = await api.put(
    `/messages/conversation/${conversationId}/completed`
  );
  return response.data;
};

import api from "../api/api";

export const messageService = {
  async getMessagesByProjectId(projectId) {
    const response = await api.get(`/api/messages/chat/${projectId}`);
    return response.data;
  },

  async sendMessage(senderId, projectId, content) {
    const response = await api.post("/api/messages/send", {
      senderId,
      projectId,
      content,
    });
    return response.data;
  },
};

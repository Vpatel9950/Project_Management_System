import api from "../api/api";

export const userService = {
  async getAllUsers() {
    const response = await api.get("/api/users");
    return response.data;
  },

  async updateUserRole(userId, role) {
    const response = await api.put(`/api/users/${userId}/role`, null, {
      params: { role },
    });
    return response.data;
  },

  async deleteUser(userId) {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data;
  },
};

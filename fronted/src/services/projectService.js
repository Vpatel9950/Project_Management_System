import api from "../api/api";

export const projectService = {
  // Fetch projects with optional category and tag parameters
  async getProjects(category = null, tag = null) {
    const params = {};
    if (category && category !== "all") params.category = category;
    if (tag && tag !== "All") params.tag = tag;
    const response = await api.get("/api/projects", { params });
    return response.data;
  },

  async getProjectById(projectId) {
    const response = await api.get(`/api/projects/${projectId}`);
    return response.data;
  },

  async createProject(projectData) {
    // projectData: { name, description, category, tags: [] }
    const response = await api.post("/api/projects", projectData);
    return response.data;
  },

  async updateProject(projectId, projectData) {
    const response = await api.patch(`/api/projects/${projectId}`, projectData);
    return response.data;
  },

  async deleteProject(projectId) {
    const response = await api.delete(`/api/projects/${projectId}`);
    return response.data;
  },

  async searchProjects(keyword) {
    const response = await api.get("/api/projects/search", {
      params: { keyword },
    });
    return response.data;
  },

  async sendInvitation(email, projectId) {
    const response = await api.post("/api/projects/invite", { email, projectId });
    return response.data;
  },

  async acceptInvitation(token) {
    const response = await api.get("/api/projects/accept_invitation", {
      params: { token },
    });
    return response.data;
  },

  async getProjectChat(projectId) {
    const response = await api.get(`/api/projects/${projectId}/chat`);
    return response.data;
  },
};

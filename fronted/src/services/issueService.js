import api from "../api/api";

export const issueService = {
  async getIssuesByProjectId(projectId) {
    const response = await api.get(`/api/issues/project/${projectId}`);
    return response.data;
  },

  async getIssueById(issueId) {
    const response = await api.get(`/api/issues/${issueId}`);
    return response.data;
  },

  async createIssue(issueData) {
    // issueData: { title, description, status, projectId, priority, dueDate }
    const response = await api.post("/api/issues", issueData);
    return response.data;
  },

  async deleteIssue(issueId) {
    const response = await api.delete(`/api/issues/${issueId}`);
    return response.data;
  },

  async assignUserToIssue(issueId, userId) {
    const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
    return response.data;
  },

  async updateIssueStatus(issueId, status) {
    const response = await api.put(`/api/issues/${issueId}/status/${status}`);
    return response.data;
  },
};

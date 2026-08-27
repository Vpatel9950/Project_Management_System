import api from "../api/api";

export const commentService = {
  async getCommentsByIssueId(issueId) {
    const response = await api.get(`/api/comments/${issueId}`);
    return response.data;
  },

  async createComment(issueId, content) {
    const response = await api.post("/api/comments", { issueId, content });
    return response.data;
  },

  async deleteComment(commentId) {
    const response = await api.delete(`/api/comments/${commentId}`);
    return response.data;
  },
};

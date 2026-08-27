import api from "../api/api";

export const authService = {
  async register(userData) {
    // userData: { fullName, email, password }
    const response = await api.post("/auth/signup", userData);
    if (response.data?.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    return response.data;
  },

  async login(credentials) {
    // credentials: { email, password }
    const response = await api.post("/auth/signin", credentials);
    if (response.data?.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    return response.data;
  },

  async getUserProfile() {
    const response = await api.get("/api/users/profile");
    return response.data;
  },

  logout() {
    localStorage.removeItem("jwt");
  },
};

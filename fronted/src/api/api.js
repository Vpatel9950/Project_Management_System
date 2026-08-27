import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically to every request if present
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token or unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

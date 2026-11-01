import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const userProfile = await authService.getUserProfile();
      setUser(userProfile);
      setError(null);
    } catch (err) {
      console.error("Failed to load user profile", err);
      authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await authService.login({ email, password });
      await fetchUserProfile();
      return data;
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (fullName, email, password, role = "ROLE_MEMBER") => {
    setError(null);
    try {
      const data = await authService.register({ fullName, email, password, role });
      await fetchUserProfile();
      return data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Email may already be in use.";
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = user?.role === "ROLE_ADMIN";
  const isManager = user?.role === "ROLE_MANAGER";
  const isMember = user?.role === "ROLE_MEMBER";
  const canManageProjects = isAdmin || isManager;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        fetchUserProfile,
        isAdmin,
        isManager,
        isMember,
        canManageProjects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./pages/Navbar/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProjectList from "./pages/ProjectList/ProjectList";
import ProjectDetails from "./pages/Project/ProjectDetails";
import CreateProjectForm from "./pages/Project/CreateProjectForm";
import AcceptInvitation from "./pages/Invitation/AcceptInvitation";
import Subscription from "./pages/Subscription/Subscription";
import PaymentSuccess from "./pages/Subscription/PaymentSuccess";
import AdminUsers from "./pages/Admin/AdminUsers";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  // Check if public page (auth or standalone landing)
  const isPublicPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/accept_invitation";

  const handleProjectCreated = (newProject) => {
    if (newProject?.id) {
      navigate(`/project/${newProject.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Show Navbar & Sidebar for protected app pages */}
        {!isPublicPage && (
          <Navbar onOpenCreateProject={() => setIsCreateProjectOpen(true)} />
        )}

        <div className="flex min-h-[calc(100vh-4rem)]">
          {!isPublicPage && user && (
            <Sidebar onOpenCreateProject={() => setIsCreateProjectOpen(true)} />
          )}

          <main className="flex-1 overflow-x-hidden">
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/accept_invitation" element={<AcceptInvitation />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard onOpenCreateProject={() => setIsCreateProjectOpen(true)} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <ProjectList onOpenCreateProject={() => setIsCreateProjectOpen(true)} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/project/:id"
                element={
                  <ProtectedRoute>
                    <ProjectDetails />
                  </ProtectedRoute>
                }
              />

              {/* Admin Console Route */}
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/subscription"
                element={
                  <ProtectedRoute>
                    <Subscription />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upgrade_plan/success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>

      {/* Modern 3D Footer */}
      {!isPublicPage && <Footer />}

      {/* Global Create Project Modal */}
      {user && (
        <CreateProjectForm
          isOpen={isCreateProjectOpen}
          onClose={() => setIsCreateProjectOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}
    </div>
  );
}

export default App;

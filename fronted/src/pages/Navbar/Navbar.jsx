import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Kanban,
  Plus,
  LogOut,
  User as UserIcon,
  Crown,
  LayoutDashboard,
  Folder,
  Layers,
  Menu,
  X,
  Shield,
  Briefcase,
  UserCheck,
  Users,
} from "lucide-react";

const Navbar = ({ onOpenCreateProject }) => {
  const { user, logout, isAdmin, isManager, isMember, canManageProjects } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    if (role === "ROLE_ADMIN") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
          <Shield className="w-3 h-3" /> Admin
        </span>
      );
    }
    if (role === "ROLE_MANAGER") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          <Briefcase className="w-3 h-3" /> Manager
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        <UserCheck className="w-3 h-3" /> Member
      </span>
    );
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  ProjectManager<span className="text-indigo-400">3D</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                  RBAC Enterprise
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
            <Link
              to="/"
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              Projects
            </Link>

            {/* Admin Exclusive Link */}
            {isAdmin && (
              <Link
                to="/admin/users"
                className="px-4 py-1.5 rounded-lg text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-all flex items-center gap-2 border border-rose-500/30"
              >
                <Users className="w-4 h-4 text-rose-400" />
                Manage Users
              </Link>
            )}

            <Link
              to="/subscription"
              className="px-4 py-1.5 rounded-lg text-sm font-medium text-amber-300 hover:text-amber-200 hover:bg-slate-800/60 transition-all flex items-center gap-2"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              Upgrade Plan
            </Link>
          </nav>

          {/* Action Buttons & User Profile */}
          <div className="flex items-center gap-3">
            {canManageProjects && onOpenCreateProject && (
              <button
                onClick={onOpenCreateProject}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>
            )}

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-900 border border-slate-800/80 transition-all focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-500/20">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left items-start">
                    <span className="text-sm font-semibold text-slate-200 leading-tight">
                      {user.fullName}
                    </span>
                    <div className="mt-0.5">
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-white truncate">{user.email}</p>
                      <div className="mt-1.5">{getRoleBadge(user.role)}</div>
                    </div>

                    {isAdmin && (
                      <Link
                        to="/admin/users"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-rose-400" />
                        Admin User Management
                      </Link>
                    )}

                    <Link
                      to="/subscription"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <Crown className="w-4 h-4 text-amber-400" />
                      Subscription Plan
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Dashboard
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900"
          >
            Projects
          </Link>
          {isAdmin && (
            <Link
              to="/admin/users"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-rose-300 hover:bg-slate-900"
            >
              Manage Users (Admin)
            </Link>
          )}
          <Link
            to="/subscription"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-amber-300 hover:bg-slate-900"
          >
            Upgrade Plan
          </Link>
          {canManageProjects && onOpenCreateProject && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCreateProject();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl font-medium"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

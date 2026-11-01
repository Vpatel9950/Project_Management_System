import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  Crown,
  PlusCircle,
  Sparkles,
  Shield,
  Users,
} from "lucide-react";

const Sidebar = ({ onOpenCreateProject }) => {
  const { isAdmin, canManageProjects } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      color: "text-indigo-400",
    },
    {
      name: "All Projects",
      path: "/projects",
      icon: FolderKanban,
      color: "text-purple-400",
    },
    ...(isAdmin
      ? [
          {
            name: "User Management",
            path: "/admin/users",
            icon: Users,
            color: "text-rose-400",
          },
        ]
      : []),
    {
      name: "Subscription",
      path: "/subscription",
      icon: Crown,
      color: "text-amber-400",
    },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-slate-950/60 backdrop-blur-xl border-r border-slate-800/80 p-4 shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Quick Action Button - Managers & Admins only */}
      {canManageProjects && onOpenCreateProject && (
        <div className="mb-6">
          <button
            onClick={onOpenCreateProject}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span>Create Project</span>
          </button>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
          Navigation
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white border border-slate-800 shadow-md shadow-slate-950/50"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`
              }
            >
              <Icon className={`w-5 h-5 ${item.color}`} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* 3D Upgrade Banner */}
      <div className="mt-auto pt-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 p-4 shadow-xl">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-20 h-20 bg-indigo-500/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Pro Upgrade
          </div>
          <p className="text-xs text-slate-300 mb-3 font-medium">
            Unlock unlimited project creation & team member invitations.
          </p>
          <NavLink
            to="/subscription"
            className="block text-center w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Upgrade Plan
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

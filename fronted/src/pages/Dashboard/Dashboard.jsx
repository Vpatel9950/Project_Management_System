import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { projectService } from "../../services/projectService";
import { subscriptionService } from "../../services/subscriptionService";
import ProjectCard from "../Project/ProjectCard";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckCircle2,
  Users,
  Crown,
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  MessageSquare,
  Layers,
} from "lucide-react";

const Dashboard = ({ onOpenCreateProject }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projData, subData] = await Promise.allSettled([
          projectService.getProjects(),
          subscriptionService.getUserSubscription(),
        ]);

        if (projData.status === "fulfilled") {
          setProjects(projData.value || []);
        }
        if (subData.status === "fulfilled") {
          setSubscription(subData.value || null);
        }
      } catch (err) {
        console.error("Dashboard data load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalMembers = projects.reduce((acc, p) => acc + (p.team?.length || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 3D Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Workspace Dashboard
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">{user?.fullName || "Developer"}</span> 👋
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Track active projects, organize task kanban columns, invite team members via automated email services, and accelerate your engineering workflow.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {onOpenCreateProject && (
                <button
                  onClick={onOpenCreateProject}
                  className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Project</span>
                </button>
              )}

              <Link
                to="/projects"
                className="px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm rounded-2xl transition-all flex items-center gap-2"
              >
                <span>Explore Workspaces</span>
                <ArrowRight className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>
          </div>

          {/* 3D Hero Graphic Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900">
              <img
                src="/assets/hero_3d.jpg"
                alt="3D Project Management Dashboard"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-indigo-300">Live 3D Kanban Suite</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Spring Boot 3 API</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Projects
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {loading ? "..." : projects.length}
          </div>
          <p className="text-xs text-slate-500 mt-2">Active workspaces in backend</p>
        </div>

        {/* Card 2 */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Team Collaborators
            </span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {loading ? "..." : totalMembers}
          </div>
          <p className="text-xs text-slate-500 mt-2">Invited members across projects</p>
        </div>

        {/* Card 3 */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Backend Status
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            Connected
          </div>
          <p className="text-xs text-slate-500 mt-2">Spring Boot API running on :5454</p>
        </div>

        {/* Card 4 */}
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Subscription
            </span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Crown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 uppercase tracking-wide">
            {subscription?.planType || "FREE"}
          </div>
          <Link
            to="/subscription"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold mt-2 inline-block"
          >
            Upgrade Plan &rarr;
          </Link>
        </div>
      </div>

      {/* Feature Showcase Banner with 3D Workflow Image */}
      <div className="backdrop-blur-xl bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/assets/workflow_3d.jpg"
                alt="3D Digital Workflow"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
                Platform Architecture
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                Engineered for High-Performance Teams
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-300">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>3D Kanban Board</span>
                </div>
                <p className="text-xs text-slate-400">
                  Categorize tasks into Pending, In Progress, and Completed columns with status updates.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-300">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Email Invitations</span>
                </div>
                <p className="text-xs text-slate-400">
                  Dispatch email tokens via JavaMailSender for seamless project onboarding.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Team Discussion Chat</span>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time project message exchange saved right in your Spring Data JPA backend.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Razorpay Payments</span>
                </div>
                <p className="text-xs text-slate-400">
                  Secure plan upgrade link generation without exposing private keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Your Active Projects</h2>
            <p className="text-slate-400 text-sm">Select a project to open its Kanban board & team chat</p>
          </div>

          <Link
            to="/projects"
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 backdrop-blur-xl bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
            <p className="text-slate-400 text-sm">No projects created yet.</p>
            {onOpenCreateProject && (
              <button
                onClick={onOpenCreateProject}
                className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm"
              >
                Create Your First Project
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

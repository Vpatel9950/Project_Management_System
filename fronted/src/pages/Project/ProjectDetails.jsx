import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { useAuth } from "../../context/AuthContext";
import IssueBoard from "../Issue/IssueBoard";
import ProjectChat from "../Chat/ProjectChat";
import InviteMemberModal from "../../components/InviteMemberModal";
import {
  FolderGit2,
  Users,
  UserPlus,
  Tag,
  ArrowLeft,
  Kanban,
  MessageSquare,
  Sparkles,
  Shield,
  Briefcase,
  UserCheck,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { user, isAdmin, isManager, isMember, canManageProjects } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks"); // "tasks" | "chat"
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        console.error("Failed to load project details", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-400">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        Loading Project Workspace...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-400">
        <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
        <Link to="/projects" className="text-indigo-400 hover:underline">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Project Header Banner */}
      <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <FolderGit2 className="w-3.5 h-3.5" />
                {project.category || "General"}
              </span>

              {project.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-950/80 text-purple-300 border border-purple-500/20"
                >
                  <Tag className="w-3 h-3 text-purple-400" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>

          {canManageProjects && (
            <button
              onClick={() => setIsInviteOpen(true)}
              className="self-start md:self-auto px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Team Member</span>
            </button>
          )}
        </div>

        {/* Team Members List */}
        <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Team Members ({project.team ? project.team.length : 0}):
            </span>

            <div className="flex items-center -space-x-2 overflow-hidden">
              {project.team?.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-md"
                  title={`${member.fullName} (${member.email})`}
                >
                  {member.fullName ? member.fullName[0].toUpperCase() : "U"}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Owner / Lead: <span className="text-slate-200 font-semibold">{project.owner?.fullName || "You"}</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "tasks"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Kanban className="w-4 h-4" />
            Task Board
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === "chat"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Team Chat
          </button>
        </div>
      </div>

      {/* Active Tab Content */}
      {activeTab === "tasks" ? (
        <IssueBoard projectId={project.id} teamMembers={project.team || []} />
      ) : (
        <div className="max-w-3xl mx-auto">
          <ProjectChat projectId={project.id} />
        </div>
      )}

      {/* Email Invite Modal */}
      {canManageProjects && (
        <InviteMemberModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
          projectId={project.id}
          projectName={project.name}
        />
      )}
    </div>
  );
};

export default ProjectDetails;

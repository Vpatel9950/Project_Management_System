import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Users, FolderGit2, Trash2, ArrowUpRight, Tag, User } from "lucide-react";

const ProjectCard = ({ project, onDelete }) => {
  const { user, isAdmin } = useAuth();
  if (!project) return null;

  const { id, name, description, category, tags = [], team = [], owner } = project;
  const canDelete = isAdmin || (owner?.id && user?.id && owner.id === user.id);

  return (
    <div className="group relative backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition-all"></div>

      <div>
        {/* Header: Category & Delete */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5" />
            {category || "General"}
          </span>

          {onDelete && canDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete project "${name}"?`)) {
                  onDelete(id);
                }
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
              title="Delete Project (Admin/Owner only)"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Project Name & Description */}
        <Link to={`/project/${id}`}>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
            <span>{name}</span>
            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />
          </h3>
        </Link>
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
          {description || "No description provided."}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {tags.map((t, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-950/80 text-slate-300 border border-slate-800"
              >
                <Tag className="w-3 h-3 text-purple-400" />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-[10px]">
            <User className="w-3 h-3 text-indigo-400" />
          </div>
          <span className="truncate max-w-[120px]">
            {owner?.fullName || "Owner"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
          <Users className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-semibold">{team ? team.length : 0} members</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

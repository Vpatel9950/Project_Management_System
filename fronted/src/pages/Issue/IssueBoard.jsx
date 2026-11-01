import React, { useState, useEffect } from "react";
import { issueService } from "../../services/issueService";
import { useAuth } from "../../context/AuthContext";
import CreateIssueModal from "./CreateIssueModal";
import IssueDetailsModal from "./IssueDetailsModal";
import {
  Kanban,
  Plus,
  Clock,
  PlayCircle,
  CheckCircle2,
  User,
  Calendar,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

const columns = [
  {
    id: "pending",
    title: "Pending",
    icon: Clock,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "in_progress",
    title: "In Progress",
    icon: PlayCircle,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "done",
    title: "Completed",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const IssueBoard = ({ projectId, teamMembers = [] }) => {
  const { canManageProjects, isMember } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await issueService.getIssuesByProjectId(projectId);
      setIssues(data || []);
    } catch (err) {
      console.error("Failed to load issues", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchIssues();
    }
  }, [projectId]);

  const handleIssueCreated = (newIssue) => {
    setIssues([...issues, newIssue]);
  };

  const handleUpdateIssue = (updatedIssue) => {
    setIssues(issues.map((i) => (i.id === updatedIssue.id ? updatedIssue : i)));
    if (selectedIssue?.id === updatedIssue.id) {
      setSelectedIssue(updatedIssue);
    }
  };

  const handleDeleteIssue = (deletedId) => {
    setIssues(issues.filter((i) => i.id !== deletedId));
    setSelectedIssue(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Kanban className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Task Board</h2>
        </div>

        {canManageProjects ? (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        ) : (
          <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            Member mode: Click tasks to update progress & status
          </span>
        )}
      </div>

      {/* 3D Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const Icon = col.icon;
          const columnIssues = issues.filter(
            (i) => (i.status || "pending").toLowerCase() === col.id
          );

          return (
            <div
              key={col.id}
              className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between p-3 rounded-xl border ${col.bgColor} mb-4`}
              >
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <Icon className={`w-4 h-4 ${col.color}`} />
                  <span>{col.title}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-950/60 text-slate-300 border border-slate-800">
                  {columnIssues.length}
                </span>
              </div>

              {/* Task Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {loading ? (
                  <div className="p-4 rounded-xl bg-slate-950/40 animate-pulse h-24"></div>
                ) : columnIssues.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    No tasks in {col.title.toLowerCase()}
                  </div>
                ) : (
                  columnIssues.map((issue) => (
                    <div
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue)}
                      className="group backdrop-blur-md bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 cursor-pointer shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {issue.priority || "MEDIUM"}
                        </span>
                        {issue.dueDate && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {issue.dueDate}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {issue.title}
                      </h4>

                      {issue.description && (
                        <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                          {issue.description}
                        </p>
                      )}

                      <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[11px] truncate max-w-[120px]">
                            {issue.assignedTo?.fullName || "Unassigned"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {canManageProjects && (
        <CreateIssueModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          projectId={projectId}
          onIssueCreated={handleIssueCreated}
        />
      )}

      <IssueDetailsModal
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        issue={selectedIssue}
        teamMembers={teamMembers}
        onUpdateIssue={handleUpdateIssue}
        onDeleteIssue={handleDeleteIssue}
      />
    </div>
  );
};

export default IssueBoard;

import React, { useState, useEffect } from "react";
import { issueService } from "../../services/issueService";
import { commentService } from "../../services/commentService";
import {
  X,
  UserPlus,
  Trash2,
  MessageSquare,
  Send,
  Calendar,
  Tag,
  CheckCircle2,
  Clock,
} from "lucide-react";

const statuses = ["pending", "in_progress", "done"];

const IssueDetailsModal = ({
  isOpen,
  onClose,
  issue,
  teamMembers = [],
  onUpdateIssue,
  onDeleteIssue,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(
    issue?.assignedTo?.id || ""
  );

  useEffect(() => {
    if (issue?.id) {
      fetchComments();
      setSelectedAssignee(issue.assignedTo?.id || "");
    }
  }, [issue]);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const data = await commentService.getCommentsByIssueId(issue.id);
      setComments(data || []);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoadingComments(false);
    }
  };

  if (!isOpen || !issue) return null;

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await issueService.updateIssueStatus(issue.id, newStatus);
      if (onUpdateIssue) onUpdateIssue(updated);
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleAssigneeChange = async (userId) => {
    setSelectedAssignee(userId);
    if (!userId) return;
    try {
      const updated = await issueService.assignUserToIssue(issue.id, userId);
      if (onUpdateIssue) onUpdateIssue(updated);
    } catch (err) {
      alert("Failed to assign member.");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const added = await commentService.createComment(issue.id, newComment.trim());
      setComments([...comments, added]);
      setNewComment("");
    } catch (err) {
      alert("Failed to post comment.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (err) {
      alert("Failed to delete comment.");
    }
  };

  const handleDeleteIssue = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await issueService.deleteIssue(issue.id);
        if (onDeleteIssue) onDeleteIssue(issue.id);
        onClose();
      } catch (err) {
        alert("Failed to delete task.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                TASK-{issue.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {issue.priority || "MEDIUM"}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{issue.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDeleteIssue}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete Task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-800">
          {/* Main info */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Description
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {issue.description || "No detailed description provided."}
              </p>
            </div>
          </div>

          {/* Sidebar Properties */}
          <div className="space-y-4 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60">
            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Status
              </label>
              <select
                value={issue.status || "pending"}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 capitalize"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Assignee Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Assigned To
              </label>
              <select
                value={selectedAssignee}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Unassigned</option>
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            {issue.dueDate && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Due Date
                </label>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{issue.dueDate}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            Comments & Activity ({comments.length})
          </h3>

          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={submittingComment || !newComment.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Comment</span>
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-1">
            {loadingComments ? (
              <p className="text-xs text-slate-500 text-center py-4">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No comments yet. Start the conversation!</p>
            ) : (
              comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-300">
                        {c.user?.fullName || "Team Member"}
                      </span>
                      {c.createdDateTime && (
                        <span className="text-[10px] text-slate-500">
                          {new Date(c.createdDateTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-200">{c.content}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Delete Comment"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsModal;

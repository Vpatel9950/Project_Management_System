import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import { Shield, Users, Briefcase, UserCheck, Trash2, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

const AdminUsers = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users", err);
      setError(err.response?.data?.message || "Failed to load user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setError(null);
      await userService.updateUserRole(userId, newRole);
      setSuccessMessage("User role updated successfully.");
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update role.");
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (userId === user?.id) {
      alert("You cannot delete your own admin account.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      try {
        setError(null);
        await userService.deleteUser(userId);
        setSuccessMessage(`User "${userName}" deleted successfully.`);
        setUsers(users.filter((u) => u.id !== userId));
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete user.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Access Restricted</h2>
        <p className="text-slate-400 text-sm">
          You need <span className="text-rose-400 font-semibold">Administrator Privileges</span> to access system user management operations.
        </p>
      </div>
    );
  }

  const adminCount = users.filter((u) => u.role === "ROLE_ADMIN").length;
  const managerCount = users.filter((u) => u.role === "ROLE_MANAGER").length;
  const memberCount = users.filter((u) => u.role === "ROLE_MEMBER" || !u.role).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
            <Shield className="w-3.5 h-3.5" /> Administrator Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            User & Role Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage system users, assign administrative or project manager privileges, and supervise operations.
          </p>
        </div>
      </div>

      {/* Feedback Messages */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Users</span>
          <div className="text-2xl font-extrabold text-white mt-2">{users.length}</div>
        </div>
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Admins</span>
          <div className="text-2xl font-extrabold text-white mt-2">{adminCount}</div>
        </div>
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Managers</span>
          <div className="text-2xl font-extrabold text-white mt-2">{managerCount}</div>
        </div>
        <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Members</span>
          <div className="text-2xl font-extrabold text-white mt-2">{memberCount}</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Registered System Users
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400 text-sm">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Assigned Role</th>
                  <th className="px-6 py-4">Change Privilege</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => {
                  const role = u.role || "ROLE_MEMBER";
                  const isCurrent = u.id === user?.id;

                  return (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                          {u.fullName ? u.fullName[0].toUpperCase() : "U"}
                        </div>
                        <div>
                          <span>{u.fullName}</span>
                          {isCurrent && (
                            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                              (You)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{u.email}</td>
                      <td className="px-6 py-4">
                        {role === "ROLE_ADMIN" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            <Shield className="w-3.5 h-3.5" /> Admin
                          </span>
                        ) : role === "ROLE_MANAGER" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                            <Briefcase className="w-3.5 h-3.5" /> Manager
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <UserCheck className="w-3.5 h-3.5" /> Member
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          disabled={isCurrent}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-white focus:outline-none focus:border-indigo-500 disabled:opacity-40"
                        >
                          <option value="ROLE_MEMBER">Member (Task Level)</option>
                          <option value="ROLE_MANAGER">Manager (Project Lead)</option>
                          <option value="ROLE_ADMIN">Admin (Full Control)</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!isCurrent && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.fullName)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

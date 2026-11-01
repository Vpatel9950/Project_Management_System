import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User as UserIcon, Mail, Lock, ArrowRight, Sparkles, Shield, Briefcase, Check } from "lucide-react";

const rolesList = [
  {
    id: "ROLE_MEMBER",
    title: "Member",
    desc: "View assigned projects, complete tasks & collaborate",
    icon: UserIcon,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40",
  },
  {
    id: "ROLE_MANAGER",
    title: "Manager",
    desc: "Create & manage projects, assign tasks to members",
    icon: Briefcase,
    color: "from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/40",
  },
  {
    id: "ROLE_ADMIN",
    title: "Admin",
    desc: "Full system control, manage all projects & users",
    icon: Shield,
    color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/40",
  },
];

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("ROLE_MEMBER");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      await register(fullName, email, password, selectedRole);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-lg relative z-10 my-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-lg shadow-purple-500/30 mb-3 transform hover:scale-105 transition-transform">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-purple-300 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Select your role to access your tailored workspace
          </p>
        </div>

        <div className="backdrop-blur-xl bg-slate-900/70 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] hover:border-slate-700/60 transition-all duration-300">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Select Role */}
            <div className="pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {rolesList.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between relative ${
                        isSelected
                          ? `bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg`
                          : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-500 text-slate-950 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`p-1.5 rounded-lg border ${r.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-sm text-white">{r.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        {r.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processInvitation = async () => {
      if (!token) {
        setError("Missing invitation token in URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await projectService.acceptInvitation(token);
        setInvitation(res);
        setError(null);
      } catch (err) {
        console.error("Failed to accept invitation", err);
        setError(
          err.response?.data?.message || "Invalid or expired invitation token."
        );
      } finally {
        setLoading(false);
      }
    };

    processInvitation();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/30 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md relative z-10 backdrop-blur-xl bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
        {loading ? (
          <div className="py-12 space-y-4">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-white">Validating Invitation...</h2>
            <p className="text-slate-400 text-sm">Joining project workspace</p>
          </div>
        ) : error ? (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Invitation Failed</h2>
            <p className="text-slate-400 text-sm">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all mt-4"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="py-6 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-white">Invitation Accepted!</h2>
            <p className="text-slate-300 text-sm">
              You have successfully joined the project team.
            </p>

            <button
              onClick={() => {
                if (invitation?.projectId) {
                  navigate(`/project/${invitation.projectId}`);
                } else {
                  navigate("/");
                }
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Open Project Workspace</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptInvitation;

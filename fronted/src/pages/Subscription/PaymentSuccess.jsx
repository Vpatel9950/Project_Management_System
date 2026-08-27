import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { subscriptionService } from "../../services/subscriptionService";
import { CheckCircle2, Crown, ArrowRight, AlertCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const planType = searchParams.get("planType") || "MONTHLY";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processUpgrade = async () => {
      try {
        setLoading(true);
        await subscriptionService.upgradeSubscription(planType);
        setSuccess(true);
      } catch (err) {
        console.error("Upgrade error", err);
        setError("Payment verified, but plan update failed.");
      } finally {
        setLoading(false);
      }
    };

    processUpgrade();
  }, [planType]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden text-slate-100">
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md relative z-10 backdrop-blur-xl bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
        {loading ? (
          <div className="py-12 space-y-4">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold text-white">Upgrading Plan...</h2>
            <p className="text-slate-400 text-sm">Processing Razorpay transaction status</p>
          </div>
        ) : error ? (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Upgrade Issue</h2>
            <p className="text-slate-400 text-sm">{error}</p>
            <Link
              to="/subscription"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition-all mt-4"
            >
              Back to Subscription
            </Link>
          </div>
        ) : (
          <div className="py-6 space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Crown className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-bold text-white">Upgrade Successful!</h2>
            <p className="text-slate-300 text-sm">
              Your account has been upgraded to <strong className="text-amber-400 uppercase">{planType}</strong> plan.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React, { useState, useEffect } from "react";
import { subscriptionService } from "../../services/subscriptionService";
import { Crown, Check, Zap, Sparkles, ShieldCheck } from "lucide-react";

const Subscription = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgradingPlan, setUpgradingPlan] = useState(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const sub = await subscriptionService.getUserSubscription();
      setCurrentSubscription(sub);
    } catch (err) {
      console.error("Failed to fetch subscription", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planType) => {
    if (planType === "FREE") return;

    try {
      setUpgradingPlan(planType);
      const res = await subscriptionService.createPaymentLink(planType);
      if (res.payment_link_url) {
        window.location.href = res.payment_link_url;
      } else {
        alert("Failed to generate payment link.");
      }
    } catch (err) {
      console.error("Payment link error", err);
      alert(err.response?.data?.message || "Failed to initiate Razorpay checkout.");
    } finally {
      setUpgradingPlan(null);
    }
  };

  const currentPlan = currentSubscription?.planType || "FREE";

  const plans = [
    {
      type: "FREE",
      title: "Starter Plan",
      price: "₹0",
      period: "forever",
      description: "Essential project & task tracking features for individual developers.",
      features: [
        "Create up to 3 Projects",
        "Unlimited Tasks & Comments",
        "Basic Kanban Task Board",
        "Email Support",
      ],
      badge: "Standard",
      badgeColor: "bg-slate-800 text-slate-300",
    },
    {
      type: "MONTHLY",
      title: "Monthly Pro",
      price: "₹799",
      period: "/ month",
      description: "Full suite for fast-growing engineering teams & active project leads.",
      features: [
        "Unlimited Projects",
        "Unlimited Team Member Invitations",
        "Full Project Discussion Chat",
        "Priority Support",
        "Razorpay Payment Secured",
      ],
      badge: "Most Popular",
      badgeColor: "bg-indigo-600 text-white",
      highlight: true,
    },
    {
      type: "ANNUALLY",
      title: "Annual Enterprise",
      price: "₹6,711",
      period: "/ year (30% OFF)",
      description: "Maximum efficiency & savings for dedicated development teams.",
      features: [
        "Everything in Monthly Pro",
        "30% Discount on Annual Billing",
        "Dedicated Account Management",
        "Unlimited High-Priority Workspaces",
      ],
      badge: "Best Value",
      badgeColor: "bg-amber-500 text-slate-950 font-bold",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Crown className="w-4 h-4" /> Enterprise Subscription
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Flexible Pricing for Every Engineering Team
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Upgrade your plan to unlock unlimited project creation, team collaboration, and priority features securely powered by Razorpay.
        </p>
      </div>

      {/* 3D Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.type;
          return (
            <div
              key={plan.type}
              className={`relative backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 ${
                plan.highlight
                  ? "bg-slate-900/90 border-2 border-indigo-500/80 shadow-[0_20px_50px_rgba(79,70,229,0.25)]"
                  : "bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 shadow-xl"
              }`}
            >
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-slate-400 text-xs mb-6 min-h-[36px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-slate-800">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <div className="p-1 rounded-full bg-indigo-500/10 text-indigo-400 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 bg-slate-800 text-emerald-400 font-bold rounded-2xl border border-emerald-500/30 cursor-default flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Current Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.type)}
                    disabled={upgradingPlan === plan.type}
                    className={`w-full py-3.5 px-4 font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {upgradingPlan === plan.type ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Upgrade to {plan.title}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;

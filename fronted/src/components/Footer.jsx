import React from "react";
import { Link } from "react-router-dom";
import {
  Kanban,
  Code2,
  Globe,
  Share2,
  Heart,
  ShieldCheck,
  Zap,
  Layers,
  Crown,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 relative overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300 transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  ProjectManager<span className="text-indigo-400">3D</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">
                  Enterprise Suite
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Enterprise-grade Project & Task Management system powered by Java 21 Spring Boot and modern 3D React architecture.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all"
                title="Source Code"
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
              </a>
              <a
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all"
                title="Website"
              >
                <Globe className="w-4 h-4 text-purple-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-white transition-all"
                title="Network"
              >
                <Share2 className="w-4 h-4 text-pink-400" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">
                  Workspace Dashboard
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-400 transition-colors">
                  All Projects & Kanban
                </Link>
              </li>
              <li>
                <Link to="/subscription" className="hover:text-indigo-400 transition-colors">
                  Subscription & Pricing
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-indigo-400 transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Backend Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Powered By Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Java 21 & Spring Boot 3</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Spring Security & JWT Auth</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Spring Data JPA & MySQL</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Razorpay Payment Gateway</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                <span>React 19, Vite & Tailwind CSS</span>
              </li>
            </ul>
          </div>

          {/* Column 4: System Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Backend Connection
            </h4>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                REST API Live (:5454)
              </div>
              <p className="text-[11px] text-slate-400">
                Connected to Spring Boot API endpoints with automatic JWT header interceptors.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ProjectManager 3D. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Full Stack Software Engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

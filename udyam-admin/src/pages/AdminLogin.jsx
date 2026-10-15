import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { adminLogin } from "../api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@udyamsethu.com");
  const [password, setPassword] = useState("AdminPassword@123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your administrator email and password");
      return;
    }

    setLoading(true);

    try {
      const data = await adminLogin(email, password);

      if (data && data.token) {
        localStorage.setItem("udyam_admin_token", data.token);
        localStorage.setItem("udyam_admin_user", JSON.stringify(data.admin));
        navigate("/");
      } else {
        throw new Error(data.message || "Admin authentication failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@udyamsethu.com");
    setPassword("AdminPassword@123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#08101E] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* GLOW DECORATIONS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* LOGO & HEADING */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/20 ring-4 ring-white/10 mb-4">
            <Shield size={34} className="stroke-[2.2]" />
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Udyam <span className="text-cyan-400">Sethu</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-slate-400 mt-1">
            Head Administration Portal
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-[#0F1B30]/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-7 sm:p-9 shadow-2xl text-white">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Sign In to Admin Console</h2>
            <p className="text-xs text-slate-400 mt-1">
              Authenticate to manage approvals, students, employers, and institutions.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@udyamsethu.com"
                  required
                  className="w-full h-12 bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-12 bg-slate-900/80 border border-slate-700 rounded-xl pl-10 pr-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* QUICK CREDENTIAL BUTTON */}
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Default Super Admin:</span>
                <span className="text-cyan-300 font-mono text-[11px]">admin@udyamsethu.com</span>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 font-semibold transition"
              >
                Auto-fill
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-bold text-white shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Authenticating..." : "Access Admin Console"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
            Protected Head Portal • Authorized Personnel Only
          </div>
        </div>
      </div>
    </div>
  );
}

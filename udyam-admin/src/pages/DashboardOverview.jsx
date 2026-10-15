import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  Landmark,
  UserCheck,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { getDashboardStats, handleApprovalAction } from "../api";

export default function DashboardOverview() {
  const [stats, setStats] = useState(null);
  const [recentPending, setRecentPending] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      if (data && data.stats) {
        setStats(data.stats);
        setRecentPending(data.recentPending || []);
        setRecentLogs(data.recentLogs || []);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApprove = async (type, id, name) => {
    try {
      setActionLoading(id);
      const res = await handleApprovalAction(type, id, "approve");
      setMessage({ type: "success", text: `Approved ${name}! Credentials are now valid for login.` });
      await fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to approve request." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleQuickReject = async (type, id, name) => {
    try {
      setActionLoading(id);
      const res = await handleApprovalAction(type, id, "reject", "Application criteria not met");
      setMessage({ type: "info", text: `Rejected registration for ${name}.` });
      await fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to reject request." });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="animate-spin text-cyan-600" size={32} />
          <p className="text-sm font-semibold text-slate-500">Loading Head Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats?.totalStudents ?? 0,
      description: "Active student accounts enrolled",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50 text-blue-600 border-blue-100",
      link: "/students",
    },
    {
      title: "Registered Employers",
      value: stats?.totalEmployers ?? 0,
      description: `${stats?.pendingEmployers || 0} pending verification`,
      icon: Building2,
      color: "from-purple-600 to-indigo-600",
      lightBg: "bg-purple-50 text-purple-600 border-purple-100",
      link: "/employers",
    },
    {
      title: "Institutions & Colleges",
      value: stats?.totalInstitutions ?? 0,
      description: `${stats?.pendingInstitutions || 0} pending verification`,
      icon: Landmark,
      color: "from-cyan-600 to-blue-600",
      lightBg: "bg-cyan-50 text-cyan-600 border-cyan-100",
      link: "/institutions",
    },
    {
      title: "Pending Approvals",
      value: stats?.pendingApprovals ?? 0,
      description: "Awaiting administrator validation",
      icon: UserCheck,
      color: stats?.pendingApprovals > 0 ? "from-amber-500 to-rose-500" : "from-emerald-500 to-teal-600",
      lightBg: stats?.pendingApprovals > 0 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-100",
      link: "/approvals",
      pulse: stats?.pendingApprovals > 0,
    },
    {
      title: "Active Opportunities",
      value: stats?.activeOpportunities ?? 0,
      description: "Internships & jobs listed",
      icon: Briefcase,
      color: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      link: "/opportunities",
    },
  ];

  return (
    <div className="space-y-8">
      {/* PAGE BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0B1528] via-[#112344] to-[#172D57] p-7 rounded-3xl text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 text-xs font-semibold text-cyan-300 mb-3">
            <ShieldCheck size={14} />
            CENTRAL GOVERNANCE CONSOLE
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Head Administrator Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-xl">
            Control, inspect, and approve users across the student, employer, and institution portals. Approve registrations to validate user credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/approvals"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 font-bold text-sm text-white shadow-lg shadow-cyan-500/25 transition"
          >
            <UserCheck size={18} />
            Review Approvals ({stats?.pendingApprovals || 0})
          </Link>
          <button
            onClick={fetchData}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white transition border border-white/10"
            title="Refresh statistics"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* FEEDBACK ALERT */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-sm border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : message.type === "info"
              ? "bg-blue-50 text-blue-900 border-blue-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* PENDING APPROVAL ALERT BANNER IF PENDING > 0 */}
      {stats?.pendingApprovals > 0 && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Clock size={20} className="animate-spin" />
            </div>
            <div>
              <h3 className="font-extrabold text-amber-950 text-base">
                Action Required: {stats.pendingApprovals} Pending Registration Request{stats.pendingApprovals > 1 ? "s" : ""}
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                New employers and institutions are waiting for your approval. Their login credentials remain invalid until you accept them.
              </p>
            </div>
          </div>

          <Link
            to="/approvals"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition whitespace-nowrap"
          >
            Process Pending Requests
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.link}
              className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </span>
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center border ${card.lightBg}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </span>
                {card.pulse && (
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
                )}
              </div>

              <p className="mt-1 text-xs text-slate-500 truncate">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* 2 COLUMN SECTION: RECENT PENDING APPROVALS & AUDIT LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT PENDING APPROVALS DESK (2/3) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Registration Requests
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Approve or reject candidate requests to control credential validity
              </p>
            </div>

            <Link
              to="/approvals"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View All Approvals
              <ArrowRight size={14} />
            </Link>
          </div>

          {recentPending.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
              <CheckCircle2 size={36} className="mx-auto text-emerald-500 mb-2" />
              <h4 className="font-bold text-slate-800 text-sm">All caught up!</h4>
              <p className="text-xs text-slate-500 mt-1">
                There are no pending registrations requiring review right now.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {recentPending.map((req) => (
                <div
                  key={`${req.type}-${req.id}`}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                        req.type === "employer"
                          ? "bg-purple-600"
                          : "bg-cyan-600"
                      }`}
                    >
                      {req.type === "employer" ? <Building2 size={20} /> : <Landmark size={20} />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm truncate">
                          {req.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            req.type === "employer"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-cyan-100 text-cyan-700"
                          }`}
                        >
                          {req.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Contact: <span className="font-semibold">{req.contact_person}</span> • {req.email}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Applied on: {new Date(req.created_at).toLocaleDateString()} at {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleQuickApprove(req.type, req.id, req.name)}
                      disabled={actionLoading === req.id}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition disabled:opacity-50 cursor-pointer"
                      title="Accept registration and validate login credentials"
                    >
                      <CheckCircle2 size={15} />
                      Accept
                    </button>
                    <button
                      onClick={() => handleQuickReject(req.type, req.id, req.name)}
                      disabled={actionLoading === req.id}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
                      title="Reject request"
                    >
                      <XCircle size={15} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RECENT AUDIT LOGS (1/3) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Activities
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Platform administration audit trail
                </p>
              </div>

              <Link
                to="/audit-logs"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                All Logs
              </Link>
            </div>

            <div className="space-y-4">
              {recentLogs.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No administrative logs recorded yet.
                </p>
              ) : (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-xs">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800 truncate">
                        {log.action}
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        Target: <span className="font-semibold uppercase">{log.target_type}</span> (#{log.target_id || "N/A"})
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/60 text-xs text-slate-600">
              <span className="font-semibold block text-slate-800 mb-1">Security Status:</span>
              System is operating securely with JWT authorization and PostgreSQL connection.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

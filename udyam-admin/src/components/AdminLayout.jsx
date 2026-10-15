import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  GraduationCap,
  Building2,
  Landmark,
  Briefcase,
  History,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Shield,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { getDashboardStats } from "../api";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("udyam_admin_user");
    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch (e) {
        setAdminUser(null);
      }
    }

    fetchBadgeCount();
    const interval = setInterval(fetchBadgeCount, 15000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const fetchBadgeCount = async () => {
    try {
      const data = await getDashboardStats();
      if (data && data.stats) {
        setPendingCount(data.stats.pendingApprovals || 0);
      }
    } catch (err) {
      // ignore in background
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("udyam_admin_token");
    localStorage.removeItem("udyam_admin_user");
    navigate("/login");
  };

  const navItems = [
    {
      title: "Dashboard Overview",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Registration Approvals",
      path: "/approvals",
      icon: UserCheck,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: "bg-amber-500 text-white animate-pulse",
    },
    {
      title: "Student Management",
      path: "/students",
      icon: GraduationCap,
    },
    {
      title: "Employer Management",
      path: "/employers",
      icon: Building2,
    },
    {
      title: "Institution Management",
      path: "/institutions",
      icon: Landmark,
    },
    {
      title: "Opportunities & Gigs",
      path: "/opportunities",
      icon: Briefcase,
    },
    {
      title: "Audit & Activity Logs",
      path: "/audit-logs",
      icon: History,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex text-slate-800 font-sans">
      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B1528] text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* BRAND HEADER */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-2 ring-white/10">
                <Shield size={22} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">
                    Udyam <span className="text-cyan-400">Sethu</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-slate-400">
                    Head Admin Portal
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* QUICK PORTAL SWITCHER LINK */}
          <div className="px-5 pt-4 pb-2">
            <a
              href="http://localhost:5173/udyamsethu/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:bg-white/10 hover:text-cyan-300 transition group"
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={14} className="text-cyan-400" />
                Visit Main Portals
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-semibold px-1.5 py-0.5 rounded">
                Live
              </span>
            </a>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 custom-scrollbar">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 py-2">
              Management & Controls
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-white border border-cyan-500/30 shadow-md shadow-cyan-950/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition ${
                        active
                          ? "bg-cyan-500 text-white shadow-sm"
                          : "text-slate-400 group-hover:text-cyan-400 group-hover:bg-white/5"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span>{item.title}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  ) : active ? (
                    <ChevronRight size={14} className="text-cyan-400" />
                  ) : null}
                </Link>
              );
            })}
          </div>

          {/* ADMIN USER FOOTER */}
          <div className="p-4 border-t border-slate-800/80 bg-[#08101E]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow">
                  A
                </div>
                <div className="truncate">
                  <p className="text-sm font-bold text-white truncate">
                    {adminUser?.fullName || "Administrator"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {adminUser?.email || "admin@udyamsethu.com"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition shrink-0"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected to Backend (Port 5000)
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* APPROVALS ALERT SHORTCUT */}
            {pendingCount > 0 && (
              <Link
                to="/approvals"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold hover:bg-amber-100 transition shadow-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span>{pendingCount} Pending Approval{pendingCount > 1 ? "s" : ""}</span>
              </Link>
            )}

            <button
              onClick={fetchBadgeCount}
              title="Refresh Stats"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <RefreshCw size={17} />
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1" />

            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                SU
              </div>
              <div className="hidden md:block text-left text-xs">
                <span className="font-bold text-slate-800 block">Super Admin</span>
                <span className="text-[10px] text-emerald-600 font-semibold uppercase">Authorized</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

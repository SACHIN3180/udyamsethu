
import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/logo.jpeg";
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  UserRound,
  Bell,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  ClipboardCheck,
  BriefcaseBusiness,
  TrendingUp,
  Award,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Settings,
  Moon,
  Sun,
  Target,
  Building2,
  MapPin,
  BarChart3,
  LogOut,
  Sparkles,
  CalendarDays,
  ExternalLink,
  Activity,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useLocation } from "react-router-dom";

/* =========================================================
   DASHBOARD DATA
   Existing demo data retained. Replace with API data later
   if these metrics become available from your backend.
========================================================= */

const performanceData = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 78 },
  { month: "May", score: 82 },
  { month: "Jun", score: 86 },
  { month: "Jul", score: 89 },
];

const attendanceData = [
  { subject: "Computer Science", attendance: 92 },
  { subject: "Database Systems", attendance: 88 },
  { subject: "Java", attendance: 95 },
  { subject: "React", attendance: 84 },
  { subject: "AI / ML", attendance: 90 },
];

const opportunities = [
  {
    title: "Frontend Developer Intern",
    company: "Tech Solutions Pvt. Ltd.",
    location: "Bengaluru",
    type: "Internship",
    skills: ["React", "JavaScript", "Tailwind"],
    deadline: "30 Oct 2026",
    color: "cyan",
  },
  {
    title: "Java Developer Intern",
    company: "Digital Systems",
    location: "Bengaluru",
    type: "Internship",
    skills: ["Java", "Spring Boot", "SQL"],
    deadline: "02 Nov 2026",
    color: "violet",
  },
  {
    title: "Software Engineer Trainee",
    company: "NextGen Technologies",
    location: "Hyderabad",
    type: "Full time",
    skills: ["Java", "SQL", "Git"],
    deadline: "05 Nov 2026",
    color: "amber",
  },
];

const applicationData = [
  {
    title: "Frontend Developer Intern",
    company: "Tech Solutions",
    status: "Shortlisted",
    type: "success",
  },
  {
    title: "Java Developer Intern",
    company: "Digital Systems",
    status: "Under Review",
    type: "pending",
  },
  {
    title: "Software Engineer Trainee",
    company: "NextGen Technologies",
    status: "Applied",
    type: "applied",
  },
];

const events = [
  {
    title: "Campus Placement Drive",
    date: "25 Oct",
    time: "10:00 AM",
    type: "Placement",
  },
  {
    title: "React Assessment",
    date: "28 Oct",
    time: "02:00 PM",
    type: "Assessment",
  },
  {
    title: "Resume Workshop",
    date: "30 Oct",
    time: "11:30 AM",
    type: "Workshop",
  },
];

const translations = {
  English: {
    workspace: "STUDENT WORKSPACE",
    overview: "Overview",
    opportunities: "Find Opportunities",
    applications: "My Applications",
    saved: "Saved Opportunities",
    assessments: "Assessments",
    skills: "My Skills",
    performance: "Academic Performance",
    account: "ACCOUNT",
    settings: "Settings",
    dashboard: "Student Dashboard",
    welcome: "Welcome back",
    description:
      "Your learning journey, academic progress and career opportunities — all in one place.",
    explore: "Explore opportunities",
    cgpa: "Current CGPA",
    attendance: "Attendance",
    completed: "Completed",
    active: "Active applications",
    outOf: "Out of 10",
    profileTitle: "Your profile is taking shape",
    profileDescription:
      "Complete your education, skills, resume and projects to stand out to employers.",
    completeProfile: "Complete profile",
    academic: "Academic performance",
    academicSub: "Your learning progress throughout the semester",
    attendanceSub: "Subject-wise attendance",
    events: "Upcoming events",
    eventsSub: "Keep track of important dates",
    skillProgress: "Skills development",
    skillSub: "Your current learning progress",
    readiness: "Career readiness",
    readinessSub: "Your placement preparation",
    ready: "Ready for opportunities",
    recommended: "Recommended opportunities",
    recommendedSub: "Explore roles that match your career interests",
    viewAll: "View all opportunities",
    recent: "Recent applications",
    recentSub: "Track your latest application activity",
    quick: "Quick actions",
    quickSub: "Your most-used student tools",
    updateProfile: "Update profile",
    resume: "Build resume",
    takeAssessment: "Take assessment",
    certificates: "Certificates",
    internship: "Find internship",
    viewPerformance: "View performance",
    profile: "My Profile",
    logout: "Logout",
    search: "Search opportunities, skills or companies...",
    language: "Language",
    loading: "Loading your student profile...",
    noResults: "No matching opportunities found.",
    deadline: "Deadline",
    profileReady: "Profile",
    resumeReady: "Resume",
    skillsReady: "Skills",
    applicationsTitle: "Applications",
  },
  Kannada: {
    workspace: "ವಿದ್ಯಾರ್ಥಿ ಕಾರ್ಯಕ್ಷೇತ್ರ",
    overview: "ಅವಲೋಕನ",
    opportunities: "ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ",
    applications: "ನನ್ನ ಅರ್ಜಿಗಳು",
    saved: "ಉಳಿಸಿದ ಅವಕಾಶಗಳು",
    assessments: "ಮೌಲ್ಯಮಾಪನಗಳು",
    skills: "ನನ್ನ ಕೌಶಲ್ಯಗಳು",
    performance: "ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ",
    account: "ಖಾತೆ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    dashboard: "ವಿದ್ಯಾರ್ಥಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    description:
      "ನಿಮ್ಮ ಕಲಿಕೆ, ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿ ಮತ್ತು ಉದ್ಯೋಗ ಅವಕಾಶಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ವೀಕ್ಷಿಸಿ.",
    explore: "ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    cgpa: "ಪ್ರಸ್ತುತ CGPA",
    attendance: "ಹಾಜರಾತಿ",
    completed: "ಪೂರ್ಣಗೊಂಡಿವೆ",
    active: "ಸಕ್ರಿಯ ಅರ್ಜಿಗಳು",
    outOf: "10 ರಲ್ಲಿ",
    profileTitle: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
    profileDescription:
      "ನಿಮ್ಮ ಶಿಕ್ಷಣ, ಕೌಶಲ್ಯಗಳು, ರೆಸ್ಯೂಮ್ ಮತ್ತು ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ಸೇರಿಸಿ.",
    completeProfile: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ",
    academic: "ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ",
    academicSub: "ಸೆಮಿಸ್ಟರ್‌ನಾದ್ಯಂತ ನಿಮ್ಮ ಕಲಿಕೆಯ ಪ್ರಗತಿ",
    attendanceSub: "ವಿಷಯವಾರು ಹಾಜರಾತಿ",
    events: "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
    eventsSub: "ಪ್ರಮುಖ ದಿನಾಂಕಗಳನ್ನು ಗಮನದಲ್ಲಿಡಿ",
    skillProgress: "ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ",
    skillSub: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕಲಿಕೆಯ ಪ್ರಗತಿ",
    readiness: "ವೃತ್ತಿ ಸಿದ್ಧತೆ",
    readinessSub: "ನಿಮ್ಮ ಉದ್ಯೋಗ ತಯಾರಿ",
    ready: "ಅವಕಾಶಗಳಿಗೆ ಸಿದ್ಧ",
    recommended: "ಶಿಫಾರಸು ಮಾಡಿದ ಅವಕಾಶಗಳು",
    recommendedSub: "ನಿಮ್ಮ ವೃತ್ತಿ ಆಸಕ್ತಿಗಳಿಗೆ ಹೊಂದುವ ಉದ್ಯೋಗಗಳು",
    viewAll: "ಎಲ್ಲಾ ಅವಕಾಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    recent: "ಇತ್ತೀಚಿನ ಅರ್ಜಿಗಳು",
    recentSub: "ನಿಮ್ಮ ಅರ್ಜಿಗಳ ಪ್ರಗತಿಯನ್ನು ವೀಕ್ಷಿಸಿ",
    quick: "ತ್ವರಿತ ಕ್ರಮಗಳು",
    quickSub: "ಹೆಚ್ಚಾಗಿ ಬಳಸುವ ವಿದ್ಯಾರ್ಥಿ ಪರಿಕರಗಳು",
    updateProfile: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ",
    resume: "ರೆಸ್ಯೂಮ್ ರಚಿಸಿ",
    takeAssessment: "ಮೌಲ್ಯಮಾಪನ",
    certificates: "ಪ್ರಮಾಣಪತ್ರಗಳು",
    internship: "ಇಂಟರ್ನ್‌ಶಿಪ್ ಹುಡುಕಿ",
    viewPerformance: "ಸಾಧನೆಯನ್ನು ವೀಕ್ಷಿಸಿ",
    profile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    logout: "ಲಾಗ್ ಔಟ್",
    search: "ಅವಕಾಶಗಳು, ಕೌಶಲ್ಯಗಳು ಅಥವಾ ಕಂಪನಿಗಳನ್ನು ಹುಡುಕಿ...",
    language: "ಭಾಷೆ",
    loading: "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    noResults: "ಹೊಂದಾಣಿಕೆಯ ಅವಕಾಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    deadline: "ಕೊನೆಯ ದಿನಾಂಕ",
    profileReady: "ಪ್ರೊಫೈಲ್",
    resumeReady: "ರೆಸ್ಯೂಮ್",
    skillsReady: "ಕೌಶಲ್ಯಗಳು",
    applicationsTitle: "ಅರ್ಜಿಗಳು",
  },
};

const NAVIGATION = [
  { key: "overview", icon: LayoutDashboard, path: "/udyamsethu/student" },
  {
    key: "opportunities",
    icon: Search,
    path: "/udyamsethu/student/opportunities",
  },
  {
    key: "applications",
    icon: FileText,
    path: "/udyamsethu/student/applications",
  },
  {
    key: "saved",
    icon: Bookmark,
    path: "/udyamsethu/student/saved-opportunities",
  },
  {
    key: "assessments",
    icon: ClipboardCheck,
    path: "/udyamsethu/student/assessments",
  },
  {
    key: "skills",
    icon: Target,
    path: "/udyamsethu/student/skills",
  },
  {
    key: "performance",
    icon: GraduationCap,
    path: "/udyamsethu/student/academic-performance",
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");

  const t = translations[language];

  /* =========================================================
     EXISTING BACKEND INTEGRATION — PRESERVED
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchStudent = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/udyamsethu/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/student/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/udyamsethu/login");
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch student profile"
          );
        }

        if (!cancelled) {
          setStudent(data.user || data.profile || data);
        }
      } catch (error) {
        console.error("Student fetch error:", error);
      } finally {
        if (!cancelled) {
          setLoadingStudent(false);
        }
      }
    };

    fetchStudent();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setStudent(null);
    navigate("/udyamsethu/login");
  };

  const getInitials = (name = "") =>
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "ST";

  const studentName = student?.fullName || "Student";
  const studentInitials = getInitials(studentName);
  const studentCourse =
    student?.course || student?.organization || "Student";
  const studentEmail = student?.email || "";

  const filteredOpportunities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return opportunities;

    return opportunities.filter((item) =>
      [
        item.title,
        item.company,
        item.location,
        item.type,
        ...item.skills,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const surface = darkMode
    ? "bg-[#141e32] border-white/[0.07]"
    : "bg-white border-slate-200";

  const primaryText = darkMode ? "text-white" : "text-slate-900";
  const mutedText = darkMode ? "text-slate-400" : "text-slate-500";
  const pageBackground = darkMode ? "bg-[#0b1120]" : "bg-[#f5f7fb]";

  const goTo = (path) => {
    setSidebarOpen(false);
    setProfileMenuOpen(false);
    navigate(path);
  };

  if (loadingStudent) {
    return (
      <div
        className={`min-h-screen ${pageBackground} ${primaryText} flex flex-col items-center justify-center gap-4`}
      >
        <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center">
          <GraduationCap className="text-cyan-500 animate-pulse" size={27} />
        </div>
        <p className="text-sm">{t.loading}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${pageBackground} ${primaryText} transition-colors duration-300`}
    >
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col border-r transition-transform duration-300 ${
          darkMode
            ? "bg-[#10192b] border-white/[0.08]"
            : "bg-white border-slate-200"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* BRAND */}
        <div className="h-[76px] flex items-center justify-between px-5 border-b border-slate-500/15">
          <button
            onClick={() => goTo("/udyamsethu/student")}
            className="h-12 w-[190px] rounded-xl bg-white px-3 flex items-center justify-center"
            aria-label="Udyam Sethu home"
          >
            <img
              src={logo}
              alt="Udyam Sethu"
              className="max-h-full max-w-full object-contain"
            />
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-500/10"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="px-3 mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">
            {t.workspace}
          </p>

          <nav className="space-y-1">
            {NAVIGATION.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/udyamsethu/student"
                  ? location.pathname === item.path ||
                    location.pathname === "/udyamsethu/student/"
                  : location.pathname === item.path ||
                    location.pathname.startsWith(`${item.path}/`);

              return (
                <button
                  key={item.key}
                  onClick={() => goTo(item.path)}
                  className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition-all ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-950/10"
                      : darkMode
                      ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span className="flex-1">{t[item.key]}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  )}
                </button>
              );
            })}
          </nav>

          <p className="px-3 mt-8 mb-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">
            {t.account}
          </p>

          <button
            onClick={() => goTo("/udyamsethu/student/settings")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] transition ${
              darkMode
                ? "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings size={18} />
            {t.settings}
          </button>

          {/* SIDEBAR HELP CARD */}
          <div
            className={`mt-8 rounded-2xl border p-4 ${
              darkMode
                ? "bg-gradient-to-br from-cyan-400/[0.10] to-violet-500/[0.08] border-cyan-300/10"
                : "bg-gradient-to-br from-cyan-50 to-violet-50 border-cyan-100"
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-400/15 text-cyan-500 flex items-center justify-center mb-3">
              <Sparkles size={19} />
            </div>
            <p className="text-sm font-semibold">Build your future</p>
            <p className={`text-xs mt-1.5 leading-5 ${mutedText}`}>
              Keep your profile and skills updated for better opportunities.
            </p>
            <button
              onClick={() => goTo("/udyamsethu/student/profile")}
              className="mt-3 text-xs font-semibold text-cyan-500 flex items-center gap-1 hover:gap-2 transition-all"
            >
              Improve profile <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* SIDEBAR PROFILE */}
        <div className="relative p-3 border-t border-slate-500/15">
          {profileMenuOpen && (
            <div
              className={`absolute bottom-[calc(100%+8px)] left-3 right-3 overflow-hidden rounded-xl border shadow-2xl ${
                darkMode
                  ? "bg-[#19243a] border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="px-4 py-3 border-b border-slate-500/15">
                <p className="text-sm font-semibold truncate">{studentName}</p>
                <p className={`text-xs mt-1 truncate ${mutedText}`}>
                  {studentEmail || studentCourse}
                </p>
              </div>

              <button
                onClick={() => goTo("/udyamsethu/student/profile")}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-500/10"
              >
                <UserRound size={16} /> {t.profile}
              </button>

              <button
                onClick={() => goTo("/udyamsethu/student/settings")}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-500/10"
              >
                <Settings size={16} /> {t.settings}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 border-t border-slate-500/15"
              >
                <LogOut size={16} /> {t.logout}
              </button>
            </div>
          )}

          <button
            onClick={() => setProfileMenuOpen((open) => !open)}
            className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition ${
              darkMode ? "hover:bg-white/[0.05]" : "hover:bg-slate-100"
            }`}
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-cyan-300 to-cyan-500 flex items-center justify-center text-slate-950 text-xs font-bold">
              {studentInitials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{studentName}</p>
              <p className={`text-xs mt-1 truncate ${mutedText}`}>
                {studentCourse}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`shrink-0 transition-transform ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="min-h-screen lg:ml-[265px]">
        {/* TOP BAR */}
        <header
          className={`sticky top-0 z-30 h-[72px] border-b backdrop-blur-xl ${
            darkMode
              ? "bg-[#0b1120]/90 border-white/[0.07]"
              : "bg-white/90 border-slate-200"
          }`}
        >
          <div className="h-full flex items-center gap-3 px-4 sm:px-6 xl:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-500/10"
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>

            <div className="relative flex-1 max-w-[520px]">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t.search}
                aria-label="Search opportunities"
                className={`w-full h-10 rounded-xl border pl-10 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 ${
                  darkMode
                    ? "bg-white/[0.035] border-white/[0.08] text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <label className="sr-only" htmlFor="dashboard-language">
                {t.language}
              </label>
              <select
                id="dashboard-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className={`h-9 max-w-[100px] rounded-lg border px-2 text-xs outline-none ${
                  darkMode
                    ? "bg-[#141e32] border-white/10 text-slate-200"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <option value="English">English</option>
                <option value="Kannada">ಕನ್ನಡ</option>
              </select>

              <button
                onClick={() => setDarkMode((value) => !value)}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={darkMode ? "Light mode" : "Dark mode"}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                  darkMode
                    ? "bg-white/[0.06] text-amber-300 hover:bg-white/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => goTo("/udyamsethu/student/notifications")}
                aria-label="Notifications"
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center ${
                  darkMode
                    ? "text-slate-300 hover:bg-white/[0.06]"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#0b1120]" />
              </button>

              <button
                onClick={() => setProfileMenuOpen((open) => !open)}
                className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-500/20"
                aria-label="Open profile menu"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-300 to-cyan-500 flex items-center justify-center text-slate-950 text-xs font-bold">
                  {studentInitials}
                </div>
                <ChevronDown size={15} className={mutedText} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto p-4 sm:p-6 xl:p-8">
          {/* WELCOME BANNER */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#13283c] via-[#153447] to-[#173b4b] p-5 sm:p-7 xl:p-8 mb-6">
            <div className="absolute -right-12 -top-24 w-72 h-72 rounded-full border-[38px] border-cyan-300/[0.06]" />
            <div className="absolute right-24 -bottom-32 w-64 h-64 rounded-full bg-cyan-400/[0.07] blur-2xl" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-200/15 bg-cyan-200/[0.07] text-cyan-200 text-[11px] font-medium mb-4">
                  <Sparkles size={13} />
                  {t.dashboard}
                </div>

                <h1 className="text-2xl sm:text-3xl xl:text-[34px] font-bold tracking-tight text-white">
                  {t.welcome}, {studentName.split(" ")[0]}!
                  <span className="inline-block ml-2">👋</span>
                </h1>

                <p className="text-sm text-slate-300 leading-6 mt-3 max-w-xl">
                  {t.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => goTo("/udyamsethu/student/opportunities")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition"
                  >
                    {t.explore} <ArrowUpRight size={17} />
                  </button>

                  <button
                    onClick={() => goTo("/udyamsethu/student/profile")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
                  >
                    <UserRound size={16} /> {t.completeProfile}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[290px]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <div className="w-9 h-9 rounded-xl bg-cyan-300/15 flex items-center justify-center text-cyan-200">
                    <ShieldCheck size={19} />
                  </div>
                  <p className="text-2xl font-bold text-white mt-4">82%</p>
                  <p className="text-xs text-slate-300 mt-1">Career readiness</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <div className="w-9 h-9 rounded-xl bg-violet-300/15 flex items-center justify-center text-violet-200">
                    <Activity size={19} />
                  </div>
                  <p className="text-2xl font-bold text-white mt-4">+12.4%</p>
                  <p className="text-xs text-slate-300 mt-1">Performance trend</p>
                </div>
              </div>
            </div>
          </section>

          {/* STAT CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mb-6">
            <StatCard
              title={t.cgpa}
              value="8.6"
              detail={t.outOf}
              icon={GraduationCap}
              tone="cyan"
              darkMode={darkMode}
              onClick={() => goTo("/udyamsethu/student/academic-performance")}
            />
            <StatCard
              title={t.attendance}
              value="91%"
              detail="Overall attendance"
              icon={CheckCircle2}
              tone="emerald"
              darkMode={darkMode}
              onClick={() => goTo("/udyamsethu/student/attendance")}
            />
            <StatCard
              title={t.assessments}
              value="18"
              detail={t.completed}
              icon={ClipboardCheck}
              tone="violet"
              darkMode={darkMode}
              onClick={() => goTo("/udyamsethu/student/assessments")}
            />
            <StatCard
              title={t.applicationsTitle}
              value="12"
              detail={t.active}
              icon={BriefcaseBusiness}
              tone="amber"
              darkMode={darkMode}
              onClick={() => goTo("/udyamsethu/student/applications")}
            />
          </section>

          {/* PROFILE COMPLETION */}
          <section className={`${surface} border rounded-2xl p-5 sm:p-6 mb-6`}>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 text-cyan-500 flex items-center justify-center shrink-0">
                <UserRound size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h2 className="text-sm font-semibold">{t.profileTitle}</h2>
                    <p className={`text-xs mt-1.5 leading-5 ${mutedText}`}>
                      {t.profileDescription}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-cyan-500 shrink-0">
                    80%
                  </span>
                </div>

                <div className={`h-2.5 rounded-full overflow-hidden ${
                  darkMode ? "bg-slate-700/70" : "bg-slate-100"
                }`}>
                  <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-cyan-500 to-teal-400" />
                </div>

                <div className={`flex flex-wrap gap-x-5 gap-y-2 mt-3 text-[11px] ${mutedText}`}>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    {t.profileReady}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500" />
                    {t.skillsReady}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={13} className="text-amber-500" />
                    {t.resumeReady}
                  </span>
                </div>
              </div>

              <button
                onClick={() => goTo("/udyamsethu/student/profile")}
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-500 hover:bg-cyan-400/15 transition"
              >
                {t.completeProfile} <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          {/* PERFORMANCE + ATTENDANCE */}
          <section className="grid grid-cols-1 2xl:grid-cols-5 gap-5 mb-6">
            <div className={`${surface} border rounded-2xl overflow-hidden 2xl:col-span-3 min-w-0`}>
              <SectionHeader
                title={t.academic}
                subtitle={t.academicSub}
                icon={TrendingUp}
                darkMode={darkMode}
              />

              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
                  <div>
                    <p className={`text-xs ${mutedText}`}>Current academic score</p>
                    <p className="text-3xl font-bold mt-1">
                      8.6 <span className={`text-sm font-medium ${mutedText}`}>CGPA</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400/10 text-emerald-500 px-2.5 py-1.5 text-xs font-semibold">
                    <TrendingUp size={14} /> +12.4%
                  </span>
                </div>

                <div className="h-[240px] sm:h-[285px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="studentPerformanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 5"
                        vertical={false}
                        stroke={darkMode ? "#29364b" : "#e8edf4"}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        dy={8}
                      />
                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: darkMode ? "#10192b" : "#ffffff",
                          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
                          borderRadius: 12,
                          color: darkMode ? "#fff" : "#0f172a",
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        name="Performance"
                        stroke="#22d3ee"
                        strokeWidth={3}
                        fill="url(#studentPerformanceGradient)"
                        activeDot={{ r: 5, strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={`${surface} border rounded-2xl overflow-hidden 2xl:col-span-2`}>
              <SectionHeader
                title={t.attendance}
                subtitle={t.attendanceSub}
                icon={CalendarDays}
                darkMode={darkMode}
              />

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-[88px] h-[88px] rounded-full border-[8px] border-cyan-400/15 relative flex items-center justify-center shrink-0">
                    <div className="absolute inset-[-8px] rounded-full border-[8px] border-transparent border-t-cyan-400 border-r-cyan-400 rotate-45" />
                    <div className="text-center">
                      <p className="text-xl font-bold">91%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Excellent consistency</p>
                    <p className={`text-xs leading-5 mt-1.5 ${mutedText}`}>
                      Keep attending classes to maintain your academic progress.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {attendanceData.map((item) => (
                    <div key={item.subject}>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className={`text-xs font-medium ${mutedText}`}>
                          {item.subject}
                        </span>
                        <span className="text-xs font-semibold">{item.attendance}%</span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${
                        darkMode ? "bg-slate-700/70" : "bg-slate-100"
                      }`}>
                        <div
                          className={`h-full rounded-full ${
                            item.attendance < 85
                              ? "bg-amber-400"
                              : "bg-gradient-to-r from-cyan-500 to-teal-400"
                          }`}
                          style={{ width: `${item.attendance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* EVENTS, SKILLS, CAREER READINESS */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
            <div className={`${surface} border rounded-2xl overflow-hidden`}>
              <SectionHeader
                title={t.events}
                subtitle={t.eventsSub}
                icon={CalendarDays}
                darkMode={darkMode}
              />
              <div className="p-5 space-y-5">
                {events.map((event, index) => (
                  <div key={event.title} className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                      darkMode ? "bg-white/[0.045]" : "bg-slate-50"
                    }`}>
                      <CalendarDays size={17} className="text-cyan-500 mb-1" />
                      <span className="text-[9px] font-semibold">{event.date.split(" ")[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{event.title}</p>
                      <p className={`text-xs mt-1.5 ${mutedText}`}>
                        {event.date} · {event.time}
                      </p>
                      <span className={`inline-flex mt-2 rounded-md px-2 py-1 text-[10px] ${
                        index === 0
                          ? "bg-violet-400/10 text-violet-400"
                          : index === 1
                          ? "bg-cyan-400/10 text-cyan-500"
                          : "bg-amber-400/10 text-amber-500"
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${surface} border rounded-2xl overflow-hidden`}>
              <SectionHeader
                title={t.skillProgress}
                subtitle={t.skillSub}
                icon={Target}
                darkMode={darkMode}
                action={() => goTo("/udyamsethu/student/skills")}
              />
              <div className="p-5 space-y-5">
                <SkillProgress name="React.js" value={90} darkMode={darkMode} />
                <SkillProgress name="JavaScript" value={85} darkMode={darkMode} />
                <SkillProgress name="Java" value={78} darkMode={darkMode} />
                <SkillProgress name="SQL" value={82} darkMode={darkMode} />
                <SkillProgress name="Communication" value={75} darkMode={darkMode} />

                <button
                  onClick={() => goTo("/udyamsethu/student/skills")}
                  className="w-full mt-1 rounded-xl border border-slate-500/15 py-3 text-xs font-semibold text-cyan-500 hover:bg-cyan-400/[0.06] transition"
                >
                  Continue learning <ArrowUpRight size={14} className="inline ml-1" />
                </button>
              </div>
            </div>

            <div className={`${surface} border rounded-2xl overflow-hidden`}>
              <SectionHeader
                title={t.readiness}
                subtitle={t.readinessSub}
                icon={Award}
                darkMode={darkMode}
              />
              <div className="p-5">
                <div className="rounded-2xl bg-gradient-to-br from-cyan-400/[0.10] to-violet-500/[0.10] border border-cyan-400/10 p-5 mb-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={`text-xs ${mutedText}`}>Overall score</p>
                      <p className="text-3xl font-bold mt-1">82%</p>
                      <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                        <TrendingUp size={13} /> Moving forward
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center">
                      <Award size={30} className="text-cyan-500" />
                    </div>
                  </div>
                  <div className={`h-2 rounded-full mt-5 overflow-hidden ${
                    darkMode ? "bg-slate-700" : "bg-slate-200"
                  }`}>
                    <div className="w-[82%] h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-400" />
                  </div>
                </div>

                <ReadinessRow title={t.profileReady} value="Complete" />
                <ReadinessRow title={t.resumeReady} value="Uploaded" />
                <ReadinessRow title={t.skillsReady} value="Good progress" />
                <ReadinessRow title={t.assessments} value="18 completed" />

                <button
                  onClick={() => goTo("/udyamsethu/student/academic-performance")}
                  className="mt-4 w-full rounded-xl bg-cyan-400 py-3 text-xs font-semibold text-slate-950 hover:bg-cyan-300 transition"
                >
                  {t.viewPerformance}
                </button>
              </div>
            </div>
          </section>

          {/* RECOMMENDED OPPORTUNITIES */}
          <section className={`${surface} border rounded-2xl overflow-hidden mb-6`}>
            <SectionHeader
              title={t.recommended}
              subtitle={t.recommendedSub}
              icon={BriefcaseBusiness}
              darkMode={darkMode}
              action={() => goTo("/udyamsethu/student/opportunities")}
              actionLabel={t.viewAll}
            />

            <div className="divide-y divide-slate-500/10">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((item) => (
                  <OpportunityRow
                    key={item.title}
                    item={item}
                    darkMode={darkMode}
                    deadlineLabel={t.deadline}
                    onClick={() => goTo("/udyamsethu/student/opportunities")}
                  />
                ))
              ) : (
                <div className={`p-10 text-center text-sm ${mutedText}`}>
                  <Search size={25} className="mx-auto mb-3 opacity-50" />
                  {t.noResults}
                </div>
              )}
            </div>

            <div className={`p-4 sm:px-6 border-t ${
              darkMode ? "border-white/[0.07]" : "border-slate-100"
            }`}>
              <button
                onClick={() => goTo("/udyamsethu/student/opportunities")}
                className="w-full sm:w-auto text-sm font-semibold text-cyan-500 hover:text-cyan-400 transition"
              >
                {t.viewAll} <ArrowUpRight size={15} className="inline ml-1" />
              </button>
            </div>
          </section>

          {/* APPLICATIONS + QUICK ACTIONS */}
          <section className="grid grid-cols-1 2xl:grid-cols-2 gap-5">
            <div className={`${surface} border rounded-2xl overflow-hidden`}>
              <SectionHeader
                title={t.recent}
                subtitle={t.recentSub}
                icon={FileText}
                darkMode={darkMode}
                action={() => goTo("/udyamsethu/student/applications")}
                actionLabel="View all"
              />

              <div className="p-5 space-y-5">
                {applicationData.map((application) => (
                  <ApplicationRow
                    key={application.title}
                    application={application}
                    darkMode={darkMode}
                  />
                ))}

                <button
                  onClick={() => goTo("/udyamsethu/student/applications")}
                  className={`w-full rounded-xl border py-3 text-xs font-semibold transition ${
                    darkMode
                      ? "border-white/10 hover:bg-white/[0.04]"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Track all applications <ArrowUpRight size={14} className="inline ml-1" />
                </button>
              </div>
            </div>

            <div className={`${surface} border rounded-2xl overflow-hidden`}>
              <SectionHeader
                title={t.quick}
                subtitle={t.quickSub}
                icon={Sparkles}
                darkMode={darkMode}
              />

              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <QuickAction
                  icon={UserRound}
                  title={t.updateProfile}
                  description="Manage your details"
                  onClick={() => goTo("/udyamsethu/student/profile")}
                  darkMode={darkMode}
                />
                <QuickAction
                  icon={FileText}
                  title={t.resume}
                  description="Create or improve"
                  onClick={() => goTo("/udyamsethu/student/resume")}
                  darkMode={darkMode}
                />
                <QuickAction
                  icon={ClipboardCheck}
                  title={t.takeAssessment}
                  description="Test your skills"
                  onClick={() => goTo("/udyamsethu/student/assessments")}
                  darkMode={darkMode}
                />
                <QuickAction
                  icon={Award}
                  title={t.certificates}
                  description="Show your achievements"
                  onClick={() => goTo("/udyamsethu/student/certificates")}
                  darkMode={darkMode}
                />
                <QuickAction
                  icon={BriefcaseBusiness}
                  title={t.internship}
                  description="Discover new roles"
                  onClick={() => goTo("/udyamsethu/student/opportunities")}
                  darkMode={darkMode}
                />
                <QuickAction
                  icon={BarChart3}
                  title={t.viewPerformance}
                  description="Review your progress"
                  onClick={() => goTo("/udyamsethu/student/academic-performance")}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className={`flex flex-col sm:flex-row items-center justify-between gap-2 py-7 text-[11px] ${mutedText}`}>
            <p>© {new Date().getFullYear()} Udyam Sethu. Student workspace.</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" />
              Your learning journey, one step at a time.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const StatCard = ({ title, value, detail, icon: Icon, tone, darkMode, onClick }) => {
  const tones = {
    cyan: "bg-cyan-400/10 text-cyan-500",
    emerald: "bg-emerald-400/10 text-emerald-500",
    violet: "bg-violet-400/10 text-violet-500",
    amber: "bg-amber-400/10 text-amber-500",
  };

  return (
    <button
      onClick={onClick}
      className={`group text-left rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        darkMode
          ? "bg-[#141e32] border-white/[0.07] hover:border-cyan-400/30 hover:shadow-black/10"
          : "bg-white border-slate-200 hover:border-cyan-300 hover:shadow-slate-200/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={`text-xs font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {title}
        </p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-5">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <span className={`text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          {detail}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          View details
        </span>
        <ArrowUpRight
          size={15}
          className="text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-500"
        />
      </div>
    </button>
  );
};

const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
  darkMode,
  action,
  actionLabel,
}) => (
  <div className={`flex items-center justify-between gap-3 px-5 py-5 border-b ${
    darkMode ? "border-white/[0.07]" : "border-slate-100"
  }`}>
    <div className="flex items-center gap-3 min-w-0">
      {Icon && (
        <div className={`hidden sm:flex w-9 h-9 rounded-xl items-center justify-center shrink-0 ${
          darkMode ? "bg-white/[0.045] text-cyan-400" : "bg-slate-50 text-cyan-600"
        }`}>
          <Icon size={18} />
        </div>
      )}
      <div className="min-w-0">
        <h2 className="text-sm font-semibold truncate">{title}</h2>
        <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {subtitle}
        </p>
      </div>
    </div>

    {action && (
      <button
        onClick={action}
        className="shrink-0 text-xs font-semibold text-cyan-500 hover:text-cyan-400 transition"
      >
        {actionLabel || <ArrowUpRight size={17} />}
      </button>
    )}
  </div>
);

const SkillProgress = ({ name, value, darkMode }) => (
  <div>
    <div className="flex items-center justify-between gap-3 mb-2">
      <span className="text-xs font-medium">{name}</span>
      <span className={`text-xs font-semibold ${darkMode ? "text-cyan-400" : "text-cyan-600"}`}>
        {value}%
      </span>
    </div>
    <div className={`h-2 rounded-full overflow-hidden ${
      darkMode ? "bg-slate-700/70" : "bg-slate-100"
    }`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ReadinessRow = ({ title, value }) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <span className="flex items-center gap-2 text-xs">
      <CheckCircle2 size={15} className="text-emerald-500" />
      {title}
    </span>
    <span className="text-[11px] text-slate-400">{value}</span>
  </div>
);

const OpportunityRow = ({ item, darkMode, deadlineLabel, onClick }) => {
  const tone = {
    cyan: "bg-cyan-400/10 text-cyan-500",
    violet: "bg-violet-400/10 text-violet-500",
    amber: "bg-amber-400/10 text-amber-500",
  }[item.color];

  return (
    <div className={`p-5 sm:px-6 transition ${
      darkMode ? "hover:bg-white/[0.02]" : "hover:bg-slate-50/80"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
          <Building2 size={21} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {item.company}
              </p>
            </div>
            <span className={`w-fit rounded-lg px-2.5 py-1 text-[10px] font-semibold ${tone}`}>
              {item.type}
            </span>
          </div>

          <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {item.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} /> {deadlineLabel}: {item.deadline}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className={`rounded-md px-2 py-1 text-[10px] ${
                  darkMode ? "bg-white/[0.05] text-slate-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={onClick}
          aria-label={`View ${item.title}`}
          className={`self-start w-9 h-9 rounded-xl border flex items-center justify-center transition ${
            darkMode
              ? "border-white/10 hover:bg-cyan-400/10 hover:text-cyan-400"
              : "border-slate-200 hover:bg-cyan-50 hover:text-cyan-600"
          }`}
        >
          <ExternalLink size={15} />
        </button>
      </div>
    </div>
  );
};

const ApplicationRow = ({ application, darkMode }) => {
  const styles = {
    success: {
      icon: CheckCircle2,
      color: "text-emerald-500",
      background: "bg-emerald-400/10",
    },
    pending: {
      icon: Clock3,
      color: "text-amber-500",
      background: "bg-amber-400/10",
    },
    applied: {
      icon: FileText,
      color: "text-cyan-500",
      background: "bg-cyan-400/10",
    },
    rejected: {
      icon: X,
      color: "text-red-500",
      background: "bg-red-400/10",
    },
  };

  const style = styles[application.type] || styles.applied;
  const Icon = style.icon;

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.background}`}>
        <Icon size={18} className={style.color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate">{application.title}</p>
        <p className={`text-[11px] mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {application.company}
        </p>
      </div>
      <span className={`text-[10px] font-semibold text-right ${style.color}`}>
        {application.status}
      </span>
    </div>
  );
};

const QuickAction = ({ icon: Icon, title, description, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className={`group min-w-0 rounded-xl border p-3 sm:p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 ${
      darkMode
        ? "border-white/[0.07] hover:bg-white/[0.035]"
        : "border-slate-200 hover:bg-cyan-50/50"
    }`}
  >
    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-500 flex items-center justify-center mb-3 group-hover:bg-cyan-400/15 transition">
      <Icon size={19} />
    </div>
    <p className="text-xs font-semibold leading-5">{title}</p>
    <p className={`text-[10px] leading-4 mt-1 ${
      darkMode ? "text-slate-400" : "text-slate-500"
    }`}>
      {description}
    </p>
  </button>
);

export default StudentDashboard;

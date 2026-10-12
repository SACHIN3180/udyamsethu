import React, { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  TrendingUp,
  Award,
  BookOpen,
  CalendarDays,
  Target,
  CheckCircle2,
  Clock3,
  BarChart3,
  ArrowUpRight,
  Sun,
  Moon,
  Download,
  Search,
  Filter,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  FileText,
  Printer,
  X,
  Share2,
  SlidersHorizontal,
  Flame,
  Zap,
  Info,
  Check,
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
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------
// Historical Semester Performance
// ----------------------------------------------------
const performanceData = [
  { semester: "Sem 1", cgpa: 7.2, sgpa: 7.2, credits: 20 },
  { semester: "Sem 2", cgpa: 7.6, sgpa: 8.0, credits: 22 },
  { semester: "Sem 3", cgpa: 7.8, sgpa: 8.0, credits: 24 },
  { semester: "Sem 4", cgpa: 8.1, sgpa: 8.4, credits: 22 },
  { semester: "Sem 5", cgpa: 8.4, sgpa: 8.7, credits: 24 },
  { semester: "Sem 6", cgpa: 8.6, sgpa: 8.9, credits: 24 },
];

// ----------------------------------------------------
// Current Semester Subject Breakdown
// ----------------------------------------------------
const subjectData = [
  {
    subject: "Data Structures",
    code: "CS301",
    marks: 91,
    grade: "A+",
    credits: 4,
    type: "Core Engineering",
    internal: "28/30",
    external: "63/70",
    status: "Completed",
  },
  {
    subject: "Database Management",
    code: "CS302",
    marks: 87,
    grade: "A",
    credits: 4,
    type: "Core Engineering",
    internal: "27/30",
    external: "60/70",
    status: "Completed",
  },
  {
    subject: "Java Programming",
    code: "CS303",
    marks: 84,
    grade: "A",
    credits: 4,
    type: "Practical Lab",
    internal: "26/30",
    external: "58/70",
    status: "Completed",
  },
  {
    subject: "Computer Networks",
    code: "CS304",
    marks: 79,
    grade: "B+",
    credits: 3,
    type: "Core Engineering",
    internal: "24/30",
    external: "55/70",
    status: "Completed",
  },
  {
    subject: "Artificial Intelligence",
    code: "CS305",
    marks: 92,
    grade: "A+",
    credits: 4,
    type: "Specialization Elective",
    internal: "29/30",
    external: "63/70",
    status: "Completed",
  },
  {
    subject: "Software Engineering",
    code: "CS306",
    marks: 86,
    grade: "A",
    credits: 3,
    type: "Industry Project",
    internal: "26/30",
    external: "60/70",
    status: "Completed",
  },
];

// ----------------------------------------------------
// Attendance Statistics
// ----------------------------------------------------
const attendanceData = [
  { subject: "Data Structures", code: "CS301", attended: 47, total: 50, value: 94 },
  { subject: "Database Management", code: "CS302", attended: 41, total: 45, value: 91 },
  { subject: "Java Programming", code: "CS303", attended: 46, total: 48, value: 96 },
  { subject: "Computer Networks", code: "CS304", attended: 36, total: 42, value: 86 },
  { subject: "Artificial Intelligence", code: "CS305", attended: 46, total: 50, value: 92 },
  { subject: "Software Engineering", code: "CS306", attended: 35, total: 40, value: 88 },
];

// ----------------------------------------------------
// Academic Achievements & Honors
// ----------------------------------------------------
const achievementsData = [
  {
    id: 1,
    icon: Award,
    title: "Dean's Merit List",
    description: "Achieved top 5% batch standing with CGPA > 8.5",
    date: "Semester 6",
    tag: "High Distinction",
    color: "amber",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Consistent Academic Growth",
    description: "Maintained steady CGPA ascension for 4 consecutive terms",
    date: "Sem 3 - Sem 6",
    tag: "Excellence",
    color: "emerald",
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Executive Attendance Honor",
    description: "Maintained >90% benchmark attendance across technical labs",
    date: "Current Academic Year",
    tag: "Disciplined",
    color: "cyan",
  },
  {
    id: 4,
    icon: Target,
    title: "Technical Benchmark Cleared",
    description: "Successfully cleared CS300 Series academic requirements",
    date: "Session 2026",
    tag: "Industry Ready",
    color: "indigo",
  },
];

export default function AcademicPerformance() {
  const navigate = useNavigate();

  // Dark mode as default (respects existing preference if saved)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme") || localStorage.getItem("darkMode");
    return saved !== null ? saved === "dark" || saved === "true" : true;
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");
  const [chartMetric, setChartMetric] = useState("cgpa"); // "cgpa" or "sgpa"
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportCopied, setReportCopied] = useState(false);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Filtered Subject Data
  const filteredSubjects = useMemo(() => {
    return subjectData.filter((item) => {
      const matchesSearch =
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade =
        gradeFilter === "ALL" || item.grade === gradeFilter;

      return matchesSearch && matchesGrade;
    });
  }, [searchQuery, gradeFilter]);

  // Grade badge styling helper
  const getGradeBadge = (grade) => {
    if (grade === "A+") {
      return darkMode
        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (grade === "A") {
      return darkMode
        ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/30"
        : "bg-cyan-50 text-cyan-700 border-cyan-200";
    }
    return darkMode
      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
      : "bg-amber-50 text-amber-700 border-amber-200";
  };

  const handleCopyReport = () => {
    const textSummary = `Udyam Sethu - Student Academic Performance Report
Student Standing: 6th Semester
Cumulative CGPA: 8.6 / 10.0
Semester 6 SGPA: 8.9 / 10.0
Overall Percentage: 86.2%
Current Batch Rank: #12 / 180 Students
Total Credits Cleared: 136 Credits
Overall Attendance: 91%
Status: First Class with Distinction`;

    navigator.clipboard.writeText(textSummary);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2000);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        darkMode ? "bg-[#0b1120] text-slate-100" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* =====================================================
          TOP NAVIGATION BAR
      ===================================================== */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          darkMode
            ? "bg-[#0b1120]/80 border-slate-800/80"
            : "bg-white/85 border-slate-200/80 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Back & Breadcrumb info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/udyamsethu/student")}
              className={`p-2.5 rounded-xl border transition flex items-center justify-center group ${
                darkMode
                  ? "bg-slate-800/70 border-slate-700 hover:bg-slate-700 text-slate-300"
                  : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
              }`}
              title="Return to Student Dashboard"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-500 uppercase tracking-wider">
                <span>Student Portal</span>
                <ChevronRight size={12} className="text-slate-500" />
                <span>Performance Analytics</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                Academic Performance
              </h1>
            </div>
          </div>

          {/* Action CTAs & Dark Mode Switch */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setShowReportModal(true)}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition shadow-xs ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300"
              }`}
            >
              <Download size={15} className="text-cyan-500" />
              <span>Official Transcript</span>
            </button>

            {/* Dark / Light Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition flex items-center justify-center ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN ANALYTICS CONTAINER
      ===================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* =====================================================
            HERO ACADEMIC PROFILE STRIP
        ===================================================== */}
        <div
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${
            darkMode
              ? "bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#162033] border-slate-800 shadow-xl shadow-black/20"
              : "bg-gradient-to-br from-white via-cyan-50/25 to-slate-50 border-slate-200 shadow-sm"
          }`}
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/25 shrink-0">
                <GraduationCap size={30} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    B.Tech Computer Science & Eng.
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Standing: Distinction
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Academic Progress Report
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-1 max-w-2xl ${
                    darkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  6th Semester Engineering • Enrollment Session 2023-2027 •
                  Cumulative credit progress and subject-wise mastery.
                </p>
              </div>
            </div>

            {/* Quick Milestone Pill */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <div
                className={`p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 w-full sm:w-auto ${
                  darkMode
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white/80 border-slate-200"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    Credits Earned
                  </p>
                  <p className="text-base sm:text-lg font-bold">
                    136 <span className="text-xs text-slate-400">/ 160 Total</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowReportModal(true)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText size={16} />
                <span>Summary View</span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            TOP 4 EXECUTIVE METRICS
        ===================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <ExecutiveMetricCard
            darkMode={darkMode}
            icon={GraduationCap}
            accentColor="cyan"
            title="Cumulative CGPA"
            value="8.6"
            scale="/ 10.0"
            badge="+0.4"
            badgeLabel="growth from Sem 5"
            subtitle="Calculated over 6 Semesters"
          />

          <ExecutiveMetricCard
            darkMode={darkMode}
            icon={TrendingUp}
            accentColor="emerald"
            title="Academic Average"
            value="86.2%"
            scale="Score"
            badge="+5.8%"
            badgeLabel="above college median"
            subtitle="Weighted course percentage"
          />

          <ExecutiveMetricCard
            darkMode={darkMode}
            icon={Award}
            accentColor="amber"
            title="Batch Rank"
            value="#12"
            scale="/ 180"
            badge="Top 7%"
            badgeLabel="academic percentile"
            subtitle="Department of CSE"
          />

          <ExecutiveMetricCard
            darkMode={darkMode}
            icon={Target}
            accentColor="indigo"
            title="Classroom Attendance"
            value="91.4%"
            scale="Verified"
            badge="Safe"
            badgeLabel="+16% over minimum 75%"
            subtitle="184 of 201 Lectures attended"
          />
        </div>

        {/* =====================================================
            CHARTS & CURRENT SEMESTER SNAPSHOT (2 COLUMNS)
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* LEFT 2 COLUMNS: Visual Growth Area Chart */}
          <section
            className={`lg:col-span-2 rounded-3xl border p-5 sm:p-7 transition-all ${
              darkMode
                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            {/* Chart Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Academic Progression Curve
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Semester-by-semester trajectory through Year 1 - Year 3
                  </p>
                </div>
              </div>

              {/* Metric Toggle Tabs */}
              <div
                className={`p-1 rounded-xl border flex items-center text-xs font-semibold ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <button
                  onClick={() => setChartMetric("cgpa")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    chartMetric === "cgpa"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  CGPA (Cumulative)
                </button>
                <button
                  onClick={() => setChartMetric("sgpa")}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    chartMetric === "sgpa"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  SGPA (Per Term)
                </button>
              </div>
            </div>

            {/* Quick stats strip above chart */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <span className="text-[11px] text-slate-400">Starting Grade</span>
                <p className="text-base font-bold text-slate-200 mt-0.5">7.2 CGPA</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <span className="text-[11px] text-slate-400">Current Standing</span>
                <p className="text-base font-bold text-cyan-400 mt-0.5">8.6 CGPA</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <span className="text-[11px] text-slate-400">Net Elevation</span>
                <p className="text-base font-bold text-emerald-400 mt-0.5">+1.4 Pts</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                <span className="text-[11px] text-slate-400">Highest Term SGPA</span>
                <p className="text-base font-bold text-indigo-400 mt-0.5">8.9 (Sem 6)</p>
              </div>
            </div>

            {/* Recharts Area Container */}
            <div className="h-[300px] sm:h-[340px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="academicCyanGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="academicPurpleGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={darkMode ? "#1e293b" : "#e2e8f0"}
                  />

                  <XAxis
                    dataKey="semester"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#94a3b8" : "#64748b",
                      fontWeight: 500,
                    }}
                  />

                  <YAxis
                    domain={[6.5, 9.5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? "#94a3b8" : "#64748b",
                    }}
                  />

                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const dataItem = payload[0].payload;
                        return (
                          <div
                            className={`p-3.5 rounded-2xl border shadow-xl backdrop-blur-md ${
                              darkMode
                                ? "bg-slate-900/95 border-slate-700 text-white"
                                : "bg-white/95 border-slate-200 text-slate-900 shadow-md"
                            }`}
                          >
                            <p className="text-xs font-bold text-cyan-400 mb-1">
                              {label} Academic Breakdown
                            </p>
                            <div className="space-y-1 text-xs">
                              <p className="flex justify-between gap-4">
                                <span className="text-slate-400">Cumulative CGPA:</span>
                                <span className="font-bold">{dataItem.cgpa}</span>
                              </p>
                              <p className="flex justify-between gap-4">
                                <span className="text-slate-400">Term SGPA:</span>
                                <span className="font-bold text-emerald-400">
                                  {dataItem.sgpa}
                                </span>
                              </p>
                              <p className="flex justify-between gap-4">
                                <span className="text-slate-400">Credits Registered:</span>
                                <span className="font-bold">{dataItem.credits}</span>
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey={chartMetric}
                    stroke={chartMetric === "cgpa" ? "#06b6d4" : "#8b5cf6"}
                    strokeWidth={3}
                    fill={
                      chartMetric === "cgpa"
                        ? "url(#academicCyanGlow)"
                        : "url(#academicPurpleGlow)"
                    }
                    dot={{
                      r: 5,
                      fill: chartMetric === "cgpa" ? "#06b6d4" : "#8b5cf6",
                      strokeWidth: 2,
                      stroke: darkMode ? "#0f172a" : "#ffffff",
                    }}
                    activeDot={{
                      r: 7,
                      fill: "#ffffff",
                      stroke: chartMetric === "cgpa" ? "#06b6d4" : "#8b5cf6",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* RIGHT 1 COLUMN: Current Term Standing & Goals Card */}
          <section
            className={`rounded-3xl border p-5 sm:p-7 transition-all flex flex-col justify-between ${
              darkMode
                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <CalendarDays size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold">
                      Semester 6 Hub
                    </h3>
                    <p className="text-xs text-slate-400">
                      Active Term Assessment
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active Term
                </span>
              </div>

              {/* Term Highlight Box */}
              <div
                className={`mt-5 p-5 rounded-2xl border relative overflow-hidden ${
                  darkMode
                    ? "bg-gradient-to-br from-slate-900 to-[#172033] border-slate-800 text-white"
                    : "bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                      Term SGPA Forecast
                    </span>
                    <h4 className="text-3xl font-extrabold text-cyan-400 mt-0.5">
                      8.90
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 flex items-center justify-center">
                    <Flame size={24} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-700/60">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Credits Registered
                    </span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">24 Credits</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Courses Enrolled
                    </span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">6 Courses</p>
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="mt-6 space-y-4">
                <MetricProgressBar
                  darkMode={darkMode}
                  label="Degree Completion Target"
                  value={85}
                  valueText="136 / 160 Credits"
                  colorClass="bg-cyan-500"
                />
                <MetricProgressBar
                  darkMode={darkMode}
                  label="Honors Standing Goal"
                  value={86}
                  valueText="8.6 / 10.0 CGPA"
                  colorClass="bg-emerald-500"
                />
                <MetricProgressBar
                  darkMode={darkMode}
                  label="Required Attendance Threshold"
                  value={91}
                  valueText="91% (>75% mandatory)"
                  colorClass="bg-indigo-500"
                />
              </div>
            </div>

            {/* Smart Advice Chip */}
            <div
              className={`mt-6 p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                darkMode
                  ? "bg-slate-900/50 border-slate-800 text-slate-300"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              <Sparkles size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Maintain an SGPA of <strong>8.8+</strong> in Sem 7 & 8 to graduate with an
                overall CGPA above <strong>8.75</strong> (Top Honors).
              </span>
            </div>
          </section>
        </div>

        {/* =====================================================
            SUBJECT PERFORMANCE DATA TABLE & FILTERS
        ===================================================== */}
        <section
          className={`rounded-3xl border p-5 sm:p-7 transition-all ${
            darkMode
              ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
              : "bg-white border-slate-200 shadow-xs"
          }`}
        >
          {/* Header & Search/Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Course Subject Breakdown
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detailed scorecards, credit weightings, and letter grades for Semester 6
                </p>
              </div>
            </div>

            {/* Filter and Search controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search input */}
              <div
                className={`relative flex items-center rounded-xl border ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-700/80 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-900"
                }`}
              >
                <Search size={15} className="ml-3 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search subject or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2 text-xs bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-2 text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Grade Filter Pills */}
              <div
                className={`flex items-center p-1 rounded-xl border text-xs font-semibold ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                {["ALL", "A+", "A", "B+"].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setGradeFilter(grade)}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      gradeFilter === grade
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP RESPONSIVE TABLE */}
          <div className="hidden md:block overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`text-[11px] font-bold uppercase tracking-wider border-b ${
                    darkMode
                      ? "border-slate-800 text-slate-400 bg-slate-900/30"
                      : "border-slate-100 text-slate-500 bg-slate-50/70"
                  }`}
                >
                  <th className="py-3.5 px-4 rounded-l-xl">Course Title</th>
                  <th className="py-3.5 px-4">Code</th>
                  <th className="py-3.5 px-4">Classification</th>
                  <th className="py-3.5 px-4 text-center">Credits</th>
                  <th className="py-3.5 px-4 text-center">Score %</th>
                  <th className="py-3.5 px-4 text-center">Letter Grade</th>
                  <th className="py-3.5 px-4 rounded-r-xl">Performance Bar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-sm">
                {filteredSubjects.map((item) => (
                  <tr
                    key={item.code}
                    className={`transition-colors ${
                      darkMode
                        ? "hover:bg-slate-800/30"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold text-slate-200">
                      <div>
                        <span>{item.subject}</span>
                        <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                          Internal: {item.internal} • External: {item.external}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-xs text-cyan-400 font-semibold">
                      {item.code}
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300">
                        {item.type}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center font-bold text-slate-300">
                      {item.credits}
                    </td>

                    <td className="py-4 px-4 text-center font-extrabold text-base">
                      {item.marks}%
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-xl text-xs font-extrabold border ${getGradeBadge(
                          item.grade
                        )}`}
                      >
                        {item.grade}
                      </span>
                    </td>

                    <td className="py-4 px-4 w-44">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-full h-2 rounded-full overflow-hidden ${
                            darkMode ? "bg-slate-800" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.marks >= 90
                                ? "bg-emerald-500"
                                : item.marks >= 80
                                ? "bg-cyan-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${item.marks}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          {item.marks}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSubjects.length === 0 && (
              <div className="py-12 text-center text-slate-400 text-sm">
                No course subjects match your filter or search query.
              </div>
            )}
          </div>

          {/* MOBILE CARDS VIEW */}
          <div className="space-y-3.5 mt-4 md:hidden">
            {filteredSubjects.map((item) => (
              <div
                key={item.code}
                className={`p-4 rounded-2xl border transition-all ${
                  darkMode
                    ? "bg-slate-900/50 border-slate-800"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">
                      {item.subject}
                    </h4>
                    <p className="text-xs text-cyan-400 font-mono mt-0.5">
                      {item.code} • {item.credits} Credits • {item.type}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-extrabold border shrink-0 ${getGradeBadge(
                      item.grade
                    )}`}
                  >
                    {item.grade}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Score & Assessment</span>
                  <span className="font-bold text-slate-200">
                    {item.marks}% ({item.internal} Int / {item.external} Ext)
                  </span>
                </div>

                <div className="mt-2.5 h-2 rounded-full overflow-hidden bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      item.marks >= 90
                        ? "bg-emerald-500"
                        : item.marks >= 80
                        ? "bg-cyan-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${item.marks}%` }}
                  />
                </div>
              </div>
            ))}

            {filteredSubjects.length === 0 && (
              <div className="py-8 text-center text-slate-400 text-sm">
                No subjects found matching your filters.
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            ATTENDANCE BREAKDOWN & ACHIEVEMENTS (2 COLUMNS)
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* LEFT: Attendance Overview Card */}
          <section
            className={`rounded-3xl border p-5 sm:p-7 transition-all ${
              darkMode
                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Classroom Attendance
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Subject-wise physical lecture and lab presence
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Safe Threshold
              </span>
            </div>

            {/* Circular Gauge Banner */}
            <div
              className={`mt-5 p-5 rounded-2xl border flex items-center gap-5 ${
                darkMode
                  ? "bg-slate-900/60 border-slate-800"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-700/60 border-t-cyan-500 border-r-cyan-500 flex items-center justify-center shadow-inner">
                  <span className="text-sm font-extrabold text-cyan-400">91%</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold">
                  Aggregate Attendance Status: Excellent
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  You are comfortably 16.4% above the university's 75% examination
                  qualification requirement.
                </p>
              </div>
            </div>

            {/* Attendance bars per subject */}
            <div className="mt-6 space-y-4">
              {attendanceData.map((item) => (
                <div key={item.code}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-300">
                      {item.subject}
                    </span>
                    <span className="font-mono font-bold text-cyan-400">
                      {item.value}% ({item.attended}/{item.total} sessions)
                    </span>
                  </div>
                  <div
                    className={`h-2 rounded-full overflow-hidden ${
                      darkMode ? "bg-slate-800" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.value >= 90
                          ? "bg-cyan-500"
                          : item.value >= 80
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: Academic Highlights & Honors */}
          <section
            className={`rounded-3xl border p-5 sm:p-7 transition-all ${
              darkMode
                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                : "bg-white border-slate-200 shadow-xs"
            }`}
          >
            <div className="flex items-center justify-between pb-5 border-b border-slate-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Academic Honors & Badges
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Recognitions awarded across semesters
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                4 Earned
              </span>
            </div>

            {/* Achievement Timeline cards */}
            <div className="mt-5 space-y-3.5">
              {achievementsData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] ${
                      darkMode
                        ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                        : "bg-slate-50 border-slate-200 hover:border-cyan-200"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          item.color === "amber"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : item.color === "emerald"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : item.color === "cyan"
                            ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                        }`}
                      >
                        <IconComponent size={20} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-slate-200 truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 uppercase tracking-wide shrink-0">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-snug">
                          {item.description}
                        </p>
                        <span className="inline-block mt-2 text-[10px] text-cyan-400 font-semibold font-mono">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* =====================================================
            BOTTOM STRATEGIC ACADEMIC ROADMAP BANNER
        ===================================================== */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all ${
            darkMode
              ? "bg-gradient-to-r from-[#172033] via-[#0f172a] to-[#111827] border-slate-800 text-white"
              : "bg-gradient-to-r from-slate-900 to-[#1e293b] text-white border-slate-800 shadow-md"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-[#0b1120] flex items-center justify-center shrink-0 shadow-lg shadow-cyan-400/20">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  Academic Trajectory: On Track for Honors Degree
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Your consistent trajectory from 7.2 to 8.6 CGPA puts you in the top tier of
                  candidates eligible for premier campus placement opportunities, higher studies
                  recommendations, and research fellowships.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate("/udyamsethu/student/opportunities")}
                className="px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-400/20"
              >
                <span>View Eligible Gigs & Jobs</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          OFFICIAL REPORT / TRANSCRIPT MODAL
      ===================================================== */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
              darkMode ? "bg-[#111827] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="text-cyan-400" size={24} />
                <h3 className="text-lg font-bold">Academic Transcript Summary</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-6 space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Student Profile:</span>
                  <span className="font-semibold text-white">Undergraduate CSE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cumulative CGPA:</span>
                  <span className="font-bold text-cyan-400">8.60 / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Semester 6 SGPA:</span>
                  <span className="font-bold text-emerald-400">8.90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Credits Completed:</span>
                  <span className="font-semibold text-white">136 / 160 Credits</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Attendance:</span>
                  <span className="font-semibold text-white">91.4% (Qualified)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Standing:</span>
                  <span className="font-bold text-emerald-400">First Class with Distinction</span>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-[11px]">
                This summary reflects the current verified academic record maintained by the
                department examination cell.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyReport}
                className="flex-1 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                {reportCopied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
                <span>{reportCopied ? "Copied to Clipboard!" : "Copy Summary"}</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/25"
              >
                <Printer size={16} />
                <span>Print Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Subcomponent: Executive Metric Card
// ----------------------------------------------------
function ExecutiveMetricCard({
  darkMode,
  icon: Icon,
  accentColor,
  title,
  value,
  scale,
  badge,
  badgeLabel,
  subtitle,
}) {
  const getAccentStyles = () => {
    switch (accentColor) {
      case "cyan":
        return {
          iconBg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
          badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        };
      case "emerald":
        return {
          iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
          badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
      case "amber":
        return {
          iconBg: "bg-amber-500/15 border-amber-500/30 text-amber-400",
          badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      default:
        return {
          iconBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
          badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        };
    }
  };

  const styles = getAccentStyles();

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        darkMode
          ? "bg-[#111827] border-slate-800 shadow-md shadow-black/15"
          : "bg-white border-slate-200 shadow-xs"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${styles.iconBg}`}
        >
          <Icon size={21} />
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${styles.badgeBg}`}
        >
          {badge}
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold text-slate-400">{title}</p>

      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-3xl font-extrabold tracking-tight">{value}</span>
        {scale && <span className="text-xs text-slate-400 font-semibold">{scale}</span>}
      </div>

      <p className="mt-2 text-[11px] text-slate-400 leading-snug">
        <span className="text-slate-300 font-medium">{badgeLabel}</span> • {subtitle}
      </p>
    </div>
  );
}

// ----------------------------------------------------
// Subcomponent: Metric Progress Bar
// ----------------------------------------------------
function MetricProgressBar({ darkMode, label, value, valueText, colorClass }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-mono font-bold text-slate-400">{valueText}</span>
      </div>
      <div
        className={`h-2 rounded-full overflow-hidden ${
          darkMode ? "bg-slate-800" : "bg-slate-200"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

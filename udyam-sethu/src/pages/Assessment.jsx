import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  Code2,
  Trophy,
  Target,
  BookOpen,
  BriefcaseBusiness,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  CalendarDays,
  CircleDot,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  Wallet,
  UserRound,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const weeklyData = [
  { day: "Mon", hours: 6, tasks: 5 },
  { day: "Tue", hours: 7, tasks: 7 },
  { day: "Wed", hours: 5, tasks: 4 },
  { day: "Thu", hours: 8, tasks: 8 },
  { day: "Fri", hours: 7, tasks: 6 },
  { day: "Sat", hours: 4, tasks: 3 },
  { day: "Sun", hours: 2, tasks: 2 },
];

const skillData = [
  { skill: "React", score: 88 },
  { skill: "JavaScript", score: 82 },
  { skill: "HTML/CSS", score: 91 },
  { skill: "Git", score: 76 },
  { skill: "API", score: 84 },
];

const assessments = [
  {
    title: "React Fundamentals Quiz",
    type: "Quiz",
    score: 88,
    date: "18 Aug 2026",
    status: "Completed",
  },
  {
    title: "JavaScript ES6 Assessment",
    type: "Quiz",
    score: 82,
    date: "15 Aug 2026",
    status: "Completed",
  },
  {
    title: "Udyam Sethu Student Portal",
    type: "Project",
    score: 90,
    date: "12 Aug 2026",
    status: "Reviewed",
  },
  {
    title: "Git & GitHub Practical",
    type: "Practical",
    score: 76,
    date: "09 Aug 2026",
    status: "Completed",
  },
];

 

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Assessment = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      label: "Overview",
      icon: LayoutDashboard,
    
    },
    {
      label: "Find Jobs",
      icon: Search,
    },
    {
      label: "My Applications",
      icon: FileText,
    },
    {
      label: "Saved Jobs",
      icon: Bookmark,
    },
    {
      label: "My Work",
      icon: BriefcaseBusiness,
    },
    {
      label: "Earnings",
      icon: Wallet,
    },
    {
      label: "Assessment",
      icon: Wallet,
        active: true,
    },
  ];
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">

          {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          w-[255px]
          h-screen
          bg-[#172033]
          text-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}

        <div className="h-[72px] px-5 flex items-center gap-3 border-b border-white/10">

          <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">

            <span className="text-[#172033] text-xl font-bold">
              U
            </span>

          </div>

          <div>

            <h1 className="font-bold text-lg">
              Udyam Sethu
            </h1>

            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Student Portal
            </p>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="px-3 py-6">

          <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-3">
            Workspace
          </p>

          <nav className="space-y-1">

            {navigation.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-lg
                    text-sm
                    transition
                    ${
                      item.active
                        ? "bg-cyan-400 text-[#172033] font-semibold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >

                  <Icon size={18} />

                  {item.label}

                </button>
              );

            })}

          </nav>

          <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mt-8 mb-3">
            Account
          </p>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5">

            <UserRound size={18} />

            My Profile

          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5">

            <Settings size={18} />

            Settings

          </button>

        </div>

        {/* PROFILE */}

        <div className="absolute bottom-0 left-0 right-0 p-4">

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center">

                <span className="text-xs font-bold text-[#172033]">
                  AR
                </span>

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-sm font-medium truncate">
                  Ananya Rao
                </p>

                <p className="text-xs text-slate-400">
                  Student
                </p>

              </div>

              <ChevronDown size={15} />

            </div>

          </div>

        </div>

      </aside>

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <main className="lg:ml-[255px] p-4 lg:p-7">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">

          <div>
            <p className="text-xs font-semibold tracking-wider text-cyan-600 uppercase">
              Student Assessment
            </p>

            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
              Assessment & Performance
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              Track your work, quizzes, projects and overall learning progress.
            </p>
          </div>

          <button className="px-5 h-11 bg-[#172033] text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#253451] transition">
            <ClipboardCheck size={17} />
            Take Assessment
          </button>

        </div>


        {/* =====================================================
            OVERALL SCORE
        ===================================================== */}

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">

          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">

            {/* SCORE */}

            <div className="flex items-center gap-5">

              <div className="relative w-28 h-28">

                <svg
                  className="w-28 h-28 -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset="56"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">
                    82%
                  </span>

                  <span className="text-[10px] text-slate-400">
                    Overall
                  </span>
                </div>

              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  Good Performance
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  You are performing above the average student level.
                </p>

                <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-semibold">
                  <TrendingUp size={14} />
                  +8.5% from last month
                </div>
              </div>

            </div>


            {/* DIVIDER */}

            <div className="hidden lg:block h-20 w-px bg-slate-200" />


            {/* SCORE SUMMARY */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 flex-1">

              <MiniMetric
                title="Work"
                value="86%"
                icon={Clock3}
              />

              <MiniMetric
                title="Quizzes"
                value="82%"
                icon={BookOpen}
              />

              <MiniMetric
                title="Projects"
                value="90%"
                icon={Code2}
              />

              <MiniMetric
                title="Skills"
                value="84%"
                icon={Target}
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

          <StatCard
            title="Work Completed"
            value="86%"
            change="+12%"
            description="vs last month"
            icon={CheckCircle2}
          />

          <StatCard
            title="Quizzes Completed"
            value="18"
            change="+4"
            description="this month"
            icon={BookOpen}
          />

          <StatCard
            title="Projects"
            value="05"
            change="+2"
            description="completed projects"
            icon={BriefcaseBusiness}
          />

          <StatCard
            title="Average Score"
            value="82%"
            change="+8.5%"
            description="assessment performance"
            icon={Trophy}
          />

        </div>


        {/* =====================================================
            CURRENT PROJECT
        ===================================================== */}

        <div className="bg-white border border-slate-200 rounded-xl mb-5">

          <div className="p-5 border-b border-slate-100 flex items-center justify-between">

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Current Project
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Your active project performance
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">
              In Progress
            </span>

          </div>


          <div className="p-5">

            <div className="flex flex-col lg:flex-row gap-6">

              <div className="w-12 h-12 rounded-xl bg-[#172033] flex items-center justify-center shrink-0">
                <Code2
                  size={23}
                  className="text-cyan-400"
                />
              </div>


              <div className="flex-1">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Udyam Sethu Student Portal
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Student employment and skill development platform
                    </p>
                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-2xl font-bold text-cyan-600">
                      74%
                    </p>

                    <p className="text-xs text-slate-400">
                      Project Progress
                    </p>

                  </div>

                </div>


                {/* PROGRESS */}

                <div className="mt-5">

                  <div className="flex justify-between mb-2">

                    <span className="text-xs font-medium text-slate-500">
                      Overall completion
                    </span>

                    <span className="text-xs font-bold text-slate-700">
                      74%
                    </span>

                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div className="h-full w-[74%] bg-cyan-500 rounded-full" />

                  </div>

                </div>


                {/* TECHNOLOGIES */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {[
                    "React.js",
                    "JavaScript",
                    "Tailwind CSS",
                    "REST API",
                    "Git",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-md bg-slate-100 text-xs text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}

                </div>


                {/* MILESTONES */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                  <Milestone
                    title="UI Development"
                    status="Completed"
                  />

                  <Milestone
                    title="API Integration"
                    status="In Progress"
                  />

                  <Milestone
                    title="Testing"
                    status="Pending"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            WORK + SKILLS
        ===================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">

          {/* WORK ACTIVITY */}

          <div className="bg-white border border-slate-200 rounded-xl">

            <ChartHeader
              title="Work Activity"
              subtitle="Your weekly working performance"
            />

            <div className="p-5">

              <div className="flex items-end gap-3 mb-4">

                <p className="text-3xl font-bold">
                  39 hrs
                </p>

                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-1">
                  <TrendingUp size={13} />
                  +14%
                </span>

              </div>


              <div className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={weeklyData}>

                    <defs>
                      <linearGradient
                        id="workFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity={0.3}
                        />

                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#94a3b8",
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#94a3b8",
                      }}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      fill="url(#workFill)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>


          {/* SKILL ASSESSMENT */}

          <div className="bg-white border border-slate-200 rounded-xl">

            <ChartHeader
              title="Skill Assessment"
              subtitle="Current technical skill scores"
            />

            <div className="p-5">

              <div className="h-[260px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart
                    data={skillData}
                    layout="vertical"
                    margin={{
                      left: 10,
                      right: 15,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "#94a3b8",
                      }}
                    />

                    <YAxis
                      type="category"
                      dataKey="skill"
                      width={80}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#64748b",
                      }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="score"
                      fill="#06b6d4"
                      radius={[0, 5, 5, 0]}
                      barSize={22}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            PROJECT + QUIZ SUMMARY
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* QUIZ */}

          <div className="bg-white border border-slate-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                <BookOpen
                  size={19}
                  className="text-violet-600"
                />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Good
              </span>

            </div>

            <p className="text-sm text-slate-500 mt-5">
              Quiz Performance
            </p>

            <p className="text-3xl font-bold mt-1">
              82%
            </p>

            <div className="h-2 bg-slate-100 rounded-full mt-4">

              <div className="h-full w-[82%] bg-violet-500 rounded-full" />

            </div>

            <p className="text-xs text-slate-400 mt-3">
              18 quizzes completed · 82% average accuracy
            </p>

          </div>


          {/* PROJECT */}

          <div className="bg-white border border-slate-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center">
                <BriefcaseBusiness
                  size={19}
                  className="text-cyan-600"
                />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Excellent
              </span>

            </div>

            <p className="text-sm text-slate-500 mt-5">
              Project Performance
            </p>

            <p className="text-3xl font-bold mt-1">
              90%
            </p>

            <div className="h-2 bg-slate-100 rounded-full mt-4">

              <div className="h-full w-[90%] bg-cyan-500 rounded-full" />

            </div>

            <p className="text-xs text-slate-400 mt-3">
              5 projects completed · 1 project active
            </p>

          </div>


          {/* WORK */}

          <div className="bg-white border border-slate-200 rounded-xl p-5">

            <div className="flex items-center justify-between">

              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Clock3
                  size={19}
                  className="text-emerald-600"
                />
              </div>

              <span className="text-xs font-semibold text-emerald-600">
                On Track
              </span>

            </div>

            <p className="text-sm text-slate-500 mt-5">
              Work Performance
            </p>

            <p className="text-3xl font-bold mt-1">
              86%
            </p>

            <div className="h-2 bg-slate-100 rounded-full mt-4">

              <div className="h-full w-[86%] bg-emerald-500 rounded-full" />

            </div>

            <p className="text-xs text-slate-400 mt-3">
              39 hours this week · 35 tasks completed
            </p>

          </div>

        </div>


        {/* =====================================================
            RECENT ASSESSMENTS
        ===================================================== */}

        <div className="bg-white border border-slate-200 rounded-xl mb-5">

          <ChartHeader
            title="Recent Assessments"
            subtitle="Your latest evaluation results"
          />

          <div className="divide-y divide-slate-100">

            {assessments.map((item) => (

              <div
                key={item.title}
                className="p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50 transition"
              >

                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">

                  {item.type === "Quiz" ? (
                    <BookOpen size={18} className="text-cyan-600" />
                  ) : (
                    <Code2 size={18} className="text-violet-600" />
                  )}

                </div>


                <div className="flex-1">

                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1">

                    <span className="text-xs text-slate-400">
                      {item.type}
                    </span>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>

                  </div>

                </div>


                <div className="flex items-center gap-5">

                  <div className="text-right">

                    <p className="text-lg font-bold text-slate-900">
                      {item.score}%
                    </p>

                    <p className="text-[10px] text-slate-400">
                      Score
                    </p>

                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold">
                    {item.status}
                  </span>

                  <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">

                    <ArrowUpRight size={15} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            IMPROVEMENT AREAS
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* IMPROVEMENT */}

          <div className="bg-white border border-slate-200 rounded-xl">

            <ChartHeader
              title="Areas to Improve"
              subtitle="Focus on these skills to increase your score"
            />

            <div className="p-5 space-y-4">

              <Improvement
                title="Git & GitHub"
                score="76%"
                recommendation="Practice branching, merging and pull requests."
              />

              <Improvement
                title="JavaScript"
                score="82%"
                recommendation="Focus on async JavaScript and advanced concepts."
              />

              <Improvement
                title="API Integration"
                score="84%"
                recommendation="Improve error handling and API state management."
              />

            </div>

          </div>


          {/* NEXT ASSESSMENT */}

          <div className="bg-[#172033] rounded-xl p-6 text-white">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-cyan-400 flex items-center justify-center">

                <Target
                  size={20}
                  className="text-[#172033]"
                />

              </div>

              <div>

                <p className="text-sm font-semibold">
                  Next Assessment
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  React Advanced Concepts
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-4 mt-7">

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">

                <Clock3
                  size={16}
                  className="text-cyan-400"
                />

                <p className="text-lg font-bold mt-3">
                  30 min
                </p>

                <p className="text-xs text-slate-400">
                  Duration
                </p>

              </div>


              <div className="p-4 rounded-lg bg-white/5 border border-white/10">

                <BookOpen
                  size={16}
                  className="text-cyan-400"
                />

                <p className="text-lg font-bold mt-3">
                  20
                </p>

                <p className="text-xs text-slate-400">
                  Questions
                </p>

              </div>

            </div>


            <button className="w-full mt-5 h-11 bg-cyan-400 text-[#172033] rounded-lg text-sm font-bold hover:bg-cyan-300 transition">
              Start Assessment
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};


/* =========================================================
   STAT CARD
========================================================= */

const StatCard = ({
  title,
  value,
  change,
  description,
  icon: Icon,
}) => {

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">

          <Icon
            size={18}
            className="text-cyan-600"
          />

        </div>

      </div>


      <div className="flex items-end gap-3 mt-4">

        <p className="text-2xl font-bold">
          {value}
        </p>

        <span className="text-xs text-emerald-600 font-semibold mb-1">
          {change}
        </span>

      </div>


      <p className="text-[11px] text-slate-400 mt-1">
        {description}
      </p>

    </div>
  );
};


/* =========================================================
   MINI METRIC
========================================================= */

const MiniMetric = ({
  title,
  value,
  icon: Icon,
}) => {

  return (

    <div>

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="text-cyan-600"
        />

        <span className="text-xs text-slate-500">
          {title}
        </span>

      </div>

      <p className="text-xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};


/* =========================================================
   CHART HEADER
========================================================= */

const ChartHeader = ({
  title,
  subtitle,
}) => {

  return (

    <div className="p-5 border-b border-slate-100 flex items-center justify-between">

      <div>

        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   MILESTONE
========================================================= */

const Milestone = ({
  title,
  status,
}) => {

  const completed = status === "Completed";

  return (

    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">

      <div>

        {completed ? (
          <CheckCircle2
            size={17}
            className="text-emerald-500"
          />
        ) : status === "In Progress" ? (
          <CircleDot
            size={17}
            className="text-cyan-500"
          />
        ) : (
          <Clock3
            size={17}
            className="text-slate-400"
          />
        )}

      </div>

      <div>

        <p className="text-xs font-semibold">
          {title}
        </p>

        <p className="text-[10px] text-slate-400 mt-1">
          {status}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   IMPROVEMENT
========================================================= */

const Improvement = ({
  title,
  score,
  recommendation,
}) => {

  return (

    <div className="flex gap-3">

      <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">

        <AlertCircle
          size={17}
          className="text-amber-500"
        />

      </div>

      <div className="flex-1">

        <div className="flex justify-between">

          <p className="text-sm font-semibold">
            {title}
          </p>

          <span className="text-xs font-bold text-amber-600">
            {score}
          </span>

        </div>

        <p className="text-xs text-slate-400 mt-1">
          {recommendation}
        </p>

      </div>

    </div>
  );
};


export default Assessment;
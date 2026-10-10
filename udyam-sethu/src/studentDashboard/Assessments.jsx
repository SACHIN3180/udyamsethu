import React, { useState } from "react";
import {
  ClipboardCheck,
  CalendarDays,
  Clock3,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  Sun,
  Moon,
} from "lucide-react";

export default function Assessments() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const assessments = [
    {
      id: 1,
      title: "Data Structures - Unit Test 2",
      subject: "Data Structures",
      code: "CS301",
      date: "05 Oct 2026",
      time: "10:00 AM",
      duration: "60 min",
      type: "Internal",
      status: "Upcoming",
      marks: "30 Marks",
    },
    {
      id: 2,
      title: "Database Management Quiz",
      subject: "Database Management",
      code: "CS302",
      date: "08 Oct 2026",
      time: "11:30 AM",
      duration: "45 min",
      type: "Quiz",
      status: "Upcoming",
      marks: "20 Marks",
    },
    {
      id: 3,
      title: "Operating Systems - Assignment",
      subject: "Operating Systems",
      code: "CS303",
      date: "10 Oct 2026",
      time: "02:00 PM",
      duration: "90 min",
      type: "Assignment",
      status: "Upcoming",
      marks: "25 Marks",
    },
    {
      id: 4,
      title: "Computer Networks - Mid Term",
      subject: "Computer Networks",
      code: "CS304",
      date: "15 Sep 2026",
      time: "10:00 AM",
      duration: "90 min",
      type: "Internal",
      status: "Completed",
      marks: "50 Marks",
      score: "43 / 50",
    },
    {
      id: 5,
      title: "Software Engineering Quiz",
      subject: "Software Engineering",
      code: "CS305",
      date: "12 Sep 2026",
      time: "11:00 AM",
      duration: "30 min",
      type: "Quiz",
      status: "Completed",
      marks: "20 Marks",
      score: "18 / 20",
    },
    {
      id: 6,
      title: "Web Technologies Assignment",
      subject: "Web Technologies",
      code: "CS306",
      date: "08 Sep 2026",
      time: "02:00 PM",
      duration: "60 min",
      type: "Assignment",
      status: "Completed",
      marks: "25 Marks",
      score: "22 / 25",
    },
  ];

  const filteredAssessments = assessments.filter((item) => {
    const matchesTab =
      activeTab === "All" || item.status === activeTab;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subject.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const upcomingCount = assessments.filter(
    (item) => item.status === "Upcoming"
  ).length;

  const completedCount = assessments.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-[#f4f7fb] text-slate-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md ${
          darkMode
            ? "border-slate-700 bg-[#111827]/95"
            : "border-slate-200 bg-white/95"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-sm">
              <ClipboardCheck size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                Assessments
              </h1>

              <p
                className={`text-xs sm:text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Manage your tests, quizzes and assignments
              </p>
            </div>
          </div>

          {/* Theme Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
              darkMode
                ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <section className="mb-6">
          <div
            className={`relative overflow-hidden rounded-2xl p-6 sm:p-8 ${
              darkMode
                ? "bg-gradient-to-r from-cyan-950 to-slate-800"
                : "bg-gradient-to-r from-cyan-600 to-cyan-500"
            } text-white`}
          >
            <div className="relative z-10 max-w-2xl">
              <p className="mb-2 text-sm font-medium text-cyan-100">
                Academic Assessments
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Stay prepared for your next assessment.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-cyan-50">
                Keep track of upcoming tests, quizzes and assignments
                and monitor your completed assessment performance.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
                  <p className="text-xs text-cyan-100">Upcoming</p>
                  <p className="text-lg font-bold">{upcomingCount}</p>
                </div>

                <div className="rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
                  <p className="text-xs text-cyan-100">Completed</p>
                  <p className="text-lg font-bold">{completedCount}</p>
                </div>
              </div>
            </div>

            <ClipboardCheck
              size={180}
              className="absolute -bottom-10 -right-8 hidden opacity-10 sm:block"
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            darkMode={darkMode}
            icon={<ClipboardCheck size={20} />}
            label="Total Assessments"
            value="12"
            description="This semester"
            iconClass="bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300"
          />

          <StatCard
            darkMode={darkMode}
            icon={<Clock3 size={20} />}
            label="Upcoming"
            value="3"
            description="Needs preparation"
            iconClass="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
          />

          <StatCard
            darkMode={darkMode}
            icon={<CheckCircle2 size={20} />}
            label="Completed"
            value="9"
            description="Assessments finished"
            iconClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
          />

          <StatCard
            darkMode={darkMode}
            icon={<Award size={20} />}
            label="Average Score"
            value="86%"
            description="Current performance"
            iconClass="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300"
          />
        </section>

        {/* Search + Filter */}
        <section className="mt-6">
          <div
            className={`flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            {/* Search */}
            <div
              className={`flex flex-1 items-center gap-3 rounded-xl border px-4 py-2.5 md:max-w-md ${
                darkMode
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <Search
                size={18}
                className={
                  darkMode ? "text-slate-500" : "text-slate-400"
                }
              />

              <input
                type="text"
                placeholder="Search assessments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full bg-transparent text-sm outline-none ${
                  darkMode
                    ? "text-white placeholder:text-slate-500"
                    : "text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {["All", "Upcoming", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-cyan-600 text-white"
                      : darkMode
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment List */}
        <section
          className={`mt-6 rounded-2xl border ${
            darkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-white"
          }`}
        >
          <div
            className={`flex items-center justify-between border-b p-5 ${
              darkMode ? "border-slate-700" : "border-slate-100"
            }`}
          >
            <div>
              <h2 className="text-lg font-bold">
                Assessment List
              </h2>

              <p
                className={`mt-1 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                View your assessments and their current status
              </p>
            </div>

            <Filter
              size={19}
              className={
                darkMode ? "text-slate-500" : "text-slate-400"
              }
            />
          </div>

          <div className="space-y-3 p-4 sm:p-5">
            {filteredAssessments.length === 0 ? (
              <div className="py-12 text-center">
                <Search
                  size={40}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 font-semibold">
                  No assessments found
                </p>

                <p
                  className={`mt-1 text-sm ${
                    darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              filteredAssessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  darkMode={darkMode}
                />
              ))
            )}
          </div>
        </section>

        {/* Preparation Tip */}
        <section
          className={`mt-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
            darkMode
              ? "border-cyan-900/50 bg-cyan-950/40"
              : "border-cyan-200 bg-cyan-50"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              darkMode
                ? "bg-cyan-900/50 text-cyan-300"
                : "bg-cyan-100 text-cyan-600"
            }`}
          >
            <AlertCircle size={21} />
          </div>

          <div>
            <h3
              className={`font-semibold ${
                darkMode ? "text-cyan-300" : "text-cyan-800"
              }`}
            >
              Preparation Tip
            </h3>

            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-cyan-400" : "text-cyan-700"
              }`}
            >
              Your next assessment is Data Structures Unit Test 2.
              Review your Unit 2 notes and practice previous questions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  darkMode,
  icon,
  label,
  value,
  description,
  iconClass,
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
        darkMode
          ? "border-slate-700 bg-slate-800"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {label}
          </p>

          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p
        className={`mt-4 text-xs ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

/* =========================
   ASSESSMENT CARD
========================= */

function AssessmentCard({ assessment, darkMode }) {
  const isUpcoming = assessment.status === "Upcoming";

  return (
    <div
      className={`group rounded-xl border p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
        darkMode
          ? "border-slate-700 bg-slate-900/50 hover:border-slate-600"
          : "border-slate-200 bg-slate-50 hover:border-cyan-200"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex gap-4">
          <div
            className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:flex ${
              isUpcoming
                ? darkMode
                  ? "bg-cyan-900/40 text-cyan-300"
                  : "bg-cyan-50 text-cyan-600"
                : darkMode
                ? "bg-emerald-900/40 text-emerald-300"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {isUpcoming ? (
              <ClipboardCheck size={21} />
            ) : (
              <CheckCircle2 size={21} />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{assessment.title}</h3>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  isUpcoming
                    ? darkMode
                      ? "bg-cyan-900/40 text-cyan-300"
                      : "bg-cyan-50 text-cyan-700"
                    : darkMode
                    ? "bg-emerald-900/40 text-emerald-300"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {assessment.status}
              </span>
            </div>

            <div
              className={`mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <span className="flex items-center gap-1">
                <BookOpen size={13} />
                {assessment.subject}
              </span>

              <span>{assessment.code}</span>

              <span>{assessment.type}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
          <Detail
            icon={<CalendarDays size={14} />}
            label="Date"
            value={assessment.date}
            darkMode={darkMode}
          />

          <Detail
            icon={<Clock3 size={14} />}
            label="Time"
            value={assessment.time}
            darkMode={darkMode}
          />

          <Detail
            icon={<Clock3 size={14} />}
            label="Duration"
            value={assessment.duration}
            darkMode={darkMode}
          />

          <Detail
            icon={<Award size={14} />}
            label={isUpcoming ? "Marks" : "Score"}
            value={
              isUpcoming ? assessment.marks : assessment.score
            }
            darkMode={darkMode}
          />
        </div>
      </div>

      {/* Action */}
      {isUpcoming && (
        <div
          className={`mt-4 flex justify-end border-t pt-4 ${
            darkMode ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <button className="flex items-center gap-1 text-sm font-semibold text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-400">
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* =========================
   DETAIL
========================= */

function Detail({ icon, label, value, darkMode }) {
  return (
    <div>
      <p
        className={`flex items-center gap-1 text-[10px] uppercase tracking-wide ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {icon}
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold sm:text-sm">
        {value}
      </p>
    </div>
  );
}

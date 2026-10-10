
import React, { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  TrendingUp,
  AlertCircle,
  BookOpen,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";

const Attendance = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("September 2026");

  const subjects = [
    {
      name: "Data Structures",
      code: "CS301",
      attended: 38,
      total: 42,
      percentage: 90,
    },
    {
      name: "Database Management",
      code: "CS302",
      attended: 35,
      total: 40,
      percentage: 87.5,
    },
    {
      name: "Operating Systems",
      code: "CS303",
      attended: 31,
      total: 38,
      percentage: 81.6,
    },
    {
      name: "Computer Networks",
      code: "CS304",
      attended: 28,
      total: 36,
      percentage: 77.8,
    },
    {
      name: "Software Engineering",
      code: "CS305",
      attended: 34,
      total: 37,
      percentage: 91.9,
    },
    {
      name: "Web Technologies",
      code: "CS306",
      attended: 32,
      total: 35,
      percentage: 91.4,
    },
  ];

  const recentAttendance = [
    {
      subject: "Data Structures",
      date: "30 Sep 2026",
      time: "09:00 AM",
      status: "Present",
    },
    {
      subject: "Database Management",
      date: "30 Sep 2026",
      time: "11:00 AM",
      status: "Present",
    },
    {
      subject: "Operating Systems",
      date: "29 Sep 2026",
      time: "10:00 AM",
      status: "Absent",
    },
    {
      subject: "Web Technologies",
      date: "29 Sep 2026",
      time: "02:00 PM",
      status: "Present",
    },
    {
      subject: "Computer Networks",
      date: "28 Sep 2026",
      time: "11:00 AM",
      status: "Late",
    },
  ];

  const attendanceDays = [
    "P",
    "P",
    "P",
    "A",
    "P",
    "P",
    "P",
    "P",
    "L",
    "P",
    "P",
    "A",
    "P",
    "P",
    "P",
    "P",
    "P",
    "P",
    "P",
    "A",
    "P",
  ];

  const getStatusColor = (percentage) => {
    if (percentage >= 85) {
      return darkMode
        ? "bg-emerald-900/40 text-emerald-300"
        : "bg-emerald-50 text-emerald-600";
    }

    if (percentage >= 75) {
      return darkMode
        ? "bg-amber-900/40 text-amber-300"
        : "bg-amber-50 text-amber-600";
    }

    return darkMode
      ? "bg-red-900/40 text-red-300"
      : "bg-red-50 text-red-600";
  };

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
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-sm">
                <CalendarDays size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold sm:text-xl">
                  Attendance
                </h1>
                <p
                  className={`text-xs sm:text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Track your academic attendance
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Month */}
            <div
              className={`hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm sm:flex ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-200"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <CalendarDays size={16} />

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`bg-transparent outline-none ${
                  darkMode ? "text-slate-200" : "text-slate-700"
                }`}
              >
                <option>September 2026</option>
                <option>August 2026</option>
                <option>July 2026</option>
              </select>
            </div>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
                darkMode
                  ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Month Selector */}
        <div
          className={`mb-5 flex items-center justify-between rounded-xl border p-3 sm:hidden ${
            darkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="text-cyan-500" />
            <span className="text-sm font-medium">{selectedMonth}</span>
          </div>

          <ChevronDown size={17} />
        </div>

        {/* Overview */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Overall */}
          <div
            className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
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
                  Overall Attendance
                </p>

                <h2 className="mt-2 text-3xl font-bold">86.4%</h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300">
                <TrendingUp size={21} />
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{ width: "86.4%" }}
              />
            </div>

            <p
              className={`mt-2 text-xs ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Above minimum requirement of 75%
            </p>
          </div>

          {/* Present */}
          <div
            className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Present
                </p>

                <h2 className="mt-2 text-3xl font-bold">198</h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-emerald-500">
              86.4% of total classes
            </p>
          </div>

          {/* Absent */}
          <div
            className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Absent
                </p>

                <h2 className="mt-2 text-3xl font-bold">24</h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
                <XCircle size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-red-500">
              10.5% of total classes
            </p>
          </div>

          {/* Late */}
          <div
            className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-lg ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Late
                </p>

                <h2 className="mt-2 text-3xl font-bold">7</h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-xs text-amber-500">
              Requires attention
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Attendance Calendar */}
          <div
            className={`rounded-2xl border p-5 lg:col-span-2 ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">Attendance Overview</h2>

                <p
                  className={`mt-1 text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Your attendance activity for {selectedMonth}
                </p>
              </div>

              <div
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  darkMode
                    ? "bg-cyan-900/40 text-cyan-300"
                    : "bg-cyan-50 text-cyan-700"
                }`}
              >
                21 / 24 Classes
              </div>
            </div>

            {/* Calendar */}
            <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <div
                    key={day}
                    className={`pb-2 text-center text-xs font-semibold ${
                      darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {day}
                  </div>
                )
              )}

              {attendanceDays.map((status, index) => (
                <div
                  key={index}
                  className={`flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition hover:scale-105 ${
                    status === "P"
                      ? darkMode
                        ? "bg-emerald-900/40 text-emerald-300"
                        : "bg-emerald-50 text-emerald-600"
                      : status === "A"
                      ? darkMode
                        ? "bg-red-900/40 text-red-300"
                        : "bg-red-50 text-red-600"
                      : darkMode
                      ? "bg-amber-900/40 text-amber-300"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Present
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                Absent
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                Late
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "border-slate-700 bg-slate-800"
                : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-bold">Attendance Summary</h2>

            <div className="mt-6 flex justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-cyan-500">
                <div className="text-center">
                  <p className="text-3xl font-bold">86.4%</p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Overall
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="flex justify-between text-sm">
                <span
                  className={
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }
                >
                  Total Classes
                </span>
                <span className="font-semibold">229</span>
              </div>

              <div className="flex justify-between text-sm">
                <span
                  className={
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }
                >
                  Required
                </span>
                <span className="font-semibold">75%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span
                  className={
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }
                >
                  Safe Margin
                </span>
                <span className="font-semibold text-emerald-500">
                  +11.4%
                </span>
              </div>
            </div>

            <div
              className={`mt-6 flex gap-3 rounded-xl p-3 ${
                darkMode
                  ? "bg-emerald-900/30"
                  : "bg-emerald-50"
              }`}
            >
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <p
                className={`text-xs leading-5 ${
                  darkMode ? "text-emerald-300" : "text-emerald-700"
                }`}
              >
                Your attendance is currently above the minimum
                requirement.
              </p>
            </div>
          </div>
        </section>

        {/* Subject Attendance */}
        <section
          className={`mt-6 rounded-2xl border ${
            darkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="border-b border-inherit p-5">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  darkMode
                    ? "bg-cyan-900/40 text-cyan-300"
                    : "bg-cyan-50 text-cyan-600"
                }`}
              >
                <BookOpen size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Subject-wise Attendance
                </h2>

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Monitor attendance for each subject
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr
                  className={`border-b text-left text-xs uppercase ${
                    darkMode
                      ? "border-slate-700 text-slate-400"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <th className="px-5 py-4">Subject</th>
                  <th className="px-5 py-4">Classes</th>
                  <th className="px-5 py-4">Attended</th>
                  <th className="px-5 py-4">Attendance</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((subject) => (
                  <tr
                    key={subject.code}
                    className={`border-b last:border-0 ${
                      darkMode
                        ? "border-slate-700"
                        : "border-slate-100"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold">{subject.name}</p>
                      <p
                        className={`mt-1 text-xs ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {subject.code}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {subject.total}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {subject.attended}
                    </td>

                    <td className="min-w-[200px] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div
                            className={`h-full rounded-full ${
                              subject.percentage >= 85
                                ? "bg-emerald-500"
                                : subject.percentage >= 75
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${subject.percentage}%`,
                            }}
                          />
                        </div>

                        <span className="w-12 text-right text-sm font-semibold">
                          {subject.percentage}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          subject.percentage
                        )}`}
                      >
                        {subject.percentage >= 85
                          ? "Good"
                          : subject.percentage >= 75
                          ? "Warning"
                          : "Low"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 p-4 md:hidden">
            {subjects.map((subject) => (
              <div
                key={subject.code}
                className={`rounded-xl border p-4 ${
                  darkMode
                    ? "border-slate-700 bg-slate-900/50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>

                    <p
                      className={`mt-1 text-xs ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      {subject.code}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusColor(
                      subject.percentage
                    )}`}
                  >
                    {subject.percentage}%
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full ${
                      subject.percentage >= 85
                        ? "bg-emerald-500"
                        : subject.percentage >= 75
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${subject.percentage}%`,
                    }}
                  />
                </div>

                <div
                  className={`mt-3 flex justify-between text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <span>
                    Attended: {subject.attended}
                  </span>

                  <span>
                    Total: {subject.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Attendance */}
        <section
          className={`mt-6 rounded-2xl border ${
            darkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="p-5">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  darkMode
                    ? "bg-purple-900/40 text-purple-300"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                <Clock3 size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Recent Attendance
                </h2>

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Your latest attendance records
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {recentAttendance.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                    darkMode
                      ? "border-slate-700 bg-slate-900/40"
                      : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        item.status === "Present"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300"
                      }`}
                    >
                      {item.status === "Present" ? (
                        <CheckCircle2 size={18} />
                      ) : item.status === "Absent" ? (
                        <XCircle size={18} />
                      ) : (
                        <Clock3 size={18} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {item.subject}
                      </p>

                      <p
                        className={`mt-1 text-xs ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {item.date} • {item.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Present"
                        ? darkMode
                          ? "bg-emerald-900/40 text-emerald-300"
                          : "bg-emerald-50 text-emerald-600"
                        : item.status === "Absent"
                        ? darkMode
                          ? "bg-red-900/40 text-red-300"
                          : "bg-red-50 text-red-600"
                        : darkMode
                        ? "bg-amber-900/40 text-amber-300"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alert */}
        <section
          className={`mt-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center ${
            darkMode
              ? "border-amber-900/50 bg-amber-900/20"
              : "border-amber-200 bg-amber-50"
          }`}
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              darkMode
                ? "bg-amber-900/50 text-amber-300"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            <AlertCircle size={21} />
          </div>

          <div>
            <h3
              className={`font-semibold ${
                darkMode ? "text-amber-300" : "text-amber-800"
              }`}
            >
              Keep your attendance above 75%
            </h3>

            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-amber-400" : "text-amber-700"
              }`}
            >
              You currently have a safe margin of 11.4%. Regular
              attendance will help maintain your academic eligibility.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Attendance;

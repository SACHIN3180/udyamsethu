
import React, { useState } from "react";
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

const performanceData = [
  { semester: "Sem 1", cgpa: 7.2 },
  { semester: "Sem 2", cgpa: 7.6 },
  { semester: "Sem 3", cgpa: 7.8 },
  { semester: "Sem 4", cgpa: 8.1 },
  { semester: "Sem 5", cgpa: 8.4 },
  { semester: "Sem 6", cgpa: 8.6 },
];



const subjectData = [
  {
    subject: "Data Structures",
    code: "CS301",
    marks: 91,
    grade: "A+",
    credits: 4,
  },
  {
    subject: "Database Management",
    code: "CS302",
    marks: 87,
    grade: "A",
    credits: 4,
  },
  {
    subject: "Java Programming",
    code: "CS303",
    marks: 84,
    grade: "A",
    credits: 4,
  },
  {
    subject: "Computer Networks",
    code: "CS304",
    marks: 79,
    grade: "B+",
    credits: 3,
  },
  {
    subject: "Artificial Intelligence",
    code: "CS305",
    marks: 92,
    grade: "A+",
    credits: 4,
  },
  {
    subject: "Software Engineering",
    code: "CS306",
    marks: 86,
    grade: "A",
    credits: 3,
  },
];

const attendanceData = [
  { subject: "Data Structures", value: 94 },
  { subject: "Database Management", value: 91 },
  { subject: "Java Programming", value: 96 },
  { subject: "Computer Networks", value: 86 },
  { subject: "Artificial Intelligence", value: 92 },
];

const getGradeColor = (grade) => {
  if (grade === "A+") {
    return "bg-emerald-50 text-emerald-600";
  }

  if (grade === "A") {
    return "bg-cyan-50 text-cyan-600";
  }

  return "bg-amber-50 text-amber-600";
};

const AcademicPerformance = () => {
  const [darkMode, setDarkMode] = useState(false)

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50">
                <GraduationCap
                  size={25}
                  className="text-cyan-600 cursor-pointer"
                  onClick={()=>navigate("/udyamsethu/student")}
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  Student Analytics
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Academic Performance
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Track your academic progress, subject performance and
                  semester-wise growth.
                </p>
              </div>

            </div>

            <button className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-600 sm:w-auto">
              <Download size={16} />
              Download Report
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`
              w-10
              h-10
              rounded-lg
              flex
              items-center
              justify-center
              transition 

              ${darkMode
                  ? "bg-slate-800 text-yellow-300"
                  : "hover:bg-slate-100 text-slate-600"
                }
              `}
              title={
                darkMode
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {darkMode ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )
              }

            </button>


          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            TOP SUMMARY
        ===================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            icon={GraduationCap}
            title="Current CGPA"
            value="8.6"
            subtitle="Out of 10.0"
            trend="+0.4"
            trendText="from last semester"
          />

          <SummaryCard
            icon={TrendingUp}
            title="Overall Percentage"
            value="86.2%"
            subtitle="Academic average"
            trend="+5.8%"
            trendText="improvement"
          />

          <SummaryCard
            icon={Award}
            title="Current Rank"
            value="#12"
            subtitle="Among 180 students"
            trend="Top 7%"
            trendText="of your batch"
          />

          <SummaryCard
            icon={Target}
            title="Attendance"
            value="91%"
            subtitle="Overall attendance"
            trend="Good"
            trendText="above requirement"
          />

        </div>

        {/* =====================================================
            PERFORMANCE CHART + SEMESTER OVERVIEW
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* PERFORMANCE CHART */}

          <section className="rounded-xl border border-slate-200 bg-white xl:col-span-2">

            <SectionHeader
              icon={BarChart3}
              title="CGPA Progress"
              subtitle="Your semester-wise academic performance"
            />

            <div className="p-4 sm:p-6">

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    8.6
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <TrendingUp
                      size={15}
                      className="text-emerald-500"
                    />

                    <span className="text-xs font-semibold text-emerald-600">
                      Consistent improvement
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-cyan-50 px-3 py-2">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-cyan-600">
                    Latest Semester
                  </p>

                  <p className="mt-1 text-sm font-bold text-cyan-700">
                    Semester 6
                  </p>
                </div>

              </div>

              <div className="h-[280px] w-full">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <AreaChart data={performanceData}>

                    <defs>
                      <linearGradient
                        id="academicGradient"
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
                      dataKey="semester"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#64748b",
                      }}
                    />

                    <YAxis
                      domain={[6, 10]}
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 11,
                        fill: "#64748b",
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                          "0 8px 20px rgba(15, 23, 42, 0.08)",
                      }}
                      formatter={(value) => [
                        `${value} CGPA`,
                        "Performance",
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="cgpa"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      fill="url(#academicGradient)"
                      dot={{
                        r: 4,
                        fill: "#06b6d4",
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />

                  </AreaChart>
                </ResponsiveContainer>

              </div>

            </div>

          </section>

          {/* SEMESTER OVERVIEW */}

          <section className="rounded-xl border border-slate-200 bg-white">

            <SectionHeader
              icon={CalendarDays}
              title="Semester Overview"
              subtitle="Your academic summary"
            />

            <div className="p-5">

              <div className="rounded-xl bg-[#172033] p-5 text-white">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-slate-400">
                      Current Semester
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Semester 6
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400">
                    <GraduationCap
                      size={20}
                      className="text-[#172033]"
                    />
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">

                  <MiniStat
                    label="SGPA"
                    value="8.9"
                  />

                  <MiniStat
                    label="Credits"
                    value="24"
                  />

                  <MiniStat
                    label="Subjects"
                    value="6"
                  />

                  <MiniStat
                    label="Attendance"
                    value="91%"
                  />

                </div>

              </div>

              <div className="mt-5 space-y-4">

                <ProgressRow
                  label="Academic Goal"
                  value={86}
                  text="8.6 / 10"
                />

                <ProgressRow
                  label="Credit Completion"
                  value={82}
                  text="120 / 146"
                />

                <ProgressRow
                  label="Attendance"
                  value={91}
                  text="91%"
                />

              </div>

            </div>

          </section>

        </div>

        {/* =====================================================
            SUBJECT PERFORMANCE
        ===================================================== */}

        <section className="mt-5 rounded-xl border border-slate-200 bg-white">

          <SectionHeader
            icon={BookOpen}
            title="Subject Performance"
            subtitle="Current semester subject-wise marks and grades"
            action="View all"
          />

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Code
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Marks
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Grade
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Credits
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500">
                    Performance
                  </th>
                </tr>
              </thead>

              <tbody>

                {subjectData.map((subject) => (

                  <tr
                    key={subject.code}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >

                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {subject.subject}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-400">
                      {subject.code}
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-bold">
                        {subject.marks}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-bold ${getGradeColor(
                          subject.grade
                        )}`}
                      >
                        {subject.grade}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {subject.credits}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-28 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-cyan-500"
                            style={{
                              width: `${subject.marks}%`,
                            }}
                          />
                        </div>

                        <span className="text-xs font-semibold text-slate-500">
                          {subject.marks}%
                        </span>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* MOBILE CARDS */}

          <div className="space-y-3 p-4 md:hidden">

            {subjectData.map((subject) => (

              <div
                key={subject.code}
                className="rounded-xl border border-slate-200 p-4"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p className="text-sm font-semibold">
                      {subject.subject}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {subject.code} • {subject.credits} Credits
                    </p>
                  </div>

                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-bold ${getGradeColor(
                      subject.grade
                    )}`}
                  >
                    {subject.grade}
                  </span>

                </div>

                <div className="mt-4">

                  <div className="mb-2 flex justify-between">
                    <span className="text-xs text-slate-500">
                      Performance
                    </span>

                    <span className="text-xs font-bold text-cyan-600">
                      {subject.marks}%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-cyan-500"
                      style={{
                        width: `${subject.marks}%`,
                      }}
                    />
                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =====================================================
            ATTENDANCE + ACHIEVEMENTS
        ===================================================== */}

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* ATTENDANCE */}

          <section className="rounded-xl border border-slate-200 bg-white">

            <SectionHeader
              icon={CheckCircle2}
              title="Attendance Overview"
              subtitle="Subject-wise attendance"
            />

            <div className="p-5">

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-cyan-500">
                  <span className="text-sm font-bold">
                    91%
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Overall Attendance
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    5% above the minimum requirement
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                {attendanceData.map((item) => (

                  <div key={item.subject}>

                    <div className="mb-2 flex justify-between">

                      <span className="text-xs font-medium text-slate-700">
                        {item.subject}
                      </span>

                      <span className="text-xs font-bold text-cyan-600">
                        {item.value}%
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-cyan-500"
                        style={{
                          width: `${item.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

          {/* ACHIEVEMENTS */}

          <section className="rounded-xl border border-slate-200 bg-white">

            <SectionHeader
              icon={Award}
              title="Academic Highlights"
              subtitle="Your recent achievements"
            />

            <div className="space-y-4 p-5">

              <Achievement
                icon={Award}
                title="Top Academic Performer"
                description="Achieved CGPA above 8.5"
                date="Semester 6"
              />

              <Achievement
                icon={TrendingUp}
                title="Consistent Improvement"
                description="Improved CGPA for 4 consecutive semesters"
                date="Recent"
              />

              <Achievement
                icon={CheckCircle2}
                title="Excellent Attendance"
                description="Maintained more than 90% attendance"
                date="Current"
              />

              <Achievement
                icon={Target}
                title="Career Ready"
                description="Completed required academic assessments"
                date="2026"
              />

            </div>

          </section>

        </div>

        {/* =====================================================
            BOTTOM INSIGHT
        ===================================================== */}

        <div className="mt-5 overflow-hidden rounded-xl bg-[#172033] p-5 text-white sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400">
                <TrendingUp
                  size={21}
                  className="text-[#172033]"
                />
              </div>

              <div>

                <p className="text-sm font-semibold">
                  Keep up your academic progress
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-400">
                  Your CGPA has improved consistently over the last few
                  semesters. Continue focusing on your core subjects and
                  maintain your attendance to reach your academic goals.
                </p>

              </div>

            </div>

            <button className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-bold text-[#172033] transition hover:bg-cyan-300">
              View Goals
              <ArrowUpRight size={15} />
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

/* =========================================================
   SUMMARY CARD
========================================================= */

const SummaryCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  trendText,
}) => {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50">
          <Icon
            size={19}
            className="text-cyan-600"
          />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300 transition group-hover:text-cyan-500"
        />

      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {title}
      </p>

      <div className="mt-1 flex items-end gap-2">

        <p className="text-2xl font-bold">
          {value}
        </p>

        <span className="mb-1 text-[10px] font-semibold text-emerald-600">
          {trend}
        </span>

      </div>

      <p className="mt-1 text-[11px] text-slate-400">
        {subtitle} • {trendText}
      </p>

    </div>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  action,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50">
          <Icon
            size={17}
            className="text-cyan-600"
          />
        </div>

        <div>

          <h2 className="text-sm font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>

        </div>

      </div>

      {action && (
        <button className="text-xs font-semibold text-cyan-600 hover:text-cyan-700">
          {action}
        </button>
      )}

    </div>
  );
};

/* =========================================================
   MINI STAT
========================================================= */

const MiniStat = ({ label, value }) => {
  return (
    <div className="rounded-lg bg-white/5 p-3">

      <p className="text-[10px] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>

    </div>
  );
};

/* =========================================================
   PROGRESS ROW
========================================================= */

const ProgressRow = ({
  label,
  value,
  text,
}) => {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-medium text-slate-600">
          {label}
        </span>

        <span className="text-xs font-semibold text-cyan-600">
          {text}
        </span>

      </div>

      <div className="h-2 rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-cyan-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
};

/* =========================================================
   ACHIEVEMENT
========================================================= */

const Achievement = ({
  icon: Icon,
  title,
  description,
  date,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-cyan-200 hover:bg-cyan-50/30">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50">
        <Icon
          size={18}
          className="text-cyan-600"
        />
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {description}
        </p>

      </div>

      <span className="shrink-0 text-[10px] font-medium text-slate-400">
        {date}
      </span>

    </div>
  );
};

export default AcademicPerformance;

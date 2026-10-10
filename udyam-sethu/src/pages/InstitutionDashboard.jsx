import React, { useState } from "react";
import logo from "../assets/logo.jpeg";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardCheck,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Settings,
  Moon,
  Sun,
  Building2,
  Award,
  UserCheck,
  UserX,
  Trophy,
  Heart,
  FileText,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    institution: "Institution",
    administration: "Administration",

    overview: "Overview",
    students: "Students",
    academics: "Academics",
    attendance: "Attendance",
    assessments: "Assessments",
    results: "Results & Performance",
    activities: "Activities",
    reports: "Reports",

    institutionProfile: "Institution Profile",
    settings: "Settings",

    search: "Search students, departments, reports...",

    institutionOverview: "Institution Overview",

    overviewDescription:
      "Monitor academic performance, student engagement, attendance and institutional activities.",

    allSemesters: "All Semesters",
    semester: "Semester",
    export: "Export",

    platformActive: "Platform is active",

    platformDescription:
      "Students are actively using Udyam Sethu right now.",

    currentlyOnline: "Currently Online",
    activeToday: "Active Today",
    systemAvailability: "System Availability",

    totalStudents: "Total Students",
    activeStudents: "Active Students",
    averageAttendance: "Average Attendance",
    averageScore: "Average Score",

    previousSemester: "vs previous semester",
    activePercentage: "87.3% of total students",
    institutionAverage: "institution average",
    currentAcademicYear: "current academic year",

    inactiveStudents: "Inactive Students",
    assessmentsCompleted: "Assessments Completed",
    studentsAtRisk: "Students At Risk",
    activitiesParticipation: "Activities Participation",

    academicPerformance: "Academic Performance",

    academicSubtitle:
      "Semester-wise average score and pass percentage",

    institutionAverageLabel: "Institution Average",
    passPercentage: "Pass Percentage",

    attendanceOverview: "Attendance Overview",
    attendanceSubtitle: "Institution-wide attendance",
    present: "Present",
    absent: "Absent",
    leave: "Leave",

    attendanceImproved:
      "Attendance improved by 3.2% this semester",

    departmentStudents: "Department-wise Students",

    departmentSubtitle:
      "Student distribution across departments",

    assessmentStatus: "Assessment Status",

    assessmentSubtitle:
      "Current assessment completion status",

    completed: "Completed",
    pending: "Pending",
    overdue: "Overdue",

    studentInterests: "Student Interests & Activities",

    studentInterestsSubtitle:
      "Participation across institutional activities",

    technical: "Technical",
    sports: "Sports",
    cultural: "Cultural",
    research: "Research",
    clubs: "Clubs",

    studentEngagement: "Student Engagement",
    engagementSubtitle: "Platform usage overview",

    registered: "Registered",
    active: "active",
    inactive: "inactive",

    livePlatformUsers: "Live Platform Users",

    studentsCurrentlyOnline:
      "Students currently online",

    topPerformingStudents: "Top Performing Students",

    topPerformingSubtitle:
      "Highest academic performers",

    score: "Score",
    attendanceLabel: "Attendance",

    viewAcademicPerformance:
      "View Academic Performance",

    recentActivity: "Recent Institution Activity",

    recentActivitySubtitle:
      "Latest activity across the platform",

    viewAllActivity: "View All Activity",

    semesterAssessmentCompleted:
      "Semester assessment completed",

    placementAssessment:
      "students registered for placement assessment",

    attendanceRecordsUpdated:
      "Attendance records updated",

    semesterResultsPublished:
      "Semester results published",

    technicalActivitiesJoined:
      "students joined technical activities",

    placementCell: "Placement Cell",
    academicAdministration: "Academic Administration",
    studentActivities: "Student Activities",

    twelveMinutesAgo: "12 minutes ago",
    thirtyEightMinutesAgo: "38 minutes ago",
    oneHourAgo: "1 hour ago",
    twoHoursAgo: "2 hours ago",
    yesterday: "Yesterday",

    scoreLabel: "Score",
  },

  kn: {
    institution: "ಸಂಸ್ಥೆ",
    administration: "ಆಡಳಿತ",

    overview: "ಅವಲೋಕನ",
    students: "ವಿದ್ಯಾರ್ಥಿಗಳು",
    academics: "ಶೈಕ್ಷಣಿಕ",
    attendance: "ಹಾಜರಾತಿ",
    assessments: "ಮೌಲ್ಯಮಾಪನಗಳು",
    results: "ಫಲಿತಾಂಶ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆ",
    activities: "ಚಟುವಟಿಕೆಗಳು",
    reports: "ವರದಿಗಳು",

    institutionProfile: "ಸಂಸ್ಥೆಯ ವಿವರ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

    search: "ವಿದ್ಯಾರ್ಥಿಗಳು, ವಿಭಾಗಗಳು, ವರದಿಗಳನ್ನು ಹುಡುಕಿ...",

    institutionOverview: "ಸಂಸ್ಥೆಯ ಅವಲೋಕನ",

    overviewDescription:
      "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ, ವಿದ್ಯಾರ್ಥಿಗಳ ಭಾಗವಹಿಸುವಿಕೆ, ಹಾಜರಾತಿ ಮತ್ತು ಸಂಸ್ಥೆಯ ಚಟುವಟಿಕೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.",

    allSemesters: "ಎಲ್ಲಾ ಸೆಮಿಸ್ಟರ್‌ಗಳು",
    semester: "ಸೆಮಿಸ್ಟರ್",
    export: "ರಫ್ತು",

    platformActive: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಸಕ್ರಿಯವಾಗಿದೆ",

    platformDescription:
      "ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ರಸ್ತುತ ಉದ್ಯಮ ಸೇತುವನ್ನು ಸಕ್ರಿಯವಾಗಿ ಬಳಸುತ್ತಿದ್ದಾರೆ.",

    currentlyOnline: "ಪ್ರಸ್ತುತ ಆನ್‌ಲೈನ್",
    activeToday: "ಇಂದು ಸಕ್ರಿಯ",
    systemAvailability: "ಸಿಸ್ಟಮ್ ಲಭ್ಯತೆ",

    totalStudents: "ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು",
    activeStudents: "ಸಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳು",
    averageAttendance: "ಸರಾಸರಿ ಹಾಜರಾತಿ",
    averageScore: "ಸರಾಸರಿ ಅಂಕ",

    previousSemester: "ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್‌ಗೆ ಹೋಲಿಸಿದರೆ",
    activePercentage: "ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ 87.3%",
    institutionAverage: "ಸಂಸ್ಥೆಯ ಸರಾಸರಿ",
    currentAcademicYear: "ಪ್ರಸ್ತುತ ಶೈಕ್ಷಣಿಕ ವರ್ಷ",

    inactiveStudents: "ನಿಷ್ಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳು",
    assessmentsCompleted: "ಪೂರ್ಣಗೊಂಡ ಮೌಲ್ಯಮಾಪನಗಳು",
    studentsAtRisk: "ಅಪಾಯದಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು",
    activitiesParticipation: "ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸುವಿಕೆ",

    academicPerformance: "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ",

    academicSubtitle:
      "ಸೆಮಿಸ್ಟರ್ ಪ್ರಕಾರ ಸರಾಸರಿ ಅಂಕ ಮತ್ತು ಉತ್ತೀರ್ಣ ಶೇಕಡಾವಾರು",

    institutionAverageLabel: "ಸಂಸ್ಥೆಯ ಸರಾಸರಿ",
    passPercentage: "ಉತ್ತೀರ್ಣ ಶೇಕಡಾವಾರು",

    attendanceOverview: "ಹಾಜರಾತಿ ಅವಲೋಕನ",
    attendanceSubtitle: "ಸಂಸ್ಥೆಯಾದ್ಯಂತ ಹಾಜರಾತಿ",

    present: "ಹಾಜರಿದ್ದಾರೆ",
    absent: "ಗೈರುಹಾಜರಿ",
    leave: "ರಜೆ",

    attendanceImproved:
      "ಈ ಸೆಮಿಸ್ಟರ್‌ನಲ್ಲಿ ಹಾಜರಾತಿ 3.2% ಸುಧಾರಿಸಿದೆ",

    departmentStudents: "ವಿಭಾಗವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು",

    departmentSubtitle:
      "ವಿಭಾಗಗಳಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿಗಳ ವಿತರಣೆ",

    assessmentStatus: "ಮೌಲ್ಯಮಾಪನ ಸ್ಥಿತಿ",

    assessmentSubtitle:
      "ಪ್ರಸ್ತುತ ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿರುವ ಸ್ಥಿತಿ",

    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    pending: "ಬಾಕಿಯಿದೆ",
    overdue: "ವಿಳಂಬವಾಗಿದೆ",

    studentInterests: "ವಿದ್ಯಾರ್ಥಿಗಳ ಆಸಕ್ತಿಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳು",

    studentInterestsSubtitle:
      "ಸಂಸ್ಥೆಯ ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸುವಿಕೆ",

    technical: "ತಾಂತ್ರಿಕ",
    sports: "ಕ್ರೀಡೆ",
    cultural: "ಸಾಂಸ್ಕೃತಿಕ",
    research: "ಸಂಶೋಧನೆ",
    clubs: "ಕ್ಲಬ್‌ಗಳು",

    studentEngagement: "ವಿದ್ಯಾರ್ಥಿಗಳ ಭಾಗವಹಿಸುವಿಕೆ",
    engagementSubtitle: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಳಕೆಯ ಅವಲೋಕನ",

    registered: "ನೋಂದಾಯಿತ",
    active: "ಸಕ್ರಿಯ",
    inactive: "ನಿಷ್ಕ್ರಿಯ",

    livePlatformUsers: "ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಳಕೆದಾರರು",

    studentsCurrentlyOnline:
      "ಪ್ರಸ್ತುತ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು",

    topPerformingStudents:
      "ಅತ್ಯುತ್ತಮ ಕಾರ್ಯಕ್ಷಮತೆಯ ವಿದ್ಯಾರ್ಥಿಗಳು",

    topPerformingSubtitle:
      "ಅತ್ಯಧಿಕ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ ಹೊಂದಿರುವವರು",

    score: "ಅಂಕ",
    attendanceLabel: "ಹಾಜರಾತಿ",

    viewAcademicPerformance:
      "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ ವೀಕ್ಷಿಸಿ",

    recentActivity: "ಇತ್ತೀಚಿನ ಸಂಸ್ಥೆಯ ಚಟುವಟಿಕೆ",

    recentActivitySubtitle:
      "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿನ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",

    viewAllActivity: "ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",

    semesterAssessmentCompleted:
      "ಸೆಮಿಸ್ಟರ್ ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿದೆ",

    placementAssessment:
      "ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ನೋಂದಾಯಿಸಿದ್ದಾರೆ",

    attendanceRecordsUpdated:
      "ಹಾಜರಾತಿ ದಾಖಲೆಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ",

    semesterResultsPublished:
      "ಸೆಮಿಸ್ಟರ್ ಫಲಿತಾಂಶಗಳನ್ನು ಪ್ರಕಟಿಸಲಾಗಿದೆ",

    technicalActivitiesJoined:
      "ವಿದ್ಯಾರ್ಥಿಗಳು ತಾಂತ್ರಿಕ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸೇರಿದ್ದಾರೆ",

    placementCell: "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಸೆಲ್",
    academicAdministration: "ಶೈಕ್ಷಣಿಕ ಆಡಳಿತ",
    studentActivities: "ವಿದ್ಯಾರ್ಥಿ ಚಟುವಟಿಕೆಗಳು",

    twelveMinutesAgo: "12 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    thirtyEightMinutesAgo: "38 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    oneHourAgo: "1 ಗಂಟೆಯ ಹಿಂದೆ",
    twoHoursAgo: "2 ಗಂಟೆಗಳ ಹಿಂದೆ",
    yesterday: "ನಿನ್ನೆ",

    scoreLabel: "ಅಂಕ",
  },
};

/* =========================================================
   DATA
========================================================= */

const semesterPerformance = [
  { semester: "Sem 1", average: 68, pass: 82 },
  { semester: "Sem 2", average: 71, pass: 85 },
  { semester: "Sem 3", average: 74, pass: 87 },
  { semester: "Sem 4", average: 77, pass: 89 },
  { semester: "Sem 5", average: 81, pass: 92 },
  { semester: "Sem 6", average: 84, pass: 94 },
  { semester: "Sem 7", average: 86, pass: 95 },
  { semester: "Sem 8", average: 88, pass: 97 },
];

const attendanceData = [
  { month: "Jan", attendance: 84 },
  { month: "Feb", attendance: 87 },
  { month: "Mar", attendance: 82 },
  { month: "Apr", attendance: 89 },
  { month: "May", attendance: 91 },
  { month: "Jun", attendance: 88 },
  { month: "Jul", attendance: 92 },
  { month: "Aug", attendance: 94 },
];

const departmentData = [
  { name: "CSE", students: 820 },
  { name: "AI & ML", students: 560 },
  { name: "ECE", students: 610 },
  { name: "EEE", students: 420 },
  { name: "Mechanical", students: 380 },
  { name: "Civil", students: 350 },
];

const assessmentData = [
  { name: "Completed", value: 72 },
  { name: "Pending", value: 18 },
  { name: "Overdue", value: 10 },
];

const activityData = [
  { name: "Technical", value: 35 },
  { name: "Sports", value: 22 },
  { name: "Cultural", value: 18 },
  { name: "Research", value: 15 },
  { name: "Clubs", value: 10 },
];

const COLORS = [
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#f59e0b",
  "#10b981",
];

/* =========================================================
   MAIN DASHBOARD
========================================================= */

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [selectedSemester, setSelectedSemester] =
    useState("All Semesters");

  const [language, setLanguage] = useState("en");

  const t = translations[language];

  const menuItems = [
    {
      key: "overview",
      icon: LayoutDashboard,
      active: true,
    },
    {
      key: "students",
      icon: Users,
    },
    {
      key: "academics",
      icon: GraduationCap,
    },
    {
      key: "attendance",
      icon: CalendarCheck,
    },
    {
      key: "assessments",
      icon: ClipboardCheck,
    },
    {
      key: "results",
      icon: Award,
    },
    {
      key: "activities",
      icon: Activity,
    },
    {
      key: "reports",
      icon: FileText,
    },
  ];

  const theme = darkMode
    ? {
      page: "bg-[#0f172a] text-slate-100",
      card: "bg-[#172033] border-slate-700",
      header: "bg-[#172033] border-slate-700",
      text: "text-slate-100",
      muted: "text-slate-400",
      input: "bg-[#0f172a] border-slate-700",
    }
    : {
      page: "bg-[#f5f7fa] text-slate-800",
      card: "bg-white border-slate-200",
      header: "bg-white border-slate-200",
      text: "text-slate-900",
      muted: "text-slate-500",
      input: "bg-slate-50 border-slate-200",
    };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme.page}`}
    >
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

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

        <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <a
              href="/udyamsethu/institution"
              className="flex items-center justify-center"
            >
              <div className="relative flex h-16 w-52 items-center justify-center rounded-2xl overflow-hidden bg-white border border-white/20 shadow-lg">

                <img
                  src={logo}
                  alt="Udyam Sethu Logo"
                  className="w-full h-full object-contain p-2 bg-lightblue-500"
                />

                {/* <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-white" /> */}

              </div>
            </a>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION */}

        <div className="px-3 py-6">
          <p className="px-3 mb-3 text-[10px] uppercase tracking-widest text-slate-500">
            {t.institution}
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
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
                    ${item.active
                      ? "bg-cyan-400 text-[#172033] font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <Icon size={18} />

                  {t[item.key]}
                </button>
              );
            })}
          </nav>

          <p className="px-3 mt-8 mb-3 text-[10px] uppercase tracking-widest text-slate-500">
            {t.administration}
          </p>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5">
            <Building2 size={18} />

            {t.institutionProfile}
          </button>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5">
            <Settings size={18} />

            {t.settings}
          </button>
        </div>

        {/* SIDEBAR PROFILE */}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center">
                <span className="text-xs font-bold text-[#172033]">
                  SP
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  Sachin
                </p>

                <p className="text-xs text-slate-400">
                  Institution Admin
                </p>
              </div>

              <ChevronDown size={15} />
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="lg:ml-[255px]">
        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          className={`
            h-[72px]
            border-b
            flex
            items-center
            px-4
            lg:px-7
            gap-4
            ${theme.header}
          `}
        >
          {/* MOBILE MENU */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* SEARCH */}

          <div className="relative flex-1 max-w-xl">
            <Search
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.muted}`}
            />

            <input
              placeholder={t.search}
              className={`
                w-full
                h-10
                pl-10
                pr-4
                rounded-lg
                border
                outline-none
                text-sm
                ${theme.input}
                ${theme.text}
                focus:border-cyan-400
              `}
            />
          </div>

          {/* HEADER ACTIONS */}

          <div className="flex items-center gap-2">
            {/* LANGUAGE SELECTOR */}

            <div
              className={`
                flex
                items-center
                rounded-lg
                p-1
                border
                ${darkMode
                  ? "bg-[#0f172a] border-slate-700"
                  : "bg-slate-100 border-slate-200"
                }
              `}
            >
              <button
                onClick={() => setLanguage("en")}
                className={`
                  px-3
                  py-1.5
                  rounded-md
                  text-xs
                  font-semibold
                  transition
                  ${language === "en"
                    ? darkMode
                      ? "bg-slate-700 text-white shadow-sm"
                      : "bg-white text-[#172033] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                  }
                `}
              >
                English
              </button>

              <button
                onClick={() => setLanguage("kn")}
                className={`
                  px-3
                  py-1.5
                  rounded-md
                  text-xs
                  font-semibold
                  transition
                  ${language === "kn"
                    ? darkMode
                      ? "bg-slate-700 text-white shadow-sm"
                      : "bg-white text-[#172033] shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                  }
                `}
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* REFRESH */}

            <button
              className={`
                hidden sm:flex
                w-10 h-10
                rounded-lg
                items-center
                justify-center
                ${darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-100"
                }
              `}
            >
              <RefreshCw size={18} />
            </button>

            {/* DARK MODE */}

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
                  ? "bg-slate-700 text-yellow-300"
                  : "hover:bg-slate-100 text-slate-600"
                }
              `}
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>

            {/* NOTIFICATION */}

            <button
              className={`
                relative
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                ${darkMode
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-100"
                }
              `}
            >
              <Bell size={19} />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 border-2 border-white" />
            </button>

            {/* PROFILE */}

            <div
              className={`
                hidden sm:flex
                items-center
                gap-3
                border-l
                ${darkMode
                  ? "border-slate-700"
                  : "border-slate-200"
                }
                ml-2
                pl-4
              `}
            >
              <div className="w-9 h-9 rounded-full bg-[#172033] flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  SP
                </span>
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-medium">
                  Sachin
                </p>

                <p
                  className={`text-[11px] ${theme.muted}`}
                >
                  Institution Admin
                </p>
              </div>

              <ChevronDown
                size={15}
                className={theme.muted}
              />
            </div>
          </div>
        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="p-4 lg:p-7">
          {/* PAGE HEADER */}

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-7">
            <div>
              <div
                className={`flex items-center gap-2 text-xs ${theme.muted} mb-2`}
              >
                <span>{t.institution}</span>

                <span>/</span>

                <span className={theme.text}>
                  {t.overview}
                </span>
              </div>

              <h2
                className={`text-2xl lg:text-3xl font-bold ${theme.text}`}
              >
                {t.institutionOverview}
              </h2>

              <p
                className={`text-sm ${theme.muted} mt-1`}
              >
                {t.overviewDescription}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* SEMESTER */}

              <div className="relative">
                <select
                  value={selectedSemester}
                  onChange={(e) =>
                    setSelectedSemester(e.target.value)
                  }
                  className={`
                    h-10
                    pl-4
                    pr-8
                    rounded-lg
                    border
                    text-sm
                    font-medium
                    outline-none
                    ${theme.card}
                    ${theme.text}
                  `}
                >
                  <option value="All Semesters">
                    {t.allSemesters}
                  </option>

                  <option value="Semester 1">
                    {t.semester} 1
                  </option>

                  <option value="Semester 2">
                    {t.semester} 2
                  </option>

                  <option value="Semester 3">
                    {t.semester} 3
                  </option>

                  <option value="Semester 4">
                    {t.semester} 4
                  </option>

                  <option value="Semester 5">
                    {t.semester} 5
                  </option>

                  <option value="Semester 6">
                    {t.semester} 6
                  </option>

                  <option value="Semester 7">
                    {t.semester} 7
                  </option>

                  <option value="Semester 8">
                    {t.semester} 8
                  </option>
                </select>
              </div>

              <button className="h-10 px-4 rounded-lg bg-[#172033] text-white flex items-center gap-2 text-sm font-medium">
                <Download size={16} />

                <span className="hidden sm:block">
                  {t.export}
                </span>
              </button>
            </div>
          </div>

          {/* ===================================================
              LIVE PLATFORM STATUS
          =================================================== */}

          <div className="mb-6">
            <div
              className={`
                rounded-xl
                border
                p-4
                flex
                flex-col
                md:flex-row
                md:items-center
                justify-between
                gap-4
                ${theme.card}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Activity
                      size={23}
                      className="text-emerald-600"
                    />
                  </div>

                  <span className="absolute -right-1 -top-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {t.platformActive}
                  </p>

                  <p
                    className={`text-xs ${theme.muted} mt-1`}
                  >
                    {t.platformDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <LiveStat
                  value="1,248"
                  label={t.currentlyOnline}
                />

                <LiveStat
                  value="3,426"
                  label={t.activeToday}
                />

                <LiveStat
                  value="94.2%"
                  label={t.systemAvailability}
                />
              </div>
            </div>
          </div>

          {/* ===================================================
              KPI CARDS
          =================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title={t.totalStudents}
              value="4,286"
              change="+8.4%"
              positive
              description={t.previousSemester}
              icon={Users}
            />

            <MetricCard
              title={t.activeStudents}
              value="3,742"
              change="+12.6%"
              positive
              description={t.activePercentage}
              icon={UserCheck}
            />

            <MetricCard
              title={t.averageAttendance}
              value="89.4%"
              change="+3.2%"
              positive
              description={t.institutionAverage}
              icon={CalendarCheck}
            />

            <MetricCard
              title={t.averageScore}
              value="78.6%"
              change="+5.8%"
              positive
              description={t.currentAcademicYear}
              icon={Trophy}
            />
          </div>

          {/* ===================================================
              SECOND KPI ROW
          =================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <SmallMetric
              title={t.inactiveStudents}
              value="544"
              percentage="12.7%"
              icon={UserX}
              color="red"
            />

            <SmallMetric
              title={t.assessmentsCompleted}
              value="72%"
              percentage="+6.4%"
              icon={ClipboardCheck}
              color="cyan"
            />

            <SmallMetric
              title={t.studentsAtRisk}
              value="186"
              percentage="4.3%"
              icon={TrendingDown}
              color="amber"
            />

            <SmallMetric
              title={t.activitiesParticipation}
              value="68.5%"
              percentage="+9.2%"
              icon={Heart}
              color="violet"
            />
          </div>

          {/* ===================================================
              ACADEMIC PERFORMANCE + ATTENDANCE
          =================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
            {/* ACADEMIC PERFORMANCE */}

            <div
              className={`
                xl:col-span-2
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.academicPerformance}
                subtitle={t.academicSubtitle}
              />

              <div className="p-5">
                <div className="flex items-center gap-5 mb-5">
                  <div>
                    <p
                      className={`text-xs ${theme.muted}`}
                    >
                      {t.institutionAverageLabel}
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      78.6%
                    </p>
                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div>
                    <p
                      className={`text-xs ${theme.muted}`}
                    >
                      {t.passPercentage}
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      92.4%
                    </p>
                  </div>

                  <div className="ml-auto flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                    <TrendingUp size={14} />
                    5.8%
                  </div>
                </div>

                <div className="h-[280px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <AreaChart
                      data={semesterPerformance}
                    >
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
                          fill: "#94a3b8",
                        }}
                      />

                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#94a3b8",
                        }}
                      />

                      <Tooltip />

                      <Legend />

                      <Area
                        type="monotone"
                        dataKey="average"
                        name={t.averageScore}
                        stroke="#06b6d4"
                        strokeWidth={3}
                        fill="url(#academicGradient)"
                      />

                      <Area
                        type="monotone"
                        dataKey="pass"
                        name={t.passPercentage}
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fill="none"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ATTENDANCE */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.attendanceOverview}
                subtitle={t.attendanceSubtitle}
              />

              <div className="p-5">
                <div className="flex items-center justify-center">
                  <div className="relative w-44 h-44">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="26"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold">
                        89.4%
                      </span>

                      <span
                        className={`text-xs ${theme.muted}`}
                      >
                        {t.attendance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <ProgressRow
                    label={t.present}
                    value="89.4%"
                    width="89.4%"
                  />

                  <ProgressRow
                    label={t.absent}
                    value="7.1%"
                    width="7.1%"
                  />

                  <ProgressRow
                    label={t.leave}
                    value="3.5%"
                    width="3.5%"
                  />
                </div>

                <div className="mt-5 p-3 rounded-lg bg-emerald-50">
                  <div className="flex items-center gap-2">
                    <TrendingUp
                      size={15}
                      className="text-emerald-600"
                    />

                    <p className="text-xs text-emerald-700 font-medium">
                      {t.attendanceImproved}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              DEPARTMENT + ASSESSMENTS
          =================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
            {/* DEPARTMENT */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.departmentStudents}
                subtitle={t.departmentSubtitle}
              />

              <div className="p-5">
                <div className="h-[280px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={departmentData}
                      layout="vertical"
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#e2e8f0"
                      />

                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#94a3b8",
                        }}
                      />

                      <YAxis
                        type="category"
                        dataKey="name"
                        width={75}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#64748b",
                        }}
                      />

                      <Tooltip />

                      <Bar
                        dataKey="students"
                        name={t.students}
                        fill="#06b6d4"
                        radius={[0, 5, 5, 0]}
                        barSize={22}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ASSESSMENTS */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.assessmentStatus}
                subtitle={t.assessmentSubtitle}
              />

              <div className="p-5 flex flex-col md:flex-row items-center gap-8">
                <div className="w-[220px] h-[220px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={assessmentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                      >
                        {assessmentData.map(
                          (entry, index) => (
                            <Cell
                              key={entry.name}
                              fill={
                                [
                                  "#10b981",
                                  "#f59e0b",
                                  "#ef4444",
                                ][index]
                              }
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-5 w-full">
                  <AssessmentRow
                    title={t.completed}
                    value="72%"
                    count="3,084 students"
                    color="bg-emerald-500"
                  />

                  <AssessmentRow
                    title={t.pending}
                    value="18%"
                    count="771 students"
                    color="bg-amber-500"
                  />

                  <AssessmentRow
                    title={t.overdue}
                    value="10%"
                    count="431 students"
                    color="bg-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              STUDENT ENGAGEMENT
          =================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
            {/* ACTIVITY INTEREST */}

            <div
              className={`
                xl:col-span-2
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.studentInterests}
                subtitle={t.studentInterestsSubtitle}
              />

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="h-[260px]">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={activityData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={55}
                          paddingAngle={3}
                        >
                          {activityData.map(
                            (activity, index) => (
                              <Cell
                                key={activity.name}
                                fill={COLORS[index]}
                              />
                            )
                          )}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex flex-col justify-center space-y-4">
                    {activityData.map(
                      (activity, index) => {
                        const activityTranslations = [
                          t.technical,
                          t.sports,
                          t.cultural,
                          t.research,
                          t.clubs,
                        ];

                        return (
                          <div
                            key={activity.name}
                            className="flex items-center gap-3"
                          >
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor:
                                  COLORS[index],
                              }}
                            />

                            <span className="text-sm flex-1">
                              {
                                activityTranslations[
                                index
                                ]
                              }
                            </span>

                            <span className="text-sm font-semibold">
                              {activity.value}%
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ENGAGEMENT */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.studentEngagement}
                subtitle={t.engagementSubtitle}
              />

              <div className="p-5 space-y-5">
                <EngagementCard
                  icon={Users}
                  title={t.totalStudents}
                  value="4,286"
                  description={t.registered}
                  color="cyan"
                />

                <EngagementCard
                  icon={UserCheck}
                  title={t.activeStudents}
                  value="3,742"
                  description={`87.3% ${t.active}`}
                  color="emerald"
                />

                <EngagementCard
                  icon={UserX}
                  title={t.inactiveStudents}
                  value="544"
                  description={`12.7% ${t.inactive}`}
                  color="red"
                />

                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />

                    <span className="text-xs font-semibold">
                      {t.livePlatformUsers}
                    </span>
                  </div>

                  <p className="text-3xl font-bold">
                    1,248
                  </p>

                  <p
                    className={`text-xs ${theme.muted} mt-1`}
                  >
                    {t.studentsCurrentlyOnline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              BOTTOM SECTION
          =================================================== */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {/* TOP PERFORMERS */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.topPerformingStudents}
                subtitle={t.topPerformingSubtitle}
              />

              <div className="divide-y divide-slate-100">
                <StudentRow
                  rank="01"
                  name="Aarav Sharma"
                  department="CSE"
                  score="94.8%"
                  attendance="96%"
                  scoreLabel={t.score}
                  attendanceLabel={t.attendanceLabel}
                />

                <StudentRow
                  rank="02"
                  name="Priya Nair"
                  department="AI & ML"
                  score="93.6%"
                  attendance="94%"
                  scoreLabel={t.score}
                  attendanceLabel={t.attendanceLabel}
                />

                <StudentRow
                  rank="03"
                  name="Rahul Kumar"
                  department="ECE"
                  score="92.9%"
                  attendance="95%"
                  scoreLabel={t.score}
                  attendanceLabel={t.attendanceLabel}
                />

                <StudentRow
                  rank="04"
                  name="Ananya Rao"
                  department="CSE"
                  score="91.7%"
                  attendance="93%"
                  scoreLabel={t.score}
                  attendanceLabel={t.attendanceLabel}
                />
              </div>

              <div className="p-4 border-t border-slate-100">
                <button className="w-full text-sm font-semibold text-cyan-600 hover:text-cyan-700">
                  {t.viewAcademicPerformance} →
                </button>
              </div>
            </div>

            {/* RECENT ACTIVITY */}

            <div
              className={`
                rounded-xl
                border
                shadow-sm
                ${theme.card}
              `}
            >
              <CardHeader
                title={t.recentActivity}
                subtitle={t.recentActivitySubtitle}
              />

              <div className="p-5 space-y-5">
                <ActivityItem
                  icon={ClipboardCheck}
                  title={t.semesterAssessmentCompleted}
                  user="CSE - Semester 6"
                  time={t.twelveMinutesAgo}
                />

                <ActivityItem
                  icon={Users}
                  title={`42 ${t.placementAssessment}`}
                  user={t.placementCell}
                  time={t.thirtyEightMinutesAgo}
                />

                <ActivityItem
                  icon={CalendarCheck}
                  title={t.attendanceRecordsUpdated}
                  user="ECE Department"
                  time={t.oneHourAgo}
                />

                <ActivityItem
                  icon={Award}
                  title={t.semesterResultsPublished}
                  user={t.academicAdministration}
                  time={t.twoHoursAgo}
                />

                <ActivityItem
                  icon={Activity}
                  title={`78 ${t.technicalActivitiesJoined}`}
                  user={t.studentActivities}
                  time={t.yesterday}
                />
              </div>

              <div className="p-4 border-t border-slate-100">
                <button className="w-full text-sm font-semibold text-cyan-600">
                  {t.viewAllActivity} →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/* =========================================================
   LIVE STAT
========================================================= */

const LiveStat = ({ value, label }) => {
  return (
    <div>
      <p className="text-lg font-bold">{value}</p>

      <p className="text-[11px] text-slate-400">
        {label}
      </p>
    </div>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({
  title,
  value,
  change,
  positive,
  description,
  icon: Icon,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
          <Icon
            size={19}
            className="text-cyan-600"
          />
        </div>
      </div>

      <p className="text-2xl font-bold text-slate-900 mt-4">
        {value}
      </p>

      <div className="flex items-center gap-1 mt-2">
        {positive ? (
          <TrendingUp
            size={13}
            className="text-emerald-600"
          />
        ) : (
          <TrendingDown
            size={13}
            className="text-red-500"
          />
        )}

        <span
          className={`text-xs font-semibold ${positive
              ? "text-emerald-600"
              : "text-red-500"
            }`}
        >
          {change}
        </span>

        <span className="text-xs text-slate-400">
          {description}
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   SMALL METRIC
========================================================= */

const SmallMetric = ({
  title,
  value,
  percentage,
  icon: Icon,
  color,
}) => {
  const colors = {
    red: "bg-red-50 text-red-500",
    cyan: "bg-cyan-50 text-cyan-600",
    amber: "bg-amber-50 text-amber-500",
    violet: "bg-violet-50 text-violet-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}
        >
          <Icon size={18} />
        </div>

        <div>
          <p className="text-xs text-slate-500">
            {title}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-xl font-bold">
              {value}
            </p>

            <span className="text-[11px] text-emerald-600 font-semibold">
              {percentage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   CARD HEADER
========================================================= */

const CardHeader = ({ title, subtitle }) => {
  return (
    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>
      </div>

      <button className="p-2 rounded-lg hover:bg-slate-100">
        <MoreHorizontal
          size={18}
          className="text-slate-400"
        />
      </button>
    </div>
  );
};

/* =========================================================
   PROGRESS ROW
========================================================= */

const ProgressRow = ({ label, value, width }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-slate-500">
          {label}
        </span>

        <span className="text-xs font-semibold">
          {value}
        </span>
      </div>

      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-500 rounded-full"
          style={{
            width,
          }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   ASSESSMENT ROW
========================================================= */

const AssessmentRow = ({
  title,
  value,
  count,
  color,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${color}`}
          />

          <span className="text-sm font-medium">
            {title}
          </span>
        </div>

        <span className="text-sm font-bold">
          {value}
        </span>
      </div>

      <p className="text-xs text-slate-400">
        {count}
      </p>
    </div>
  );
};

/* =========================================================
   ENGAGEMENT CARD
========================================================= */

const EngagementCard = ({
  icon: Icon,
  title,
  value,
  description,
  color,
}) => {
  const colors = {
    cyan: "bg-cyan-50 text-cyan-600",
    emerald: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1">
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="text-lg font-bold">
          {value}
        </p>
      </div>

      <span className="text-[11px] text-slate-400">
        {description}
      </span>
    </div>
  );
};

/* =========================================================
   STUDENT ROW
========================================================= */

const StudentRow = ({
  rank,
  name,
  department,
  score,
  attendance,
  scoreLabel,
  attendanceLabel,
}) => {
  return (
    <div className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition">
      <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center">
        <span className="text-xs font-bold text-cyan-600">
          {rank}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {name}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {department}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold text-emerald-600">
          {score}
        </p>

        <p className="text-[10px] text-slate-400">
          {scoreLabel}
        </p>
      </div>

      <div className="hidden sm:block text-right">
        <p className="text-sm font-semibold">
          {attendance}
        </p>

        <p className="text-[10px] text-slate-400">
          {attendanceLabel}
        </p>
      </div>

      <Eye
        size={16}
        className="text-slate-400"
      />
    </div>
  );
};

/* =========================================================
   ACTIVITY ITEM
========================================================= */

const ActivityItem = ({
  icon: Icon,
  title,
  user,
  time,
}) => {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
        <Icon
          size={17}
          className="text-cyan-600"
        />
      </div>

      <div className="flex-1">
        <p className="text-sm">{title}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-400">
            {user}
          </span>

          <span className="text-slate-300">
            •
          </span>

          <span className="text-xs text-slate-400">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
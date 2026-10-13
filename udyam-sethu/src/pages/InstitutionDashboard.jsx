import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import {
  LayoutDashboard, Users, GraduationCap, ClipboardCheck, CalendarCheck,
  TrendingUp, TrendingDown, Activity, Bell, Search, Menu, X, ChevronDown,
  Settings, Moon, Sun, Building2, Award, UserCheck, UserX, Trophy, Heart,
  FileText, Download, RefreshCw, MoreHorizontal, Eye, ArrowUpRight,
  CircleHelp, LogOut, SlidersHorizontal, CheckCircle2, Clock3, AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";

const translations = {
  en: {
    institution: "Institution", administration: "Administration",
    overview: "Overview", students: "Students", academics: "Academics",
    attendance: "Attendance", assessments: "Assessments",
    results: "Results & Performance", activities: "Activities", reports: "Reports",
    institutionProfile: "Institution Profile", settings: "Settings",
    search: "Search students, departments, reports...", institutionOverview: "Institution Overview",
    overviewDescription: "A clear view of academic performance, student engagement and institutional operations.",
    allSemesters: "All semesters", semester: "Semester", export: "Export report",
    platformActive: "All systems operational",
    platformDescription: "Your institution dashboard is running normally.",
    currentlyOnline: "Online now", activeToday: "Active today", systemAvailability: "System uptime",
    totalStudents: "Total students", activeStudents: "Active students",
    averageAttendance: "Average attendance", averageScore: "Average score",
    previousSemester: "vs. previous semester", activePercentage: "87.3% of all students",
    institutionAverage: "Institution average", currentAcademicYear: "Current academic year",
    inactiveStudents: "Inactive students", assessmentsCompleted: "Assessments completed",
    studentsAtRisk: "Students at risk", activitiesParticipation: "Activity participation",
    academicPerformance: "Academic performance", academicSubtitle: "Semester-wise average score and pass rate",
    institutionAverageLabel: "Average score", passPercentage: "Pass rate",
    attendanceOverview: "Attendance overview", attendanceSubtitle: "Attendance across the institution",
    present: "Present", absent: "Absent", leave: "On leave",
    attendanceImproved: "Attendance is up 3.2% this semester",
    departmentStudents: "Students by department", departmentSubtitle: "Student distribution across departments",
    assessmentStatus: "Assessment status", assessmentSubtitle: "Current completion overview",
    completed: "Completed", pending: "Pending", overdue: "Overdue",
    studentInterests: "Student interests & activities", studentInterestsSubtitle: "Participation by activity category",
    technical: "Technical", sports: "Sports", cultural: "Cultural", research: "Research", clubs: "Clubs",
    studentEngagement: "Student engagement", engagementSubtitle: "Registration and platform activity",
    registered: "Registered", active: "active", inactive: "inactive",
    livePlatformUsers: "Live platform users", studentsCurrentlyOnline: "Students currently online",
    topPerformingStudents: "Top performing students", topPerformingSubtitle: "Highest academic performers",
    score: "Score", attendanceLabel: "Attendance", viewAcademicPerformance: "View all results",
    recentActivity: "Recent institution activity", recentActivitySubtitle: "Latest updates across the platform",
    viewAllActivity: "View all activity", semesterAssessmentCompleted: "Semester assessment completed",
    placementAssessment: "students registered for placement assessment",
    attendanceRecordsUpdated: "Attendance records updated", semesterResultsPublished: "Semester results published",
    technicalActivitiesJoined: "students joined technical activities",
    placementCell: "Placement cell", academicAdministration: "Academic administration",
    studentActivities: "Student activities", twelveMinutesAgo: "12 min ago",
    thirtyEightMinutesAgo: "38 min ago", oneHourAgo: "1 hour ago", twoHoursAgo: "2 hours ago",
    yesterday: "Yesterday", scoreLabel: "Score", viewDetails: "View details",
    welcome: "Welcome back", quickInsight: "Here’s what’s happening at your institution today.",
    searchResults: "Search results", noResults: "No matching dashboard items found.",
    profile: "Profile", logout: "Log out", notifications: "Notifications",
  },
  kn: {
    institution: "ಸಂಸ್ಥೆ", administration: "ಆಡಳಿತ", overview: "ಅವಲೋಕನ",
    students: "ವಿದ್ಯಾರ್ಥಿಗಳು", academics: "ಶೈಕ್ಷಣಿಕ", attendance: "ಹಾಜರಾತಿ",
    assessments: "ಮೌಲ್ಯಮಾಪನಗಳು", results: "ಫಲಿತಾಂಶ ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆ",
    activities: "ಚಟುವಟಿಕೆಗಳು", reports: "ವರದಿಗಳು", institutionProfile: "ಸಂಸ್ಥೆಯ ವಿವರ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", search: "ವಿದ್ಯಾರ್ಥಿಗಳು, ವಿಭಾಗಗಳು, ವರದಿಗಳನ್ನು ಹುಡುಕಿ...",
    institutionOverview: "ಸಂಸ್ಥೆಯ ಅವಲೋಕನ",
    overviewDescription: "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ, ವಿದ್ಯಾರ್ಥಿಗಳ ಭಾಗವಹಿಸುವಿಕೆ ಮತ್ತು ಸಂಸ್ಥೆಯ ಕಾರ್ಯಾಚರಣೆಗಳ ಅವಲೋಕನ.",
    allSemesters: "ಎಲ್ಲಾ ಸೆಮಿಸ್ಟರ್‌ಗಳು", semester: "ಸೆಮಿಸ್ಟರ್", export: "ವರದಿ ರಫ್ತು",
    platformActive: "ಎಲ್ಲಾ ವ್ಯವಸ್ಥೆಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿವೆ",
    platformDescription: "ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಸಾಮಾನ್ಯವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ.",
    currentlyOnline: "ಈಗ ಆನ್‌ಲೈನ್", activeToday: "ಇಂದು ಸಕ್ರಿಯ", systemAvailability: "ಸಿಸ್ಟಮ್ ಲಭ್ಯತೆ",
    totalStudents: "ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು", activeStudents: "ಸಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳು",
    averageAttendance: "ಸರಾಸರಿ ಹಾಜರಾತಿ", averageScore: "ಸರಾಸರಿ ಅಂಕ",
    previousSemester: "ಹಿಂದಿನ ಸೆಮಿಸ್ಟರ್‌ಗೆ ಹೋಲಿಕೆ", activePercentage: "ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳಲ್ಲಿ 87.3%",
    institutionAverage: "ಸಂಸ್ಥೆಯ ಸರಾಸರಿ", currentAcademicYear: "ಪ್ರಸ್ತುತ ಶೈಕ್ಷಣಿಕ ವರ್ಷ",
    inactiveStudents: "ನಿಷ್ಕ್ರಿಯ ವಿದ್ಯಾರ್ಥಿಗಳು", assessmentsCompleted: "ಪೂರ್ಣಗೊಂಡ ಮೌಲ್ಯಮಾಪನಗಳು",
    studentsAtRisk: "ಅಪಾಯದಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು", activitiesParticipation: "ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸುವಿಕೆ",
    academicPerformance: "ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ", academicSubtitle: "ಸೆಮಿಸ್ಟರ್ ಪ್ರಕಾರ ಸರಾಸರಿ ಅಂಕ ಮತ್ತು ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣ",
    institutionAverageLabel: "ಸರಾಸರಿ ಅಂಕ", passPercentage: "ಉತ್ತೀರ್ಣ ಪ್ರಮಾಣ",
    attendanceOverview: "ಹಾಜರಾತಿ ಅವಲೋಕನ", attendanceSubtitle: "ಸಂಸ್ಥೆಯಾದ್ಯಂತ ಹಾಜರಾತಿ",
    present: "ಹಾಜರಿದ್ದಾರೆ", absent: "ಗೈರುಹಾಜರಿ", leave: "ರಜೆ",
    attendanceImproved: "ಈ ಸೆಮಿಸ್ಟರ್‌ನಲ್ಲಿ ಹಾಜರಾತಿ 3.2% ಹೆಚ್ಚಾಗಿದೆ",
    departmentStudents: "ವಿಭಾಗವಾರು ವಿದ್ಯಾರ್ಥಿಗಳು", departmentSubtitle: "ವಿಭಾಗಗಳಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿಗಳ ವಿತರಣೆ",
    assessmentStatus: "ಮೌಲ್ಯಮಾಪನ ಸ್ಥಿತಿ", assessmentSubtitle: "ಪ್ರಸ್ತುತ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆಯ ಅವಲೋಕನ",
    completed: "ಪೂರ್ಣಗೊಂಡಿದೆ", pending: "ಬಾಕಿಯಿದೆ", overdue: "ವಿಳಂಬವಾಗಿದೆ",
    studentInterests: "ವಿದ್ಯಾರ್ಥಿಗಳ ಆಸಕ್ತಿಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳು",
    studentInterestsSubtitle: "ಚಟುವಟಿಕೆಗಳ ಪ್ರಕಾರ ಭಾಗವಹಿಸುವಿಕೆ",
    technical: "ತಾಂತ್ರಿಕ", sports: "ಕ್ರೀಡೆ", cultural: "ಸಾಂಸ್ಕೃತಿಕ", research: "ಸಂಶೋಧನೆ", clubs: "ಕ್ಲಬ್‌ಗಳು",
    studentEngagement: "ವಿದ್ಯಾರ್ಥಿಗಳ ಭಾಗವಹಿಸುವಿಕೆ", engagementSubtitle: "ನೋಂದಣಿ ಮತ್ತು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಚಟುವಟಿಕೆ",
    registered: "ನೋಂದಾಯಿತ", active: "ಸಕ್ರಿಯ", inactive: "ನಿಷ್ಕ್ರಿಯ",
    livePlatformUsers: "ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಳಕೆದಾರರು",
    studentsCurrentlyOnline: "ಪ್ರಸ್ತುತ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿರುವ ವಿದ್ಯಾರ್ಥಿಗಳು",
    topPerformingStudents: "ಅತ್ಯುತ್ತಮ ವಿದ್ಯಾರ್ಥಿಗಳು", topPerformingSubtitle: "ಅತ್ಯಧಿಕ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ಷಮತೆ ಹೊಂದಿರುವವರು",
    score: "ಅಂಕ", attendanceLabel: "ಹಾಜರಾತಿ", viewAcademicPerformance: "ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    recentActivity: "ಇತ್ತೀಚಿನ ಸಂಸ್ಥೆಯ ಚಟುವಟಿಕೆ", recentActivitySubtitle: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನ ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳು",
    viewAllActivity: "ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    semesterAssessmentCompleted: "ಸೆಮಿಸ್ಟರ್ ಮೌಲ್ಯಮಾಪನ ಪೂರ್ಣಗೊಂಡಿದೆ",
    placementAssessment: "ವಿದ್ಯಾರ್ಥಿಗಳು ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ನೋಂದಾಯಿಸಿದ್ದಾರೆ",
    attendanceRecordsUpdated: "ಹಾಜರಾತಿ ದಾಖಲೆಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ",
    semesterResultsPublished: "ಸೆಮಿಸ್ಟರ್ ಫಲಿತಾಂಶಗಳನ್ನು ಪ್ರಕಟಿಸಲಾಗಿದೆ",
    technicalActivitiesJoined: "ವಿದ್ಯಾರ್ಥಿಗಳು ತಾಂತ್ರಿಕ ಚಟುವಟಿಕೆಗಳಿಗೆ ಸೇರಿದ್ದಾರೆ",
    placementCell: "ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಸೆಲ್", academicAdministration: "ಶೈಕ್ಷಣಿಕ ಆಡಳಿತ",
    studentActivities: "ವಿದ್ಯಾರ್ಥಿ ಚಟುವಟಿಕೆಗಳು", twelveMinutesAgo: "12 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    thirtyEightMinutesAgo: "38 ನಿಮಿಷಗಳ ಹಿಂದೆ", oneHourAgo: "1 ಗಂಟೆಯ ಹಿಂದೆ",
    twoHoursAgo: "2 ಗಂಟೆಗಳ ಹಿಂದೆ", yesterday: "ನಿನ್ನೆ", scoreLabel: "ಅಂಕ",
    viewDetails: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ", welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
    quickInsight: "ಇಂದು ನಿಮ್ಮ ಸಂಸ್ಥೆಯಲ್ಲಿ ನಡೆಯುತ್ತಿರುವುದರ ಅವಲೋಕನ.",
    searchResults: "ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು", noResults: "ಹೊಂದಾಣಿಕೆಯ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    profile: "ಪ್ರೊಫೈಲ್", logout: "ಲಾಗ್ ಔಟ್", notifications: "ಅಧಿಸೂಚನೆಗಳು",
  },
};

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
  { month: "Jan", attendance: 84 }, { month: "Feb", attendance: 87 },
  { month: "Mar", attendance: 82 }, { month: "Apr", attendance: 89 },
  { month: "May", attendance: 91 }, { month: "Jun", attendance: 88 },
  { month: "Jul", attendance: 92 }, { month: "Aug", attendance: 94 },
];
const departmentData = [
  { name: "CSE", students: 820 }, { name: "AI & ML", students: 560 },
  { name: "ECE", students: 610 }, { name: "EEE", students: 420 },
  { name: "Mechanical", students: 380 }, { name: "Civil", students: 350 },
];
const assessmentData = [
  { name: "Completed", value: 72 }, { name: "Pending", value: 18 }, { name: "Overdue", value: 10 },
];
const activityData = [
  { name: "Technical", value: 35 }, { name: "Sports", value: 22 },
  { name: "Cultural", value: 18 }, { name: "Research", value: 15 }, { name: "Clubs", value: 10 },
];
const chartColors = ["#06b6d4", "#6366f1", "#f59e0b", "#10b981", "#ec4899"];
const students = [
  { rank: "01", name: "Aarav Sharma", department: "CSE", score: "94.8%", attendance: "96%" },
  { rank: "02", name: "Priya Nair", department: "AI & ML", score: "93.6%", attendance: "94%" },
  { rank: "03", name: "Rahul Kumar", department: "ECE", score: "92.9%", attendance: "95%" },
  { rank: "04", name: "Ananya Rao", department: "CSE", score: "91.7%", attendance: "93%" },
];
const activityItems = [
  { icon: ClipboardCheck, title: "semesterAssessmentCompleted", user: "CSE - Semester 6", time: "twelveMinutesAgo", color: "violet" },
  { icon: Users, title: "placement", user: "placementCell", time: "thirtyEightMinutesAgo", color: "cyan" },
  { icon: CalendarCheck, title: "attendanceRecordsUpdated", user: "ECE Department", time: "oneHourAgo", color: "emerald" },
  { icon: Award, title: "semesterResultsPublished", user: "academicAdministration", time: "twoHoursAgo", color: "amber" },
  { icon: Activity, title: "technical", user: "studentActivities", time: "yesterday", color: "pink" },
];

const navItems = [
  { key: "overview", icon: LayoutDashboard, path: "/udyamsethu/institution" },
  { key: "students", icon: Users, path: "/udyamsethu/institution/students" },
  { key: "academics", icon: GraduationCap, path: "/udyamsethu/institution/academics" },
  { key: "attendance", icon: CalendarCheck, path: "/udyamsethu/institution/attendance" },
  { key: "assessments", icon: ClipboardCheck, path: "/udyamsethu/institution/assessments" },
  { key: "results", icon: Award, path: "/udyamsethu/institution/results" },
  { key: "activities", icon: Activity, path: "/udyamsethu/institution/activities" },
  { key: "reports", icon: FileText, path: "/udyamsethu/institution/reports" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];

  const theme = darkMode
    ? {
        page: "bg-[#0b1120] text-slate-100", card: "bg-[#111c30] border-slate-800",
        header: "bg-[#111c30]/95 border-slate-800", muted: "text-slate-400",
        input: "bg-[#0b1120] border-slate-700 text-slate-100 placeholder:text-slate-500",
        subcard: "bg-slate-800/60", divider: "border-slate-800",
        hover: "hover:bg-white/5", chartGrid: "#263449", chartText: "#94a3b8",
      }
    : {
        page: "bg-[#f5f7fb] text-slate-800", card: "bg-white border-slate-200",
        header: "bg-white/95 border-slate-200", muted: "text-slate-500",
        input: "bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400",
        subcard: "bg-slate-50", divider: "border-slate-100",
        hover: "hover:bg-slate-50", chartGrid: "#e8edf4", chartText: "#64748b",
      };

  const filteredSemesters = useMemo(() => {
    if (selectedSemester === "All Semesters") return semesterPerformance;
    const index = Number(selectedSemester.replace("Semester ", "")) - 1;
    return semesterPerformance[index] ? [semesterPerformance[index]] : semesterPerformance;
  }, [selectedSemester]);

  const searchItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return [
      ...navItems.map((item) => ({ label: t[item.key], path: item.path, kind: t.institution })),
      ...students.map((student) => ({ label: student.name, path: "/udyamsethu/institution/students", kind: student.department })),
      { label: t.institutionProfile, path: "/udyamsethu/institution/profile", kind: t.administration },
      { label: t.settings, path: "/udyamsethu/institution/settings", kind: t.administration },
    ].filter((item) => `${item.label} ${item.kind}`.toLowerCase().includes(q)).slice(0, 7);
  }, [searchQuery, t]);

  const go = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setSearchQuery("");
    setProfileOpen(false);
  };

  const exportCsv = () => {
    const rows = [
      ["Institution Dashboard Report"],
      ["Metric", "Value"],
      ["Total students", "4286"],
      ["Active students", "3742"],
      ["Average attendance", "89.4%"],
      ["Average score", "78.6%"],
      [],
      ["Top students", "Department", "Score", "Attendance"],
      ...students.map((s) => [s.name, s.department, s.score, s.attendance]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "udyam-sethu-institution-report.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const metrics = [
    { title: t.totalStudents, value: "4,286", change: "+8.4%", description: t.previousSemester, icon: Users, path: navItems[1].path, positive: true, accent: "cyan" },
    { title: t.activeStudents, value: "3,742", change: "+12.6%", description: t.activePercentage, icon: UserCheck, path: navItems[1].path, positive: true, accent: "emerald" },
    { title: t.averageAttendance, value: "89.4%", change: "+3.2%", description: t.institutionAverage, icon: CalendarCheck, path: navItems[3].path, positive: true, accent: "violet" },
    { title: t.averageScore, value: "78.6%", change: "+5.8%", description: t.currentAcademicYear, icon: Trophy, path: navItems[5].path, positive: true, accent: "amber" },
  ];
  const smallMetrics = [
    { title: t.inactiveStudents, value: "544", percentage: "12.7%", icon: UserX, color: "red", path: navItems[1].path },
    { title: t.assessmentsCompleted, value: "72%", percentage: "+6.4%", icon: ClipboardCheck, color: "cyan", path: navItems[4].path },
    { title: t.studentsAtRisk, value: "186", percentage: "Needs review", icon: AlertTriangle, color: "amber", path: navItems[5].path },
    { title: t.activitiesParticipation, value: "68.5%", percentage: "+9.2%", icon: Heart, color: "violet", path: navItems[6].path },
  ];

  return (
    <div className={`min-h-screen ${theme.page} transition-colors duration-300`}>
      {sidebarOpen && (
        <button aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col bg-[#101b2e] text-white shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex h-[78px] items-center justify-between border-b border-white/10 px-5">
          <button onClick={() => go("/udyamsethu/institution")} className="flex min-w-0 items-center gap-3 text-left" aria-label="Go to institution overview">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
              <img src={logo} alt="Udyam Sethu logo" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight">Udyam Sethu</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-400">Institution portal</p>
            </div>
          </button>
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden" aria-label="Close sidebar"><X size={19} /></button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{t.institution}</p>
          <nav className="space-y-1" aria-label="Institution navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path || (item.key !== "overview" && location.pathname.startsWith(item.path + "/"));
              return (
                <button key={item.key} onClick={() => go(item.path)} aria-current={active ? "page" : undefined}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-medium transition-all duration-200 ${active ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/20" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"}`}>
                  <Icon size={18} strokeWidth={active ? 2.4 : 1.8} />
                  <span className="flex-1">{t[item.key]}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-4 pt-8">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{t.administration}</p>
          <button onClick={() => go("/udyamsethu/institution/profile")} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white">
            <Building2 size={18} /> <span>{t.institutionProfile}</span>
          </button>
          <button onClick={() => go("/udyamsethu/institution/settings")} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[13px] font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white">
            <Settings size={18} /> <span>{t.settings}</span>
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-teal-400 text-xs font-extrabold text-slate-950">SP</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Sachin</p>
                <p className="mt-0.5 truncate text-[11px] text-slate-400">Institution Admin</p>
              </div>
              <button onClick={() => setProfileOpen((v) => !v)} aria-label="Open profile menu" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10"><ChevronDown size={16} /></button>
            </div>
            {profileOpen && (
              <div className="mt-3 border-t border-white/10 pt-2">
                <button onClick={() => go("/udyamsethu/institution/profile")} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-300 hover:bg-white/10"><Users size={14} /> {t.profile}</button>
                <button onClick={() => go("/udyamsethu/login")} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs text-rose-300 hover:bg-white/10"><LogOut size={14} /> {t.logout}</button>
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-600">UDYAM SETHU · ADMIN CONSOLE</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[265px]">
        <header className={`sticky top-0 z-30 flex min-h-[76px] items-center gap-3 border-b px-4 py-3 backdrop-blur-xl sm:px-6 xl:px-8 ${theme.header}`}>
          <button onClick={() => setSidebarOpen(true)} className={`rounded-xl p-2.5 ${theme.hover} lg:hidden`} aria-label="Open navigation"><Menu size={21} /></button>

          <div className="relative min-w-0 flex-1 max-w-[560px]">
            <Search size={18} className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${theme.muted}`} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter" && searchItems[0]) go(searchItems[0].path);
              if (e.key === "Escape") setSearchQuery("");
            }} placeholder={t.search} aria-label={t.search} className={`h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 ${theme.input}`} />
            {searchQuery.trim() && (
              <div className={`absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border p-2 shadow-2xl ${theme.card}`}>
                <p className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${theme.muted}`}>{t.searchResults}</p>
                {searchItems.length ? searchItems.map((item) => (
                  <button key={`${item.path}-${item.label}`} onClick={() => go(item.path)} className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${theme.hover}`}>
                    <span className="truncate">{item.label}</span><span className={`shrink-0 text-xs ${theme.muted}`}>{item.kind}</span>
                  </button>
                )) : <p className={`px-3 py-4 text-sm ${theme.muted}`}>{t.noResults}</p>}
              </div>
            )}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className={`hidden items-center rounded-xl border p-1 sm:flex ${darkMode ? "border-slate-700 bg-[#0b1120]" : "border-slate-200 bg-slate-100"}`}>
              <button onClick={() => setLanguage("en")} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${language === "en" ? (darkMode ? "bg-slate-700 text-white" : "bg-white text-slate-900 shadow-sm") : theme.muted}`}>EN</button>
              <button onClick={() => setLanguage("kn")} className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition ${language === "kn" ? (darkMode ? "bg-slate-700 text-white" : "bg-white text-slate-900 shadow-sm") : theme.muted}`}>ಕನ್ನಡ</button>
            </div>
            <button onClick={() => setLanguage((v) => v === "en" ? "kn" : "en")} className={`rounded-xl border px-2.5 py-2 text-xs font-semibold sm:hidden ${theme.card}`} aria-label="Change language">{language === "en" ? "ಕನ್ನಡ" : "EN"}</button>
            <button onClick={() => setLastUpdated(new Date())} title="Refresh dashboard timestamp" aria-label="Refresh dashboard" className={`hidden h-10 w-10 items-center justify-center rounded-xl transition sm:flex ${theme.hover}`}><RefreshCw size={17} /></button>
            <div className="relative">
              <button onClick={() => setNotificationsOpen((v) => !v)} aria-label={t.notifications} className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${theme.hover}`}>
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
              </button>
              {notificationsOpen && <div className={`absolute right-0 top-12 z-50 w-[min(300px,85vw)] rounded-2xl border p-4 shadow-xl ${theme.card}`}>
                <p className="text-sm font-bold">{t.notifications}</p>
                <p className={`mt-2 text-xs leading-5 ${theme.muted}`}>3 assessment items are awaiting review. Check the assessment page for details.</p>
                <button onClick={() => { setNotificationsOpen(false); go(navItems[4].path); }} className="mt-3 text-xs font-semibold text-cyan-500">Review assessments →</button>
              </div>}
            </div>
            <button onClick={() => setDarkMode((v) => !v)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${darkMode ? "bg-amber-300/10 text-amber-300" : "text-slate-600 hover:bg-slate-100"}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setProfileOpen((v) => !v)} className={`hidden items-center gap-2.5 border-l pl-3.5 sm:flex ${theme.divider}`} aria-label="Toggle profile menu">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-bold text-white">SP</span>
              <span className="hidden text-left xl:block"><span className="block text-xs font-semibold">Sachin</span><span className={`mt-0.5 block text-[10px] ${theme.muted}`}>Institution Admin</span></span>
              <ChevronDown size={14} className={theme.muted} />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1700px] p-4 sm:p-6 xl:p-8">
          <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
            <div>
              <div className={`mb-3 flex items-center gap-2 text-xs ${theme.muted}`}>
                <span>{t.institution}</span><span className="text-slate-400">/</span><span className="font-semibold text-cyan-500">{t.overview}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.institutionOverview}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live overview</span>
              </div>
              <p className={`mt-2 max-w-2xl text-sm leading-6 ${theme.muted}`}>{t.overviewDescription}</p>
              <p className={`mt-2 text-[11px] ${theme.muted}`}>Last checked: {lastUpdated.toLocaleTimeString(language === "kn" ? "kn-IN" : "en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 sm:flex-none">
                <SlidersHorizontal size={15} className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${theme.muted}`} />
                <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} aria-label="Filter semester" className={`h-11 w-full appearance-none rounded-xl border pl-9 pr-8 text-sm font-medium outline-none focus:border-cyan-400 sm:w-auto ${theme.card}`}>
                  <option value="All Semesters">{t.allSemesters}</option>
                  {semesterPerformance.map((s, i) => <option key={s.semester} value={`Semester ${i + 1}`}>{t.semester} {i + 1}</option>)}
                </select>
              </div>
              <button onClick={exportCsv} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#12223a] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 sm:flex-none"><Download size={16} />{t.export}</button>
            </div>
          </div>

          <section className={`mb-6 flex flex-col gap-4 rounded-2xl border p-4 shadow-sm sm:p-5 md:flex-row md:items-center md:justify-between ${theme.card}`}>
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500"><Activity size={23} /></div>
              <div>
                <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold">{t.platformActive}</h2><span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">Operational</span></div>
                <p className={`mt-1 text-xs ${theme.muted}`}>{t.platformDescription}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t pt-4 md:min-w-[390px] md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <LiveStat value="1,248" label={t.currentlyOnline} theme={theme} />
              <LiveStat value="3,426" label={t.activeToday} theme={theme} />
              <LiveStat value="99.9%" label={t.systemAvailability} theme={theme} />
            </div>
          </section>

          <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric) => <MetricCard key={metric.title} {...metric} darkMode={darkMode} onClick={() => go(metric.path)} theme={theme} />)}
          </section>

          <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {smallMetrics.map((metric) => <SmallMetric key={metric.title} {...metric} theme={theme} onClick={() => go(metric.path)} />)}
          </section>

          <section className="mb-6 grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-3">
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm 2xl:col-span-2 ${theme.card}`}>
              <CardHeader title={t.academicPerformance} subtitle={t.academicSubtitle} theme={theme} action={() => go(navItems[5].path)} />
              <div className="p-4 sm:p-5">
                <div className="mb-5 flex flex-wrap items-center gap-x-7 gap-y-3">
                  <div><p className={`text-xs ${theme.muted}`}>{t.institutionAverageLabel}</p><p className="mt-1 text-2xl font-bold">78.6%</p></div>
                  <div className={`hidden h-10 w-px sm:block ${darkMode ? "bg-slate-700" : "bg-slate-200"}`} />
                  <div><p className={`text-xs ${theme.muted}`}>{t.passPercentage}</p><p className="mt-1 text-2xl font-bold">92.4%</p></div>
                  <div className="ml-auto flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-2.5 py-2 text-xs font-semibold text-emerald-500"><TrendingUp size={14} /> 5.8%</div>
                </div>
                <div className="h-[250px] w-full sm:h-[290px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredSemesters} margin={{ top: 8, right: 6, left: -20, bottom: 0 }}>
                      <defs><linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} /><stop offset="95%" stopColor="#06b6d4" stopOpacity={0.01} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 4" vertical={false} stroke={theme.chartGrid} />
                      <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.chartText }} />
                      <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.chartText }} />
                      <Tooltip contentStyle={{ background: darkMode ? "#111c30" : "#fff", border: `1px solid ${theme.chartGrid}`, borderRadius: 12, color: darkMode ? "#e2e8f0" : "#0f172a", fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                      <Area type="monotone" dataKey="average" name={t.averageScore} stroke="#06b6d4" strokeWidth={2.5} fill="url(#scoreFill)" activeDot={{ r: 5 }} />
                      <Area type="monotone" dataKey="pass" name={t.passPercentage} stroke="#818cf8" strokeWidth={2.5} fill="none" activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.attendanceOverview} subtitle={t.attendanceSubtitle} theme={theme} action={() => go(navItems[3].path)} />
              <div className="p-5">
                <div className="relative mx-auto h-[174px] w-full max-w-[230px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={[{ name: t.present, value: 89.4 }, { name: t.absent, value: 7.1 }, { name: t.leave, value: 3.5 }]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={79} startAngle={90} endAngle={-270} paddingAngle={3} stroke="none"><Cell fill="#06b6d4" /><Cell fill="#f59e0b" /><Cell fill={darkMode ? "#475569" : "#cbd5e1"} /></Pie><Tooltip contentStyle={{ background: darkMode ? "#111c30" : "#fff", border: `1px solid ${theme.chartGrid}`, borderRadius: 10, fontSize: 12 }} /></PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-bold">89.4%</span><span className={`mt-1 text-[11px] ${theme.muted}`}>{t.averageAttendance}</span></div>
                </div>
                <div className="mt-5 space-y-4">
                  <ProgressRow label={t.present} value="89.4%" width="89.4%" color="bg-cyan-500" theme={theme} />
                  <ProgressRow label={t.absent} value="7.1%" width="7.1%" color="bg-amber-500" theme={theme} />
                  <ProgressRow label={t.leave} value="3.5%" width="3.5%" color="bg-slate-400" theme={theme} />
                </div>
                <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-emerald-500/10 p-3 text-emerald-500"><TrendingUp size={16} className="mt-0.5 shrink-0" /><p className="text-xs font-medium leading-5">{t.attendanceImproved}</p></div>
              </div>
            </div>
          </section>

          <section className="mb-6 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.departmentStudents} subtitle={t.departmentSubtitle} theme={theme} action={() => go(navItems[1].path)} />
              <div className="h-[290px] p-4 sm:p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="vertical" margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 4" horizontal={false} stroke={theme.chartGrid} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.chartText }} />
                    <YAxis type="category" dataKey="name" width={76} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: theme.chartText }} />
                    <Tooltip cursor={{ fill: darkMode ? "#ffffff0a" : "#0f172a08" }} contentStyle={{ background: darkMode ? "#111c30" : "#fff", border: `1px solid ${theme.chartGrid}`, borderRadius: 10, fontSize: 12 }} />
                    <Bar dataKey="students" name={t.students} fill="#06b6d4" radius={[0, 6, 6, 0]} barSize={21} onClick={() => go(navItems[1].path)} cursor="pointer" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.assessmentStatus} subtitle={t.assessmentSubtitle} theme={theme} action={() => go(navItems[4].path)} />
              <div className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:gap-7">
                <button onClick={() => go(navItems[4].path)} className="h-[205px] w-full max-w-[220px] shrink-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400" aria-label="View assessment status">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={assessmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={57} outerRadius={83} paddingAngle={4} stroke="none">{assessmentData.map((entry, i) => <Cell key={entry.name} fill={["#10b981", "#f59e0b", "#f43f5e"][i]} />)}</Pie><Tooltip contentStyle={{ background: darkMode ? "#111c30" : "#fff", border: `1px solid ${theme.chartGrid}`, borderRadius: 10, fontSize: 12 }} /></PieChart>
                  </ResponsiveContainer>
                </button>
                <div className="w-full flex-1 space-y-5">
                  <AssessmentRow title={t.completed} value="72%" count="3,084 students" color="bg-emerald-500" theme={theme} onClick={() => go(navItems[4].path)} />
                  <AssessmentRow title={t.pending} value="18%" count="771 students" color="bg-amber-500" theme={theme} onClick={() => go(navItems[4].path)} />
                  <AssessmentRow title={t.overdue} value="10%" count="431 students" color="bg-rose-500" theme={theme} onClick={() => go(navItems[4].path)} />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-6 grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-3">
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm 2xl:col-span-2 ${theme.card}`}>
              <CardHeader title={t.studentInterests} subtitle={t.studentInterestsSubtitle} theme={theme} action={() => go(navItems[6].path)} />
              <div className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-2 sm:p-5">
                <div className="h-[245px] min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={activityData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={59} outerRadius={91} paddingAngle={3} stroke="none">{activityData.map((a, i) => <Cell key={a.name} fill={chartColors[i]} />)}</Pie><Tooltip contentStyle={{ background: darkMode ? "#111c30" : "#fff", border: `1px solid ${theme.chartGrid}`, borderRadius: 10, fontSize: 12 }} /></PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {activityData.map((activity, i) => {
                    const names = [t.technical, t.sports, t.cultural, t.research, t.clubs];
                    return <button key={activity.name} onClick={() => go(navItems[6].path)} className={`flex w-full items-center gap-3 rounded-lg p-1 text-left ${theme.hover}`}>
                      <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: chartColors[i] }} />
                      <span className="flex-1 text-sm">{names[i]}</span>
                      <span className="text-sm font-bold">{activity.value}%</span>
                    </button>;
                  })}
                </div>
              </div>
            </div>
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.studentEngagement} subtitle={t.engagementSubtitle} theme={theme} action={() => go(navItems[1].path)} />
              <div className="space-y-5 p-5">
                <EngagementCard icon={Users} title={t.totalStudents} value="4,286" description={t.registered} color="cyan" theme={theme} />
                <EngagementCard icon={UserCheck} title={t.activeStudents} value="3,742" description={`87.3% ${t.active}`} color="emerald" theme={theme} />
                <EngagementCard icon={UserX} title={t.inactiveStudents} value="544" description={`12.7% ${t.inactive}`} color="red" theme={theme} />
                <div className={`border-t pt-5 ${theme.divider}`}>
                  <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /><span className={`text-xs font-semibold ${theme.muted}`}>{t.livePlatformUsers}</span></div>
                  <p className="text-3xl font-bold tracking-tight">1,248</p>
                  <p className={`mt-1 text-xs ${theme.muted}`}>{t.studentsCurrentlyOnline}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.topPerformingStudents} subtitle={t.topPerformingSubtitle} theme={theme} action={() => go(navItems[5].path)} />
              <div className={`divide-y ${theme.divider}`}>
                {students.map((student) => <StudentRow key={student.rank} {...student} scoreLabel={t.score} attendanceLabel={t.attendanceLabel} theme={theme} onClick={() => go(`/udyamsethu/institution/students`)} />)}
              </div>
              <div className={`border-t p-4 ${theme.divider}`}><button onClick={() => go(navItems[5].path)} className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-500/10">{t.viewAcademicPerformance}<ArrowUpRight size={16} /></button></div>
            </div>
            <div className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm ${theme.card}`}>
              <CardHeader title={t.recentActivity} subtitle={t.recentActivitySubtitle} theme={theme} action={() => go(navItems[6].path)} />
              <div className="space-y-1 p-4 sm:p-5">
                {activityItems.map((item, index) => <ActivityItem key={`${item.title}-${index}`} item={item} t={t} theme={theme} onClick={() => go(index === 0 || index === 1 ? navItems[4].path : index === 2 ? navItems[3].path : index === 3 ? navItems[5].path : navItems[6].path)} />)}
              </div>
              <div className={`border-t p-4 ${theme.divider}`}><button onClick={() => go(navItems[6].path)} className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-500/10">{t.viewAllActivity}<ArrowUpRight size={16} /></button></div>
            </div>
          </section>

          <footer className={`mt-8 flex flex-col gap-2 border-t py-5 text-[11px] ${theme.muted} sm:flex-row sm:items-center sm:justify-between ${theme.divider}`}>
            <span>© {new Date().getFullYear()} Udyam Sethu. All rights reserved.</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Institution portal · Dashboard overview</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

function LiveStat({ value, label, theme }) {
  return <div className="min-w-0"><p className="text-lg font-bold tracking-tight sm:text-xl">{value}</p><p className={`mt-1 text-[10px] leading-4 sm:text-[11px] ${theme.muted}`}>{label}</p></div>;
}

function MetricCard({ title, value, change, description, icon: Icon, positive, onClick, darkMode }) {
  const accents = {
    cyan: "bg-cyan-500/10 text-cyan-500",
    emerald: "bg-emerald-500/10 text-emerald-500",
    violet: "bg-violet-500/10 text-violet-500",
    amber: "bg-amber-500/10 text-amber-500",
  };
  const accent = title.toLowerCase().includes("attendance") ? accents.violet : title.toLowerCase().includes("score") ? accents.amber : title.toLowerCase().includes("active") ? accents.emerald : accents.cyan;
  return <button onClick={onClick} className={`group min-w-0 rounded-2xl border p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${darkMode ? "border-slate-800 bg-[#111c30] hover:border-cyan-700" : "border-slate-200 bg-white hover:border-cyan-300"}`}>
    <div className="flex items-start justify-between gap-3"><p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{title}</p><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}><Icon size={20} /></div></div>
    <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>
    <div className="mt-3 flex flex-wrap items-center gap-1.5"><span className={`inline-flex items-center gap-1 text-xs font-bold ${positive ? "text-emerald-500" : "text-rose-500"}`}>{positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{change}</span><span className={`text-[11px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{description}</span></div>
    <div className={`mt-4 flex items-center justify-between border-t pt-3 ${darkMode ? "border-slate-800" : "border-slate-100"}`}><span className="text-xs font-semibold text-cyan-600">View details</span><ArrowUpRight size={15} className="text-cyan-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
  </button>;
}

function SmallMetric({ title, value, percentage, icon: Icon, color, theme, onClick }) {
  const colors = {
    red: "bg-rose-500/10 text-rose-500", cyan: "bg-cyan-500/10 text-cyan-500",
    amber: "bg-amber-500/10 text-amber-500", violet: "bg-violet-500/10 text-violet-500",
  };
  return <button onClick={onClick} className={`flex min-w-0 items-center gap-3.5 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${theme.card}`}>
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}><Icon size={19} /></div>
    <div className="min-w-0 flex-1"><p className={`truncate text-xs font-medium ${theme.muted}`}>{title}</p><div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1"><span className="text-xl font-bold">{value}</span><span className={`text-[10px] font-semibold ${color === "red" || color === "amber" ? "text-amber-500" : "text-emerald-500"}`}>{percentage}</span></div></div>
    <ArrowUpRight size={15} className={`shrink-0 ${theme.muted}`} />
  </button>;
}

function CardHeader({ title, subtitle, theme, action }) {
  return <div className={`flex items-start justify-between gap-3 border-b px-5 py-4 ${theme.divider}`}><div className="min-w-0"><h3 className="text-sm font-bold tracking-tight">{title}</h3><p className={`mt-1 text-xs leading-5 ${theme.muted}`}>{subtitle}</p></div><button onClick={action} aria-label={`View ${title}`} className={`shrink-0 rounded-lg p-2 transition ${theme.muted} ${theme.hover}`}><MoreHorizontal size={19} /></button></div>;
}

function ProgressRow({ label, value, width, color, theme }) {
  return <div><div className="mb-2 flex items-center justify-between gap-3"><span className={`text-xs ${theme.muted}`}>{label}</span><span className="text-xs font-bold">{value}</span></div><div className={`h-2 overflow-hidden rounded-full ${theme.subcard}`}><div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width }} /></div></div>;
}

function AssessmentRow({ title, value, count, color, theme, onClick }) {
  return <button onClick={onClick} className="w-full rounded-xl text-left transition hover:opacity-80"><div className="mb-2 flex items-center justify-between gap-2"><div className="flex items-center gap-2.5"><span className={`h-2.5 w-2.5 rounded-full ${color}`} /><span className="text-sm font-semibold">{title}</span></div><span className="text-sm font-bold">{value}</span></div><p className={`pl-5 text-xs ${theme.muted}`}>{count}</p></button>;
}

function EngagementCard({ icon: Icon, title, value, description, color, theme }) {
  const colors = { cyan: "bg-cyan-500/10 text-cyan-500", emerald: "bg-emerald-500/10 text-emerald-500", red: "bg-rose-500/10 text-rose-500" };
  return <div className="flex items-center gap-3"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors[color]}`}><Icon size={18} /></div><div className="min-w-0 flex-1"><p className={`truncate text-xs ${theme.muted}`}>{title}</p><p className="mt-1 text-lg font-bold">{value}</p></div><span className={`text-right text-[10px] ${theme.muted}`}>{description}</span></div>;
}

function StudentRow({ rank, name, department, score, attendance, scoreLabel, attendanceLabel, theme, onClick }) {
  return <button onClick={onClick} className={`flex w-full min-w-0 items-center gap-3 px-4 py-4 text-left transition sm:gap-4 sm:px-5 ${theme.hover}`}>
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-[11px] font-bold text-cyan-600">{rank}</span>
    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{name}</span><span className={`mt-1 block text-xs ${theme.muted}`}>{department}</span></span>
    <span className="shrink-0 text-right"><span className="block text-sm font-bold text-emerald-500">{score}</span><span className={`mt-1 block text-[10px] ${theme.muted}`}>{scoreLabel}</span></span>
    <span className="hidden shrink-0 text-right sm:block"><span className="block text-sm font-semibold">{attendance}</span><span className={`mt-1 block text-[10px] ${theme.muted}`}>{attendanceLabel}</span></span>
    <Eye size={16} className={`shrink-0 ${theme.muted}`} />
  </button>;
}

function ActivityItem({ item, t, theme, onClick }) {
  const Icon = item.icon;
  const iconColors = {
    cyan: "bg-cyan-500/10 text-cyan-500", violet: "bg-violet-500/10 text-violet-500",
    emerald: "bg-emerald-500/10 text-emerald-500", amber: "bg-amber-500/10 text-amber-500",
    pink: "bg-pink-500/10 text-pink-500",
  };
  let title = t[item.title] || item.title;
  if (item.title === "placement") title = `42 ${t.placementAssessment}`;
  if (item.title === "technical") title = `78 ${t.technicalActivitiesJoined}`;
  return <button onClick={onClick} className={`flex w-full items-start gap-3 rounded-xl p-2 text-left transition ${theme.hover}`}>
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconColors[item.color]}`}><Icon size={17} /></span>
    <span className="min-w-0 flex-1"><span className="block text-[13px] font-medium leading-5">{title}</span><span className={`mt-1 flex flex-wrap items-center gap-x-2 text-[11px] ${theme.muted}`}><span>{t[item.user] || item.user}</span><span>·</span><span>{t[item.time]}</span></span></span>
    <ArrowUpRight size={14} className={`mt-1 shrink-0 ${theme.muted}`} />
  </button>;
}

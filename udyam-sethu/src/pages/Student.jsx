import React, { useEffect, useState } from "react";
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
  CalendarDays,
  TrendingUp,
  Award,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Settings,
  Moon,
  Sun,
  Target,
  Building2,
  MapPin,
  ExternalLink,
  BarChart3,
  LogOut,
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
   TRANSLATIONS
========================================================= */

const translations = {
  English: {
    studentPortal: "Student Portal",
    studentWorkspace: "Student Workspace",

    overview: "Overview",
    findOpportunities: "Find Opportunities",
    myApplications: "My Applications",
    savedOpportunities: "Saved Opportunities",
    assessments: "Assessments",
    mySkills: "My Skills",
    academicPerformance: "Academic Performance",

    account: "Account",
    myProfile: "My Profile",
    settings: "Settings",

    searchPlaceholder:
      "Search Job opportunities, companies, skills...",

    studentDashboard: "Student Dashboard",

    welcome: "Welcome back,  👋",

    dashboardDescription:
      "Track your academic progress, skills and career opportunities.",

    exploreOpportunities: "Explore Opportunities",

    currentCGPA: "Current CGPA",
    outOf10: "Out of 10",

    attendance: "Attendance",
    overallAttendance: "Overall attendance",

    assessmentsTitle: "Assessments",
    assessmentsCompleted: "Completed",

    applications: "Applications",
    activeApplications: "Active applications",

    completeProfile: "Complete your student profile",

    profileDescription:
      "Add your education, skills, resume and projects.",

    completeProfileButton: "Complete Profile",

    academicPerformanceTitle: "Academic Performance",

    performanceSubtitle:
      "Your performance trend over the semester",

    attendanceTitle: "Attendance",
    attendanceSubtitle: "Subject-wise attendance",

    upcomingEvents: "Upcoming Events",
    upcomingEventsSubtitle: "Important dates for you",

    skillsProgress: "Skills Progress",
    skillsSubtitle: "Your current skill development",

    careerReadiness: "Career Readiness",
    careerSubtitle: "Your placement readiness",

    ready: "Ready",

    recommendedOpportunities: "Recommended Opportunities",

    recommendedSubtitle:
      "Opportunities matching your education and skills",

    viewAllOpportunities: "View all opportunities",

    recentApplications: "Recent Applications",

    recentApplicationsSubtitle:
      "Latest application activity",

    quickActions: "Quick Actions",

    quickActionsSubtitle:
      "Manage your student profile",

    updateProfile: "Update Profile",
    uploadResume: "Upload Resume",
    takeAssessment: "Take Assessment",
    viewCertificates: "View Certificates",
    findInternship: "Find Internship",
    viewPerformance: "View Performance",

    profile: "Profile",
    resume: "Resume",
    skills: "Skills",

    complete: "Complete",
    uploaded: "Uploaded",
    good: "Good",

    placement: "Placement",
    assessment: "Assessment",
    workshop: "Workshop",

    deadline: "Deadline",

    shortlisted: "Shortlisted",
    underReview: "Under Review",
    applied: "Applied",
    rejected: "Rejected",

    readyStatus: "Ready",

    switchLanguage: "Language",
  },

  Kannada: {
    studentPortal: "ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್",
    studentWorkspace: "ವಿದ್ಯಾರ್ಥಿ ಕಾರ್ಯಕ್ಷೇತ್ರ",

    overview: "ಅವಲೋಕನ",
    findOpportunities: "ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ",
    myApplications: "ನನ್ನ ಅರ್ಜಿಗಳು",
    savedOpportunities: "ಉಳಿಸಿದ ಅವಕಾಶಗಳು",
    assessments: "ಮೌಲ್ಯಮಾಪನಗಳು",
    mySkills: "ನನ್ನ ಕೌಶಲ್ಯಗಳು",
    academicPerformance: "ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ",

    account: "ಖಾತೆ",
    myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

    searchPlaceholder:
      "ಉದ್ಯೋಗ ಅವಕಾಶಗಳು, ಕಂಪನಿಗಳು, ಕೌಶಲ್ಯಗಳನ್ನು ಹುಡುಕಿ...",

    studentDashboard: "ವಿದ್ಯಾರ್ಥಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

    welcome: "ಮತ್ತೆ ಸ್ವಾಗತ, ಅನನ್ಯಾ 👋",

    dashboardDescription:
      "ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿ, ಕೌಶಲ್ಯಗಳು ಮತ್ತು ಉದ್ಯೋಗ ಅವಕಾಶಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",

    exploreOpportunities: "ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",

    currentCGPA: "ಪ್ರಸ್ತುತ CGPA",
    outOf10: "10 ರಲ್ಲಿ",

    attendance: "ಹಾಜರಾತಿ",
    overallAttendance: "ಒಟ್ಟಾರೆ ಹಾಜರಾತಿ",

    assessmentsTitle: "ಮೌಲ್ಯಮಾಪನಗಳು",
    assessmentsCompleted: "ಪೂರ್ಣಗೊಂಡಿದೆ",

    applications: "ಅರ್ಜಿಗಳು",
    activeApplications: "ಸಕ್ರಿಯ ಅರ್ಜಿಗಳು",

    completeProfile: "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ",

    profileDescription:
      "ನಿಮ್ಮ ಶಿಕ್ಷಣ, ಕೌಶಲ್ಯಗಳು, ರೆಸ್ಯೂಮ್ ಮತ್ತು ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ಸೇರಿಸಿ.",

    completeProfileButton: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ",

    academicPerformanceTitle: "ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ",

    performanceSubtitle:
      "ಸೆಮಿಸ್ಟರ್‌ನಾದ್ಯಂತ ನಿಮ್ಮ ಸಾಧನೆಯ ಪ್ರಗತಿ",

    attendanceTitle: "ಹಾಜರಾತಿ",
    attendanceSubtitle: "ವಿಷಯವಾರು ಹಾಜರಾತಿ",

    upcomingEvents: "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
    upcomingEventsSubtitle: "ನಿಮಗಾಗಿ ಪ್ರಮುಖ ದಿನಾಂಕಗಳು",

    skillsProgress: "ಕೌಶಲ್ಯಗಳ ಪ್ರಗತಿ",
    skillsSubtitle: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ",

    careerReadiness: "ವೃತ್ತಿ ಸಿದ್ಧತೆ",
    careerSubtitle: "ನಿಮ್ಮ ಉದ್ಯೋಗ ಸಿದ್ಧತೆ",

    ready: "ಸಿದ್ಧ",

    recommendedOpportunities: "ಶಿಫಾರಸು ಮಾಡಿದ ಅವಕಾಶಗಳು",

    recommendedSubtitle:
      "ನಿಮ್ಮ ಶಿಕ್ಷಣ ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಅವಕಾಶಗಳು",

    viewAllOpportunities: "ಎಲ್ಲಾ ಅವಕಾಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ",

    recentApplications: "ಇತ್ತೀಚಿನ ಅರ್ಜಿಗಳು",

    recentApplicationsSubtitle:
      "ಇತ್ತೀಚಿನ ಅರ್ಜಿ ಚಟುವಟಿಕೆ",

    quickActions: "ತ್ವರಿತ ಕ್ರಮಗಳು",

    quickActionsSubtitle:
      "ನಿಮ್ಮ ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್ ನಿರ್ವಹಿಸಿ",

    updateProfile: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ",
    uploadResume: "ರೆಸ್ಯೂಮ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    takeAssessment: "ಮೌಲ್ಯಮಾಪನ ತೆಗೆದುಕೊಳ್ಳಿ",
    viewCertificates: "ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    findInternship: "ಇಂಟರ್ನ್‌ಶಿಪ್ ಹುಡುಕಿ",
    viewPerformance: "ಸಾಧನೆಯನ್ನು ವೀಕ್ಷಿಸಿ",

    profile: "ಪ್ರೊಫೈಲ್",
    resume: "ರೆಸ್ಯೂಮ್",
    skills: "ಕೌಶಲ್ಯಗಳು",

    complete: "ಪೂರ್ಣಗೊಂಡಿದೆ",
    uploaded: "ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    good: "ಉತ್ತಮ",

    placement: "ಉದ್ಯೋಗ",
    assessment: "ಮೌಲ್ಯಮಾಪನ",
    workshop: "ಕಾರ್ಯಾಗಾರ",

    deadline: "ಕೊನೆಯ ದಿನಾಂಕ",

    shortlisted: "ಆಯ್ಕೆಪಟ್ಟಿಯಲ್ಲಿ",
    underReview: "ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ",
    applied: "ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    rejected: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ",

    readyStatus: "ಸಿದ್ಧ",

    switchLanguage: "ಭಾಷೆ",
  },
};

/* =========================================================
   PERFORMANCE DATA
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

/* =========================================================
   ATTENDANCE DATA
========================================================= */

const attendanceData = [
  { subject: "CSE", attendance: 92 },
  { subject: "DBMS", attendance: 88 },
  { subject: "Java", attendance: 95 },
  { subject: "React", attendance: 84 },
  { subject: "AI/ML", attendance: 90 },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const StudentDashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [language, setLanguage] = useState("English");
  const [languageOpen, setLanguageOpen] = useState(false);

  const t = translations[language];

  const [student, setStudent] = useState(null);
  // const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [loadingStudent, setLoadingStudent] = useState(true);

  useEffect(() => {
    const fetchLoggedInStudent = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/udyamsethu/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch student");
        }

        const data = await response.json();

        setStudent(data.user || data);
      } catch (error) {
        console.error("Student fetch error:", error);
      } finally {
        setLoadingStudent(false);
      }
    };

    fetchLoggedInStudent();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setStudent(null);
    navigate("/udyamsethu/login");
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const studentName = student?.fullName || "Student";
  const studentInitials = getInitials(studentName);
  const studentCourse = student?.course || student?.organization || "Student";
  const studentYear = student?.year || "";

  const [sidebarProfileOpen, setSidebarProfileOpen] = useState(false);
  const [headerProfileOpen, setHeaderProfileOpen] = useState(false);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigation = [
    {
      label: t.overview,
      icon: LayoutDashboard,
      path: "/udyamsethu/student"
    },
    {
      label: t.findOpportunities,
      icon: Search,
      path: "/udyamsethu/student/opportunities",
    },
    {
      label: t.myApplications,
      icon: FileText,
      path: "/udyamsethu/student/applications",
    },
    {
      label: t.savedOpportunities,
      icon: Bookmark,
      path: "/udyamsethu/student/saved-opportunities",
    },
    {
      label: t.assessments,
      icon: ClipboardCheck,
      path: "/udyamsethu/student/assessments"
    },
    {
      label: t.mySkills,
      icon: Target,
      path: "/udyamsethu/student/skills",
    },
    {
      label: t.academicPerformance,
      icon: GraduationCap,
      path: "/udyamsethu/student/academic-performance",
    },
  ];

  /* =========================================================
     UPCOMING EVENTS
  ========================================================= */

  const upcomingEvents =
    language === "English"
      ? [
        {
          title: "Campus Placement Drive",
          date: "25 Aug",
          time: "10:00 AM",
          type: t.placement,
        },
        {
          title: "React Assessment",
          date: "28 Aug",
          time: "2:00 PM",
          type: t.assessment,
        },
        {
          title: "Resume Workshop",
          date: "30 Aug",
          time: "11:30 AM",
          type: t.workshop,
        },
      ]
      : [
        {
          title: "ಕ್ಯಾಂಪಸ್ ಉದ್ಯೋಗ ಮೇಳ",
          date: "25 ಆಗಸ್ಟ್",
          time: "10:00 AM",
          type: t.placement,
        },
        {
          title: "React ಮೌಲ್ಯಮಾಪನ",
          date: "28 ಆಗಸ್ಟ್",
          time: "2:00 PM",
          type: t.assessment,
        },
        {
          title: "ರೆಸ್ಯೂಮ್ ಕಾರ್ಯಾಗಾರ",
          date: "30 ಆಗಸ್ಟ್",
          time: "11:30 AM",
          type: t.workshop,
        },
      ];

  /* =========================================================
     RECOMMENDED OPPORTUNITIES
  ========================================================= */

  const recommendedOpportunities =
    language === "English"
      ? [
        {
          title: "Frontend Developer Intern",
          company: "Tech Solutions Pvt. Ltd.",
          location: "Bangalore",
          type: "Internship",
          skills: ["React", "JavaScript", "Tailwind"],
          deadline: "30 Aug 2026",
        },
        {
          title: "Java Developer Intern",
          company: "Digital Systems",
          location: "Bangalore",
          type: "Internship",
          skills: ["Java", "Spring Boot", "MySQL"],
          deadline: "02 Sep 2026",
        },
        {
          title: "Software Engineer Trainee",
          company: "NextGen Technologies",
          location: "Hyderabad",
          type: "Full Time",
          skills: ["Java", "SQL", "Git"],
          deadline: "05 Sep 2026",
        },
      ]
      : [
        {
          title: "ಫ್ರಂಟ್‌ಎಂಡ್ ಡೆವಲಪರ್ ಇಂಟರ್ನ್",
          company: "ಟೆಕ್ ಸೊಲ್ಯೂಷನ್ಸ್ ಪ್ರೈವೇಟ್ ಲಿಮಿಟೆಡ್",
          location: "ಬೆಂಗಳೂರು",
          type: "ಇಂಟರ್ನ್‌ಶಿಪ್",
          skills: ["React", "JavaScript", "Tailwind"],
          deadline: "30 ಆಗಸ್ಟ್ 2026",
        },
        {
          title: "ಜಾವಾ ಡೆವಲಪರ್ ಇಂಟರ್ನ್",
          company: "ಡಿಜಿಟಲ್ ಸಿಸ್ಟಮ್ಸ್",
          location: "ಬೆಂಗಳೂರು",
          type: "ಇಂಟರ್ನ್‌ಶಿಪ್",
          skills: ["Java", "Spring Boot", "MySQL"],
          deadline: "02 ಸೆಪ್ಟೆಂಬರ್ 2026",
        },
        {
          title: "ಸಾಫ್ಟ್‌ವೇರ್ ಎಂಜಿನಿಯರ್ ತರಬೇತಿದಾರ",
          company: "ನೆಕ್ಸ್ಟ್‌ಜೆನ್ ಟೆಕ್ನಾಲಜೀಸ್",
          location: "ಹೈದರಾಬಾದ್",
          type: "ಪೂರ್ಣಕಾಲಿಕ",
          skills: ["Java", "SQL", "Git"],
          deadline: "05 ಸೆಪ್ಟೆಂಬರ್ 2026",
        },
      ];

  /* =========================================================
     APPLICATIONS
  ========================================================= */

  const applications =
    language === "English"
      ? [
        {
          title: "Frontend Developer Intern",
          company: "Tech Solutions",
          status: t.shortlisted,
          type: "success",
        },
        {
          title: "Java Developer Intern",
          company: "Digital Systems",
          status: t.underReview,
          type: "pending",
        },
        {
          title: "Software Engineer Trainee",
          company: "NextGen Technologies",
          status: t.applied,
          type: "applied",
        },
        {
          title: "UI Developer Intern",
          company: "Creative Labs",
          status: t.rejected,
          type: "rejected",
        },
      ]
      : [
        {
          title: "ಫ್ರಂಟ್‌ಎಂಡ್ ಡೆವಲಪರ್ ಇಂಟರ್ನ್",
          company: "ಟೆಕ್ ಸೊಲ್ಯೂಷನ್ಸ್",
          status: t.shortlisted,
          type: "success",
        },
        {
          title: "ಜಾವಾ ಡೆವಲಪರ್ ಇಂಟರ್ನ್",
          company: "ಡಿಜಿಟಲ್ ಸಿಸ್ಟಮ್ಸ್",
          status: t.underReview,
          type: "pending",
        },
        {
          title: "ಸಾಫ್ಟ್‌ವೇರ್ ಎಂಜಿನಿಯರ್ ತರಬೇತಿದಾರ",
          company: "ನೆಕ್ಸ್ಟ್‌ಜೆನ್ ಟೆಕ್ನಾಲಜೀಸ್",
          status: t.applied,
          type: "applied",
        },
        {
          title: "UI ಡೆವಲಪರ್ ಇಂಟರ್ನ್",
          company: "ಕ್ರಿಯೇಟಿವ್ ಲ್ಯಾಬ್ಸ್",
          status: t.rejected,
          type: "rejected",
        },
      ];

  /* =========================================================
     COLORS
  ========================================================= */

  const bg = darkMode
    ? "bg-[#0f172a]"
    : "bg-[#f4f7fb]";

  const card = darkMode
    ? "bg-[#172033] border-slate-700"
    : "bg-white border-slate-200";

  const textPrimary = darkMode
    ? "text-white"
    : "text-slate-900";

  const textSecondary = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  return (
    <div
      className={`
        min-h-screen
        ${bg}
        ${textPrimary}
        transition-colors
        duration-300
      `}
    >
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
          w-[260px]
          h-screen
          bg-[#172033]
          text-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"}
        `}
      >
        {/* LOGO */}

        <div className="h-[72px] px-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">

            <a
              href="/udyamsethu/student"
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

          <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-3">
            {t.studentWorkspace}
          </p>

          <nav className="space-y-1">

            {navigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
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

                    ${location.pathname === item.path
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
            {t.account}
          </p>

          {/* <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5">
            <UserRound size={18} />
            {t.myProfile}
          </button> */}

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-white/5"
            onClick={() => navigate("/udyamsethu/student/settings")}>
            <Settings size={18} />
            {t.settings}
          </button>

        </div>

        {/* PROFILE */}

        {/* PROFILE MENU */}

        {/* PROFILE */}

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="relative">

            <button
              onClick={() => {
                setSidebarProfileOpen(!sidebarProfileOpen);
                setHeaderProfileOpen(false);
              }}
              className="
        w-full
        p-3
        rounded-xl
        bg-white/5
        border
        border-white/10
        hover:bg-white/10
        transition
        text-left
      "
            >
              <div className="flex items-center gap-3">

                {/* PROFILE IMAGE */}
                <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#172033]">
                    {studentInitials}
                  </span>
                </div>

                {/* USER DETAILS */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {studentName}
                  </p>

                  <p className="text-xs text-slate-400 truncate">
                    {studentCourse}
                    {studentYear && ` • ${studentYear}`}
                  </p>
                </div>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${sidebarProfileOpen ? "rotate-180" : ""
                    }`}
                />

              </div>
            </button>

            {/* SIDEBAR DROPDOWN */}
            {sidebarProfileOpen && (
              <div
                className="
          absolute
          bottom-full
          left-0
          right-0
          mb-2
          rounded-xl
          bg-[#1e293b]
          border
          border-slate-700
          shadow-2xl
          overflow-hidden
          z-50
        "
              >

                <button
                  onClick={() => {
                    setSidebarProfileOpen(false);
                    navigate("/udyamsethu/student/profile");
                  }}
                  className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-sm
            text-slate-200
            hover:bg-white/10
            transition
          "
                >
                  <UserRound size={17} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setSidebarProfileOpen(false);
                    navigate("/udyamsethu/student/settings");
                  }}
                  className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-sm
            text-slate-200
            hover:bg-white/10
            transition
          "
                >
                  <Settings size={17} />
                  Settings
                </button>

                <div className="border-t border-slate-700" />

                <button
                  onClick={handleLogout}
                  className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-sm
            text-red-400
            hover:bg-red-500/10
            transition
          "
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <div className="lg:ml-[260px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className={`
            h-[72px]

            ${darkMode
              ? "bg-[#111827] border-slate-700"
              : "bg-white border-slate-200"
            }

            border-b
            flex
            items-center
            px-4
            lg:px-7
            gap-4
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder={t.searchPlaceholder}
              className={`
                w-full
                h-10
                pl-10
                pr-4
                rounded-lg
                border
                outline-none
                text-sm

                ${darkMode
                  ? "bg-[#172033] border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-slate-50 border-slate-200 text-slate-900"
                }

                focus:border-cyan-400
              `}
            />

          </div>

          {/* =================================================
              LANGUAGE
          ================================================= */}



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
                ? "bg-slate-800 text-yellow-300"
                : "hover:bg-slate-100 text-slate-600"
              }
            `}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
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
                ? "hover:bg-slate-800"
                : "hover:bg-slate-100"
              }
            `}
          >

            <Bell size={19} />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 border-2 border-white" />

          </button>

          {/* PROFILE */}

          {/* TOP RIGHT PROFILE */}
          <div className="relative hidden sm:block">

            <button
              onClick={() => {
                setHeaderProfileOpen(!headerProfileOpen);
                setSidebarProfileOpen(false);
              }}
              className={`
      flex
      items-center
      gap-3
      border-l
      pl-4
      pr-1
      py-1
      transition
      ${darkMode
                  ? "border-slate-700 hover:bg-white/5"
                  : "border-slate-200 hover:bg-slate-50"
                }
    `}
            >

              {/* AVATAR */}
              <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center">
                <span className="text-[#172033] text-xs font-bold">
                  {studentInitials}
                </span>
              </div>

              {/* NAME */}
              <div className="text-left">

                <p className="text-sm font-medium truncate max-w-[120px]">
                  {studentName}
                </p>

                <p className={`text-xs ${textSecondary} truncate max-w-[120px]`}>
                  {studentCourse}
                </p>

              </div>

              <ChevronDown
                size={15}
                className={`
                   text-slate-400
                     transition-transform
                     ${headerProfileOpen ? "rotate-180" : ""}
                  `}
              />

            </button>


            {/* TOP RIGHT DROPDOWN */}

            {headerProfileOpen && (
              <div
                className={`
        absolute
        right-0
        top-14
        z-50
        w-56
        rounded-xl
        border
        shadow-2xl
        overflow-hidden
        ${darkMode
                    ? "bg-[#172033] border-slate-700"
                    : "bg-white border-slate-200"
                  }
      `}
              >

                {/* USER INFO */}

                <div className="px-4 py-4 border-b border-slate-700">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center">
                      <span className="text-[#172033] text-xs font-bold">
                        {studentInitials}
                      </span>
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold truncate">
                        {studentName}
                      </p>

                      <p className="text-xs text-slate-400 truncate">
                        {student?.email || ""}
                      </p>

                    </div>

                  </div>

                </div>


                {/* PROFILE */}

                <button
                  onClick={() => {
                    setHeaderProfileOpen(false);
                    navigate("/udyamsethu/student/profile");
                  }}
                  className={`
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          text-sm
          transition
          ${darkMode
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                    }
        `}
                >
                  <UserRound size={17} />
                  My Profile
                </button>


                {/* SETTINGS */}

                <button
                  onClick={() => {
                    setHeaderProfileOpen(false);
                    navigate("/udyamsethu/student/settings");
                  }}
                  className={`
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          text-sm
          transition
          ${darkMode
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                    }
        `}
                >
                  <Settings size={17} />
                  Settings
                </button>


                {/* LOGOUT */}

                <div className="border-t border-slate-700" />

                <button
                  onClick={handleLogout}
                  className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          text-sm
          text-red-500
          hover:bg-red-500/10
          transition
        "
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>
            )}

          </div>


        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main className="p-4 lg:p-7">

          {/* PAGE HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">

            <div>

              <p className="text-xs font-semibold tracking-wider text-cyan-600 uppercase">
                {t.studentDashboard}
              </p>

              <h2 className="text-2xl lg:text-3xl font-bold mt-1">
                {t.welcome},{studentName}
              </h2>

              <p
                className={`text-sm ${textSecondary} mt-2`}
              >
                {t.dashboardDescription}
              </p>

            </div>

            <button className="px-5 h-11 bg-[#172033] text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#253451] transition">

              <Search size={17} />

              {t.exploreOpportunities}

            </button>

          </div>

          {/* =================================================
              STUDENT SUMMARY CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

            <StudentStatCard
              title={t.currentCGPA}
              value="8.6"
              subtitle={t.outOf10}
              icon={GraduationCap}
              darkMode={darkMode}
              onClick={() =>
                navigate("/udyamsethu/student/academic-performance")
              }
            />

            <StudentStatCard
              title={t.attendance}
              value="91%"
              subtitle={t.overallAttendance}
              icon={CheckCircle2}
              darkMode={darkMode}
              onClick={() =>
                navigate("/udyamsethu/student/attendance")
              }
            />

            <StudentStatCard
              title={t.assessmentsTitle}
              value="18"
              subtitle={t.assessmentsCompleted}
              icon={ClipboardCheck}
              darkMode={darkMode}
              onClick={() => {
                navigate("/udyamsethu/student/assessments")
              }}
            />

            <StudentStatCard
              title={t.applications}
              value="12"
              subtitle={t.activeApplications}
              icon={BriefcaseBusiness}
              darkMode={darkMode}
              onClick={() =>
                navigate("/udyamsethu/student/applications")
              }
            />

          </div>

          {/* =================================================
              PROFILE COMPLETION
          ================================================= */}

          <div
            className={`
              ${card}
              border
              rounded-xl
              p-5
              mb-5
            `}
          >

            <div className="flex flex-col md:flex-row md:items-center gap-5">

              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center">
                <UserRound
                  size={23}
                  className="text-cyan-600"
                />
              </div>

              <div className="flex-1">

                <div className="flex justify-between mb-2">

                  <div>

                    <p className="text-sm font-semibold">
                      {t.completeProfile}
                    </p>

                    <p
                      className={`text-xs ${textSecondary} mt-1`}
                    >
                      {t.profileDescription}
                    </p>

                  </div>

                  <span className="text-sm font-bold text-cyan-600">
                    80%
                  </span>

                </div>

                <div
                  className={`
                    h-2
                    rounded-full
                    ${darkMode
                      ? "bg-slate-700"
                      : "bg-slate-100"
                    }
                  `}
                >
                  <div className="h-full w-[80%] bg-cyan-500 rounded-full" />
                </div>

              </div>

              <button className="text-sm font-semibold text-cyan-600">
                {t.completeProfileButton} →
              </button>

            </div>

          </div>

          {/* =================================================
              ROW 1
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

            {/* PERFORMANCE */}

            <div
              className={`
                ${card}
                xl:col-span-2
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.academicPerformanceTitle}
                subtitle={t.performanceSubtitle}
              />

              <div className="p-5">

                <div className="flex items-end gap-3 mb-4">

                  <p className="text-3xl font-bold">
                    8.6 CGPA
                  </p>

                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mb-1">
                    <TrendingUp size={13} />
                    +12.4%
                  </span>

                </div>

                <div className="h-[270px]">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart data={performanceData}>

                      <defs>

                        <linearGradient
                          id="performanceFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >

                          <stop
                            offset="0%"
                            stopColor="#06b6d4"
                            stopOpacity={0.35}
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
                        stroke={
                          darkMode
                            ? "#334155"
                            : "#e2e8f0"
                        }
                      />

                      <XAxis
                        dataKey="month"
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

                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        fill="url(#performanceFill)"
                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </div>

            </div>

            {/* ATTENDANCE */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.attendanceTitle}
                subtitle={t.attendanceSubtitle}
              />

              <div className="p-5">

                <div className="space-y-5">

                  {attendanceData.map((item) => (
                    <div key={item.subject}>

                      <div className="flex justify-between mb-2">

                        <span className="text-xs font-medium">
                          {item.subject}
                        </span>

                        <span className="text-xs font-semibold text-cyan-600">
                          {item.attendance}%
                        </span>

                      </div>

                      <div
                        className={`
                          h-2
                          rounded-full
                          ${darkMode
                            ? "bg-slate-700"
                            : "bg-slate-100"
                          }
                        `}
                      >

                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{
                            width: `${item.attendance}%`,
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              ROW 2
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

            {/* EVENTS */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.upcomingEvents}
                subtitle={t.upcomingEventsSubtitle}
              />

              <div className="p-5 space-y-4">

                {upcomingEvents.map((event) => (

                  <div
                    key={event.title}
                    className="flex gap-3"
                  >

                    <div className="w-11 h-11 rounded-lg bg-cyan-50 flex flex-col items-center justify-center shrink-0">

                      <CalendarDays
                        size={17}
                        className="text-cyan-600"
                      />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold">
                        {event.title}
                      </p>

                      <p
                        className={`text-xs ${textSecondary} mt-1`}
                      >
                        {event.date} • {event.time}
                      </p>

                      <span className="inline-block mt-2 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px]">
                        {event.type}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* SKILLS */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.skillsProgress}
                subtitle={t.skillsSubtitle}
              />

              <div className="p-5 space-y-5">

                <SkillProgress
                  name="React.js"
                  value={90}
                />

                <SkillProgress
                  name="JavaScript"
                  value={85}
                />

                <SkillProgress
                  name="Java"
                  value={78}
                />

                <SkillProgress
                  name="SQL"
                  value={82}
                />

                <SkillProgress
                  name={
                    language === "English"
                      ? "Communication"
                      : "ಸಂವಹನ"
                  }
                  value={75}
                />

              </div>

            </div>

            {/* CAREER READINESS */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.careerReadiness}
                subtitle={t.careerSubtitle}
              />

              <div className="p-5">

                <div className="flex items-center justify-center">

                  <div className="w-40 h-40 rounded-full border-[14px] border-cyan-500 flex items-center justify-center">

                    <div className="text-center">

                      <p className="text-3xl font-bold">
                        82%
                      </p>

                      <p
                        className={`text-xs ${textSecondary}`}
                      >
                        {t.ready}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  <ReadinessItem
                    title={t.profile}
                    value={t.complete}
                  />

                  <ReadinessItem
                    title={t.resume}
                    value={t.uploaded}
                  />

                  <ReadinessItem
                    title={t.skills}
                    value={t.good}
                  />

                  <ReadinessItem
                    title={t.assessments}
                    value={
                      language === "English"
                        ? "18 Completed"
                        : "18 ಪೂರ್ಣಗೊಂಡಿದೆ"
                    }
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RECOMMENDED OPPORTUNITIES
          ================================================= */}

          <div
            className={`
              ${card}
              border
              rounded-xl
              mb-5
            `}
          >

            <ChartHeader
              title={t.recommendedOpportunities}
              subtitle={t.recommendedSubtitle}
            />

            <div
              className={`
                divide-y
                ${darkMode
                  ? "divide-slate-700"
                  : "divide-slate-100"
                }
              `}
            >

              {recommendedOpportunities.map((item) => (

                <OpportunityCard
                  key={item.title}
                  item={item}
                  darkMode={darkMode}
                  deadlineText={t.deadline}
                />

              ))}

            </div>

            <div
              className={`
                p-5
                border-t
                ${darkMode
                  ? "border-slate-700"
                  : "border-slate-100"
                }
              `}
            >

              <button className="text-sm font-semibold text-cyan-600 flex items-center gap-2">

                {t.viewAllOpportunities}

                <ArrowUpRight size={15} />

              </button>

            </div>

          </div>

          {/* =================================================
              RECENT ACTIVITY
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* APPLICATION STATUS */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.recentApplications}
                subtitle={t.recentApplicationsSubtitle}
              />

              <div className="p-5 space-y-5">

                {applications.map((application) => (

                  <ApplicationItem
                    key={application.title}
                    title={application.title}
                    company={application.company}
                    status={application.status}
                    type={application.type}
                  />

                ))}

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div
              className={`
                ${card}
                border
                rounded-xl
              `}
            >

              <ChartHeader
                title={t.quickActions}
                subtitle={t.quickActionsSubtitle}
              />

              <div className="p-5 grid grid-cols-2 gap-3">

                <QuickAction
                  icon={UserRound}
                  title={t.updateProfile}
                  onClick={() => navigate("/udyamsethu/student/profile")}
                />

                <QuickAction
                  icon={FileText}
                  title={t.uploadResume}
                  onClick={() => navigate("/udyamsethu/student/resume")}
                />

                <QuickAction
                  icon={ClipboardCheck}
                  title={t.takeAssessment}
                  onClick={() => navigate("/udyamsethu/student/assessments")}
                />

                <QuickAction
                  icon={Award}
                  title={t.viewCertificates}
                  onClick={() => navigate("/udyamsethu/student/certificates")}
                />

                <QuickAction
                  icon={BriefcaseBusiness}
                  title={t.findInternship}
                  onClick={() =>
                    navigate("/udyamsethu/student/opportunities")}
                />

                <QuickAction
                  icon={BarChart3}
                  title={t.viewPerformance}
                  onClick={() => navigate("/udyamsethu/student/academic-performance")
                  }
                />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

/* =========================================================
   STUDENT STAT CARD
========================================================= */

const StudentStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  darkMode,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ${darkMode
          ? "bg-[#172033] border-slate-700"
          : "bg-white border-slate-200"
        }

        border
        rounded-xl
        p-5
        hover:shadow-md
        hover:border-cyan-400
        transition
        cursor-pointer
      `}
    >

      <div className="flex items-center justify-between">

        <p
          className={`
            text-xs
            ${darkMode
              ? "text-slate-400"
              : "text-slate-500"
            }
          `}
        >
          {title}
        </p>

        <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">

          <Icon
            size={18}
            className="text-cyan-600"
          />

        </div>

      </div>

      <p className="text-2xl font-bold mt-4">
        {value}
      </p>

      <p className="text-[11px] text-slate-400 mt-1">
        {subtitle}
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
    <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">

      <div>

        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>

      </div>

      <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">

        <ArrowUpRight
          size={17}
          className="text-slate-400"
        />

      </button>

    </div>
  );
};

/* =========================================================
   SKILL PROGRESS
========================================================= */

const SkillProgress = ({
  name,
  value,
}) => {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <span className="text-xs font-medium">
          {name}
        </span>

        <span className="text-xs font-semibold text-cyan-600">
          {value}%
        </span>

      </div>

      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">

        <div
          className="h-full bg-cyan-500 rounded-full"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
};

/* =========================================================
   READINESS ITEM
========================================================= */

const ReadinessItem = ({
  title,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <CheckCircle2
          size={15}
          className="text-emerald-500"
        />

        <span className="text-xs">
          {title}
        </span>

      </div>

      <span className="text-xs text-slate-400">
        {value}
      </span>

    </div>
  );
};

/* =========================================================
   OPPORTUNITY CARD
========================================================= */

const OpportunityCard = ({
  item,
  deadlineText,
}) => {
  return (
    <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">

      <div className="flex gap-4">

        <div className="w-11 h-11 rounded-xl bg-[#172033] flex items-center justify-center shrink-0">

          <Building2
            size={19}
            className="text-cyan-400"
          />

        </div>

        <div className="flex-1">

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

            <div>

              <h4 className="text-sm font-semibold">
                {item.title}
              </h4>

              <p className="text-xs text-slate-400 mt-1">
                {item.company}
              </p>

            </div>

            <span className="w-fit px-2 py-1 rounded-full bg-cyan-50 text-cyan-600 text-[10px] font-semibold">
              {item.type}
            </span>

          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">

            <span className="flex items-center gap-1">

              <MapPin size={13} />

              {item.location}

            </span>

            <span className="flex items-center gap-1">

              <Clock3 size={13} />

              {deadlineText}: {item.deadline}

            </span>

          </div>

          <div className="flex flex-wrap gap-2 mt-3">

            {item.skills.map((skill) => (

              <span
                key={skill}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md text-[10px] text-slate-500 dark:text-slate-300"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

        <button className="hidden sm:flex w-9 h-9 border border-slate-200 dark:border-slate-700 rounded-lg items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700">

          <ExternalLink size={15} />

        </button>

      </div>

    </div>
  );
};

/* =========================================================
   APPLICATION ITEM
========================================================= */

const ApplicationItem = ({
  title,
  company,
  status,
  type,
}) => {

  const styles = {

    success: {
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },

    pending: {
      icon: Clock3,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },

    applied: {
      icon: FileText,
      color: "text-cyan-500",
      bg: "bg-cyan-50",
    },

    rejected: {
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
    },

  };

  const config = styles[type];

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3">

      <div
        className={`
          w-9
          h-9
          rounded-lg
          flex
          items-center
          justify-center
          ${config.bg}
        `}
      >

        <Icon
          size={17}
          className={config.color}
        />

      </div>

      <div className="flex-1 min-w-0">

        <p className="text-xs font-semibold truncate">
          {title}
        </p>

        <p className="text-[11px] text-slate-400 mt-1">
          {company}
        </p>

      </div>

      <span
        className={`
          text-[10px]
          font-semibold
          ${config.color}
        `}
      >
        {status}
      </span>

    </div>
  );
};

/* =========================================================
   QUICK ACTION
========================================================= */

const QuickAction = ({
  icon: Icon,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50 dark:hover:bg-slate-800 transition text-left">

      <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center mb-3">

        <Icon
          size={18}
          className="text-cyan-600"
        />

      </div>

      <p className="text-xs font-semibold">
        {title}
      </p>

    </button>
  );
};

export default StudentDashboard;
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Database,
  Code2,
  FileBarChart,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  CalendarDays,
  RefreshCw,
  Languages,
} from "lucide-react";

import logo from "../assets/logo (1).png";

/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {
  en: {
    workspace: "Workspace",
    overview: "Overview",
    dashboards: "Dashboards",
    charts: "Charts",
    datasets: "Datasets",
    sqlLab: "SQL Lab",
    reports: "Reports",
    administration: "Administration",
    settings: "Settings",

    administrator: "Administrator",
    searchPlaceholder: "Search dashboards, charts, datasets...",

    businessOverview: "Business Overview",
    businessOverviewDescription:
      "Monitor your organization's key business metrics and performance.",

    today: "Today",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
    thisYear: "This year",
    refresh: "Refresh",

    totalRevenue: "Total Revenue",
    activeUsers: "Active Users",
    organizations: "Organizations",
    dataActivity: "Data Activity",

    vsPrevious: "vs previous",
    vsPreviousPeriod: "vs previous period",

    revenuePerformance: "Revenue Performance",
    revenueTrend: "Revenue trend over the selected period",

    userActivity: "User Activity",
    platformEngagement: "Platform engagement",

    active: "Active",
    returningUsers: "Returning Users",
    inactive: "Inactive",

    recentDashboards: "Recent Dashboards",
    recentlyAccessed: "Your recently accessed dashboards",
    viewAll: "View all",

    businessPerformance: "Business Performance",
    financialOverview: "Financial Overview",
    userGrowthAnalytics: "User Growth Analytics",
    regionalPerformance: "Regional Performance",

    udyamAnalytics: "Udyam Sethu Analytics",
    financeTeam: "Finance Team",
    businessIntelligence: "Business Intelligence",
    operations: "Operations",

    updated12Min: "Updated 12 min ago",
    updated1Hour: "Updated 1 hour ago",
    updated3Hours: "Updated 3 hours ago",
    updatedYesterday: "Updated yesterday",

    recentActivity: "Recent Activity",
    latestWorkspaceActivity: "Latest workspace activity",

    dashboardViewed: "Business Performance dashboard viewed",
    datasetRefreshed: "Financial dataset refreshed",
    reportGenerated: "Monthly Revenue report generated",
    newUsersAdded: "New users added",

    sachin: "Sachin",
    analyticsTeam: "Analytics Team",

    tenMinutesAgo: "10 minutes ago",
    fortyTwoMinutesAgo: "42 minutes ago",
    twoHoursAgo: "2 hours ago",
    yesterday: "Yesterday",

    revenueChange: "+12.8%",
    usersChange: "+8.4%",
    organizationsChange: "+5.2%",
    activityChange: "-2.1%",
  },

  kn: {
    workspace: "ಕಾರ್ಯಸ್ಥಳ",
    overview: "ಅವಲೋಕನ",
    dashboards: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು",
    charts: "ಚಾರ್ಟ್‌ಗಳು",
    datasets: "ಡೇಟಾಸೆಟ್‌ಗಳು",
    sqlLab: "SQL ಲ್ಯಾಬ್",
    reports: "ವರದಿಗಳು",
    administration: "ಆಡಳಿತ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",

    administrator: "ನಿರ್ವಾಹಕರು",
    searchPlaceholder:
      "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು, ಚಾರ್ಟ್‌ಗಳು, ಡೇಟಾಸೆಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...",

    businessOverview: "ವ್ಯವಹಾರ ಅವಲೋಕನ",
    businessOverviewDescription:
      "ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ಪ್ರಮುಖ ವ್ಯವಹಾರ ಮಾನದಂಡಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.",

    today: "ಇಂದು",
    last7Days: "ಕಳೆದ 7 ದಿನಗಳು",
    last30Days: "ಕಳೆದ 30 ದಿನಗಳು",
    last90Days: "ಕಳೆದ 90 ದಿನಗಳು",
    thisYear: "ಈ ವರ್ಷ",
    refresh: "ರಿಫ್ರೆಶ್",

    totalRevenue: "ಒಟ್ಟು ಆದಾಯ",
    activeUsers: "ಸಕ್ರಿಯ ಬಳಕೆದಾರರು",
    organizations: "ಸಂಸ್ಥೆಗಳು",
    dataActivity: "ಡೇಟಾ ಚಟುವಟಿಕೆ",

    vsPrevious: "ಹಿಂದಿನ ಅವಧಿಗೆ ಹೋಲಿಸಿದರೆ",
    vsPreviousPeriod: "ಹಿಂದಿನ ಅವಧಿಗೆ ಹೋಲಿಸಿದರೆ",

    revenuePerformance: "ಆದಾಯ ಕಾರ್ಯಕ್ಷಮತೆ",
    revenueTrend: "ಆಯ್ಕೆ ಮಾಡಿದ ಅವಧಿಯ ಆದಾಯದ ಪ್ರವೃತ್ತಿ",

    userActivity: "ಬಳಕೆದಾರರ ಚಟುವಟಿಕೆ",
    platformEngagement: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಬಳಕೆ",

    active: "ಸಕ್ರಿಯ",
    returningUsers: "ಮತ್ತೆ ಬಂದ ಬಳಕೆದಾರರು",
    inactive: "ನಿಷ್ಕ್ರಿಯ",

    recentDashboards: "ಇತ್ತೀಚಿನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು",
    recentlyAccessed:
      "ನೀವು ಇತ್ತೀಚೆಗೆ ಪ್ರವೇಶಿಸಿದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು",
    viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",

    businessPerformance: "ವ್ಯವಹಾರ ಕಾರ್ಯಕ್ಷಮತೆ",
    financialOverview: "ಹಣಕಾಸಿನ ಅವಲೋಕನ",
    userGrowthAnalytics: "ಬಳಕೆದಾರರ ಬೆಳವಣಿಗೆ ವಿಶ್ಲೇಷಣೆ",
    regionalPerformance: "ಪ್ರಾದೇಶಿಕ ಕಾರ್ಯಕ್ಷಮತೆ",

    udyamAnalytics: "ಉದ್ಯಮ ಸೇತು ವಿಶ್ಲೇಷಣೆ",
    financeTeam: "ಹಣಕಾಸು ತಂಡ",
    businessIntelligence: "ವ್ಯವಹಾರ ಬುದ್ಧಿಮತ್ತೆ",
    operations: "ಕಾರ್ಯಾಚರಣೆಗಳು",

    updated12Min: "12 ನಿಮಿಷಗಳ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ",
    updated1Hour: "1 ಗಂಟೆಯ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ",
    updated3Hours: "3 ಗಂಟೆಗಳ ಹಿಂದೆ ನವೀಕರಿಸಲಾಗಿದೆ",
    updatedYesterday: "ನಿನ್ನೆ ನವೀಕರಿಸಲಾಗಿದೆ",

    recentActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
    latestWorkspaceActivity:
      "ಇತ್ತೀಚಿನ ಕಾರ್ಯಸ್ಥಳ ಚಟುವಟಿಕೆ",

    dashboardViewed:
      "ವ್ಯವಹಾರ ಕಾರ್ಯಕ್ಷಮತೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಲಾಗಿದೆ",
    datasetRefreshed:
      "ಹಣಕಾಸು ಡೇಟಾಸೆಟ್ ರಿಫ್ರೆಶ್ ಮಾಡಲಾಗಿದೆ",
    reportGenerated:
      "ಮಾಸಿಕ ಆದಾಯ ವರದಿ ರಚಿಸಲಾಗಿದೆ",
    newUsersAdded:
      "ಹೊಸ ಬಳಕೆದಾರರನ್ನು ಸೇರಿಸಲಾಗಿದೆ",

    sachin: "ಸಚಿನ್",
    analyticsTeam: "ವಿಶ್ಲೇಷಣೆ ತಂಡ",

    tenMinutesAgo: "10 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    fortyTwoMinutesAgo: "42 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    twoHoursAgo: "2 ಗಂಟೆಗಳ ಹಿಂದೆ",
    yesterday: "ನಿನ್ನೆ",

    revenueChange: "+12.8%",
    usersChange: "+8.4%",
    organizationsChange: "+5.2%",
    activityChange: "-2.1%",
  },
};

/* =========================================================
   DASHBOARD
========================================================= */

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("dashboardLanguage") || "en";
  });

  const [selectedPeriod, setSelectedPeriod] =
    useState("last30Days");

  const t = translations[language];

  /* Save language */
  useEffect(() => {
    localStorage.setItem("dashboardLanguage", language);
  }, [language]);

  /* =========================================================
     MENU ITEMS
  ========================================================= */

  const menuItems = [
    {
      title: t.overview,
      icon: LayoutDashboard,
      active: true,
    },
    {
      title: t.dashboards,
      icon: BarChart3,
    },
    {
      title: t.charts,
      icon: FileBarChart,
    },
    {
      title: t.datasets,
      icon: Database,
    },
    {
      title: t.sqlLab,
      icon: Code2,
    },
    {
      title: t.reports,
      icon: Activity,
    },
  ];

  /* =========================================================
     PERIOD OPTIONS
  ========================================================= */

  const periodOptions = [
    {
      value: "today",
      label: t.today,
    },
    {
      value: "last7Days",
      label: t.last7Days,
    },
    {
      value: "last30Days",
      label: t.last30Days,
    },
    {
      value: "last90Days",
      label: t.last90Days,
    },
    {
      value: "thisYear",
      label: t.thisYear,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">

      {/* =====================================================
          MOBILE SIDEBAR OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
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
          h-screen
          w-[250px]
          bg-[#172033]
          text-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* LOGO */}

        {/* LOGO HEADER */}
<div className="h-[72px] px-5 flex items-center justify-between border-b border-white/10 bg-[#0B1B33]">

  <div className="flex items-center gap-3">

    <a
      href="/udyamsethu/company"
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
    className="lg:hidden text-white"
  >
    <X size={20} />
  </button>

</div>

        {/* NAVIGATION */}

        <div className="px-3 py-6">

          <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {t.workspace}
          </p>

          <nav className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.title}
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

                  {item.title}

                </button>
              );
            })}

          </nav>

          <p className="px-3 mt-8 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {t.administration}
          </p>

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-lg
              text-sm
              text-slate-300
              hover:bg-white/5
              hover:text-white
              transition
            "
          >

            <Settings size={18} />

            {t.settings}

          </button>

        </div>

        {/* SIDEBAR USER */}

        <div className="absolute bottom-0 left-0 right-0 p-4">

          <div className="rounded-xl bg-white/5 border border-white/10 p-4">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-cyan-400 flex items-center justify-center">

                <span className="text-[#172033] font-semibold">
                  SP
                </span>

              </div>

              <div className="flex-1 min-w-0">

                <p className="text-sm font-medium truncate">
                  {t.sachin}
                </p>

                <p className="text-xs text-slate-400 truncate">
                  {t.administrator}
                </p>

              </div>

              <ChevronDown
                size={16}
                className="text-slate-400"
              />

            </div>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="lg:ml-[250px]">

        {/* ===================================================
            TOP NAVIGATION
        =================================================== */}

        <header className="h-[72px] bg-white border-b border-slate-200 flex items-center px-4 lg:px-7 gap-4">

          {/* MOBILE MENU */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-600"
          >
            <Menu size={23} />
          </button>

          {/* SEARCH */}

          <div className="relative flex-1 max-w-xl">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className="
                w-full
                h-10
                pl-10
                pr-4
                bg-slate-50
                border
                border-slate-200
                rounded-lg
                text-sm
                outline-none
                focus:bg-white
                focus:border-cyan-400
                transition
              "
            />

          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-2">

            {/* LANGUAGE */}

            <div className="relative">

              <Languages
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="
                  h-10
                  pl-9
                  pr-8
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  cursor-pointer
                  hover:bg-slate-50
                  focus:border-cyan-400
                  appearance-none
                "
              >

                <option value="en">
                  English
                </option>

                <option value="kn">
                  ಕನ್ನಡ
                </option>

              </select>

              <ChevronDown
                size={14}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

            </div>

            {/* NOTIFICATION */}

            <button className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center relative">

              <Bell
                size={19}
                className="text-slate-600"
              />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 border-2 border-white" />

            </button>

            {/* USER */}

            <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-slate-200">

              <div className="w-9 h-9 rounded-full bg-[#172033] flex items-center justify-center">

                <span className="text-white text-xs font-semibold">
                  SP
                </span>

              </div>

              <div className="hidden md:block">

                <p className="text-sm font-medium">
                  {t.sachin}
                </p>

                <p className="text-[11px] text-slate-400">
                  {t.administrator}
                </p>

              </div>

              <ChevronDown
                size={15}
                className="text-slate-400"
              />

            </div>

          </div>

        </header>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <main className="p-4 lg:p-7">

          {/* PAGE HEADER */}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7">

            <div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">

                <span>
                  {t.workspace}
                </span>

                <span>
                  /
                </span>

                <span className="text-slate-600">
                  {t.overview}
                </span>

              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
                {t.businessOverview}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {t.businessOverviewDescription}
              </p>

            </div>

            <div className="flex items-center gap-2">

              {/* PERIOD */}

              <div className="relative">

                <select
                  value={selectedPeriod}
                  onChange={(e) =>
                    setSelectedPeriod(e.target.value)
                  }
                  className="
                    h-10
                    pl-9
                    pr-8
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-sm
                    font-medium
                    outline-none
                  "
                >

                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}

                </select>

                <CalendarDays
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

              </div>

              <button className="h-10 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium">

                <RefreshCw size={16} />

                <span className="hidden sm:block">
                  {t.refresh}
                </span>

              </button>

            </div>

          </div>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

            <MetricCard
              title={t.totalRevenue}
              value="₹24.8 Cr"
              change={t.revenueChange}
              positive
              icon={TrendingUp}
              vsPrevious={t.vsPrevious}
            />

            <MetricCard
              title={t.activeUsers}
              value="18,642"
              change={t.usersChange}
              positive
              icon={Users}
              vsPrevious={t.vsPrevious}
            />

            <MetricCard
              title={t.organizations}
              value="1,284"
              change={t.organizationsChange}
              positive
              icon={Building2}
              vsPrevious={t.vsPrevious}
            />

            <MetricCard
              title={t.dataActivity}
              value="92.6%"
              change={t.activityChange}
              icon={Activity}
              vsPrevious={t.vsPrevious}
            />

          </div>

          {/* =================================================
              MAIN CHART AREA
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

            {/* REVENUE */}

            <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">

              <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {t.revenuePerformance}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {t.revenueTrend}
                  </p>

                </div>

                <button className="p-2 hover:bg-slate-100 rounded-lg">
                  <MoreHorizontal size={19} />
                </button>

              </div>

              <div className="p-5">

                <div className="flex items-end gap-3 mb-5">

                  <span className="text-2xl font-bold">
                    ₹24.8 Cr
                  </span>

                  <span className="text-xs text-emerald-600 font-medium mb-1">
                    +12.8% {t.vsPreviousPeriod}
                  </span>

                </div>

                {/* CHART */}

                <div className="h-[260px] relative">

                  <div className="absolute inset-0 flex flex-col justify-between">

                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className="border-t border-dashed border-slate-200"
                      />
                    ))}

                  </div>

                  <svg
                    viewBox="0 0 800 260"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                  >

                    <defs>

                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity="0.25"
                        />

                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                          stopOpacity="0"
                        />

                      </linearGradient>

                    </defs>

                    <path
                      d="
                        M0 210
                        C50 190, 80 200, 120 175
                        S190 140, 240 155
                        S300 120, 350 135
                        S420 90, 470 110
                        S530 80, 580 95
                        S640 55, 690 75
                        S750 45, 800 35
                        L800 260
                        L0 260
                        Z
                      "
                      fill="url(#revenueGradient)"
                    />

                    <path
                      d="
                        M0 210
                        C50 190, 80 200, 120 175
                        S190 140, 240 155
                        S300 120, 350 135
                        S420 90, 470 110
                        S530 80, 580 95
                        S640 55, 690 75
                        S750 45, 800 35
                      "
                      fill="none"
                      stroke="#0891b2"
                      strokeWidth="3"
                    />

                  </svg>

                </div>

                <div className="flex justify-between text-[11px] text-slate-400 mt-2">

                  <span>01 Aug</span>
                  <span>07 Aug</span>
                  <span>14 Aug</span>
                  <span>19 Aug</span>

                </div>

              </div>

            </div>

            {/* USER ACTIVITY */}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

              <div className="p-5 border-b border-slate-100 flex justify-between">

                <div>

                  <h3 className="font-semibold">
                    {t.userActivity}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {t.platformEngagement}
                  </p>

                </div>

                <MoreHorizontal
                  size={19}
                  className="text-slate-400"
                />

              </div>

              <div className="p-5">

                <div className="flex items-center justify-center h-[180px]">

                  <div className="relative w-40 h-40">

                    <div className="absolute inset-0 rounded-full border-[22px] border-cyan-500" />

                    <div className="absolute inset-[22px] rounded-full border-[18px] border-slate-100" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">

                      <span className="text-3xl font-bold">
                        78%
                      </span>

                      <span className="text-xs text-slate-400">
                        {t.active}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="space-y-3">

                  <ActivityRow
                    label={t.activeUsers}
                    value="14,560"
                    percentage="78%"
                  />

                  <ActivityRow
                    label={t.returningUsers}
                    value="3,284"
                    percentage="17%"
                  />

                  <ActivityRow
                    label={t.inactive}
                    value="798"
                    percentage="5%"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              LOWER SECTION
          ================================================= */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* RECENT DASHBOARDS */}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

              <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {t.recentDashboards}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {t.recentlyAccessed}
                  </p>

                </div>

                <button className="text-xs font-medium text-cyan-600 hover:text-cyan-700">
                  {t.viewAll}
                </button>

              </div>

              <div className="divide-y divide-slate-100">

                <DashboardRow
                  name={t.businessPerformance}
                  owner={t.udyamAnalytics}
                  updated={t.updated12Min}
                />

                <DashboardRow
                  name={t.financialOverview}
                  owner={t.financeTeam}
                  updated={t.updated1Hour}
                />

                <DashboardRow
                  name={t.userGrowthAnalytics}
                  owner={t.businessIntelligence}
                  updated={t.updated3Hours}
                />

                <DashboardRow
                  name={t.regionalPerformance}
                  owner={t.operations}
                  updated={t.updatedYesterday}
                />

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">

              <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    {t.recentActivity}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {t.latestWorkspaceActivity}
                  </p>

                </div>

                <button className="text-xs font-medium text-cyan-600">
                  {t.viewAll}
                </button>

              </div>

              <div className="p-5 space-y-5">

                <ActivityItem
                  icon={BarChart3}
                  title={t.dashboardViewed}
                  user={t.sachin}
                  time={t.tenMinutesAgo}
                />

                <ActivityItem
                  icon={Database}
                  title={t.datasetRefreshed}
                  user={t.analyticsTeam}
                  time={t.fortyTwoMinutesAgo}
                />

                <ActivityItem
                  icon={FileBarChart}
                  title={t.reportGenerated}
                  user={t.financeTeam}
                  time={t.twoHoursAgo}
                />

                <ActivityItem
                  icon={Users}
                  title={t.newUsersAdded}
                  user={t.administrator}
                  time={t.yesterday}
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
   METRIC CARD
========================================================= */

const MetricCard = ({
  title,
  value,
  change,
  positive,
  icon: Icon,
  vsPrevious,
}) => {

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between mb-4">

        <span className="text-sm text-slate-500">
          {title}
        </span>

        <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">

          <Icon
            size={18}
            className="text-cyan-600"
          />

        </div>

      </div>

      <div className="flex items-end justify-between">

        <div>

          <p className="text-2xl font-bold text-slate-900">
            {value}
          </p>

          <div
            className={`
              flex
              items-center
              gap-1
              text-xs
              mt-2
              ${positive
                ? "text-emerald-600"
                : "text-red-500"
              }
            `}
          >

            {positive ? (
              <TrendingUp size={13} />
            ) : (
              <TrendingDown size={13} />
            )}

            {change}

            <span className="text-slate-400 ml-1">
              {vsPrevious}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   ACTIVITY ROW
========================================================= */

const ActivityRow = ({
  label,
  value,
  percentage,
}) => {

  return (
    <div>

      <div className="flex justify-between text-xs mb-1">

        <span className="text-slate-500">
          {label}
        </span>

        <span className="font-medium">
          {value}
        </span>

      </div>

      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-cyan-500 rounded-full"
          style={{
            width: percentage,
          }}
        />

      </div>

    </div>
  );
};

/* =========================================================
   DASHBOARD ROW
========================================================= */

const DashboardRow = ({
  name,
  owner,
  updated,
}) => {

  return (
    <div className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition">

      <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">

        <BarChart3
          size={18}
          className="text-cyan-600"
        />

      </div>

      <div className="flex-1 min-w-0">

        <p className="text-sm font-medium text-slate-800 truncate">
          {name}
        </p>

        <p className="text-xs text-slate-400 mt-1">
          {owner} · {updated}
        </p>

      </div>

      <ArrowUpRight
        size={17}
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

      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">

        <Icon
          size={17}
          className="text-slate-600"
        />

      </div>

      <div className="flex-1">

        <p className="text-sm text-slate-700">
          {title}
        </p>

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
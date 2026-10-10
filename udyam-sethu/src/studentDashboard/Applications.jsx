import React, { useState } from "react";
import {
  Search,
  Filter,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronDown,
  SlidersHorizontal,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";

export default function Applications() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const applications = [
    {
      id: 1,
      company: "Infosys",
      role: "Graduate Engineer Trainee",
      location: "Bengaluru, Karnataka",
      appliedDate: "28 Sep 2026",
      deadline: "10 Oct 2026",
      status: "Under Review",
      type: "Full Time",
      logo: "I",
    },
    {
      id: 2,
      company: "TCS",
      role: "Software Developer",
      location: "Pune, Maharashtra",
      appliedDate: "25 Sep 2026",
      deadline: "05 Oct 2026",
      status: "Shortlisted",
      type: "Full Time",
      logo: "T",
    },
    {
      id: 3,
      company: "Wipro",
      role: "React.js Developer",
      location: "Hyderabad, Telangana",
      appliedDate: "20 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Interview Scheduled",
      type: "Full Time",
      logo: "W",
    },
    {
      id: 4,
      company: "Accenture",
      role: "Frontend Developer Intern",
      location: "Bengaluru, Karnataka",
      appliedDate: "16 Sep 2026",
      deadline: "28 Sep 2026",
      status: "Rejected",
      type: "Internship",
      logo: "A",
    },
    {
      id: 5,
      company: "Tech Mahindra",
      role: "Junior Software Engineer",
      location: "Hyderabad, Telangana",
      appliedDate: "12 Sep 2026",
      deadline: "25 Sep 2026",
      status: "Applied",
      type: "Full Time",
      logo: "T",
    },
  ];

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.company.toLowerCase().includes(search.toLowerCase()) ||
      application.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return darkMode
          ? "bg-emerald-900/40 text-emerald-300 border-emerald-800"
          : "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Interview Scheduled":
        return darkMode
          ? "bg-purple-900/40 text-purple-300 border-purple-800"
          : "bg-purple-50 text-purple-700 border-purple-200";

      case "Under Review":
        return darkMode
          ? "bg-blue-900/40 text-blue-300 border-blue-800"
          : "bg-blue-50 text-blue-700 border-blue-200";

      case "Rejected":
        return darkMode
          ? "bg-red-900/40 text-red-300 border-red-800"
          : "bg-red-50 text-red-700 border-red-200";

      default:
        return darkMode
          ? "bg-orange-900/40 text-orange-300 border-orange-800"
          : "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Shortlisted":
        return <CheckCircle2 size={15} />;

      case "Interview Scheduled":
        return <CalendarDays size={15} />;

      case "Rejected":
        return <XCircle size={15} />;

      default:
        return <Clock3 size={15} />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#f7f9fc] text-slate-800"
      }`}
    >
      {/* Top Header */}
      <div
        className={`border-b ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <BriefcaseBusiness size={21} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  My Applications
                </h1>
              </div>

              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Track and manage all your job applications in one place.
              </p>
            </div>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-sm font-medium transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Total Applications
                </p>

                <h2 className="text-2xl font-bold mt-1">24</h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <FileText size={21} />
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Under Review
                </p>

                <h2 className="text-2xl font-bold mt-1">08</h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Shortlisted
                </p>

                <h2 className="text-2xl font-bold mt-1">05</h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={21} />
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Interviews
                </p>

                <h2 className="text-2xl font-bold mt-1">03</h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <CalendarDays size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Smart Tip */}
        <div
          className={`rounded-2xl p-5 mb-7 border ${
            darkMode
              ? "bg-indigo-950/30 border-indigo-900"
              : "bg-indigo-50 border-indigo-100"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles size={19} />
            </div>

            <div>
              <h3 className="font-semibold">Application Tip</h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-indigo-200" : "text-indigo-700"
                }`}
              >
                You have 3 interviews scheduled. Keep your resume and
                assessment results ready before the interview date.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search
              size={19}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            />

            <input
              type="text"
              placeholder="Search company or job role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition ${
                darkMode
                  ? "bg-[#111827] border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500"
              }`}
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`appearance-none pl-11 pr-10 py-3 rounded-xl border outline-none w-full lg:w-52 ${
                darkMode
                  ? "bg-[#111827] border-slate-700 text-white"
                  : "bg-white border-slate-200 text-slate-700"
              }`}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">
                Interview Scheduled
              </option>
              <option value="Rejected">Rejected</option>
            </select>

            <ChevronDown
              size={17}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className={`rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  darkMode
                    ? "bg-[#111827] border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                  {/* Company Logo */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${
                      darkMode
                        ? "bg-indigo-500/10 text-indigo-400"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    {application.logo}
                  </div>

                  {/* Main Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-bold text-lg">
                        {application.role}
                      </h3>

                      <span
                        className={`w-fit px-2.5 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </div>

                    <div
                      className={`flex flex-wrap gap-x-5 gap-y-2 mt-2 text-sm ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Building2 size={15} />
                        {application.company}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <BriefcaseBusiness size={15} />
                        {application.type}
                      </span>

                      <span className="flex items-center gap-1.5">
                        📍 {application.location}
                      </span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div
                    className={`grid grid-cols-2 lg:block lg:w-44 text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    <div className="mb-0 lg:mb-3">
                      <p className="text-xs mb-1">Applied On</p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {application.appliedDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs mb-1">Deadline</p>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        {application.deadline}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium text-sm transition ${
                      darkMode
                        ? "border-slate-700 hover:bg-slate-800 text-slate-200"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    View Details
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`rounded-2xl border p-12 text-center ${
                darkMode
                  ? "bg-[#111827] border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                <Search size={24} />
              </div>

              <h3 className="font-semibold mt-4">No applications found</h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div
          className={`mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}
        >
          <span>
            Showing {filteredApplications.length} of {applications.length} recent
            applications
          </span>

          <button
            className={`flex items-center gap-2 font-medium ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            <Send size={15} />
            Explore More Opportunities
            <ArrowUpRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}

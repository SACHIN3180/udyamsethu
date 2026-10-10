import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  BriefcaseBusiness,
  Clock3,
  CalendarDays,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  ChevronDown,
  GraduationCap,
  Building2,
  Sparkles,
  X,
} from "lucide-react";

export default function Opportunities() {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  const opportunities = [
    {
      id: 1,
      company: "Infosys",
      role: "Graduate Engineer Trainee",
      type: "Full Time",
      location: "Bengaluru, Karnataka",
      experience: "Fresher",
      salary: "₹4.5 - 6 LPA",
      deadline: "12 Oct 2026",
      posted: "2 days ago",
      logo: "I",
      skills: ["Java", "React", "SQL"],
      featured: true,
    },
    {
      id: 2,
      company: "TCS",
      role: "Frontend Developer",
      type: "Full Time",
      location: "Pune, Maharashtra",
      experience: "0 - 2 Years",
      salary: "₹5 - 7 LPA",
      deadline: "15 Oct 2026",
      posted: "3 days ago",
      logo: "T",
      skills: ["React", "JavaScript", "CSS"],
      featured: false,
    },
    {
      id: 3,
      company: "Wipro",
      role: "React.js Developer Intern",
      type: "Internship",
      location: "Hyderabad, Telangana",
      experience: "Fresher",
      salary: "₹20K - 30K / Month",
      deadline: "08 Oct 2026",
      posted: "1 day ago",
      logo: "W",
      skills: ["React", "HTML", "Tailwind"],
      featured: true,
    },
    {
      id: 4,
      company: "Accenture",
      role: "Software Engineering Associate",
      type: "Full Time",
      location: "Bengaluru, Karnataka",
      experience: "Fresher",
      salary: "₹4 - 6.5 LPA",
      deadline: "20 Oct 2026",
      posted: "5 days ago",
      logo: "A",
      skills: ["Java", "Spring Boot", "SQL"],
      featured: false,
    },
    {
      id: 5,
      company: "Tech Mahindra",
      role: "Junior Software Developer",
      type: "Full Time",
      location: "Hyderabad, Telangana",
      experience: "0 - 1 Year",
      salary: "₹3.5 - 5 LPA",
      deadline: "18 Oct 2026",
      posted: "4 days ago",
      logo: "T",
      skills: ["Node.js", "Express", "PostgreSQL"],
      featured: false,
    },
    {
      id: 6,
      company: "Deloitte",
      role: "Technology Analyst",
      type: "Full Time",
      location: "Bengaluru, Karnataka",
      experience: "Fresher",
      salary: "₹5 - 8 LPA",
      deadline: "25 Oct 2026",
      posted: "1 week ago",
      logo: "D",
      skills: ["Python", "SQL", "Cloud"],
      featured: false,
    },
  ];

  const toggleBookmark = (id) => {
    setBookmarked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch =
      item.role.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesType =
      typeFilter === "All" || item.type === typeFilter;

    const matchesLocation =
      locationFilter === "All" || item.location.includes(locationFilter);

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#f7f9fc] text-slate-800"
      }`}
    >
      {/* HEADER */}
      <header
        className={`border-b ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <BriefcaseBusiness size={21} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Opportunities
                </h1>
              </div>

              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Discover jobs, internships and career opportunities matched
                with your skills.
              </p>
            </div>

            {/* DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HERO SECTION */}
        <section
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-7 ${
            darkMode
              ? "bg-gradient-to-br from-indigo-950 via-[#172554] to-[#111827]"
              : "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white"
          }`}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} />

              <span className="text-sm font-medium opacity-90">
                Career Opportunities
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Find your next opportunity.
            </h2>

            <p className="mt-3 text-sm sm:text-base opacity-85 max-w-xl">
              Explore opportunities from leading companies and find roles
              that match your education, skills and career goals.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-sm">
                <strong>500+</strong> Employers
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-sm">
                <strong>2,000+</strong> Opportunities
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-sm">
                <strong>100+</strong> New This Week
              </div>
            </div>
          </div>

          <div className="absolute -right-16 -bottom-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute right-20 top-10 w-20 h-20 rounded-full bg-purple-400/10 blur-xl" />
        </section>

        {/* SEARCH */}
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
              placeholder="Search jobs, companies or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none transition ${
                darkMode
                  ? "bg-[#111827] border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-200 placeholder:text-slate-400 focus:border-indigo-500"
              }`}
            />
          </div>

          {/* DESKTOP FILTERS */}
          <div className="hidden lg:flex gap-3">
            <div className="relative">
              <BriefcaseBusiness
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
              />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`appearance-none pl-10 pr-10 py-3.5 rounded-xl border outline-none w-48 ${
                  darkMode
                    ? "bg-[#111827] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>

            <div className="relative">
              <MapPin
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2"
              />

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={`appearance-none pl-10 pr-10 py-3.5 rounded-xl border outline-none w-48 ${
                  darkMode
                    ? "bg-[#111827] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                <option value="All">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>

              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden px-4 py-3 rounded-xl border flex items-center justify-center gap-2 font-medium ${
              darkMode
                ? "bg-[#111827] border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* MOBILE FILTER PANEL */}
        {showFilters && (
          <div
            className={`lg:hidden rounded-2xl border p-4 mb-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filter Opportunities</h3>

              <button onClick={() => setShowFilters(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                <option value="All">All Types</option>
                <option value="Full Time">Full Time</option>
                <option value="Internship">Internship</option>
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                <option value="All">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>
        )}

        {/* RESULT HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold">Recommended Opportunities</h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              {filteredOpportunities.length} opportunities found
            </p>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("All");
              setLocationFilter("All");
            }}
            className={`text-sm font-medium ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            Clear Filters
          </button>
        </div>

        {/* OPPORTUNITY GRID */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredOpportunities.map((item) => (
              <div
                key={item.id}
                className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  darkMode
                    ? "bg-[#111827] border-slate-800 hover:border-indigo-800"
                    : "bg-white border-slate-200 hover:border-indigo-200"
                }`}
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        darkMode
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {item.logo}
                    </div>

                    <div>
                      <h3 className="font-bold">{item.company}</h3>

                      <p
                        className={`text-xs mt-0.5 ${
                          darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Verified Employer
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition ${
                      bookmarked.includes(item.id)
                        ? "bg-indigo-100 text-indigo-600"
                        : darkMode
                        ? "bg-slate-800 text-slate-400 hover:text-white"
                        : "bg-slate-50 text-slate-400 hover:text-indigo-600"
                    }`}
                  >
                    {bookmarked.includes(item.id) ? (
                      <BookmarkCheck size={18} />
                    ) : (
                      <Bookmark size={18} />
                    )}
                  </button>
                </div>

                {/* FEATURED */}
                {item.featured && (
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                      <Sparkles size={13} />
                      Featured
                    </span>
                  </div>
                )}

                {/* ROLE */}
                <h2 className="text-lg font-bold mt-4 leading-snug">
                  {item.role}
                </h2>

                {/* DETAILS */}
                <div
                  className={`space-y-2.5 mt-4 text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {item.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    {item.experience}
                  </div>

                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    {item.type}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Apply before {item.deadline}
                  </div>
                </div>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                        darkMode
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* FOOTER */}
                <div
                  className={`border-t mt-5 pt-4 ${
                    darkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        Salary
                      </p>

                      <p className="font-semibold text-sm mt-0.5">
                        {item.salary}
                      </p>
                    </div>

                    <div
                      className={`text-xs flex items-center gap-1 ${
                        darkMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      <Clock3 size={13} />
                      {item.posted}
                    </div>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition">
                    View Opportunity
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            className={`rounded-2xl border p-12 text-center ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <Search size={27} />
            </div>

            <h3 className="font-bold text-lg mt-4">
              No opportunities found
            </h3>

            <p
              className={`text-sm mt-2 ${
                darkMode ? "text-slate-500" : "text-slate-500"
              }`}
            >
              Try searching for another role, company or skill.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("All");
                setLocationFilter("All");
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* BOTTOM INFO */}
        <div
          className={`mt-8 rounded-2xl border p-5 ${
            darkMode
              ? "bg-[#111827] border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Building2 size={20} />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">
                Complete your profile to get better matches
              </h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-500" : "text-slate-500"
                }`}
              >
                Add your skills, education and preferences so employers can
                find opportunities that match your profile.
              </p>
            </div>

            <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-indigo-600 text-sm font-medium whitespace-nowrap">
              Complete Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

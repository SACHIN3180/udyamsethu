
import React, { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Clock3,
  Search,
  SlidersHorizontal,
  MapPin,
  Building2,
  BriefcaseBusiness,
  ChevronRight,
  ExternalLink,
  Trash2,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";

const initialOpportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    type: "Internship",
    location: "Bengaluru",
    mode: "Hybrid",
    category: "Technology",
    deadline: "Oct 18, 2026",
    daysLeft: 10,
    saved: true,
    status: "Open",
    description:
      "Work with React, JavaScript and modern frontend technologies while building real-world applications.",
    skills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 2,
    title: "Junior React Developer",
    company: "CodeCraft Technologies",
    type: "Full Time",
    location: "Hyderabad",
    mode: "On-site",
    category: "Technology",
    deadline: "Oct 22, 2026",
    daysLeft: 14,
    saved: true,
    status: "Open",
    description:
      "Join a growing engineering team and contribute to scalable React-based web applications.",
    skills: ["React", "JavaScript", "Git", "REST API"],
  },
  {
    id: 3,
    title: "Software Engineer Trainee",
    company: "Infosphere Labs",
    type: "Trainee",
    location: "Pune",
    mode: "Hybrid",
    category: "Software",
    deadline: "Oct 15, 2026",
    daysLeft: 7,
    saved: true,
    status: "Closing Soon",
    description:
      "Start your software engineering journey by working on backend and frontend development projects.",
    skills: ["Node.js", "Express", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Web Development Internship",
    company: "BrightByte Technologies",
    type: "Internship",
    location: "Remote",
    mode: "Remote",
    category: "Web Development",
    deadline: "Nov 02, 2026",
    daysLeft: 25,
    saved: true,
    status: "Open",
    description:
      "Gain practical experience in web development and work alongside experienced developers.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
];

function SavedOpportunities() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const removeSaved = (id) => {
    setOpportunities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const filteredOpportunities = useMemo(() => {
    let result = opportunities.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.company.toLowerCase().includes(searchText) ||
        item.skills.some((skill) =>
          skill.toLowerCase().includes(searchText)
        );

      const matchesFilter =
        filter === "All" ||
        item.type === filter ||
        item.category === filter;

      return matchesSearch && matchesFilter && item.saved;
    });

    if (sortBy === "deadline") {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    }

    if (sortBy === "company") {
      result.sort((a, b) => a.company.localeCompare(b.company));
    }

    return result;
  }, [opportunities, search, filter, sortBy]);

  const savedCount = opportunities.filter((item) => item.saved).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 text-slate-800 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">

      {/* Header */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                <BookmarkCheck size={20} />
              </div>

              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                My Opportunities
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Saved Opportunities
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              Keep track of opportunities you are interested in and apply
              before their deadlines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs text-slate-500">Saved</p>
              <p className="text-lg font-bold">{savedCount}</p>
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                Closing Soon
              </p>
              <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                {
                  opportunities.filter(
                    (item) => item.saved && item.daysLeft <= 7
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Bookmark size={18} />
            </div>
            <p className="text-xs text-slate-500">Total Saved</p>
            <h3 className="mt-1 text-xl font-bold">{savedCount}</h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <p className="text-xs text-slate-500">Open</p>
            <h3 className="mt-1 text-xl font-bold">
              {
                opportunities.filter(
                  (item) => item.saved && item.status === "Open"
                ).length
              }
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <Clock3 size={18} />
            </div>
            <p className="text-xs text-slate-500">Closing Soon</p>
            <h3 className="mt-1 text-xl font-bold">
              {
                opportunities.filter(
                  (item) => item.saved && item.daysLeft <= 7
                ).length
              }
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <Sparkles size={18} />
            </div>
            <p className="text-xs text-slate-500">Recommended</p>
            <h3 className="mt-1 text-xl font-bold">4</h3>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search saved opportunities, companies or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-indigo-500/10"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="recent">Recently Saved</option>
              <option value="deadline">Deadline</option>
              <option value="company">Company</option>
            </select>
          </div>

          {showFilters && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">

              {[
                "All",
                "Internship",
                "Full Time",
                "Trainee",
                "Technology",
                "Software",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    filter === item
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Result Count */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">
              Your Saved List
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {filteredOpportunities.length} opportunities found
            </p>
          </div>

          {filter !== "All" && (
            <button
              onClick={() => setFilter("All")}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Opportunity Cards */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">

            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30"
              >

                {/* Top Accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                      <Building2 size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold sm:text-lg">
                        {opportunity.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                        <Building2 size={14} />
                        {opportunity.company}
                      </p>
                    </div>
                  </div>

                  {/* Bookmark */}
                  <button
                    onClick={() => removeSaved(opportunity.id)}
                    title="Remove from saved"
                    className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
                  >
                    <BookmarkCheck size={21} fill="currentColor" />
                  </button>
                </div>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    {opportunity.type}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      opportunity.status === "Closing Soon"
                        ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                        : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}
                  >
                    {opportunity.status}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {opportunity.description}
                </p>

                {/* Info */}
                <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-slate-500 sm:grid-cols-2 dark:text-slate-400">

                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-slate-400" />
                    {opportunity.location} · {opportunity.mode}
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-slate-400" />
                    Deadline: {opportunity.deadline}
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {opportunity.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Deadline Progress */}
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Application deadline
                    </span>

                    <span
                      className={`text-[11px] font-semibold ${
                        opportunity.daysLeft <= 7
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-slate-500"
                      }`}
                    >
                      {opportunity.daysLeft} days left
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        opportunity.daysLeft <= 7
                          ? "w-[75%] bg-orange-500"
                          : "w-[40%] bg-indigo-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">

                  <button
                    onClick={() => removeSaved(opportunity.id)}
                    className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700 hover:shadow-md"
                  >
                    View Opportunity
                    <ChevronRight size={15} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Bookmark size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              No saved opportunities found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Try changing your search or filters, or explore new
              opportunities and save the ones you are interested in.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Explore Opportunities
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default SavedOpportunities;

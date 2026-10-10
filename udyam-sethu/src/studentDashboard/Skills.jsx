import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  X,
  Code2,
  Database,
  Palette,
  Cloud,
  Wrench,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Moon,
  Sun,
  Loader2,
  Trash2,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Skills() {
  const [darkMode, setDarkMode] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showAddSkill, setShowAddSkill] = useState(false);

  const [skills, setSkills] = useState([]);
  const [skillCatalog, setSkillCatalog] = useState([]);

  const [loading, setLoading] = useState(true);
  const [addingSkill, setAddingSkill] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(null);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [stats, setStats] = useState({
    totalSkills: 0,
    advancedSkills: 0,
    categories: 0,
    profileMatch: 0,
  });

  const [newSkill, setNewSkill] = useState({
    skillId: "",
  });

  /*
   * ----------------------------------------------------
   * AUTH TOKEN
   * ----------------------------------------------------
   */

  const getToken = () => {
    return localStorage.getItem("token");
  };

  /*
   * ----------------------------------------------------
   * ICON
   * ----------------------------------------------------
   */

  const getSkillIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "frontend":
        return Code2;

      case "database":
        return Database;

      case "cloud":
        return Cloud;

      case "tools":
        return Wrench;

      case "backend":
        return Wrench;

      default:
        return Palette;
    }
  };

  /*
   * ----------------------------------------------------
   * API REQUEST HELPER
   * ----------------------------------------------------
   */

  const apiRequest = async (url, options = {}) => {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong"
      );
    }

    return data;
  };

  /*
   * ----------------------------------------------------
   * LOAD SKILL CATALOG
   * ----------------------------------------------------
   */

  const loadSkillCatalog = async () => {
    try {
      const data = await apiRequest(
        "/api/skills/catalog"
      );

      const catalog =
        data.skills ||
        data.skillCatalog ||
        data.data ||
        [];

      setSkillCatalog(catalog);
    } catch (error) {
      console.error(
        "Load skill catalog error:",
        error
      );

      setError(error.message);
    }
  };

  /*
   * ----------------------------------------------------
   * LOAD STUDENT SKILLS
   * ----------------------------------------------------
   */

  const loadStudentSkills = async () => {
    try {
      const data = await apiRequest("/api/skills");

      const studentSkills =
        data.skills ||
        data.studentSkills ||
        data.data ||
        [];

      const formattedSkills = studentSkills.map(
        (skill) => {
          const level =
            skill.current_level ||
            skill.level ||
            "Beginner";

          const percentage =
            Number(
              skill.progress ??
                skill.percentage ??
                0
            );

          return {
            id:
              skill.student_skill_id ||
              skill.id,

            skillId:
              skill.skill_id ||
              skill.skillId,

            name:
              skill.name ||
              skill.skill_name ||
              "Unknown Skill",

            category:
              skill.category ||
              "Other",

            level,

            percentage,

            status:
              skill.status ||
              "active",

            icon: getSkillIcon(
              skill.category
            ),
          };
        }
      );

      setSkills(formattedSkills);
    } catch (error) {
      console.error(
        "Load student skills error:",
        error
      );

      setError(error.message);
    }
  };

  /*
   * ----------------------------------------------------
   * LOAD STATISTICS
   * ----------------------------------------------------
   */

  const loadStats = async () => {
    try {
      const data = await apiRequest(
        "/api/skills/stats"
      );

      const statistics =
        data.stats ||
        data.data ||
        data;

      setStats({
        totalSkills:
          Number(
            statistics.totalSkills ??
              statistics.total_skills ??
              skills.length
          ),

        advancedSkills:
          Number(
            statistics.advancedSkills ??
              statistics.advanced_skills ??
              0
          ),

        categories:
          Number(
            statistics.categories ??
              statistics.totalCategories ??
              statistics.total_categories ??
              0
          ),

        profileMatch:
          Number(
            statistics.profileMatch ??
              statistics.profile_match ??
              0
          ),
      });
    } catch (error) {
      console.error(
        "Load skill stats error:",
        error
      );

      /*
       * Statistics are supplementary.
       * If API stats fail, calculate basic values
       * from the loaded skills.
       */

      setStats({
        totalSkills: skills.length,

        advancedSkills: skills.filter(
          (skill) =>
            skill.level === "Advanced" ||
            skill.level === "Expert"
        ).length,

        categories: new Set(
          skills.map(
            (skill) => skill.category
          )
        ).size,

        profileMatch: calculateProfileMatch(
          skills
        ),
      });
    }
  };

  /*
   * ----------------------------------------------------
   * INITIAL LOAD
   * ----------------------------------------------------
   */

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError(
          "Please login again. Authentication token not found."
        );

        setLoading(false);
        return;
      }

      try {
        await Promise.all([
          loadSkillCatalog(),
          loadStudentSkills(),
        ]);
      } catch (error) {
        console.error(
          "Skills page loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /*
   * ----------------------------------------------------
   * LOAD STATS AFTER SKILLS LOAD
   * ----------------------------------------------------
   */

  useEffect(() => {
    if (!loading) {
      loadStats();
    }
  }, [loading, skills.length]);

  /*
   * ----------------------------------------------------
   * PROFILE MATCH FALLBACK
   * ----------------------------------------------------
   */

  const calculateProfileMatch = (
    skillList
  ) => {
    if (!skillList.length) {
      return 0;
    }

    const total = skillList.reduce(
      (sum, skill) =>
        sum + Number(skill.percentage || 0),
      0
    );

    return Math.round(
      total / skillList.length
    );
  };

  /*
   * ----------------------------------------------------
   * CATEGORIES
   * ----------------------------------------------------
   */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        skillCatalog
          .map((skill) => skill.category)
          .filter(Boolean)
      ),
    ];

    return [
      {
        name: "All",
        icon: BarChart3,
      },

      ...uniqueCategories.map(
        (item) => ({
          name: item,
          icon: getSkillIcon(item),
        })
      ),
    ];
  }, [skillCatalog]);

  /*
   * ----------------------------------------------------
   * FILTERED SKILLS
   * ----------------------------------------------------
   */

  const filteredSkills = skills.filter(
    (skill) => {
      const matchesSearch =
        skill.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        skill.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /*
   * ----------------------------------------------------
   * LEVEL STYLE
   * ----------------------------------------------------
   */

  const getLevelStyle = (level) => {
    if (
      level === "Advanced" ||
      level === "Expert"
    ) {
      return darkMode
        ? "bg-emerald-900/30 text-emerald-300 border-emerald-800"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (level === "Intermediate") {
      return darkMode
        ? "bg-blue-900/30 text-blue-300 border-blue-800"
        : "bg-blue-50 text-blue-700 border-blue-200";
    }

    return darkMode
      ? "bg-orange-900/30 text-orange-300 border-orange-800"
      : "bg-orange-50 text-orange-700 border-orange-200";
  };

  /*
   * ----------------------------------------------------
   * ADD SKILL
   * ----------------------------------------------------
   */

  const addSkill = async (e) => {
    e.preventDefault();

    if (!newSkill.skillId) {
      setError("Please select a skill.");
      return;
    }

    setAddingSkill(true);
    setError("");
    setSuccessMessage("");

    try {
      await apiRequest("/api/skills", {
        method: "POST",

        body: JSON.stringify({
          skillId: Number(
            newSkill.skillId
          ),
        }),
      });

      setSuccessMessage(
        "Skill added successfully."
      );

      setNewSkill({
        skillId: "",
      });

      setShowAddSkill(false);

      /*
       * Reload actual backend data
       */
      await loadStudentSkills();
    } catch (error) {
      console.error(
        "Add skill error:",
        error
      );

      setError(error.message);
    } finally {
      setAddingSkill(false);
    }
  };

  /*
   * ----------------------------------------------------
   * REMOVE SKILL
   * ----------------------------------------------------
   */

  const removeSkill = async (
    studentSkillId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this skill?"
      );

    if (!confirmed) {
      return;
    }

    setDeletingSkillId(
      studentSkillId
    );

    setError("");
    setSuccessMessage("");

    try {
      await apiRequest(
        `/api/skills/${studentSkillId}`,
        {
          method: "DELETE",
        }
      );

      setSuccessMessage(
        "Skill removed successfully."
      );

      await loadStudentSkills();
    } catch (error) {
      console.error(
        "Remove skill error:",
        error
      );

      setError(error.message);
    } finally {
      setDeletingSkillId(null);
    }
  };

  /*
   * ----------------------------------------------------
   * CONTINUE LEARNING
   * ----------------------------------------------------
   */

  const continueLearning = (
    studentSkillId
  ) => {
    window.location.href =
      `/udyamsethu/student/skills/${studentSkillId}`;
  };

  /*
   * ----------------------------------------------------
   * LOADING
   * ----------------------------------------------------
   */

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode
            ? "bg-[#0b1120] text-white"
            : "bg-[#f7f9fc] text-slate-800"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={32}
            className="animate-spin text-indigo-500"
          />

          <p className="text-sm">
            Loading your skills...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------
   * UI
   * ----------------------------------------------------
   */

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                  <Code2 size={22} />
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    My Skills
                  </h1>

                  <p
                    className={`text-sm mt-1 ${
                      darkMode
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    Build and showcase your technical skill profile.
                  </p>
                </div>

              </div>
            </div>

            {/* DARK MODE */}

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`px-4 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {darkMode ? (
                <>
                  <Sun size={17} />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={17} />
                  Dark Mode
                </>
              )}
            </button>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ERROR */}

        {error && (
          <div
            className={`mb-5 rounded-xl border p-4 flex items-start gap-3 ${
              darkMode
                ? "bg-red-950/30 border-red-900 text-red-300"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <AlertCircle
              size={19}
              className="shrink-0 mt-0.5"
            />

            <div className="flex-1">
              <p className="text-sm font-medium">
                {error}
              </p>
            </div>

            <button
              onClick={() => setError("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* SUCCESS */}

        {successMessage && (
          <div
            className={`mb-5 rounded-xl border p-4 flex items-center gap-3 ${
              darkMode
                ? "bg-emerald-950/30 border-emerald-900 text-emerald-300"
                : "bg-emerald-50 border-emerald-200 text-emerald-700"
            }`}
          >
            <CheckCircle2 size={19} />

            <p className="text-sm font-medium">
              {successMessage}
            </p>
          </div>
        )}

        {/* PROFILE SUMMARY */}

        <section
          className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-7 ${
            darkMode
              ? "bg-gradient-to-br from-indigo-950 via-[#172554] to-[#111827]"
              : "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white"
          }`}
        >
          <div className="relative z-10">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

              <div className="max-w-xl">

                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} />

                  <span className="text-sm font-medium opacity-90">
                    Skill Profile
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Your skills tell your career story.
                </h2>

                <p className="text-sm sm:text-base opacity-80 mt-3">
                  Keep your skills updated to improve your opportunity
                  matches and help employers understand your strengths.
                </p>

                <button
                  onClick={() =>
                    setShowAddSkill(true)
                  }
                  className="mt-5 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-semibold text-sm flex items-center gap-2 hover:bg-slate-100 transition"
                >
                  <Plus size={17} />
                  Add New Skill
                </button>

              </div>

              {/* PROFILE SCORE */}

              <div className="flex items-center gap-5">

                <div className="relative w-28 h-28">

                  <svg
                    className="w-28 h-28 -rotate-90"
                    viewBox="0 0 120 120"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      className="text-white/20"
                    />

                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="314"
                      strokeDashoffset={
                        314 -
                        (stats.profileMatch /
                          100) *
                          314
                      }
                      className="text-white"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-2xl font-bold">
                      {stats.profileMatch}%
                    </span>

                    <span className="text-[10px] opacity-70">
                      PROFILE
                    </span>

                  </div>
                </div>

                <div className="hidden sm:block">

                  <p className="text-sm opacity-70">
                    Skill Profile
                  </p>

                  <p className="font-bold text-lg">
                    {stats.profileMatch >= 80
                      ? "Strong Progress"
                      : stats.profileMatch >= 50
                      ? "Good Progress"
                      : "Getting Started"}
                  </p>

                  <p className="text-xs opacity-70 mt-1">
                    {skills.length === 0
                      ? "Add your first skill to get started."
                      : "Keep learning to improve your skill profile."}
                  </p>

                </div>

              </div>

            </div>
          </div>

          <div className="absolute -right-20 -bottom-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        </section>

        {/* STATS */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">

          {/* TOTAL */}

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-500">
              Total Skills
            </p>

            <div className="flex items-end justify-between mt-2">

              <h3 className="text-2xl font-bold">
                {stats.totalSkills}
              </h3>

              <Code2
                size={21}
                className="text-indigo-500"
              />

            </div>
          </div>

          {/* ADVANCED */}

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-500">
              Advanced
            </p>

            <div className="flex items-end justify-between mt-2">

              <h3 className="text-2xl font-bold">
                {stats.advancedSkills}
              </h3>

              <TrendingUp
                size={21}
                className="text-emerald-500"
              />

            </div>
          </div>

          {/* CATEGORIES */}

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-500">
              Categories
            </p>

            <div className="flex items-end justify-between mt-2">

              <h3 className="text-2xl font-bold">
                {stats.categories}
              </h3>

              <BarChart3
                size={21}
                className="text-purple-500"
              />

            </div>
          </div>

          {/* PROFILE MATCH */}

          <div
            className={`rounded-2xl border p-5 ${
              darkMode
                ? "bg-[#111827] border-slate-800"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-500">
              Profile Match
            </p>

            <div className="flex items-end justify-between mt-2">

              <h3 className="text-2xl font-bold">
                {stats.profileMatch}%
              </h3>

              <CheckCircle2
                size={21}
                className="text-blue-500"
              />

            </div>
          </div>

        </div>

        {/* SEARCH + ADD */}

        <div className="flex flex-col lg:flex-row gap-3 mb-5">

          <div className="relative flex-1">

            <Search
              size={19}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-400"
              }`}
            />

            <input
              type="text"
              placeholder="Search your skills..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className={`w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none ${
                darkMode
                  ? "bg-[#111827] border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500"
                  : "bg-white border-slate-200 placeholder:text-slate-400 focus:border-indigo-500"
              }`}
            />

          </div>

          <button
            onClick={() =>
              setShowAddSkill(true)
            }
            className="px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} />
            Add Skill
          </button>

        </div>

        {/* CATEGORY TABS */}

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5">

          {categories.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() =>
                  setCategory(item.name)
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  category === item.name
                    ? "bg-indigo-600 text-white"
                    : darkMode
                    ? "bg-[#111827] border border-slate-800 text-slate-400 hover:text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-indigo-600"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </button>
            );
          })}

        </div>

        {/* SKILL CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

          {filteredSkills.map((skill) => {

            const Icon = skill.icon;

            return (
              <div
                key={skill.id}
                className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  darkMode
                    ? "bg-[#111827] border-slate-800 hover:border-indigo-800"
                    : "bg-white border-slate-200 hover:border-indigo-200"
                }`}
              >

                {/* CARD TOP */}

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        darkMode
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      <Icon size={21} />
                    </div>

                    <div>

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <p
                        className={`text-xs mt-1 ${
                          darkMode
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {skill.category}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full border text-xs font-medium ${getLevelStyle(
                      skill.level
                    )}`}
                  >
                    {skill.level}
                  </span>

                </div>

                {/* PROGRESS */}

                <div className="mt-6">

                  <div className="flex items-center justify-between mb-2">

                    <span
                      className={`text-xs ${
                        darkMode
                          ? "text-slate-500"
                          : "text-slate-400"
                      }`}
                    >
                      Proficiency
                    </span>

                    <span className="text-sm font-bold">
                      {skill.percentage}%
                    </span>

                  </div>

                  <div
                    className={`h-2 rounded-full overflow-hidden ${
                      darkMode
                        ? "bg-slate-800"
                        : "bg-slate-100"
                    }`}
                  >
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.percentage}%`,
                      }}
                    />
                  </div>

                </div>

                {/* STATUS */}

                <div className="mt-4">

                  {skill.status ===
                    "review_pending" && (
                    <div
                      className={`text-xs px-3 py-2 rounded-lg ${
                        darkMode
                          ? "bg-amber-900/20 text-amber-300"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      Level completed — waiting for reviewer approval
                    </div>
                  )}

                  {skill.status ===
                    "completed" && (
                    <div
                      className={`text-xs px-3 py-2 rounded-lg ${
                        darkMode
                          ? "bg-emerald-900/20 text-emerald-300"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      Skill completed
                    </div>
                  )}

                </div>

                {/* FOOTER */}

                <div
                  className={`flex items-center justify-between mt-5 pt-4 border-t ${
                    darkMode
                      ? "border-slate-800"
                      : "border-slate-100"
                  }`}
                >

                  <button
                    onClick={() =>
                      removeSkill(
                        skill.id
                      )
                    }
                    disabled={
                      deletingSkillId ===
                      skill.id
                    }
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      darkMode
                        ? "text-red-400 hover:text-red-300"
                        : "text-red-600 hover:text-red-700"
                    }`}
                  >
                    {deletingSkillId ===
                    skill.id ? (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={14} />
                    )}

                    Remove
                  </button>

                  <button
                    onClick={() =>
                      continueLearning(
                        skill.id
                      )
                    }
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      darkMode
                        ? "text-indigo-400"
                        : "text-indigo-600"
                    }`}
                  >
                    <BookOpen size={14} />
                    Continue Learning
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* EMPTY STATE */}

        {filteredSkills.length === 0 && (
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

            <h3 className="font-bold text-lg mt-4">
              No skills found
            </h3>

            <p
              className={`text-sm mt-1 ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-500"
              }`}
            >
              Try another skill or category.
            </p>

          </div>
        )}

        {/* CAREER TIP */}

        <div
          className={`mt-7 rounded-2xl border p-5 ${
            darkMode
              ? "bg-[#111827] border-slate-800"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-start gap-4">

            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>

            <div>

              <h3 className="font-bold">
                Improve your skill profile
              </h3>

              <p
                className={`text-sm mt-1 ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Add skills related to your target roles.
                Complete learning modules and assessments
                to improve your proficiency level.
              </p>

            </div>

          </div>
        </div>

      </main>

      {/* ADD SKILL MODAL */}

      {showAddSkill && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div
            className={`w-full max-w-md rounded-2xl shadow-2xl ${
              darkMode
                ? "bg-[#111827] text-white"
                : "bg-white text-slate-800"
            }`}
          >

            {/* MODAL HEADER */}

            <div
              className={`flex items-center justify-between p-5 border-b ${
                darkMode
                  ? "border-slate-800"
                  : "border-slate-100"
              }`}
            >

              <div>

                <h2 className="text-lg font-bold">
                  Add New Skill
                </h2>

                <p
                  className={`text-xs mt-1 ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  Select a skill from the available skill catalog.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAddSkill(false)
                }
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  darkMode
                    ? "hover:bg-slate-800"
                    : "hover:bg-slate-100"
                }`}
              >
                <X size={18} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={addSkill}
              className="p-5 space-y-4"
            >

              <div>

                <label className="text-sm font-medium">
                  Select Skill
                </label>

                <select
                  value={newSkill.skillId}
                  onChange={(e) =>
                    setNewSkill({
                      skillId:
                        e.target.value,
                    })
                  }
                  className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none ${
                    darkMode
                      ? "bg-[#0b1120] border-slate-700 text-white"
                      : "bg-white border-slate-200"
                  }`}
                >

                  <option value="">
                    Select a skill
                  </option>

                  {skillCatalog.map(
                    (skill) => (
                      <option
                        key={skill.id}
                        value={skill.id}
                      >
                        {skill.name} —{" "}
                        {skill.category}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* BEGINNER NOTICE */}

              <div
                className={`rounded-xl p-4 ${
                  darkMode
                    ? "bg-indigo-950/40 border border-indigo-900"
                    : "bg-indigo-50 border border-indigo-100"
                }`}
              >

                <div className="flex items-start gap-3">

                  <Sparkles
                    size={18}
                    className="text-indigo-500 mt-0.5"
                  />

                  <div>

                    <p className="text-sm font-semibold">
                      Starting Level: Beginner
                    </p>

                    <p
                      className={`text-xs mt-1 ${
                        darkMode
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      Every newly added skill starts at
                      Beginner. Complete the learning
                      and assessment process to unlock
                      higher levels.
                    </p>

                  </div>

                </div>

              </div>

              <button
                type="submit"
                disabled={addingSkill}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition flex items-center justify-center gap-2"
              >

                {addingSkill ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Skill
                  </>
                )}

              </button>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}
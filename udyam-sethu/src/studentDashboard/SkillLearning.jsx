import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Circle,
    Clock3,
    Loader2,
    Play,
    Trophy,
    XCircle,
    Sparkles,
    Brain,
    Lock,
    ChevronRight,
    RotateCcw,
    Zap,
    Award,
    Flame,
    Sun,
    Moon,
    Code2,
    Database,
    Cloud,
    Palette,
    Wrench,
    AlertCircle,
    GraduationCap,
    RefreshCw,
    HelpCircle,
    Check,
    X
} from "lucide-react";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SkillLearning() {
    const { studentSkillId } = useParams();
    const navigate = useNavigate();

    // --------------------------------------------------
    // State Management
    // --------------------------------------------------
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme") || localStorage.getItem("darkMode");
        return saved !== null ? saved === "dark" || saved === "true" : true;
    });

    const [learning, setLearning] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Gamification & Session Stats
    const [sessionScore, setSessionScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [autoAdvanceTimer, setAutoAdvanceTimer] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [moduleFinishedBanner, setModuleFinishedBanner] = useState(null);

    // Mobile navigation tab: "learning" or "curriculum"
    const [mobileTab, setMobileTab] = useState("learning");

    const token = localStorage.getItem("token");

    // Sync theme
    useEffect(() => {
        localStorage.setItem("theme", darkMode ? "dark" : "light");
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    // --------------------------------------------------
    // Load Learning Data
    // --------------------------------------------------
    useEffect(() => {
        loadLearning();
    }, [studentSkillId]);

    const loadLearning = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `${API_BASE_URL}/api/skills-learning/${studentSkillId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to load skill learning data (Status: ${response.status})`);
            }

            const data = await response.json();

            if (data.success) {
                setLearning(data);

                if (data.currentModule) {
                    setSelectedModule(data.currentModule);
                    setCurrentQuestion(
                        Number(data.currentModule.current_question || 0)
                    );
                } else if (data.modules && data.modules.length > 0) {
                    // Pick the first in_progress module, or the first available module
                    const activeMod =
                        data.modules.find((m) => m.status === "in_progress") ||
                        data.modules.find((m) => m.status !== "locked") ||
                        data.modules[0];
                    setSelectedModule(activeMod);
                    setCurrentQuestion(Number(activeMod.current_question || 0));
                }
            } else {
                setError(data.message || "Could not load learning journey.");
            }
        } catch (err) {
            console.error("Learning loading error:", err);
            setError(err.message || "Unable to connect to the learning server.");
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // Generate Questions for a Module
    // --------------------------------------------------
    const startModule = async (module) => {
        if (!module) return;

        try {
            setSelectedModule(module);
            setQuestions([]);
            setCurrentQuestion(Number(module.current_question || 0));
            setSelectedAnswer("");
            setResult(null);
            setModuleFinishedBanner(null);
            setGenerating(true);
            setError(null);
            setMobileTab("learning");

            const response = await fetch(
                `${API_BASE_URL}/api/skills-learning/generate-questions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        studentSkillId: Number(studentSkillId),
                        moduleId: module.id,
                        count: 5
                    })
                }
            );

            if (!response.ok) {
                throw new Error("AI question generator returned an error.");
            }

            const data = await response.json();

            if (data.success && data.questions) {
                setQuestions(data.questions);
            } else {
                setError(data.message || "Failed to generate questions. Please try again.");
            }
        } catch (err) {
            console.error("Question generation error:", err);
            setError(err.message || "Could not generate questions. Check connection.");
        } finally {
            setGenerating(false);
        }
    };

    // --------------------------------------------------
    // Advance to next question or module
    // --------------------------------------------------
    const handleNext = () => {
        if (autoAdvanceTimer) {
            clearTimeout(autoAdvanceTimer);
            setAutoAdvanceTimer(null);
        }
        setCountdown(null);

        if (moduleFinishedBanner) {
            if (moduleFinishedBanner.nextModule) {
                startModule(moduleFinishedBanner.nextModule);
            } else {
                // All modules done
                setQuestions([]);
                setCurrentQuestion(0);
                setSelectedAnswer("");
                setResult(null);
                setModuleFinishedBanner(null);
                loadLearning(); // reload latest progress
            }
            return;
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer("");
            setResult(null);
        } else {
            // Reached end of questions for this module
            loadLearning();
        }
    };

    // --------------------------------------------------
    // Submit Answer
    // --------------------------------------------------
    const submitAnswer = async () => {
        if (!selectedAnswer || submitting || result) return;

        const question = questions[currentQuestion];
        if (!question) return;

        try {
            setSubmitting(true);
            setError(null);

            const response = await fetch(
                `${API_BASE_URL}/api/skills-learning/answer`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        studentSkillId: Number(studentSkillId),
                        questionId: question.id,
                        selectedAnswer
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Server error evaluating answer.");
            }

            const data = await response.json();
            setResult(data);

            // Update local gamification stats
            if (data.correct) {
                setSessionScore((prev) => prev + 20);
                setStreak((prev) => prev + 1);
            } else {
                setStreak(0);
            }

            if (data.moduleCompleted) {
                setModuleFinishedBanner(data);
                // Refresh skills in background to keep overall progress updated
                loadLearning();
            } else {
                // Set a smooth 3-second auto-advance timer while allowing instant click
                setCountdown(3);
                const timer = setTimeout(() => {
                    setCurrentQuestion((prev) => prev + 1);
                    setSelectedAnswer("");
                    setResult(null);
                    setCountdown(null);
                }, 3000);
                setAutoAdvanceTimer(timer);
            }
        } catch (err) {
            console.error("Answer submission error:", err);
            setError(err.message || "Failed to submit answer. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // --------------------------------------------------
    // Keyboard shortcuts (A, B, C, D / 1, 2, 3, 4 / Enter)
    // --------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (generating || submitting) return;

            const question = questions[currentQuestion];
            if (!question || !question.options) return;

            // When result is shown, pressing Enter advances to next
            if (result) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleNext();
                }
                return;
            }

            // Option selection shortcuts
            const key = e.key.toUpperCase();
            const optionMap = {
                A: 0,
                1: 0,
                B: 1,
                2: 1,
                C: 2,
                3: 2,
                D: 3,
                4: 3
            };

            if (optionMap[key] !== undefined && question.options[optionMap[key]]) {
                setSelectedAnswer(question.options[optionMap[key]]);
            }

            // Submit with Enter if option selected
            if (e.key === "Enter" && selectedAnswer && !result) {
                e.preventDefault();
                submitAnswer();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [questions, currentQuestion, selectedAnswer, result, generating, submitting, moduleFinishedBanner]);

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
        };
    }, [autoAdvanceTimer]);

    // Helper for category icons
    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case "frontend":
                return Code2;
            case "backend":
                return Wrench;
            case "database":
                return Database;
            case "cloud":
                return Cloud;
            case "tools":
                return Wrench;
            default:
                return Palette;
        }
    };

    // Helper to format code blocks or bold text in questions
    const renderFormattedQuestion = (text) => {
        if (!text) return null;

        // Split by backticks `code`
        const parts = text.split(/(`[^`]+`)/g);
        return parts.map((part, i) => {
            if (part.startsWith("`") && part.endsWith("`")) {
                const codeSnippet = part.slice(1, -1);
                return (
                    <code
                        key={i}
                        className={`mx-1 px-2 py-0.5 rounded-lg text-sm md:text-base font-mono border ${
                            darkMode
                                ? "bg-indigo-950/40 text-indigo-300 border-indigo-800/60"
                                : "bg-indigo-50 text-indigo-800 border-indigo-200"
                        }`}
                    >
                        {codeSnippet}
                    </code>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    // --------------------------------------------------
    // Loading State
    // --------------------------------------------------
    if (loading) {
        return (
            <div
                className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
                    darkMode ? "bg-[#0b1120] text-slate-100" : "bg-[#f8fafc] text-slate-900"
                }`}
            >
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
                        <Brain className="w-8 h-8 text-indigo-500 animate-bounce" />
                    </div>
                    <Loader2 className="w-6 h-6 text-indigo-500 animate-spin absolute -top-2 -right-2" />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-wide">
                    Loading Learning Workspace...
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                    Preparing your tailored modules and skill progress
                </p>
            </div>
        );
    }

    // --------------------------------------------------
    // Error / Not Found State
    // --------------------------------------------------
    if (!learning || !learning.skill) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center p-6 ${
                    darkMode ? "bg-[#0b1120] text-slate-100" : "bg-[#f8fafc] text-slate-900"
                }`}
            >
                <div
                    className={`max-w-md w-full p-8 rounded-3xl border text-center shadow-xl ${
                        darkMode
                            ? "bg-[#111827] border-slate-800"
                            : "bg-white border-slate-200"
                    }`}
                >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                        <AlertCircle size={32} />
                    </div>
                    <h2 className="text-xl font-bold">Skill Not Found</h2>
                    <p className="text-sm text-slate-400 mt-2 mb-6">
                        {error ||
                            "We couldn't locate this skill in your profile. It may have been removed or updated."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => loadLearning()}
                            className="px-5 py-2.5 rounded-xl border border-slate-600 hover:bg-slate-700/30 text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <RefreshCw size={16} />
                            Retry
                        </button>
                        <button
                            onClick={() => navigate("/udyamsethu/student/skills")}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition"
                        >
                            <ArrowLeft size={16} />
                            Back to Skills
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const { skill, modules = [] } = learning;
    const CategoryIcon = getCategoryIcon(skill.category);
    const question = questions[currentQuestion];
    const totalQuestionsCount = questions.length;
    const completedModulesCount = modules.filter((m) => m.status === "completed").length;
    const progressPercent = Number(skill.progress || 0);

    return (
        <div
            className={`min-h-screen transition-colors duration-300 font-sans ${
                darkMode ? "bg-[#0b1120] text-slate-100" : "bg-[#f8fafc] text-slate-900"
            }`}
        >
            {/* Top Navigation Bar */}
            <header
                className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
                    darkMode
                        ? "bg-[#0b1120]/80 border-slate-800/80"
                        : "bg-white/85 border-slate-200/80"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Left: Back Button & Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (window.history.length > 1) {
                                    window.history.back();
                                } else {
                                    navigate("/udyamsethu/student/skills");
                                }
                            }}
                            className={`p-2 rounded-xl border transition flex items-center justify-center ${
                                darkMode
                                    ? "bg-slate-800/60 border-slate-700/80 hover:bg-slate-700 text-slate-300"
                                    : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700"
                            }`}
                            title="Back to Skills"
                        >
                            <ArrowLeft size={18} />
                        </button>

                        <div>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                <span>Skills</span>
                                <ChevronRight size={12} />
                                <span className="text-indigo-500 font-semibold">{skill.category}</span>
                            </div>
                            <h2 className="text-base sm:text-lg font-bold leading-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                                {skill.skill_name}
                            </h2>
                        </div>
                    </div>

                    {/* Right: Gamification Badges & Theme Toggle */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Streak Badge */}
                        {streak > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs sm:text-sm font-bold animate-pulse">
                                <Flame size={16} className="fill-amber-500" />
                                <span>{streak} Streak</span>
                            </div>
                        )}

                        {/* Session XP */}
                        {sessionScore > 0 && (
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs sm:text-sm font-bold">
                                <Zap size={15} className="fill-emerald-500" />
                                <span>+{sessionScore} XP</span>
                            </div>
                        )}

                        {/* Dark/Light Mode Switcher */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2.5 rounded-xl border transition flex items-center justify-center ${
                                darkMode
                                    ? "bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-700"
                                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                            }`}
                            title="Toggle Dark/Light Mode"
                        >
                            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Hero Skill Banner */}
                <div
                    className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-sm mb-6 md:mb-8 transition-all ${
                        darkMode
                            ? "bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e1b4b]/40 border-slate-800"
                            : "bg-gradient-to-br from-white via-indigo-50/20 to-slate-50 border-slate-200"
                    }`}
                >
                    {/* Background glow orb */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        {/* Skill info */}
                        <div className="flex items-start sm:items-center gap-4">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                                <CategoryIcon size={28} />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                        {skill.category}
                                    </span>
                                    <span
                                        className={`px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider border ${
                                            skill.current_level?.toLowerCase() === "advanced"
                                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                : skill.current_level?.toLowerCase() === "intermediate"
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        }`}
                                    >
                                        Level: {skill.current_level || "Beginner"}
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    {skill.skill_name}
                                </h1>
                                <p
                                    className={`text-xs sm:text-sm mt-1 max-w-xl ${
                                        darkMode ? "text-slate-400" : "text-slate-600"
                                    }`}
                                >
                                    AI-powered interactive mastery modules. Practice adaptive questions
                                    and level up with instant explanations.
                                </p>
                            </div>
                        </div>

                        {/* Overall Progress Meter */}
                        <div
                            className={`p-4 sm:p-5 rounded-2xl border min-w-[240px] md:min-w-[260px] ${
                                darkMode
                                    ? "bg-slate-900/60 border-slate-800"
                                    : "bg-white/80 border-slate-200"
                            }`}
                        >
                            <div className="flex items-center justify-between text-xs font-semibold mb-2">
                                <span className={darkMode ? "text-slate-400" : "text-slate-600"}>
                                    Milestone Progress
                                </span>
                                <span className="text-indigo-500 font-bold text-sm">
                                    {progressPercent}%
                                </span>
                            </div>
                            <div
                                className={`w-full h-3 rounded-full overflow-hidden ${
                                    darkMode ? "bg-slate-800" : "bg-slate-200"
                                }`}
                            >
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-sm"
                                    style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                                />
                            </div>
                            <div className="flex items-center justify-between mt-2.5 text-xs text-slate-400">
                                <span>{completedModulesCount} of {modules.length} Completed</span>
                                <span>{modules.length - completedModulesCount} Remaining</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile View Toggle: Tabs on Small Devices */}
                <div className="flex lg:hidden mb-6 p-1 rounded-2xl border bg-slate-900/20 border-slate-800">
                    <button
                        onClick={() => setMobileTab("learning")}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                            mobileTab === "learning"
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        <Sparkles size={16} />
                        Interactive Practice
                    </button>
                    <button
                        onClick={() => setMobileTab("curriculum")}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 ${
                            mobileTab === "curriculum"
                                ? "bg-indigo-600 text-white shadow-md"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        <BookOpen size={16} />
                        Modules ({completedModulesCount}/{modules.length})
                    </button>
                </div>

                {/* Error Banner if any */}
                {error && (
                    <div
                        className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 ${
                            darkMode
                                ? "bg-red-950/30 border-red-900/80 text-red-300"
                                : "bg-red-50 border-red-200 text-red-700"
                        }`}
                    >
                        <AlertCircle className="shrink-0 mt-0.5 text-red-500" size={18} />
                        <div className="flex-1 text-sm font-medium">{error}</div>
                        <button
                            onClick={() => setError(null)}
                            className="p-1 text-xs opacity-70 hover:opacity-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Main Grid: Curriculum Roadmap (Left) & Active Learning Stage (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-8 items-start">
                    {/* LEFT PANEL: Curriculum Roadmap */}
                    <aside
                        className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                            mobileTab === "curriculum" ? "block" : "hidden lg:block"
                        } ${
                            darkMode
                                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                                : "bg-white border-slate-200 shadow-sm"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                                    <GraduationCap className="text-indigo-500" size={20} />
                                    Curriculum Roadmap
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Select an unlocked module to practice
                                </p>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-indigo-500/10 text-indigo-400">
                                {modules.length} Modules
                            </span>
                        </div>

                        {/* Module Timeline */}
                        <div className="relative space-y-3.5 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-700/40">
                            {modules.map((module, index) => {
                                const isSelected = selectedModule?.id === module.id;
                                const isCompleted = module.status === "completed";
                                const isLocked = module.status === "locked";
                                const isInProgress =
                                    module.status === "in_progress" ||
                                    (!isCompleted && !isLocked);

                                return (
                                    <div
                                        key={module.id || index}
                                        className={`relative group rounded-2xl border transition-all duration-200 ${
                                            isSelected
                                                ? darkMode
                                                    ? "border-indigo-500 bg-indigo-950/20 ring-1 ring-indigo-500/40 shadow-lg"
                                                    : "border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500/30 shadow-md"
                                                : isLocked
                                                ? darkMode
                                                    ? "border-slate-800/60 bg-slate-900/30 opacity-60 cursor-not-allowed"
                                                    : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                                                : darkMode
                                                ? "border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-800/40"
                                                : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
                                        }`}
                                    >
                                        <button
                                            disabled={isLocked}
                                            onClick={() => {
                                                if (!isLocked) {
                                                    startModule(module);
                                                }
                                            }}
                                            className="w-full text-left p-4 flex items-start gap-3.5 focus:outline-none"
                                        >
                                            {/* Status Icon */}
                                            <div className="shrink-0 mt-0.5 z-10">
                                                {isCompleted ? (
                                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-sm">
                                                        <CheckCircle2 size={18} />
                                                    </div>
                                                ) : isLocked ? (
                                                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500">
                                                        <Lock size={15} />
                                                    </div>
                                                ) : isSelected ? (
                                                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/40 animate-pulse">
                                                        <Play size={15} className="ml-0.5" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/40 transition">
                                                        <Circle size={15} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Title & Desc */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-xs font-semibold text-slate-400">
                                                        Step {index + 1}
                                                    </span>
                                                    {isCompleted && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                                                            Completed
                                                        </span>
                                                    )}
                                                    {isInProgress && !isCompleted && isSelected && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded animate-pulse">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className="font-semibold text-sm sm:text-base mt-0.5 leading-snug line-clamp-1">
                                                    {module.title}
                                                </h4>

                                                {module.description && (
                                                    <p
                                                        className={`text-xs mt-1 line-clamp-2 ${
                                                            darkMode ? "text-slate-400" : "text-slate-500"
                                                        }`}
                                                    >
                                                        {module.description}
                                                    </p>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* RIGHT PANEL: Interactive Learning Stage */}
                    <section
                        className={`rounded-3xl border transition-all ${
                            mobileTab === "learning" ? "block" : "hidden lg:block"
                        } ${
                            darkMode
                                ? "bg-[#111827] border-slate-800 shadow-xl shadow-black/20"
                                : "bg-white border-slate-200 shadow-sm"
                        } p-5 sm:p-8 min-h-[520px] flex flex-col justify-between`}
                    >
                        {/* STATE 1: AI Generating Questions */}
                        {generating ? (
                            <div className="py-16 sm:py-24 flex flex-col items-center justify-center text-center my-auto">
                                <div className="relative mb-6">
                                    <div className="w-20 h-20 rounded-3xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                                        <Sparkles className="w-10 h-10 text-indigo-500 animate-spin" />
                                    </div>
                                    <div className="absolute inset-0 rounded-3xl border border-indigo-500/50 animate-ping opacity-30" />
                                </div>

                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3 uppercase tracking-wider">
                                    AI Question Synthesizer
                                </span>

                                <h3 className="text-2xl font-bold tracking-tight">
                                    Crafting Your Practice Questions
                                </h3>

                                <p className="text-sm text-slate-400 max-w-md mt-2 leading-relaxed">
                                    Analyzing <span className="text-indigo-400 font-medium">"{selectedModule?.title}"</span> and tailoring questions to match your{" "}
                                    <span className="text-indigo-400 font-medium">{skill.current_level}</span> skill level.
                                </p>

                                <div className="mt-8 flex items-center gap-2 text-xs text-slate-400">
                                    <Loader2 size={16} className="animate-spin text-indigo-500" />
                                    <span>Generating scenario-based challenges & explanations...</span>
                                </div>
                            </div>
                        ) : questions.length === 0 ? (
                            /* STATE 2: Module Overview / Ready to Start */
                            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center my-auto max-w-xl mx-auto">
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10">
                                    <Play size={36} className="text-indigo-500 ml-1" />
                                </div>

                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                                    Ready to Practice
                                </span>

                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3">
                                    {selectedModule?.title || "Choose a Module to Start"}
                                </h2>

                                <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
                                    {selectedModule?.description ||
                                        "Jump into AI-generated micro-challenges tailored to your current level. Get immediate feedback and explanations."}
                                </p>

                                {/* Features badges */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8 w-full">
                                    <div
                                        className={`p-3 rounded-2xl border text-center ${
                                            darkMode
                                                ? "bg-slate-900/50 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="text-base font-bold text-indigo-400">5</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Adaptive Qs</div>
                                    </div>
                                    <div
                                        className={`p-3 rounded-2xl border text-center ${
                                            darkMode
                                                ? "bg-slate-900/50 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="text-base font-bold text-emerald-400">Instant</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Explanations</div>
                                    </div>
                                    <div
                                        className={`col-span-2 sm:col-span-1 p-3 rounded-2xl border text-center ${
                                            darkMode
                                                ? "bg-slate-900/50 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="text-base font-bold text-violet-400">+100 XP</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Skill Boost</div>
                                    </div>
                                </div>

                                {selectedModule && (
                                    <button
                                        onClick={() => startModule(selectedModule)}
                                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Play size={18} />
                                        <span>Start Module Questions</span>
                                    </button>
                                )}
                            </div>
                        ) : question ? (
                            /* STATE 3: Active Question Answering */
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    {/* Question Header & Step Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                                            <div>
                                                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
                                                    {selectedModule?.title}
                                                </span>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <h3 className="text-lg sm:text-xl font-bold">
                                                        Question {currentQuestion + 1} of {totalQuestionsCount}
                                                    </h3>
                                                    <span className="text-xs text-slate-400 font-mono">
                                                        ({Math.round(((currentQuestion + 1) / totalQuestionsCount) * 100)}%)
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-xl border border-slate-700/50">
                                                    <Clock3 size={15} className="text-indigo-400" />
                                                    <span>Practice Mode</span>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        const confirmed = window.confirm(
                                                            "Do you want to reset this module's questions?"
                                                        );
                                                        if (confirmed) {
                                                            startModule(selectedModule);
                                                        }
                                                    }}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
                                                    title="Restart Module"
                                                >
                                                    <RotateCcw size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Segmented Question Progress Bar (Duolingo style) */}
                                        <div className="flex gap-2 w-full pt-1">
                                            {questions.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                                        idx < currentQuestion
                                                            ? "bg-emerald-500 shadow-sm"
                                                            : idx === currentQuestion
                                                            ? "bg-indigo-600 animate-pulse"
                                                            : darkMode
                                                            ? "bg-slate-800"
                                                            : "bg-slate-200"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question Card */}
                                    <div
                                        className={`p-5 sm:p-6 rounded-2xl border mb-6 ${
                                            darkMode
                                                ? "bg-slate-900/60 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                                                Q{currentQuestion + 1}
                                            </div>
                                            <div className="text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                                                {renderFormattedQuestion(question.question)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Options List */}
                                    <div className="space-y-3 mb-6">
                                        {question.options.map((option, index) => {
                                            const letter = String.fromCharCode(65 + index);
                                            const isSelected = selectedAnswer === option;
                                            const isSubmitted = !!result;
                                            const isCorrect = result?.correct && isSelected;
                                            const isIncorrect = !result?.correct && isSelected;

                                            return (
                                                <button
                                                    key={index}
                                                    disabled={isSubmitted || submitting}
                                                    onClick={() => setSelectedAnswer(option)}
                                                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 group ${
                                                        isSubmitted
                                                            ? isCorrect
                                                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-md ring-1 ring-emerald-500/30"
                                                                : isIncorrect
                                                                ? "border-rose-500 bg-rose-500/10 text-rose-400 shadow-md ring-1 ring-rose-500/30"
                                                                : darkMode
                                                                ? "border-slate-800 bg-slate-900/30 text-slate-400 opacity-60"
                                                                : "border-slate-200 bg-slate-50 text-slate-500 opacity-60"
                                                            : isSelected
                                                            ? darkMode
                                                                ? "border-indigo-500 bg-indigo-950/30 text-white ring-1 ring-indigo-500/50 shadow-md"
                                                                : "border-indigo-600 bg-indigo-50/70 text-slate-900 ring-1 ring-indigo-500/40 shadow-sm"
                                                            : darkMode
                                                            ? "border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-800/40 text-slate-200"
                                                            : "border-slate-200 hover:border-indigo-200 bg-white hover:bg-slate-50 text-slate-800"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                                                        {/* Letter badge */}
                                                        <div
                                                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                                                isSubmitted && isCorrect
                                                                    ? "bg-emerald-500 text-white"
                                                                    : isSubmitted && isIncorrect
                                                                    ? "bg-rose-500 text-white"
                                                                    : isSelected
                                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                                    : darkMode
                                                                    ? "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                                                                    : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                                                            }`}
                                                        >
                                                            {letter}
                                                        </div>

                                                        <span className="text-sm sm:text-base font-medium leading-snug">
                                                            {option}
                                                        </span>
                                                    </div>

                                                    {/* Indicator Icon */}
                                                    <div className="shrink-0">
                                                        {isSubmitted && isCorrect && (
                                                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                                                <Check size={14} strokeWidth={3} />
                                                            </div>
                                                        )}
                                                        {isSubmitted && isIncorrect && (
                                                            <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center">
                                                                <X size={14} strokeWidth={3} />
                                                            </div>
                                                        )}
                                                        {!isSubmitted && (
                                                            <div
                                                                className={`w-5 h-5 rounded-full border transition flex items-center justify-center ${
                                                                    isSelected
                                                                        ? "border-indigo-600 bg-indigo-600"
                                                                        : darkMode
                                                                        ? "border-slate-700"
                                                                        : "border-slate-300"
                                                                }`}
                                                            >
                                                                {isSelected && (
                                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Feedback & Explanation Card */}
                                    {result && (
                                        <div
                                            className={`p-4 sm:p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                                                result.correct
                                                    ? darkMode
                                                        ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-200"
                                                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                                                    : darkMode
                                                    ? "bg-rose-950/30 border-rose-800/80 text-rose-200"
                                                    : "bg-rose-50 border-rose-200 text-rose-800"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3.5">
                                                <div
                                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                                        result.correct
                                                            ? "bg-emerald-500/20 text-emerald-400"
                                                            : "bg-rose-500/20 text-rose-400"
                                                    }`}
                                                >
                                                    {result.correct ? (
                                                        <CheckCircle2 size={22} />
                                                    ) : (
                                                        <XCircle size={22} />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <h4 className="font-bold text-sm sm:text-base">
                                                            {result.correct
                                                                ? "Excellent! That's Correct."
                                                                : "Not Quite Right"}
                                                        </h4>
                                                        {countdown !== null && (
                                                            <span className="text-xs opacity-75 font-mono">
                                                                Auto-advancing in {countdown}s
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
                                                        {result.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons Footer */}
                                <div className="mt-8 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
                                        <span className="px-2 py-1 rounded bg-slate-800 font-mono text-[11px]">
                                            Tip
                                        </span>
                                        <span>Use keyboard numbers or letters (A, B, C, D) + Enter</span>
                                    </div>

                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        {!result ? (
                                            <button
                                                disabled={!selectedAnswer || submitting}
                                                onClick={submitAnswer}
                                                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <Loader2 size={16} className="animate-spin" />
                                                        Evaluating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Check Answer</span>
                                                        <ChevronRight size={16} />
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleNext}
                                                className={`w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition hover:scale-[1.01] active:scale-[0.99] ${
                                                    result.correct
                                                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25"
                                                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25"
                                                }`}
                                            >
                                                <span>
                                                    {moduleFinishedBanner
                                                        ? moduleFinishedBanner.nextModule
                                                            ? "Start Next Module"
                                                            : "Finish Module"
                                                        : currentQuestion + 1 >= totalQuestionsCount
                                                        ? "Review & Finish"
                                                        : "Next Question"}
                                                </span>
                                                <ChevronRight size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* STATE 4: Module Completed / Mastery Achieved */
                            <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center my-auto max-w-md mx-auto">
                                <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20 animate-bounce">
                                    <Trophy size={40} className="text-amber-500" />
                                </div>

                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider mb-2">
                                    Module Finished
                                </span>

                                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Congratulations! 🎉
                                </h2>

                                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                                    You have completed all questions for{" "}
                                    <span className="text-indigo-400 font-medium">
                                        "{selectedModule?.title || skill.skill_name}"
                                    </span>
                                    . Your skill progress has been updated!
                                </p>

                                <div className="grid grid-cols-2 gap-3 w-full my-6">
                                    <div
                                        className={`p-4 rounded-2xl border text-center ${
                                            darkMode
                                                ? "bg-slate-900/60 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="text-xl font-extrabold text-indigo-400">
                                            {sessionScore > 0 ? `+${sessionScore}` : "+100"}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">XP Earned</div>
                                    </div>
                                    <div
                                        className={`p-4 rounded-2xl border text-center ${
                                            darkMode
                                                ? "bg-slate-900/60 border-slate-800"
                                                : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="text-xl font-extrabold text-emerald-400">
                                            {progressPercent}%
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1">Level Progress</div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full">
                                    <button
                                        onClick={() => {
                                            setQuestions([]);
                                            setCurrentQuestion(0);
                                            setSelectedAnswer("");
                                            setResult(null);
                                            loadLearning();
                                        }}
                                        className="flex-1 py-3 px-5 rounded-xl border border-slate-700 hover:bg-slate-800 text-sm font-semibold transition"
                                    >
                                        Back to Modules
                                    </button>
                                    <button
                                        onClick={() => navigate("/udyamsethu/student/skills")}
                                        className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition shadow-lg shadow-indigo-600/30"
                                    >
                                        My Skills Overview
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
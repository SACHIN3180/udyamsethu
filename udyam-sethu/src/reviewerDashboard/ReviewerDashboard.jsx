import React, { useEffect, useState } from "react";
import {
    CheckCircle2,
    Clock3,
    Loader2,
    RefreshCw,
    UserRound,
    BookOpen,
    Award,
    AlertCircle
} from "lucide-react";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ReviewerDashboard() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const token = localStorage.getItem("token");

    const loadPendingReviews = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_BASE_URL}/api/reviewer/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load reviews"
                );
            }

            setReviews(
                data.reviews || []
            );

        } catch (error) {

            console.error(
                "Load reviewer reviews error:",
                error
            );

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        if (!token) {
            setError(
                "Authentication token not found. Please login again."
            );
            setLoading(false);
            return;
        }

        loadPendingReviews();

    }, []);

    const approveLevel = async (review) => {

        const confirmed = window.confirm(
            `Approve ${review.current_level} level for ${review.full_name} - ${review.skill_name}?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setApprovingId(
                review.student_skill_id
            );

            setError("");
            setSuccessMessage("");

            const response = await fetch(
                `${API_BASE_URL}/api/reviewer/approve-level`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        studentSkillId:
                            review.student_skill_id,

                        level:
                            review.current_level
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to approve level"
                );
            }

            setSuccessMessage(
                data.message ||
                "Level approved successfully."
            );

            setReviews((previous) =>
                previous.filter(
                    (item) =>
                        item.student_skill_id !==
                        review.student_skill_id
                )
            );

        } catch (error) {

            console.error(
                "Approve level error:",
                error
            );

            setError(error.message);

        } finally {

            setApprovingId(null);
        }
    };

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">

                <div className="flex flex-col items-center gap-3">

                    <Loader2
                        size={36}
                        className="animate-spin text-indigo-600"
                    />

                    <p className="text-slate-600 dark:text-slate-300">
                        Loading review requests...
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <p className="text-sm text-indigo-600 font-semibold">
                            Reviewer Portal
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-1">
                            Skill Reviews
                        </h1>

                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Review student skill progress and approve completed levels.
                        </p>

                    </div>

                    <button
                        onClick={loadPendingReviews}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                </div>


                {/* Messages */}

                {error && (

                    <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300">

                        <AlertCircle
                            size={20}
                            className="mt-0.5"
                        />

                        <p>{error}</p>

                    </div>

                )}


                {successMessage && (

                    <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300">

                        <CheckCircle2
                            size={20}
                            className="mt-0.5"
                        />

                        <p>{successMessage}</p>

                    </div>

                )}


                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Pending Reviews
                                </p>

                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                                    {reviews.length}
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">

                                <Clock3
                                    className="text-orange-600"
                                    size={23}
                                />

                            </div>

                        </div>

                    </div>


                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Completion Status
                                </p>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                                    Ready for Review
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">

                                <Award
                                    className="text-indigo-600"
                                    size={23}
                                />

                            </div>

                        </div>

                    </div>


                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Review Type
                                </p>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                                    Level Approval
                                </h2>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">

                                <CheckCircle2
                                    className="text-emerald-600"
                                    size={23}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Review Requests */}

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">

                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">

                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Pending Skill Reviews
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Students who have completed their current level.
                        </p>

                    </div>


                    {reviews.length === 0 ? (

                        <div className="py-20 px-6 text-center">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">

                                <CheckCircle2
                                    size={30}
                                    className="text-emerald-600"
                                />

                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-5">
                                No pending reviews
                            </h3>

                            <p className="text-slate-500 mt-2">
                                All completed skill levels have been reviewed.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-slate-200 dark:divide-slate-800">

                            {reviews.map((review) => (

                                <div
                                    key={
                                        review.student_skill_id
                                    }
                                    className="p-5 md:p-6"
                                >

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                                        {/* Student */}

                                        <div className="flex items-start gap-4">

                                            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">

                                                <UserRound
                                                    size={22}
                                                    className="text-indigo-600"
                                                />

                                            </div>

                                            <div>

                                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                    {review.full_name}
                                                </h3>

                                                <p className="text-sm text-slate-500">
                                                    {review.email}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Skill */}

                                        <div className="flex items-start gap-4">

                                            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">

                                                <BookOpen
                                                    size={20}
                                                    className="text-purple-600"
                                                />

                                            </div>

                                            <div>

                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {review.skill_name}
                                                </p>

                                                <p className="text-sm text-slate-500">
                                                    {review.category}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Level */}

                                        <div>

                                            <p className="text-xs text-slate-500 uppercase tracking-wide">
                                                Level
                                            </p>

                                            <p className="font-bold text-slate-900 dark:text-white mt-1">
                                                {review.current_level}
                                            </p>

                                        </div>


                                        {/* Progress */}

                                        <div className="min-w-[150px]">

                                            <div className="flex justify-between text-sm mb-2">

                                                <span className="text-slate-500">
                                                    Progress
                                                </span>

                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {review.progress}%
                                                </span>

                                            </div>

                                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">

                                                <div
                                                    className="h-full bg-emerald-500 rounded-full"
                                                    style={{
                                                        width: `${review.progress}%`
                                                    }}
                                                />

                                            </div>

                                        </div>


                                        {/* Action */}

                                        <button
                                            onClick={() =>
                                                approveLevel(
                                                    review
                                                )
                                            }
                                            disabled={
                                                approvingId ===
                                                review.student_skill_id
                                            }
                                            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                        >

                                            {approvingId ===
                                            review.student_skill_id ? (

                                                <>
                                                    <Loader2
                                                        size={18}
                                                        className="animate-spin"
                                                    />

                                                    Approving...
                                                </>

                                            ) : (

                                                <>
                                                    <CheckCircle2
                                                        size={18}
                                                    />

                                                    Approve Level
                                                </>

                                            )}

                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}
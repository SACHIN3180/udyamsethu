
import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ArrowRight,
    BriefcaseBusiness,
    ShieldCheck,
    Users,
    ChartNoAxesCombined,
    Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo (1).png";

const EmployerLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = formData.email.trim();
        const password = formData.password;

        if (!email || !password.trim()) {
            setError("Please enter your work email and password.");
            return;
        }

        // Frontend-only navigation. No credentials are verified.
        console.log("Employer login submitted:", {
            email,
            remember: formData.remember,
        });

        navigate("/udyamsethu/company", {
            replace: true,
            state: {
                email,
                role: "employer",
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">

            {/* LEFT PANEL */}
            <section className="relative hidden overflow-hidden bg-[#17152F] lg:flex lg:w-[55%]">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-400/20 blur-3xl" />

                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                        backgroundSize: "45px 45px",
                    }}
                />

                <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

                    {/* LOGO */}
                    <button
                        type="button"
                        onClick={() => navigate("/udyamsethu/")}
                        className="w-fit rounded-2xl bg-white p-2 shadow-lg transition hover:scale-[1.02]"
                        aria-label="Go to Udyam Sethu home"
                    >
                        <img
                            src={logo}
                            alt="Udyam Sethu"
                            className="h-14 w-48 object-contain"
                        />
                    </button>

                    {/* INTRODUCTION */}
                    <div className="my-12 max-w-xl">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/5 px-4 py-2 text-sm text-violet-200">
                            <BriefcaseBusiness size={17} />
                            Employer Workspace
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                            Discover talent.
                            <span className="mt-2 block text-violet-300">
                                Build your future.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 xl:text-lg">
                            Connect with emerging talent, publish opportunities, review
                            applications, and build your team through Udyam Sethu.
                        </p>

                        {/* FEATURE CARDS */}
                        <div className="mt-10 grid grid-cols-3 gap-3 xl:gap-4">

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm xl:p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-400/15 text-violet-300">
                                    <Users size={19} />
                                </div>
                                <p className="text-sm font-semibold text-white">
                                    Talent
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-400">
                                    Discover candidates
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm xl:p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                                    <ChartNoAxesCombined size={19} />
                                </div>
                                <p className="text-sm font-semibold text-white">
                                    Insights
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-400">
                                    Track applications
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm xl:p-4">
                                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/15 text-amber-300">
                                    <Building2 size={19} />
                                </div>
                                <p className="text-sm font-semibold text-white">
                                    Hiring
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-400">
                                    Manage opportunities
                                </p>
                            </div>

                        </div>
                    </div>

                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} Udyam Sethu. All rights reserved.
                    </p>
                </div>
            </section>

            {/* RIGHT PANEL */}
            <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:min-h-0 lg:w-[45%]">
                <div className="w-full max-w-md">

                    {/* MOBILE LOGO */}
                    <button
                        type="button"
                        onClick={() => navigate("/udyamsethu/")}
                        className="mx-auto mb-9 flex items-center justify-center gap-3 lg:hidden"
                    >
                        <img
                            src={logo}
                            alt="Udyam Sethu"
                            className="h-12 max-w-48 object-contain"
                        />
                    </button>

                    {/* HEADING */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <BriefcaseBusiness size={19} />
                            </div>

                            <span className="text-sm font-semibold tracking-wide text-violet-600">
                                EMPLOYER PORTAL
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 leading-6 text-slate-500">
                            Sign in to manage your hiring activities and connect with talent.
                        </p>
                    </div>

                    {/* LOGIN CARD */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
                        <form onSubmit={handleSubmit} noValidate>

                            {/* EMAIL */}
                            <div className="mb-5">
                                <label
                                    htmlFor="employer-email"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Work Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="employer-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@company.com"
                                        autoComplete="username"
                                        required
                                        className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-11 pr-4 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                                    />
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="mb-4">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label
                                        htmlFor="employer-password"
                                        className="text-sm font-medium text-slate-700"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setError("Employer password recovery is not configured yet.")
                                        }
                                        className="text-sm font-medium text-violet-600 hover:text-violet-800"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="relative">
                                    <LockKeyhole
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        id="employer-password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="h-12 w-full rounded-lg border border-slate-300 bg-slate-50 pl-11 pr-12 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* REMEMBER ME */}
                            <div className="mb-5 flex items-center gap-2">
                                <input
                                    id="employer-remember"
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="h-4 w-4 cursor-pointer accent-violet-600"
                                />

                                <label
                                    htmlFor="employer-remember"
                                    className="cursor-pointer text-sm text-slate-600"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* ERROR MESSAGE */}
                            {error && (
                                <div
                                    role="alert"
                                    className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                >
                                    {error}
                                </div>
                            )}

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#17152F] font-semibold text-white shadow-lg shadow-violet-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-950 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-500/20"
                            >
                                Sign in to Employer Portal
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        {/* SECURITY */}
                        <div className="my-7 flex items-center gap-3">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="text-xs uppercase tracking-wide text-slate-400">
                                Employer Access
                            </span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>


                        {/* REGISTER LINK */}
                        <div className="mt-5 border-t border-slate-100 pt-5 text-center">
                            <p className="text-sm text-slate-500">
                                Don't have an employer account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/udyamsethu/employer-register")}
                                    className="font-semibold text-violet-600 transition hover:text-violet-800 hover:underline"
                                >
                                    Register here
                                </button>
                            </p>
                        </div>
                        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                            <p className="text-sm text-slate-500">
                                Need assistance?
                                <a
                                    href="mailto:support@udyamsethu.com"
                                    className="ml-1 font-semibold text-violet-600 hover:text-violet-800"
                                >
                                    Contact Support
                                </a>
                            </p>
                           
                        </div>


                    </div>

                    {/* FOOTER */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <LockKeyhole size={13} />
                        Udyam Sethu Employer Management Portal
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/udyamsethu/portals")}
                        className="mt-5 block w-full text-center text-sm font-medium text-slate-500 transition hover:text-violet-700"
                    >
                        ← Back to portal selection
                    </button>
                </div>
            </section>
        </div>
    );
};

export default EmployerLogin;

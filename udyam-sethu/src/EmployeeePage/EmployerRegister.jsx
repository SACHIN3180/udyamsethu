
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Building2,
    BriefcaseBusiness,
    Users,
    GraduationCap,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Mail,
    UserRound,
    Phone,
    Globe,
    LockKeyhole,
    MapPin,
    Clock,
} from "lucide-react";

export default function EmployerRegister() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successData, setSuccessData] = useState(null);

    const [formData, setFormData] = useState({
        companyName: "",
        fullName: "",
        email: "",
        phone: "",
        website: "",
        industry: "",
        companySize: "",
        location: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.agreeTerms) {
            setError("Please accept the Terms and Privacy Policy.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/employer/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Registration failed. Please try again.");
            }

            setSuccessData(data);
            setIsSubmitted(true);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700";

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Header */}
            <header className="flex h-[76px] items-center justify-between border-b border-slate-100 px-5 sm:px-10 lg:px-16">
                <Link
                    to="/udyamsethu/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                        <GraduationCap size={26} />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                            Udyam <span className="text-indigo-600">Sethu</span>
                        </h1>
                        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
                            Connecting Careers
                        </p>
                    </div>
                </Link>

                <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                    Already registered?
                    <Link
                        to="/udyamsethu/employer-login"
                        className="font-bold text-indigo-600 hover:text-indigo-800"
                    >
                        Sign in
                    </Link>
                </div>
            </header>

            <main className="grid min-h-[calc(100vh-76px)] lg:grid-cols-[0.85fr_1.15fr]">
                {/* Left information panel */}
                <section className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-10 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-16">
                    <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full border border-white/10" />
                    <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-white/10" />
                    <div className="absolute right-10 top-1/2 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-indigo-100">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            EMPLOYER REGISTRATION
                        </span>

                        <h2 className="mt-8 max-w-lg text-4xl font-extrabold leading-tight xl:text-5xl">
                            Find the right talent.
                            <span className="mt-2 block text-indigo-300">
                                Build the future.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-md text-base leading-7 text-indigo-100/75">
                            Join Udyam Sethu to connect with talented students,
                            discover emerging skills, and build your next great team.
                        </p>

                        <div className="mt-10 space-y-6">
                            {[
                                {
                                    icon: Users,
                                    title: "Access emerging talent",
                                    text: "Discover students and graduates ready to grow.",
                                },
                                {
                                    icon: BriefcaseBusiness,
                                    title: "Post career opportunities",
                                    text: "Connect candidates with internships and jobs.",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Manage hiring in one place",
                                    text: "Organize opportunities and candidate applications.",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.title} className="flex gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                                            <Icon size={23} className="text-indigo-200" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{item.title}</h3>
                                            <p className="mt-1 text-sm leading-6 text-indigo-100/65">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 mt-14 border-t border-white/15 pt-6">
                        <div className="flex items-center gap-2 text-sm text-indigo-100/75">
                            <ShieldCheck size={18} />
                            A connected platform for institutions, students, and employers.
                        </div>
                    </div>
                </section>

                {/* Registration form */}
                <section className="flex items-start justify-center px-5 py-10 sm:px-10 lg:items-center lg:px-12 lg:py-12 xl:px-20">
                    <div className="w-full max-w-2xl">
                        <div className="mb-8">
                            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 lg:hidden">
                                <Building2 size={25} />
                            </div>

                            <p className="text-sm font-bold uppercase tracking-[2px] text-indigo-600">
                                Employer Portal
                            </p>

                            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                Create your account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                                Set up your company profile and start connecting
                                with the next generation of professionals.
                            </p>
                        </div>

                        {isSubmitted ? (
                            <div className="rounded-3xl border border-indigo-100 bg-white p-8 sm:p-10 shadow-xl shadow-indigo-100/40 text-center">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
                                    <Clock size={32} className="animate-pulse" />
                                </div>

                                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
                                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                                    STATUS: PENDING ADMIN APPROVAL
                                </div>

                                <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                    Registration Request Sent!
                                </h2>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                                    Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Your employer account registration for <span className="font-semibold text-indigo-600">{formData.companyName}</span> has been securely transmitted to the <strong className="text-slate-900">Admin Portal</strong>.
                                </p>

                                <div className="my-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left text-xs sm:text-sm space-y-2">
                                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-medium">Company</span>
                                        <span className="text-slate-900 font-semibold">{formData.companyName}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-medium">Work Email</span>
                                        <span className="text-slate-900 font-semibold">{formData.email}</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                                        <span className="text-slate-500 font-medium">Contact Phone</span>
                                        <span className="text-slate-900 font-semibold">{formData.phone}</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-slate-500 font-medium">Next Step</span>
                                        <span className="text-amber-700 font-semibold">Admin Verification</span>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-indigo-50/60 border border-indigo-100/80 p-4 text-xs leading-5 text-indigo-950 text-left">
                                    <div className="flex gap-2.5">
                                        <ShieldCheck size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                                        <span>
                                            Once the platform administrator reviews and <strong>accepts</strong> your request, your login credentials will immediately become active, allowing you to access the employer dashboard.
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/udyamsethu/employer-login")}
                                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl"
                                    >
                                        Go to Employer Login
                                        <ArrowRight size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/udyamsethu/")}
                                        className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                                    >
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        ) : (
                        <form onSubmit={handleSubmit} className="space-y-7">
                            {/* Company details */}
                            <div>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Building2 size={19} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Company information
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Tell us about your organization
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>
                                            Company / Organization Name *
                                        </label>
                                        <input
                                            className={inputClass}
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="e.g. Acme Technologies"
                                            autoComplete="organization"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Industry *</label>
                                        <select
                                            className={inputClass}
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select industry</option>
                                            <option>Information Technology</option>
                                            <option>Education</option>
                                            <option>Engineering</option>
                                            <option>Healthcare</option>
                                            <option>Finance & Banking</option>
                                            <option>Manufacturing</option>
                                            <option>Consulting</option>
                                            <option>Retail & E-commerce</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Company Size *</label>
                                        <select
                                            className={inputClass}
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select company size</option>
                                            <option>1–10 employees</option>
                                            <option>11–50 employees</option>
                                            <option>51–200 employees</option>
                                            <option>201–500 employees</option>
                                            <option>501–1000 employees</option>
                                            <option>1000+ employees</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Company Website</label>
                                        <div className="relative">
                                            <Globe
                                                size={18}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                className={`${inputClass} pl-10`}
                                                name="website"
                                                type="url"
                                                value={formData.website}
                                                onChange={handleChange}
                                                placeholder="https://company.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Company Location *</label>
                                        <div className="relative">
                                            <MapPin
                                                size={18}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                className={`${inputClass} pl-10`}
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="City, State"
                                                autoComplete="address-level2"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Contact details */}
                            <div>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <UserRound size={19} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Contact information
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Who will manage this employer account?
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className={labelClass}>Full Name *</label>
                                        <input
                                            className={inputClass}
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>Work Email *</label>
                                        <div className="relative">
                                            <Mail
                                                size={18}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                className={`${inputClass} pl-10`}
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@company.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Phone Number *</label>
                                        <div className="relative">
                                            <Phone
                                                size={18}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            />
                                            <input
                                                className={`${inputClass} pl-10`}
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                autoComplete="tel"
                                                pattern="[+]?[0-9 ()-]{10,18}"
                                                title="Enter a valid phone number."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100" />

                            {/* Account security */}
                            <div>
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <LockKeyhole size={19} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Secure your account
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            Choose a strong password
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className={labelClass}>Password *</label>
                                        <div className="relative">
                                            <input
                                                className={`${inputClass} pr-12`}
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Minimum 8 characters"
                                                autoComplete="new-password"
                                                minLength={8}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={19} />
                                                ) : (
                                                    <Eye size={19} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>Confirm Password *</label>
                                        <div className="relative">
                                            <input
                                                className={`${inputClass} pr-12`}
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="Re-enter password"
                                                autoComplete="new-password"
                                                minLength={8}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                                aria-label={
                                                    showConfirmPassword
                                                        ? "Hide confirm password"
                                                        : "Show confirm password"
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={19} />
                                                ) : (
                                                    <Eye size={19} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex cursor-pointer items-start gap-3">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
                                    required
                                />
                                <span className="text-sm leading-6 text-slate-500">
                                    I agree to the{" "}
                                    <Link
                                        to="/udyamsethu/terms"
                                        className="font-semibold text-indigo-600 hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/udyamsethu/privacy"
                                        className="font-semibold text-indigo-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </span>
                            </label>

                            {/* Feedback */}
                            {error && (
                                <div
                                    role="alert"
                                    className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? "Creating account..." : "Create Employer Account"}
                                <ArrowRight size={19} />
                            </button>

                            <p className="text-center text-sm text-slate-500 sm:hidden">
                                Already have an account?{" "}
                                <Link
                                    to="/udyamsethu/employer/login"
                                    className="font-bold text-indigo-600"
                                >
                                    Sign in
                                </Link>
                            </p>

                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                                <CheckCircle2 size={15} />
                                Your information is used to set up your employer profile.
                            </div>
                        </form>
                        )}

                        <p className="mt-8 text-center text-xs text-slate-400">
                            © {new Date().getFullYear()} Udyam Sethu. All rights reserved.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

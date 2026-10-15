
import React, { useState } from "react";
import {
  Building2,
  Mail,
  UserRound,
  Phone,
  BriefcaseBusiness,
  Globe,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  CheckCircle2,
  ChevronDown,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo (1).png";

export default function InstitutionAdminRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    institutionName: "",
    institutionType: "",
    adminName: "",
    designation: "",
    email: "",
    phone: "",
    website: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please accept the terms and privacy policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/institution/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed. Please try again.");
      }

      setSuccessData(result);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-12 rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400";

  return (
    <div className="min-h-screen bg-[#f5f8fc] lg:grid lg:grid-cols-[0.88fr_1.12fr]">

      {/* LEFT BRANDING PANEL */}
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#0b1f3a] lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          <button
            type="button"
            onClick={() => navigate("/udyamsethu/")}
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-lg transition hover:shadow-xl"
          >
            <img
              src={logo}
              alt="Udyam Sethu"
              className="h-12 w-40 object-contain"
            />
          </button>
        </div>

        <div className="relative z-10 my-12 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-200">
            <GraduationCap size={17} />
            Institution Partner Network
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
            Empower your institution.
            <span className="mt-2 block text-cyan-300">
              Unlock student potential.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 xl:text-lg">
            Bring students, academic teams, employers and placement
            opportunities together on one connected platform.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                title: "Centralized student management",
                description:
                  "Organize student profiles and academic information.",
              },
              {
                title: "Placement & opportunity tracking",
                description:
                  "Help students connect with career opportunities.",
              },
              {
                title: "Performance insights",
                description:
                  "Monitor progress and institutional outcomes.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                  <CheckCircle2 size={17} />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.06] p-5">
            <ShieldCheck className="mb-3 text-cyan-300" size={25} />
            <p className="font-semibold text-white">
              Built for institutional collaboration
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Create your institution profile to begin the onboarding process.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-400">
          © {new Date().getFullYear()} Udyam Sethu. All rights reserved.
        </div>
      </aside>

      {/* RIGHT REGISTRATION AREA */}
      <main className="flex min-h-screen flex-col px-4 py-6 sm:px-8 sm:py-10 lg:px-10 xl:px-16">

        {/* MOBILE HEADER */}
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => navigate("/udyamsethu/")}
            className="rounded-xl bg-white p-2 shadow-sm"
          >
            <img
              src={logo}
              alt="Udyam Sethu"
              className="h-10 w-36 object-contain"
            />
          </button>

          <Link
            to="/udyamsethu/institution/login"
            className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
          >
            Sign in
          </Link>
        </div>

        <div className="mx-auto my-auto w-full max-w-2xl">

          {/* PAGE HEADING */}
          <div className="mb-7">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft size={16} />
              Go back
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
              <Building2 size={24} />
            </div>

            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              Institution administration
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Register your institution
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Create your administrator profile and provide your institution
              details to get started with Udyam Sethu.
            </p>
          </div>

          {/* REGISTRATION FORM CARD */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/40 sm:p-8">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
                  <Clock size={32} className="animate-pulse" />
                </div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  STATUS: AWAITING ADMIN APPROVAL
                </div>

                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Registration Request Submitted
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base max-w-lg mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.adminName}</strong>. Your institution registration request for <strong className="text-cyan-800">{formData.institutionName}</strong> has been transmitted to the <strong className="text-slate-900">Admin Portal</strong>.
                </p>

                <div className="my-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left text-xs sm:text-sm space-y-2.5 max-w-lg mx-auto">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Institution</span>
                    <span className="text-slate-900 font-semibold">{formData.institutionName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Type</span>
                    <span className="text-slate-900 font-semibold">{formData.institutionType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 font-medium">Official Email</span>
                    <span className="text-slate-900 font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-medium">Approval Status</span>
                    <span className="text-amber-700 font-semibold">Pending Admin Acceptance</span>
                  </div>
                </div>

                <div className="rounded-xl bg-cyan-50/70 border border-cyan-100 p-4 text-xs leading-5 text-cyan-950 text-left max-w-lg mx-auto">
                  <div className="flex gap-2.5">
                    <ShieldCheck size={18} className="text-cyan-700 shrink-0 mt-0.5" />
                    <span>
                      As soon as the platform administrator reviews and <strong>accepts</strong> your registration in the Head Admin Portal, your login credentials will be activated immediately.
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <button
                    type="button"
                    onClick={() => navigate("/udyamsethu/institution-login")}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#12345b] hover:shadow-xl"
                  >
                    Go to Institution Login
                    <ArrowRight size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/udyamsethu/")}
                    className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Home
                  </button>
                </div>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* INSTITUTION DETAILS */}
              <section>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Institution details
                    </h4>
                    <p className="text-xs text-slate-500">
                      Tell us about your organization.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="institutionName" className={labelClass}>
                      Institution name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 size={18} className={iconClass} />
                      <input
                        id="institutionName"
                        name="institutionName"
                        type="text"
                        value={formData.institutionName}
                        onChange={handleChange}
                        placeholder="Enter official institution name"
                        className={inputClass}
                        autoComplete="organization"
                        maxLength={150}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="institutionType" className={labelClass}>
                        Institution type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap
                          size={18}
                          className={iconClass}
                        />
                        <select
                          id="institutionType"
                          name="institutionType"
                          value={formData.institutionType}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10`}
                          required
                        >
                          <option value="">Select type</option>
                          <option value="University">University</option>
                          <option value="Engineering College">
                            Engineering College
                          </option>
                          <option value="Degree College">
                            Degree College
                          </option>
                          <option value="Polytechnic">Polytechnic</option>
                          <option value="Training Institute">
                            Training Institute
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown
                          size={17}
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className={labelClass}>
                        Website <span className="font-normal text-slate-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Globe size={18} className={iconClass} />
                        <input
                          id="website"
                          name="website"
                          type="url"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://example.edu"
                          className={inputClass}
                          autoComplete="url"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ADMIN DETAILS */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <UserRound size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Administrator details
                    </h4>
                    <p className="text-xs text-slate-500">
                      Who will manage this account?
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="adminName" className={labelClass}>
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <UserRound size={18} className={iconClass} />
                      <input
                        id="adminName"
                        name="adminName"
                        type="text"
                        value={formData.adminName}
                        onChange={handleChange}
                        placeholder="Enter administrator's full name"
                        className={inputClass}
                        autoComplete="name"
                        maxLength={100}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="designation" className={labelClass}>
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BriefcaseBusiness size={18} className={iconClass} />
                        <input
                          id="designation"
                          name="designation"
                          type="text"
                          value={formData.designation}
                          onChange={handleChange}
                          placeholder="e.g. Placement Officer"
                          className={inputClass}
                          maxLength={100}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Mobile number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={18} className={iconClass} />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className={inputClass}
                          autoComplete="tel"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          title="Enter a 10-digit mobile number."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Official email address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={18} className={iconClass} />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="admin@institution.edu"
                        className={inputClass}
                        autoComplete="email"
                        maxLength={254}
                        required
                      />
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-400">
                      Use an email address you can access for account
                      verification and important updates.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECURITY DETAILS */}
              <section className="border-t border-slate-100 pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <LockKeyhole size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Create your password
                    </h4>
                    <p className="text-xs text-slate-500">
                      Keep your administrator account secure.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="password" className={labelClass}>
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <LockKeyhole size={18} className={iconClass} />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className={`${inputClass} pr-12`}
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Use at least 8 characters.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <LockKeyhole size={18} className={iconClass} />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your password again"
                        className={`${inputClass} pr-12`}
                        autoComplete="new-password"
                        minLength={8}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((prev) => !prev)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {formData.confirmPassword.length > 0 && (
                      <p
                        className={`mt-2 text-xs ${
                          formData.password === formData.confirmPassword
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {formData.password === formData.confirmPassword
                          ? "Passwords match."
                          : "Passwords do not match."}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* TERMS */}
              <div className="border-t border-slate-100 pt-6">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-cyan-700"
                    required
                  />
                  <span className="text-sm leading-6 text-slate-600">
                    I agree to the platform's{" "}
                    <a
                      href="/udyamsethu/terms"
                      className="font-semibold text-cyan-700 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/udyamsethu/privacy"
                      className="font-semibold text-cyan-700 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* ERROR / STATUS MESSAGE */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
                >
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0b1f3a] px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#12345b] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create institution account"}
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Your information will be used to set up your institution
                administrator account.
              </p>
            </form>
            )}
          </div>

          {/* SIGN IN LINK */}
          <div className="mt-7 text-center">
            <p className="text-sm text-slate-500">
              Already registered?
              <Link
                to="/udyamsethu/institution/login"
                className="ml-1.5 font-bold text-cyan-700 hover:text-cyan-800 hover:underline"
              >
                Sign in to your account
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Secure Institution Administration Portal
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Building2,
  ShieldCheck,
  BarChart3,
  Users,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo (1).png";

const InstitutionAdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Institution Admin Login:", formData);

    // After successful API login:
    navigate("/udyamsethu/institution");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0B1F3A]">

        {/* Background Glow */}

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-3xl" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full p-14">

          {/* =================================================
              LOGO
          ================================================== */}

          <div
            onClick={() => navigate("/udyamsethu/")}
            className="cursor-pointer w-fit"
          >

            <div className="flex items-center gap-3">

              <a href="/udyamsethu/" className="flex items-center gap-3">
                <div className="relative flex h-16 w-52 items-center justify-center rounded-2xl overflow-hidden bg-white border border-white/20 shadow-lg">

                  <img
                    src={logo}
                    alt="Udyam Sethu Logo"
                    className="w-full h-full object-contain p-2 bg-lightblue-500"
                  />

                  {/* <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-white" /> */}

                </div>

              </a>

              <div>

              </div>

            </div>

          </div>


          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div className="max-w-xl">

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 text-sm mb-7">

              <ShieldCheck size={16} />

              Institution Administration

            </div>


            {/* Heading */}

            <h2 className="text-5xl font-bold text-white leading-tight">

              Manage your institution

              <span className="block text-cyan-300">
                smarter and better.
              </span>

            </h2>


            {/* Description */}

            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-lg">

              Manage students, departments, placements, assessments and
              institutional performance from one centralized platform.

            </p>


            {/* =================================================
                FEATURE CARDS
            ================================================== */}

            <div className="grid grid-cols-3 gap-4 mt-10">

              {/* Students */}

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-3">

                  <Users
                    size={19}
                    className="text-cyan-300"
                  />

                </div>

                <p className="text-white font-semibold text-sm">
                  Students
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  Manage students
                </p>

              </div>


              {/* Analytics */}

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-3">

                  <BarChart3
                    size={19}
                    className="text-cyan-300"
                  />

                </div>

                <p className="text-white font-semibold text-sm">
                  Analytics
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  Track performance
                </p>

              </div>


              {/* Departments */}

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">

                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-3">

                  <GraduationCap
                    size={19}
                    className="text-cyan-300"
                  />

                </div>

                <p className="text-white font-semibold text-sm">
                  Departments
                </p>

                <p className="text-slate-400 text-xs mt-1">
                  Manage departments
                </p>

              </div>

            </div>

          </div>


          {/* Footer */}

          <div className="text-slate-400 text-sm">

            © {new Date().getFullYear()} Udyam Sethu. All rights reserved.

          </div>

        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">


          {/* =================================================
              MOBILE LOGO
          ================================================== */}

          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">

            <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center">

              <span className="text-white text-xl font-bold">
                U
              </span>

            </div>

            <h1 className="text-2xl font-bold text-[#0B1F3A]">
              Udyam Sethu
            </h1>

          </div>


          {/* =================================================
              HEADING
          ================================================== */}

          <div className="mb-8">

            <div className="flex items-center gap-2 mb-3">

              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">

                <Building2
                  size={17}
                  className="text-cyan-600"
                />

              </div>

              <p className="text-sm font-semibold text-cyan-600">
                INSTITUTION ADMIN
              </p>

            </div>


            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to manage your institution and access analytics.
            </p>

          </div>


          {/* =================================================
              LOGIN CARD
          ================================================== */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  EMAIL
              ================================================== */}

              <div className="mb-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Official Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@institution.edu"
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-lg
                      border
                      border-slate-300
                      bg-slate-50
                      text-slate-900
                      outline-none
                      transition
                      focus:border-cyan-500
                      focus:ring-4
                      focus:ring-cyan-500/10
                      focus:bg-white
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div className="mb-4">

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="
                      text-sm
                      font-medium
                      text-cyan-600
                      hover:text-cyan-700
                      cursor-pointer
                    "
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-12
                      rounded-lg
                      border
                      border-slate-300
                      bg-slate-50
                      text-slate-900
                      outline-none
                      transition
                      focus:border-cyan-500
                      focus:ring-4
                      focus:ring-cyan-500/10
                      focus:bg-white
                    "
                  />


                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      hover:text-slate-600
                      cursor-pointer
                    "
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* =================================================
                  REMEMBER ME
              ================================================== */}

              <div className="flex items-center gap-2 mb-6">

                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 accent-cyan-600 cursor-pointer"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Remember me
                </label>

              </div>


              {/* =================================================
                  LOGIN BUTTON
              ================================================== */}

              <button
                onClick={() => navigate("/udyamsethu/institution")}
                type="submit"
                className="
                  w-full
                  h-12
                  rounded-lg
                  bg-[#0B1F3A]
                  hover:bg-[#102B4F]
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  duration-200
                  shadow-lg
                  shadow-[#0B1F3A]/20
                  hover:shadow-xl
                  hover:-translate-y-[1px]
                  cursor-pointer
                "
              >

                Sign in to Admin Portal

                <ArrowRight size={18} />

              </button>

            </form>


            {/* =================================================
                SECURE ACCESS
            ================================================== */}

            <div className="flex items-center gap-3 my-7">

              <div className="h-px bg-slate-200 flex-1" />

              <span className="text-xs text-slate-400 uppercase tracking-wide">
                Secure Access
              </span>

              <div className="h-px bg-slate-200 flex-1" />

            </div>


            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">

              <ShieldCheck size={16} />

              <span>
                Protected institution administrator access
              </span>

            </div>


            {/* =================================================
                SUPPORT
            ================================================== */}

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">

              <p className="text-sm text-slate-500">

                Having trouble accessing your account?

                <button
                  type="button"
                  className="
                    ml-1
                    font-semibold
                    text-cyan-600
                    hover:text-cyan-700
                    hover:underline
                    cursor-pointer
                  "
                >
                  Contact Support
                </button>

              </p>

            </div>

          </div>


          {/* =================================================
              BOTTOM
          ================================================== */}

          <div className="flex items-center justify-center gap-2 mt-6">

            <LockKeyhole
              size={13}
              className="text-slate-400"
            />

            <p className="text-xs text-slate-400">
              Udyam Sethu Institution Management Portal
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InstitutionAdminLogin;
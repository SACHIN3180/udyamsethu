import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/logo (1).png";


const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    usn: "",
    parentMobile: "",
    organization: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   console.log("Signup Data:", formData);

  //   // After successful registration
  //   navigate("/udyamsethu/login");
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    //Password Validation
    if(formData.password !== formData.confirmPassword){
      alert("Password does not match");
      return;
    }

    try{
      const   response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              mobile: formData.mobile,
              usn: formData.usn,
              parentMobile: formData.parentMobile,
              organization: formData.organization,
              password: formData.password,
              confirmPassword: formData.confirmPassword,

            })
        }
      )

      const data = await response.json();
       if(!response.ok){
      alert(data.message);
      return;
  } 
  console.log("Signup successful:",data);
  alert("Account created successfully");
  navigate("/udyamsethu/login")
    }
     catch (error){
        console.error("Sigin error",error);

         alert(
            "Unable to connect to the server. Please make sure the backend is running."
        );
        
    }

  }  

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#0B1F3A]">

        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full p-12">

          {/* Logo */}
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
          </div>

          {/* Main Content */}
          <div className="max-w-lg">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-blue-200 text-sm mb-6">
              <ShieldCheck size={16} />
              Secure Enterprise Platform
            </div>

            <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Connect your
              <span className="block text-blue-300">
                enterprise ecosystem.
              </span>
            </h2>

            <p className="mt-6 text-slate-300 text-base leading-7 max-w-md">
              Create your Udyam Sethu account and bring your enterprise,
              institutions and workforce together through one intelligent
              platform.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Building2 size={19} className="text-blue-300" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Enterprise Management
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Manage your organization and business ecosystem
                    efficiently.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <CheckCircle2 size={19} className="text-blue-300" />
                </div>

                <div>
                  <h3 className="text-white font-semibold">
                    Centralized Analytics
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Access meaningful insights from a single dashboard.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="text-slate-400 text-xs">
            © 2026 Udyam Sethu. All rights reserved.
          </div>

        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-xl">

          {/* Mobile Logo */}
          <div
            onClick={() => navigate("/udyamsethu/")}
            className="lg:hidden flex items-center gap-3 mb-8 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                U
              </span>
            </div>

            <div>
              <h1 className="text-[#0B1F3A] text-xl font-bold">
                Udyam Sethu
              </h1>

              <p className="text-slate-500 text-xs">
                Enterprise Analytics Platform
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">

            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
              <User
                size={24}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="text-slate-500 mt-2">
              Get started with Udyam Sethu today.
            </p>

          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                  />
                </div>
              </div>

              {/* Email + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mobile Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                    />
                  </div>
                </div>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    USN
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="usn"
                      value={formData.usn}
                      onChange={handleChange}
                      placeholder="Enter your USN"
                      required
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Parent Mobile Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="parentMobile"
                      value={formData.parentMobile}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                    />
                  </div>
                </div>

              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Organization
                </label>

                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Enter your organization"
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">

                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <p className="text-xs text-slate-500 leading-5">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Terms & Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#0B1F3A] text-white font-semibold text-sm flex items-center justify-center gap-2 transition hover:bg-[#102D52] hover:shadow-lg hover:shadow-blue-900/10 active:scale-[0.99]"
              >
                Create Account
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 pt-6 border-t border-slate-100 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?{" "}

                <button
                  onClick={() => navigate("/udyamsethu/login")}
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                >
                  Sign in
                </button>

              </p>

            </div>

          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Your information is protected with enterprise-grade security
          </div>

        </div>
      </div>

    </div>
  );
};

export default Signup;
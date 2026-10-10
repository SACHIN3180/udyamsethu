
import React, { useState } from "react";
import { Mail, ArrowRight, LockKeyhole, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo (1).png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async(e) => {
    
    e.preventDefault();

    if(!email){
      return;
    }

    try{
      const response = await fetch("http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:email
          })
        }
      )
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return
      }
      alert (data.message);

      setEmail("")
    } catch(error){
      console.error("Forgot password error",error);
      
      alert(
        "Unable to connect to the server. Please make sure the backend is running"
      )
    }

   };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0B1F3A]">

        {/* Background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between w-full p-14">

          {/* Logo */}
          <a href="/udyamsethu/" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-16 w-52 items-center justify-center rounded-2xl overflow-hidden bg-white border border-white/20 shadow-lg">

                <img
                  src={logo}
                  alt="Udyam Sethu Logo"
                  className="w-full h-full object-contain p-2"
                />

              </div>
            </div>
          </a>

          {/* Main Content */}
          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-300/20 bg-white/5 text-cyan-300 text-sm mb-7">

              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              Smart Business Intelligence

            </div>

            <h2 className="text-5xl font-bold text-white leading-tight">

              Turn your business

              <span className="block text-cyan-300">
                data into insights.
              </span>

            </h2>

            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-lg">

              Udyam Sethu brings your business data together into a
              powerful analytics and visualization platform.

            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">

                <div className="text-cyan-300 text-2xl font-bold">
                  360°
                </div>

                <p className="text-slate-300 text-sm mt-1">
                  Business Visibility
                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">

                <div className="text-cyan-300 text-2xl font-bold">
                  Real-time
                </div>

                <p className="text-slate-300 text-sm mt-1">
                  Data Insights
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

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
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

          {/* Heading */}
          <div className="mb-8">

            <p className="text-sm font-medium text-cyan-600 mb-2">
              PASSWORD RECOVERY
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Forgot your password?
            </h2>

            <p className="text-slate-500 mt-2">
              Enter your registered email address or USN and we'll help you
              reset your password.
            </p>

          </div>

          {/* Forgot Password Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">

            <form onSubmit={handleSubmit}>

              {/* Email / USN */}
              <div className="mb-6">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address or USN
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email or USN"
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

              {/* Reset Button */}
              <button
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
                Send Reset Link
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">

              <div className="h-px bg-slate-200 flex-1" />

              <span className="text-xs text-slate-400 uppercase">
                Secure access
              </span>

              <div className="h-px bg-slate-200 flex-1" />

            </div>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">

              <LockKeyhole size={16} />

              Your connection is protected

            </div>

            {/* Back to Login */}
            <div className="text-center mt-6 pt-6 border-t border-slate-100">

              <button
                type="button"
                onClick={() => navigate("/udyamsethu/login")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-cyan-600
                  hover:text-cyan-700
                  hover:underline
                  cursor-pointer
                "
              >

                <ArrowLeft size={16} />

                Back to Login

              </button>

            </div>

          </div>

          {/* Bottom */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Udyam Sethu Analytics Platform
          </p>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;

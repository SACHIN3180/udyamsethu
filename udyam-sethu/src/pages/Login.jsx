import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo (1).png";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.password) {
      alert("Please enter Email/USN and Password")
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userName: formData.userName,
            password: formData.password
          })

        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("Login successsful:", data);

      //store token
      localStorage.setItem("token", data.token);

      //store user information if need 
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful")

      navigate("/udyamsethu/student");

    } catch (error) {
      console.error("Login error:",error);
      
      alert(
        "Unable to connect to the server. Please make sure the backend is running"
      )
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0B1F3A]">

        {/* Background shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-10"
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
                  className="w-full h-full object-contain p-2 bg-lightblue-500"
                />
              </div>
            </div>
            {/* <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">
                          Udyam<span className="text-blue-600">Sethu</span>
                        </h1>
          
                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Connecting Futures
                        </p>
                      </div> */}

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
              STUDENT PORTAL
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-2">
              Access your dashboards, reports and business insights.
            </p>

          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">

            <form onSubmit={handleSubmit}>

              {/* User Name */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address / User
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
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

              {/* Password */}
              <div className="mb-4">

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/udyamsethu/forgot-password")}
                    className="text-sm font-medium text-cyan-600 hover:text-cyan-700 cursor-pointer"
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

              {/* Remember */}
              <div className="flex items-center gap-2 mb-6">

                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-cyan-600 cursor-pointer"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Remember me
                </label>

              </div>

              {/* Login Button */}
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
                Sign in
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

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <LockKeyhole size={16} />
              Your connection is protected
            </div>

            {/* Signup */}
            <div className="text-center mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/udyamsethu/signup")}
                  className="font-semibold text-cyan-600 hover:text-cyan-700 hover:underline transition 
                  cursor-pointer"
                >
                  Sign up
                </button>
              </p>
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

export default Login;
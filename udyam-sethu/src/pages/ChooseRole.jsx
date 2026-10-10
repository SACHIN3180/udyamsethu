import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Users,
  Search,
  UserPlus,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const ChooseRole = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    {
      id: "gig-seeker",
      title: "Job Seeker",
      description:
        "Find suitable Jobs, discover new opportunities, and apply for work that matches your skills.",
      icon: Search,
      secondaryIcon: BriefcaseBusiness,
      features: [
        "Find relevant Jobs",
        "Apply for opportunities",
        "Track your applications",
      ],
    },
    {
      id: "job-poster",
      title: "Job Poster",
      description:
        "Post Jobs, discover skilled talent, and manage your hiring process from one place.",
      icon: UserPlus,
      secondaryIcon: Users,
      features: [
        "Post new Jobs",
        "Find skilled talent",
        "Manage hiring",
      ],
    },
  ];

  const handleContinue = () => {
    if (!selectedRole) return;

    if (selectedRole === "gig-seeker") {
      navigate("/gig-seeker/dashboard");
    } else {
      navigate("/job-poster/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      {/* TOP NAVBAR */}
      <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-5 lg:px-10">

        {/* LOGO */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#172033] flex items-center justify-center shadow-sm">
            <span className="text-cyan-400 text-xl font-bold">
              U
            </span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#172033]">
              Udyam Sethu
            </h1>

            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Digital Gig Platform
            </p>
          </div>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-700">
              Welcome back
            </p>

            <p className="text-xs text-slate-400">
              Select your workspace
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#172033] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              SP
            </span>
          </div>

        </div>

      </header>

      {/* MAIN CONTENT */}
      <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-12">

        <div className="w-full max-w-5xl">

          {/* HEADER */}
          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-5">

              <ShieldCheck size={16} />

              Your journey starts here

            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Choose your role
            </h2>

            <p className="text-slate-500 mt-3 max-w-xl mx-auto leading-6">
              Tell us how you want to use Udyam Sethu. You can discover
              opportunities or connect with skilled professionals.
            </p>

          </div>

          {/* ROLE CARDS */}
          <div className="grid md:grid-cols-2 gap-6">

            {roles.map((role) => {

              const Icon = role.icon;
              const SecondaryIcon = role.secondaryIcon;

              const isSelected =
                selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`
                    relative
                    text-left
                    rounded-2xl
                    border-2
                    p-7
                    transition-all
                    duration-300
                    bg-white
                    group
                    ${
                      isSelected
                        ? "border-cyan-500 shadow-xl shadow-cyan-500/10"
                        : "border-slate-200 hover:border-cyan-300 hover:shadow-lg"
                    }
                  `}
                >

                  {/* SELECTED */}
                  {isSelected && (
                    <div className="absolute top-5 right-5">
                      <CheckCircle2
                        size={25}
                        className="text-cyan-500"
                      />
                    </div>
                  )}

                  {/* ICON */}
                  <div className="flex items-center gap-3 mb-6">

                    <div
                      className={`
                        w-14
                        h-14
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        transition
                        ${
                          isSelected
                            ? "bg-cyan-500 text-white"
                            : "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white"
                        }
                      `}
                    >
                      <Icon size={27} />
                    </div>

                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                      <SecondaryIcon size={18} />
                    </div>

                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-bold text-slate-900">
                    {role.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-slate-500 mt-3 leading-6">
                    {role.description}
                  </p>

                  {/* FEATURES */}
                  <div className="mt-6 space-y-3">

                    {role.features.map((feature) => (

                      <div
                        key={feature}
                        className="flex items-center gap-3"
                      >

                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />
                        </div>

                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* CARD ACTION */}
                  <div
                    className={`
                      mt-7
                      pt-5
                      border-t
                      flex
                      items-center
                      justify-between
                      ${
                        isSelected
                          ? "border-cyan-100"
                          : "border-slate-100"
                      }
                    `}
                  >

                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          isSelected
                            ? "text-cyan-600"
                            : "text-slate-500"
                        }
                      `}
                    >
                      {isSelected
                        ? "Selected"
                        : "Select this role"}
                    </span>

                    <div
                      className={`
                        w-9
                        h-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        transition
                        ${
                          isSelected
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600"
                        }
                      `}
                    >
                      <ArrowRight size={17} />
                    </div>

                  </div>

                </button>

              );

            })}

          </div>

          {/* CONTINUE */}
          <div className="flex flex-col items-center mt-9">

            <button
              disabled={!selectedRole}
              onClick={handleContinue}
              className={`
                min-w-[220px]
                h-12
                px-6
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                font-semibold
                transition-all
                ${
                  selectedRole
                    ? "bg-[#172033] text-white hover:bg-[#24334d] hover:-translate-y-0.5 shadow-lg cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >

              Continue

              <ArrowRight size={18} />

            </button>

            <p className="text-xs text-slate-400 mt-4">
              You can update your preferences later from your profile.
            </p>

          </div>

          {/* PLATFORM INFO */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400">

            <div className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Secure platform
            </div>

            <div className="flex items-center gap-2">
              <Users size={15} />
              Growing talent network
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 size={15} />
              Data-driven opportunities
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default ChooseRole;
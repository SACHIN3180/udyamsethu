import React, { useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Building2,
  Hash,
  Pencil,
  Camera,
  Save,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Award,
  FileText,
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
  Plus,
  X,
  Upload,
  Globe,
  Heart,
  Target,
  Sparkles,
  Check,
  Lock,
  Eye,
  EyeOff,
  Clock3,
  MapPinned,
  Languages,
  UserRound,
} from "lucide-react";

export default function StudentProfile() {
  /* ======================================================
     THEME
  ====================================================== */

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("udyam-theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("udyam-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/student/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch profile"
          );
        }

        const p = data.profile;

        setProfile({
          fullName: p.fullName || "",
          email: p.email || "",
          phone: p.phone || "",
          usn: p.usn || "",

          location: p.location || "",
          dateOfBirth: p.dateOfBirth || "",
          gender: p.gender || "",

          university: p.university || "",
          course: p.course || "",
          specialization: p.specialization || "",
          year: p.year || "",
          graduationYear: p.graduationYear || "",
          cgpa: p.cgpa || "",

          careerGoal: p.careerGoal || "",
          preferredRole: p.preferredRole || "",
          preferredLocation: p.preferredLocation || "",
          experience: p.experience || "Fresher",

          skills: p.skills || [],

          linkedin: p.linkedin || "",
          github: p.github || "",
          portfolio: p.portfolio || "",

          resume: p.resume || "",

          internshipPreference:
            p.internshipPreference || "",

          workMode: p.workMode || "",

          preferredDomain:
            p.preferredDomain || "",

          languages: p.languages || [],

          profileVisibility:
            p.profileVisibility ?? true,

          jobAlerts:
            p.jobAlerts ?? true,
        });

      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      }
    };

    fetchProfile();
  }, []);

  /* ======================================================
     PROFILE DATA
  ====================================================== */

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    usn: "",

    location: "",
    dateOfBirth: "",
    gender: "",

    university: "",
    course: "",
    specialization: "",
    year: "",
    graduationYear: "",
    cgpa: "",

    careerGoal: "",
    preferredRole: "",
    preferredLocation: "",
    experience: "Fresher",

    skills: [],

    linkedin: "",
    github: "",
    portfolio: "",

    resume: "",

    internshipPreference: "",
    workMode: "",
    preferredDomain: "",

    languages: [],

    profileVisibility: true,
    jobAlerts: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [newSkill, setNewSkill] = useState("");

  const totalSteps = 6;

  /* ======================================================
     STEPS
  ====================================================== */

  const steps = [
    {
      id: 1,
      title: "Personal",
      description: "Basic information",
      icon: User,
    },
    {
      id: 2,
      title: "Education",
      description: "Academic details",
      icon: GraduationCap,
    },
    {
      id: 3,
      title: "Career",
      description: "Career goals",
      icon: Briefcase,
    },
    {
      id: 4,
      title: "Skills",
      description: "Skills & links",
      icon: Award,
    },
    {
      id: 5,
      title: "Resume",
      description: "Resume & preferences",
      icon: FileText,
    },
    {
      id: 6,
      title: "Review",
      description: "Verify profile",
      icon: CheckCircle2,
    },
  ];

  /* ======================================================
     FIELD UPDATE
  ====================================================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ======================================================
     SKILLS
  ====================================================== */

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    if (profile.skills.includes(skill)) {
      setNewSkill("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));

    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  /* ======================================================
     PROFILE COMPLETION
  ====================================================== */

  const completion = useMemo(() => {
    const fields = [
      profile.fullName,
      profile.email,
      profile.phone,
      profile.location,
      profile.university,
      profile.course,
      profile.year,
      profile.usn,
      profile.graduationYear,
      profile.cgpa,
      profile.careerGoal,
      profile.preferredRole,
      profile.preferredLocation,
      profile.skills.length >= 3,
      profile.resume,
      profile.internshipPreference,
      profile.workMode,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round((completed / fields.length) * 100);
  }, [profile]);

  /* ======================================================
     STEP COMPLETION
  ====================================================== */

  const stepCompleted = (step) => {
    if (step === 1) {
      return Boolean(
        profile.fullName &&
        profile.email &&
        profile.phone &&
        profile.location
      );
    }

    if (step === 2) {
      return Boolean(
        profile.university &&
        profile.course &&
        profile.year &&
        profile.usn &&
        profile.graduationYear &&
        profile.cgpa
      );
    }

    if (step === 3) {
      return Boolean(
        profile.careerGoal &&
        profile.preferredRole &&
        profile.preferredLocation
      );
    }

    if (step === 4) {
      return profile.skills.length >= 3;
    }

    if (step === 5) {
      return Boolean(
        profile.resume &&
        profile.internshipPreference &&
        profile.workMode
      );
    }

    if (step === 6) {
      return completion >= 80;
    }

    return false;
  };

  /* ======================================================
     NAVIGATION
  ====================================================== */

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /* ======================================================
     SAVE
  ====================================================== */

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/student/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save profile"
        );
      }

      const p = data.profile;

      setProfile({
        fullName: p.fullName || "",
        email: p.email || "",
        phone: p.phone || "",
        usn: p.usn || "",

        location: p.location || "",
        dateOfBirth: p.dateOfBirth || "",
        gender: p.gender || "",

        university: p.university || "",
        course: p.course || "",
        specialization: p.specialization || "",
        year: p.year || "",
        graduationYear: p.graduationYear || "",
        cgpa: p.cgpa || "",

        careerGoal: p.careerGoal || "",
        preferredRole: p.preferredRole || "",
        preferredLocation: p.preferredLocation || "",
        experience: p.experience || "Fresher",

        skills: Array.isArray(p.skills) ? p.skills : [],

        linkedin: p.linkedin || "",
        github: p.github || "",
        portfolio: p.portfolio || "",

        resume: p.resume || "",

        internshipPreference: p.internshipPreference || "",
        workMode: p.workMode || "",
        preferredDomain: p.preferredDomain || "",

        languages: Array.isArray(p.languages) ? p.languages : [],

        profileVisibility: p.profileVisibility ?? true,
        jobAlerts: p.jobAlerts ?? true,
      });

      alert("Profile saved successfully");

      setIsEditing(false);

    } catch (error) {
      console.error(
        "Save profile error:",
        error
      );

      alert(error.message || "Unable to save profile");
    }
  };

  /* ======================================================
     LOAD SAVED PROFILE
  ====================================================== */

  /* ======================================================
     THEME TOGGLE
  ====================================================== */

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  const initials = profile.fullName
    ? profile.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07111f] text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ==================================================
          TOP HEADER
      ================================================== */}

      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0b1728]/95 backdrop-blur-xl sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-16 flex items-center justify-between">

            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Udyam Sethu</span>
                <ChevronRight size={13} />
                <span className="text-cyan-600 dark:text-cyan-400">
                  Student Profile
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold mt-0.5">
                Build Your Profile
              </h1>
            </div>

            <div className="flex items-center gap-2">

              {/* Profile completion */}
              <div className="hidden sm:flex items-center gap-3 mr-3">

                <div className="text-right">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Profile completion
                  </p>

                  <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                    {completion}%
                  </p>
                </div>

                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>

              </div>

              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun
                    size={18}
                    className="text-amber-400"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-slate-700"
                  />
                )}
              </button>

              {/* Save */}
              <button
                onClick={handleSave}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition"
              >
                <Save size={16} />
                Save
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-700 via-cyan-600 to-blue-700 p-5 sm:p-7 lg:p-8 shadow-xl">

          <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute right-32 -bottom-36 w-80 h-80 rounded-full bg-blue-400/10" />

          <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center">

            {/* Avatar */}
            <div className="relative shrink-0">

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl">

                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {initials}
                </span>

              </div>

              <button
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white text-cyan-700 flex items-center justify-center shadow-lg hover:bg-slate-100 transition"
                title="Change profile photo"
              >
                <Camera size={18} />
              </button>

            </div>

            {/* User */}
            <div className="flex-1 text-white">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-2xl sm:text-3xl font-bold">
                  {profile.fullName}
                </h2>

                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-xs">
                  <CheckCircle2 size={13} />
                  Verified
                </span>

              </div>

              <p className="mt-1 text-cyan-100">
                {profile.course}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-cyan-100">

                <span className="flex items-center gap-1.5">
                  <GraduationCap size={16} />
                  {profile.university}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {profile.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  Class of {profile.graduationYear}
                </span>

              </div>

            </div>

            {/* Completion */}
            <div className="w-full lg:w-64 rounded-2xl bg-black/10 backdrop-blur-md border border-white/20 p-5">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-xs text-cyan-100">
                    Profile strength
                  </p>

                  <p className="text-2xl font-bold text-white mt-1">
                    {completion}%
                  </p>
                </div>

                <Sparkles
                  size={25}
                  className="text-cyan-100"
                />

              </div>

              <div className="h-2 bg-white/20 rounded-full mt-4 overflow-hidden">

                <div
                  className="h-full bg-white rounded-full transition-all duration-700"
                  style={{
                    width: `${completion}%`,
                  }}
                />

              </div>

              <p className="text-[11px] text-cyan-100 mt-3">
                {completion >= 90
                  ? "Excellent! Your profile is almost complete."
                  : "Complete your profile to unlock better opportunities."}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            STEP NAVIGATION
        ================================================= */}

        <div className="mt-6 bg-white dark:bg-[#0b1728] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm">

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">

            {steps.map((step) => {

              const Icon = step.icon;

              const active =
                currentStep === step.id;

              const completed =
                stepCompleted(step.id);

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative p-3 rounded-xl text-left transition-all ${active
                    ? "bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent"
                    }`}
                >

                  <div className="flex items-center gap-2">

                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active
                        ? "bg-cyan-600 text-white"
                        : completed
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                    >
                      {completed && !active ? (
                        <Check size={17} />
                      ) : (
                        <Icon size={17} />
                      )}
                    </div>

                    <div className="hidden sm:block min-w-0">

                      <p
                        className={`text-xs font-semibold ${active
                          ? "text-cyan-700 dark:text-cyan-400"
                          : "text-slate-700 dark:text-slate-200"
                          }`}
                      >
                        {step.title}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {step.description}
                      </p>

                    </div>

                  </div>

                  {active && (
                    <div className="absolute left-3 right-3 -bottom-1 h-0.5 bg-cyan-500 rounded-full" />
                  )}

                </button>
              );
            })}

          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          {/* MAIN FORM */}
          <div className="xl:col-span-2">

            <div className="bg-white dark:bg-[#0b1728] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">

              {/* ==========================================
                  STEP 1
              ========================================== */}

              {currentStep === 1 && (
                <StepContainer
                  number="01"
                  title="Personal Information"
                  description="Tell us about yourself so employers and institutions can understand who you are."
                  icon={User}
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <ProfileInput
                      label="Full Name"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      icon={User}
                    />

                    <ProfileInput
                      label="Email Address"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      icon={Mail}
                    />

                    <ProfileInput
                      label="Phone Number"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      icon={Phone}
                    />

                    <ProfileInput
                      label="Location"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      icon={MapPin}
                    />

                    <ProfileInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      value={profile.dateOfBirth}
                      onChange={handleChange}
                      icon={Calendar}
                      type="date"
                    />

                    <SelectInput
                      label="Gender"
                      name="gender"
                      value={profile.gender}
                      onChange={handleChange}
                      icon={UserRound}
                      options={[
                        "Male",
                        "Female",
                        "Other",
                        "Prefer not to say",
                      ]}
                    />

                  </div>

                  <InfoBox>
                    Your personal information helps Udyam Sethu
                    provide relevant opportunities while keeping
                    your account secure.
                  </InfoBox>

                </StepContainer>
              )}

              {/* ==========================================
                  STEP 2
              ========================================== */}

              {currentStep === 2 && (
                <StepContainer
                  number="02"
                  title="Education"
                  description="Add your academic information to help institutions and employers understand your background."
                  icon={GraduationCap}
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <ProfileInput
                      label="University / Institution"
                      name="university"
                      value={profile.university}
                      onChange={handleChange}
                      icon={Building2}
                    />

                    <ProfileInput
                      label="Course"
                      name="course"
                      value={profile.course}
                      onChange={handleChange}
                      icon={BookOpen}
                    />

                    <ProfileInput
                      label="Specialization"
                      name="specialization"
                      value={profile.specialization}
                      onChange={handleChange}
                      icon={BookOpen}
                      placeholder="e.g. Web Development"
                    />

                    <SelectInput
                      label="Current Year"
                      name="year"
                      value={profile.year}
                      onChange={handleChange}
                      icon={Calendar}
                      options={[
                        "1st Year",
                        "2nd Year",
                        "3rd Year",
                        "Final Year",
                        "Graduated",
                      ]}
                    />

                    <ProfileInput
                      label="USN / Student ID"
                      name="usn"
                      value={profile.usn}
                      onChange={handleChange}
                      icon={Hash}
                    />

                    <ProfileInput
                      label="Graduation Year"
                      name="graduationYear"
                      value={profile.graduationYear}
                      onChange={handleChange}
                      icon={Calendar}
                    />

                    <ProfileInput
                      label="CGPA"
                      name="cgpa"
                      value={profile.cgpa}
                      onChange={handleChange}
                      icon={Award}
                    />

                  </div>

                  <InfoBox>
                    A complete academic profile improves your
                    eligibility matching for internships,
                    assessments and career opportunities.
                  </InfoBox>

                </StepContainer>
              )}

              {/* ==========================================
                  STEP 3
              ========================================== */}

              {currentStep === 3 && (
                <StepContainer
                  number="03"
                  title="Career Goals"
                  description="Tell Udyam Sethu what kind of career opportunities you are looking for."
                  icon={Briefcase}
                >

                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        What is your career goal?
                      </label>

                      <textarea
                        name="careerGoal"
                        value={profile.careerGoal}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Example: I want to start my career as a full-stack developer and work on modern web applications."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <ProfileInput
                        label="Preferred Job Role"
                        name="preferredRole"
                        value={profile.preferredRole}
                        onChange={handleChange}
                        icon={Target}
                        placeholder="e.g. Full Stack Developer"
                      />

                      <ProfileInput
                        label="Preferred Location"
                        name="preferredLocation"
                        value={profile.preferredLocation}
                        onChange={handleChange}
                        icon={MapPinned}
                      />

                      <SelectInput
                        label="Experience Level"
                        name="experience"
                        value={profile.experience}
                        onChange={handleChange}
                        icon={Briefcase}
                        options={[
                          "Fresher",
                          "0-1 Years",
                          "1-2 Years",
                          "2+ Years",
                        ]}
                      />

                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Preferred Work Mode
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                        {[
                          "On-site",
                          "Hybrid",
                          "Remote",
                        ].map((mode) => (

                          <button
                            type="button"
                            key={mode}
                            onClick={() =>
                              setProfile((prev) => ({
                                ...prev,
                                workMode: mode,
                              }))
                            }
                            className={`p-4 rounded-xl border text-sm font-medium transition ${profile.workMode === mode
                              ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400"
                              : "border-slate-200 dark:border-slate-700 hover:border-cyan-300"
                              }`}
                          >
                            {mode}
                          </button>

                        ))}

                      </div>
                    </div>

                  </div>

                </StepContainer>
              )}

              {/* ==========================================
                  STEP 4
              ========================================== */}

              {currentStep === 4 && (
                <StepContainer
                  number="04"
                  title="Skills & Professional Links"
                  description="Add your technical and professional skills so opportunities can find you."
                  icon={Award}
                >

                  {/* Skills */}
                  <div>

                    <label className="block text-sm font-semibold mb-2">
                      Your Skills
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2">

                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) =>
                          setNewSkill(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        placeholder="Add a skill e.g. React.js"
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      />

                      <button
                        type="button"
                        onClick={addSkill}
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold"
                      >
                        <Plus size={17} />
                        Add
                      </button>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">

                      {profile.skills.map((skill) => (

                        <span
                          key={skill}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300 text-sm"
                        >
                          {skill}

                          <button
                            type="button"
                            onClick={() =>
                              removeSkill(skill)
                            }
                            className="hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </span>

                      ))}

                    </div>

                  </div>

                  {/* Links */}
                  <div className="mt-8">

                    <div className="flex items-center gap-2 mb-4">
                      <Globe size={18} className="text-cyan-500" />

                      <h3 className="font-semibold">
                        Professional Links
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-5">

                      <ProfileInput
                        label="LinkedIn Profile"
                        name="linkedin"
                        value={profile.linkedin}
                        onChange={handleChange}
                        icon={Globe}
                        placeholder="https://linkedin.com/in/yourname"
                      />

                      <ProfileInput
                        label="GitHub Profile"
                        name="github"
                        value={profile.github}
                        onChange={handleChange}
                        icon={Globe}
                        placeholder="https://github.com/yourname"
                      />

                      <ProfileInput
                        label="Portfolio Website"
                        name="portfolio"
                        value={profile.portfolio}
                        onChange={handleChange}
                        icon={Globe}
                        placeholder="https://yourportfolio.com"
                      />

                    </div>

                  </div>

                </StepContainer>
              )}

              {/* ==========================================
                  STEP 5
              ========================================== */}

              {currentStep === 5 && (
                <StepContainer
                  number="05"
                  title="Resume & Preferences"
                  description="Upload your latest resume and tell us what opportunities you prefer."
                  icon={FileText}
                >

                  {/* Resume upload */}
                  <div>

                    <label className="block text-sm font-semibold mb-3">
                      Resume
                    </label>

                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 sm:p-8 text-center hover:border-cyan-500 transition">

                      <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center">
                        <Upload
                          size={24}
                          className="text-cyan-600 dark:text-cyan-400"
                        />
                      </div>

                      <h3 className="font-semibold mt-4">
                        Upload your latest resume
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        PDF or DOCX • Maximum 5 MB
                      </p>

                      <button
                        type="button"
                        className="mt-4 px-5 py-2.5 rounded-xl border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-sm font-semibold"
                      >
                        Choose File
                      </button>

                    </div>

                    {profile.resume && (
                      <div className="flex items-center justify-between gap-3 mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">

                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/20 flex items-center justify-center shrink-0">
                            <FileText
                              size={19}
                              className="text-red-500"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate">
                              {profile.resume}
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              Resume uploaded
                            </p>
                          </div>

                        </div>

                        <CheckCircle2
                          size={19}
                          className="text-emerald-500 shrink-0"
                        />

                      </div>
                    )}

                  </div>

                  {/* Preferences */}
                  <div className="mt-8">

                    <h3 className="font-semibold mb-4">
                      Opportunity Preferences
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      <SelectInput
                        label="Looking For"
                        name="internshipPreference"
                        value={profile.internshipPreference}
                        onChange={handleChange}
                        icon={Briefcase}
                        options={[
                          "Internship",
                          "Full-time Job",
                          "Internship + Job",
                        ]}
                      />

                      <SelectInput
                        label="Preferred Domain"
                        name="preferredDomain"
                        value={profile.preferredDomain}
                        onChange={handleChange}
                        icon={Target}
                        options={[
                          "Software Development",
                          "Data Analytics",
                          "UI/UX Design",
                          "Cybersecurity",
                          "Cloud & DevOps",
                          "Business & Management",
                        ]}
                      />

                    </div>

                  </div>

                  {/* Alerts */}
                  <div className="mt-8 space-y-3">

                    <ToggleRow
                      icon={Briefcase}
                      title="Job & Internship Alerts"
                      description="Receive notifications about matching opportunities."
                      checked={profile.jobAlerts}
                      onChange={(value) =>
                        setProfile((prev) => ({
                          ...prev,
                          jobAlerts: value,
                        }))
                      }
                    />

                    <ToggleRow
                      icon={Eye}
                      title="Profile Visibility"
                      description="Allow verified employers to discover your profile."
                      checked={profile.profileVisibility}
                      onChange={(value) =>
                        setProfile((prev) => ({
                          ...prev,
                          profileVisibility: value,
                        }))
                      }
                    />

                  </div>

                </StepContainer>
              )}

              {/* ==========================================
                  STEP 6
              ========================================== */}

              {currentStep === 6 && (
                <StepContainer
                  number="06"
                  title="Review Your Profile"
                  description="Review your information before making your profile visible to employers."
                  icon={CheckCircle2}
                >

                  <div className="space-y-4">

                    <ReviewCard
                      icon={User}
                      title="Personal Information"
                      completed={stepCompleted(1)}
                      items={[
                        profile.fullName,
                        profile.email,
                        profile.phone,
                        profile.location,
                      ]}
                    />

                    <ReviewCard
                      icon={GraduationCap}
                      title="Education"
                      completed={stepCompleted(2)}
                      items={[
                        profile.university,
                        profile.course,
                        `${profile.year} • ${profile.graduationYear}`,
                        `CGPA: ${profile.cgpa}`,
                      ]}
                    />

                    <ReviewCard
                      icon={Briefcase}
                      title="Career"
                      completed={stepCompleted(3)}
                      items={[
                        profile.preferredRole || "Role not added",
                        profile.preferredLocation,
                        profile.workMode,
                      ]}
                    />

                    <ReviewCard
                      icon={Award}
                      title="Skills"
                      completed={stepCompleted(4)}
                      items={profile.skills}
                    />

                    <ReviewCard
                      icon={FileText}
                      title="Resume"
                      completed={stepCompleted(5)}
                      items={[
                        profile.resume || "Resume not uploaded",
                        profile.internshipPreference,
                        profile.preferredDomain,
                      ]}
                    />

                  </div>

                  {/* Final status */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/20 border border-cyan-100 dark:border-cyan-900">

                    <div className="flex items-start gap-4">

                      <div className="w-11 h-11 rounded-xl bg-cyan-600 flex items-center justify-center shrink-0">
                        <ShieldCheck
                          size={21}
                          className="text-white"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold">
                          Profile strength: {completion}%
                        </h3>

                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-6">
                          Once your profile is complete, Udyam Sethu
                          can use your information to match you with
                          suitable internships, jobs, assessments
                          and career opportunities.
                        </p>
                      </div>

                    </div>

                  </div>

                </StepContainer>
              )}

              {/* ==========================================
                  FOOTER NAVIGATION
              ========================================== */}

              <div className="border-t border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex items-center justify-between gap-3">

                <button
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ChevronLeft size={17} />
                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                <div className="text-xs text-slate-500">
                  Step {currentStep} of {totalSteps}
                </div>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition"
                  >
                    Continue
                    <ChevronRight size={17} />
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition"
                  >
                    <Save size={17} />
                    Complete Profile
                  </button>
                )}

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <div className="space-y-6">

            {/* Profile Preview */}
            <div className="bg-white dark:bg-[#0b1728] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center justify-between mb-5">

                <div>
                  <h3 className="font-bold">
                    Profile Preview
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    How employers see you
                  </p>
                </div>

                <Eye
                  size={18}
                  className="text-cyan-500"
                />

              </div>

              <div className="text-center">

                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">

                  <span className="text-2xl font-bold text-white">
                    {initials}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-4">
                  {profile.fullName}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {profile.preferredRole ||
                    "Career role not specified"}
                </p>

                <div className="flex justify-center flex-wrap gap-2 mt-4">

                  {profile.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </div>

            </div>

            {/* Completion Checklist */}
            <div className="bg-white dark:bg-[#0b1728] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center">
                  <Target
                    size={19}
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                </div>

                <div>
                  <h3 className="font-bold">
                    Completion Checklist
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    Complete these sections
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                {steps.map((step) => {

                  const completed =
                    stepCompleted(step.id);

                  return (
                    <button
                      key={step.id}
                      onClick={() =>
                        setCurrentStep(step.id)
                      }
                      className="w-full flex items-center gap-3 text-left group"
                    >

                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${completed
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                          }`}
                      >
                        {completed ? (
                          <Check size={14} />
                        ) : (
                          <span className="text-[10px] font-bold">
                            {step.id}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-xs font-medium ${completed
                          ? "text-slate-700 dark:text-slate-200"
                          : "text-slate-400"
                          }`}
                      >
                        {step.title}
                      </span>

                    </button>
                  );
                })}

              </div>

            </div>

            {/* Privacy */}
            <div className="rounded-2xl bg-slate-900 dark:bg-[#050b14] border border-slate-800 p-5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Lock
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">
                    Your Data is Protected
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-1">
                    Udyam Sethu privacy & security
                  </p>
                </div>

              </div>

              <p className="text-xs text-slate-400 leading-5 mt-4">
                Your profile information is used to provide
                personalized opportunities and is only shared
                with authorized employers when your visibility
                settings allow it.
              </p>

            </div>

          </div>

        </div>

        {/* Mobile Save */}
        <button
          onClick={handleSave}
          className="sm:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl bg-cyan-600 text-white shadow-2xl flex items-center justify-center"
        >
          <Save size={21} />
        </button>

      </main>

    </div>
  );
}


/* ============================================================
   STEP CONTAINER
============================================================ */

function StepContainer({
  number,
  title,
  description,
  icon: Icon,
  children,
}) {
  return (
    <div className="p-5 sm:p-7">

      <div className="flex items-start gap-4 mb-8">

        <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center shrink-0">
          <Icon
            size={21}
            className="text-cyan-600 dark:text-cyan-400"
          />
        </div>

        <div>

          <div className="flex items-center gap-2">

            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">
              STEP {number}
            </span>

          </div>

          <h2 className="text-xl font-bold mt-1">
            {title}
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {description}
          </p>

        </div>

      </div>

      {children}

    </div>
  );
}


/* ============================================================
   PROFILE INPUT
============================================================ */

function ProfileInput({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
        {label}
      </label>

      <div className="relative">

        <Icon
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
        />

      </div>

    </div>
  );
}


/* ============================================================
   SELECT INPUT
============================================================ */

function SelectInput({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  options,
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
        {label}
      </label>

      <div className="relative">

        <Icon
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="appearance-none w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
        >

          <option value="">
            Select {label}
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

        </select>

      </div>

    </div>
  );
}


/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({ children }) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/50">

      <div className="flex gap-3">

        <Sparkles
          size={17}
          className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5"
        />

        <p className="text-xs text-cyan-700 dark:text-cyan-300 leading-5">
          {children}
        </p>

      </div>

    </div>
  );
}


/* ============================================================
   TOGGLE ROW
============================================================ */

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center">
          <Icon
            size={17}
            className="text-cyan-600 dark:text-cyan-400"
          />
        </div>

        <div>

          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition shrink-0 ${checked
          ? "bg-cyan-600"
          : "bg-slate-300 dark:bg-slate-700"
          }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked
            ? "left-6"
            : "left-1"
            }`}
        />

      </button>

    </div>
  );
}


/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({
  icon: Icon,
  title,
  completed,
  items,
}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">

      <div className="flex items-start gap-3">

        <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 flex items-center justify-center shrink-0">
          <Icon
            size={18}
            className="text-cyan-600 dark:text-cyan-400"
          />
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex items-center justify-between gap-3">

            <h3 className="font-semibold text-sm">
              {title}
            </h3>

            {completed ? (
              <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 size={14} />
                Complete
              </span>
            ) : (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                Incomplete
              </span>
            )}

          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">

            {items.map((item, index) => (
              <span
                key={index}
                className="text-xs text-slate-500 dark:text-slate-400"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
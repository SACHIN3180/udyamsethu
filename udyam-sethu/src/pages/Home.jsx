import React, { useState, useEffect, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Users,
  BriefcaseBusiness,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Quote,
  Sparkles,
  Target,
  Globe2,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "../assets/logo.jpeg";
import founder from "../assets/founder.jpg";



/* =========================================================
   UNIVERSITY DATA
========================================================= */

const universities = [
  {
    name: "Indian Institute of Science",
    short: "IISc",
    domain: "iisc.ac.in",
  },
  {
    name: "IIT Madras",
    short: "IITM",
    domain: "iitm.ac.in",
  },
  {
    name: "IIT Bombay",
    short: "IITB",
    domain: "iitb.ac.in",
  },
  {
    name: "NITK Surathkal",
    short: "NITK",
    domain: "nitk.ac.in",
  },
  {
    name: "Christ University",
    short: "CU",
    domain: "christuniversity.in",
  },
  {
    name: "PES University",
    short: "PES",
    domain: "pes.edu",
  },
  {
    name: "RV College of Engineering",
    short: "RVCE",
    domain: "rvce.edu.in",
  },
  {
    name: "BMS College of Engineering",
    short: "BMSCE",
    domain: "bmsce.ac.in",
  },
];

/* =========================================================
   STATISTICS
========================================================= */

const stats = [
  {
    value: 25,
    suffix: "+",
    label: "Universities Connected",
    icon: GraduationCap,
  },
  {
    value: 1000,
    suffix: "+",
    label: "Students Reached",
    icon: Users,
  },
  {
    value: 500,
    suffix: "+",
    label: "Employers Connected",
    icon: Building2,
  },
  {
    value: 2000,
    suffix: "+",
    label: "Career Opportunities",
    icon: BriefcaseBusiness,
  },
];

/* =========================================================
   HOME
========================================================= */
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = () => {
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth easing
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(
        easedProgress * value
      );

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  };

  // Initial animation when visible
  useEffect(() => {
    if (isVisible) {
      animateCounter();
    }
  }, [isVisible]);

  // Animation whenever mouse enters
  useEffect(() => {
    if (isHovering) {
      animateCounter();
    }
  }, [isHovering]);

  const formatNumber = (number) => {
    if (value >= 1000) {
      return `${Math.floor(number / 1000)}K`;
    }

    return number.toLocaleString();
  };

  return (
    <span
      ref={counterRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="inline-block cursor-pointer"
    >
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const Home = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F9FC] text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-[#F7F9FC]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* Logo */}

          <a href="/udyamsethu" className="flex items-center gap-3">

            <div className="relative flex h-16 w-52 items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-blue-600/20">
              <img
                src={logo}
                alt="Udyam Sethu Logo"
                className="w-100 h-14 object-contain"
              />

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-[#F7F9FC]" />
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

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="#universities"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Universities
            </a>

            <a
              href="#employers"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Employers
            </a>

            <a
              href="#students"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Students
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Contact
            </a>

          </nav>

          {/* Header Actions */}

          <div className="hidden items-center gap-2 lg:flex">

            <button
              onClick={() => navigate("/udyamsethu/login")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white hover:shadow-sm cursor-pointer">
              Login
            </button>

            <button
              onClick={() => navigate("/udyamsethu/signup")}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 cursor-pointer">
              Sign Up
            </button>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 lg:hidden"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-[#F7F9FC] px-5 py-5 lg:hidden">

            <div className="flex flex-col gap-4">

              <a href="#universities">Universities</a>
              <a href="#employers">Employers</a>
              <a href="#students">Students</a>
              <a href="#contact">Contact</a>

              <div className="mt-2 flex gap-3">

                <button className="flex-1 rounded-xl border border-slate-200 bg-white py-3 font-semibold">
                  Login
                </button>

                <button className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white">
                  Sign Up
                </button>

              </div>

            </div>

          </div>
        )}

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#F7F9FC] pt-32 lg:pt-40">

        {/* Soft Background Shapes */}

        <div className="pointer-events-none absolute inset-0">

          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-200/25 blur-3xl" />

          <div className="absolute right-[-120px] top-28 h-[500px] w-[500px] rounded-full bg-indigo-200/20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-100/30 blur-3xl" />

          {/* subtle grid */}

          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(#dbe4f0 1px, transparent 1px), linear-gradient(90deg, #dbe4f0 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 75%)",
            }}
          />

        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">

          {/* Hero Content */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur">

              <Sparkles size={15} />

              Connecting Talent with Opportunity

            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-[68px]">

              Where{" "}
              <span className="text-blue-600">
                Talent
              </span>{" "}
              Meets{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Opportunity.
              </span>

            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">

              Udyam Sethu is a trusted bridge connecting students,
              universities and employers — creating a seamless path
              from education to meaningful careers.

            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate('/udyamsethu/institution-login')}
                className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">

                Get Started

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600">

                Explore Opportunities

              </button>

            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-600">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />

                Verified Employers

              </div>

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={17}
                  className="text-emerald-500"
                />

                Trusted Institutions

              </div>

            </div>

          </div>

          {/* Hero Illustration */}

          <div className="relative">

            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/25 blur-3xl" />

            <div className="relative mx-auto max-w-[480px]">

              {/* Main Card */}

              <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-7 shadow-[0_25px_70px_rgba(30,64,175,0.12)] backdrop-blur">

                <div className="mb-8 flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-400">
                      Udyam Sethu
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      Your Career Bridge
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">

                    <GraduationCap
                      size={25}
                      className="text-blue-600"
                    />

                  </div>

                </div>

                {/* Student */}
                <button
                  onClick={() => navigate('/udyamsethu/login')}
                  className="cursor-pointer">
                  <div className="flex items-center gap-4 rounded-2xl border border-blue-50 bg-[#F7F9FC] p-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

                      <GraduationCap
                        size={23}
                        className="text-blue-600"
                      />

                    </div>

                    <div>


                      <p className="font-semibold">
                        Student
                      </p>
                      <p className="text-sm text-slate-500">
                        Skills & Potential
                      </p>
                    </div>

                  </div>
                </button>
                {/* Bridge */}

                <div className="relative my-5 flex items-center justify-center">

                  <div className="h-px w-full bg-slate-200" />

                  <div className="absolute rounded-full border-4 border-white bg-blue-600 px-5 py-2 text-[10px] font-bold tracking-wider text-white shadow-lg">
                    UDYAM SETHU
                  </div>

                </div>

                {/* Employer */}
                <button
                  onClick={() => navigate('/udyamsethu/employer-login')}
                  className="cursor-pointer">
                  <div className="flex items-center gap-4 rounded-2xl border border-indigo-50 bg-[#F7F9FC] p-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">

                      <Building2
                        size={23}
                        className="text-indigo-600"
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        Employer
                      </p>

                      <p className="text-sm text-slate-500">
                        Career Opportunities
                      </p>

                    </div>

                  </div>
                </button>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-center">

                  <p className="text-sm font-medium text-blue-100">
                    Connecting Talent
                  </p>

                  <p className="mt-1 text-lg font-bold text-white">
                    Creating Careers
                  </p>

                </div>

              </div>

              {/* Floating Opportunity */}

              <div className="absolute -right-5 -top-7 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">

                    <CheckCircle2
                      size={20}
                      className="text-emerald-500"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-slate-400">
                      New Opportunity
                    </p>

                    <p className="text-sm font-bold">
                      Career Matched
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-slate-200/70 bg-[#F1F5FA]">

        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-4 py-9 text-center ${index !== 0
                  ? "border-l border-slate-200"
                  : ""
                  }`}
              >

                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">

                  <Icon
                    size={20}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                  />
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* =====================================================
          UNIVERSITY SECTION
      ===================================================== */}

      <section
        id="universities"
        className="relative overflow-hidden bg-[#F7F9FC] py-24"
      >

        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-600 shadow-sm">

              <Globe2 size={14} />

              Our Academic Network

            </div>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">

              Growing Together with{" "}
              <span className="text-blue-600">
                Leading Institutions
              </span>

            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">

              Udyam Sethu partners with reputed universities and
              colleges to help students move confidently from
              classrooms to careers.

            </p>

          </div>

          {/* University Count */}

          <div className="mx-auto mt-12 max-w-3xl rounded-[28px] border border-blue-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.08)]">

            <p className="text-sm font-semibold text-slate-500">
              Institutions connected with Udyam Sethu
            </p>

            <div className="mt-2 flex items-center justify-center gap-3">

              <h3 className="text-6xl font-bold text-blue-600">
                25+
              </h3>

              <div className="text-left">
                <p className="font-bold text-slate-800">
                  Universities
                </p>
                <p className="text-sm text-slate-500">
                  and colleges
                </p>
              </div>

            </div>

          </div>

          {/* =================================================
              CONTINUOUS UNIVERSITY SLIDER
          ================================================= */}

          {/* <div className="relative mt-16">


            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#F7F9FC] to-transparent" />


            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#F7F9FC] to-transparent" />

            <div className="university-slider overflow-hidden">

              <div className="university-track flex w-max gap-5">

                {[...universities, ...universities].map(
                  (university, index) => (
                    <div
                      key={`${university.name}-${index}`}
                      className="group flex h-[115px] w-[275px] shrink-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-2">

                        <img
                          src={`https://www.google.com/s2/favicons?domain=${university.domain}&sz=128`}
                          alt={`${university.name} logo`}
                          className="h-11 w-11 object-contain"
                          loading="lazy"
                        />

                      </div>

                      <div className="min-w-0">

                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                          {university.short}
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-700">
                          {university.name}
                        </p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div> */}

          <p className="mt-5 text-center text-xs text-slate-400">
            Our growing network of academic institutions
          </p>

        </div>

      </section>

      {/* =====================================================
          DIRECTOR MESSAGE
      ===================================================== */}

      <section className="bg-[#EEF3F9] py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">

            {/* Director Image */}

            <div className="flex justify-center">

              <div className="relative">

                <div className="absolute -inset-5 rounded-[40px] bg-blue-100/60 blur-2xl" />

                <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-[32px] border-8 border-white bg-gradient-to-br from-blue-100 to-indigo-100 shadow-xl">

                  <img
                    src={founder}
                    alt="Students"
                    className="h-full w-full object-cover"
                  />

                </div>

                <div className="absolute -bottom-5 -right-7 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-xl">

                  <p className="font-bold text-slate-900">
                    NAMRATA PHATATE
                  </p>
                  <p className="font-bold text-slate-900">
                    Founder
                  </p>

                  <p className="text-sm text-slate-500">
                    Udyam Sethu
                  </p>

                </div>

              </div>

            </div>

            {/* Message */}

            <div>

              <Quote
                size={42}
                strokeWidth={1.5}
                className="text-blue-300"
              />

              <span className="mt-4 block text-sm font-bold uppercase tracking-widest text-blue-600">
                Founder's Message
              </span>

              <h2 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">

                Empowering Students.
                <br />

                <span className="text-blue-600">
                  Building Futures.
                </span>

              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">

                “At Udyam Sethu, we believe every student deserves
                the right opportunity to transform their skills into
                a successful career. Our mission is to create a
                meaningful bridge between educational institutions,
                talented students and industry.”

              </p>

              <p className="mt-5 text-lg leading-8 text-slate-600">

                “Together, we are building an ecosystem where talent
                gets discovered, opportunities become accessible and
                careers begin with confidence.”

              </p>

              <div className="mt-7">
                <b text-slate-900>
                  NAMRATA PHATATE
                </b>

                <p className="font-bold text-slate-900">
                  Founder
                </p>

                <p className="text-sm text-slate-700">
                  Udyam Sethu
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          STUDENTS / EMPLOYERS
      ===================================================== */}

      <section
        id="employers"
        className="bg-[#F7F9FC] py-24"
      >

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              One Platform. Multiple Possibilities.
            </span>

            <h2 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
              Built for Everyone in the Career Ecosystem
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Students */}

            <div
              id="students"
              className="group relative overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-9 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="relative z-10">

                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">

                  <GraduationCap
                    size={28}
                    className="text-white"
                  />

                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  For Students
                </h3>

                <p className="mt-4 max-w-md leading-7 text-slate-600">

                  Build your profile, showcase your skills,
                  discover opportunities and connect with employers
                  who are looking for your potential.

                </p>

                <button
                  onClick={() => navigate('/udyamsethu/login')}
                  className="mt-7 flex items-center cursor-pointer gap-2 font-semibold text-blue-600">

                  Explore Careers

                  <ChevronRight size={18} />

                </button>

              </div>

              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-100/60 transition group-hover:scale-110" />

            </div>

            {/* Employers */}

            <div className="group relative overflow-hidden rounded-[30px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-9 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative z-10">

                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20">

                  <Building2
                    size={28}
                    className="text-white"
                  />

                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  For Employers
                </h3>

                <p className="mt-4 max-w-md leading-7 text-slate-600">

                  Discover skilled and motivated students,
                  connect with emerging talent and build your
                  future workforce.

                </p>

                <button
                  onClick={() => navigate('/udyamsethu/employer-login')}
                  className="mt-7 cursor-pointer flex items-center gap-2 font-semibold text-indigo-600">

                  Find Talent

                  <ChevronRight size={18} />

                </button>

              </div>

              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-100/60 transition group-hover:scale-110" />

            </div>


          </div>

        </div>

      </section>

      {/* =====================================================
          CAREERS CTA
      ===================================================== */}

      <section className="bg-[#F7F9FC] px-5 py-20 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 px-7 py-16 text-center shadow-2xl shadow-blue-600/15 sm:px-12">

          <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-white/10 blur-sm" />

          <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-300/10 blur-sm" />

          <div className="relative">

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Your Next Opportunity
            </span>

            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">

              Careers come seeking you.

            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-blue-100">

              Get discovered by new employers and take the next
              step towards your career with Udyam Sethu.

            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">

                Get Discovered

                <ArrowRight size={18} />

              </button>

              <a
                href="tel:+919513978799"
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >

                <Phone size={18} />

                Call us at +91 95139 78799

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        id="contact"
        className="border-t border-slate-200 bg-[#EEF3F9]"
      >

        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">

                  <GraduationCap size={24} className="text-white" />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Udyam<span className="text-blue-600">Sethu</span>
                  </h3>

                  <p className="text-[9px] uppercase tracking-widest text-slate-400">
                    Connecting Futures
                  </p>

                </div>

              </div>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">

                Building a stronger bridge between education,
                students and career opportunities.

              </p>

              <div className="mt-6 flex gap-3">

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  <FaLinkedinIn size={17} />
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-pink-500 hover:text-white"
                >
                  <FaInstagram size={17} />
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-blue-600 hover:text-white"
                >
                  <FaFacebookF size={17} />
                </a>

                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-sky-500 hover:text-white"
                >
                  <FaTwitter size={17} />
                </a>

              </div>

            </div>

            {/* Quick Links */}

            <div>

              <h4 className="font-semibold text-slate-900">
                Quick Links
              </h4>

              <ul className="mt-5 space-y-4 text-sm text-slate-500">

                <li>
                  <a href="#" className="transition hover:text-blue-600">
                    Home
                  </a>
                </li>

                <li>
                  <a href="#universities" className="transition hover:text-blue-600">
                    Universities
                  </a>
                </li>

                <li>
                  <a href="#employers" className="transition hover:text-blue-600">
                    Employers
                  </a>
                </li>

                <li>
                  <a href="#students" className="transition hover:text-blue-600">
                    Students
                  </a>
                </li>

              </ul>

            </div>

            {/* Platform */}

            <div>

              <h4 className="font-semibold text-slate-900">
                Platform
              </h4>

              <ul className="mt-5 space-y-4 text-sm text-slate-500">

                <li>
                  <a href="#" className="transition hover:text-blue-600">
                    Find Jobs
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-blue-600">
                    Find Talent
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-blue-600">
                    University Partners
                  </a>
                </li>

                <li>
                  <a href="#" className="transition hover:text-blue-600">
                    Sign Up
                  </a>
                </li>

              </ul>

            </div>

            {/* Contact */}

            <div>

              <h4 className="font-semibold text-slate-900">
                Contact Us
              </h4>

              <div className="mt-5 space-y-4 text-sm text-slate-500">

                <a
                  href="tel:+919513978799"
                  className="flex items-center gap-3 transition hover:text-blue-600"
                >

                  <Phone size={17} />

                  +91 95139 78799

                </a>

                <a
                  href="mailto:info@udyamsethu.com"
                  className="flex items-center gap-3 transition hover:text-blue-600"
                >

                  <Mail size={17} />

                  info@udyamsethu.com

                </a>

                <div className="flex items-start gap-3">

                  <MapPin
                    size={17}
                    className="mt-1 shrink-0"
                  />

                  <span>
                    Bengaluru, Karnataka,
                    <br />
                    India
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-slate-200 pt-7 text-sm text-slate-400 sm:flex-row">

            <p>
              © 2026 Udyam Sethu. All rights reserved.
            </p>

            <div className="flex gap-6">

              <a href="#" className="hover:text-slate-700">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-slate-700">
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </footer>

      {/* =====================================================
          SLIDER CSS
      ===================================================== */}

      <style>{`

        .university-track {
          animation: universityScroll 35s linear infinite;
        }

        .university-track:hover {
          animation-play-state: paused;
        }

        @keyframes universityScroll {

          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(calc(-50% - 10px));
          }

        }

        @media (max-width: 640px) {

          .university-track {
            animation-duration: 28s;
          }

        }

      `}</style>

    </div>
  );
};

export default Home;
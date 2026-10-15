
import React, { useRef, useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  Upload,
  ImagePlus,
  Globe,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Circle,
  Sparkles,
  ExternalLink,
  Save,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Palette,
  Monitor,
  Camera,
  LogOut,
} from "lucide-react";

const initialCompany = {
  name: "Acme Technologies",
  tagline: "Building innovative solutions for tomorrow.",
  industry: "Information Technology",
  website: "https://www.example.com",
  location: "Bengaluru, Karnataka, India",
  email: "careers@example.com",
  phone: "+91 98765 43210",
  about:
    "We are a technology-driven organization focused on building impactful digital products. We believe in innovation, collaboration, and creating meaningful career opportunities for emerging talent.",
  linkedin: "",
  instagram: "",
  facebook: "",
  size: "51–200 employees",
  founded: "2018",
};

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Company Branding", icon: Palette },
  { label: "Job Postings", icon: BriefcaseBusiness },
  { label: "Candidates", icon: Users },
  { label: "Applications", icon: FileText },
];

export default function EmployeerDashboard() {
  const [company, setCompany] = useState(initialCompany);
  const [activeNav, setActiveNav] = useState("Company Branding");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [saved, setSaved] = useState(false);
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const updateField = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    setError("");
  };

  const handleImage = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "logo") setLogo(reader.result);
      if (type === "cover") setCover(reader.result);
      setSaved(false);
      setError("");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const completionItems = [
    Boolean(company.name),
    Boolean(company.tagline),
    Boolean(company.industry),
    Boolean(company.about),
    Boolean(company.website),
    Boolean(company.location),
    Boolean(logo),
    Boolean(cover),
  ];

  const completedCount = completionItems.filter(Boolean).length;
  const completion = Math.round((completedCount / completionItems.length) * 100);

  const handleSave = () => {
    if (!company.name.trim()) {
      setError("Company name is required.");
      return;
    }

    // UI demonstration: connect this handler to your backend API
    // to persist company information and uploaded branding assets.
    try {
      localStorage.setItem(
        "udyam-employer-branding",
        JSON.stringify({ company, logo, cover })
      );
      setSaved(true);
      setError("");
    } catch {
      setError("Unable to save locally. Try using smaller images.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const sectionClass =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7";

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const active = activeNav === item.label;

    return (
      <button
        key={item.label}
        onClick={() => {
          setActiveNav(item.label);
          setMobileSidebar(false);
        }}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
          active
            ? "bg-violet-600 text-white shadow-lg shadow-violet-200"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <Icon size={19} />
        <span>{item.label}</span>
        {active && <ChevronRight className="ml-auto" size={16} />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile sidebar overlay */}
      {mobileSidebar && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[265px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <a href="/udyamsethu/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">
              <Building2 size={23} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                Udyam <span className="text-violet-600">Sethu</span>
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[1.7px] text-slate-400">
                Employer Portal
              </p>
            </div>
          </a>
          <button
            onClick={() => setMobileSidebar(false)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.8px] text-slate-400">
            Workspace
          </p>
          <nav className="space-y-1">{navItems.map(renderNavItem)}</nav>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.8px] text-slate-400">
            Account
          </p>
          <button
            onClick={() => setActiveNav("Settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              activeNav === "Settings"
                ? "bg-violet-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
              <Sparkles size={21} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Improve your profile
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              A complete company profile helps candidates learn about you.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("branding-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-3 flex items-center gap-2 text-xs font-bold text-violet-700 hover:text-violet-900"
            >
              Complete profile <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
              {company.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">
                {company.name}
              </p>
              <p className="text-xs text-slate-500">Employer account</p>
            </div>
            <button
              aria-label="Account settings"
              onClick={() => setActiveNav("Settings")}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            >
              <Settings size={17} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main workspace */}
      <div className="min-h-screen lg:pl-[265px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md sm:px-7 lg:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileSidebar(true)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Workspace</span>
                <ChevronRight size={13} />
                <span className="truncate text-slate-600">
                  {activeNav}
                </span>
              </div>
              <h2 className="mt-1 truncate text-base font-bold text-slate-900 sm:text-lg">
                {activeNav}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Search workspace..."
                className="w-48 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-400 xl:w-64"
              />
            </div>
            <button
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
            </button>
            <div className="hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                {company.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden xl:block">
                <p className="max-w-36 truncate text-sm font-bold text-slate-800">
                  {company.name}
                </p>
                <p className="text-xs text-slate-500">Employer</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1550px] p-4 sm:p-7 lg:p-9">
          {activeNav !== "Company Branding" ? (
            <section className={sectionClass}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                {activeNav === "Overview" ? (
                  <LayoutDashboard size={23} />
                ) : activeNav === "Job Postings" ? (
                  <BriefcaseBusiness size={23} />
                ) : activeNav === "Candidates" ? (
                  <Users size={23} />
                ) : activeNav === "Applications" ? (
                  <FileText size={23} />
                ) : (
                  <Settings size={23} />
                )}
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {activeNav}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                This section is ready for integration with your Udyam Sethu
                employer features. Company branding is available now.
              </p>
              <button
                onClick={() => setActiveNav("Company Branding")}
                className="mt-5 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Open Company Branding
              </button>
            </section>
          ) : (
            <>
              {/* Page heading */}
              <div className="mb-7 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    <Sparkles size={14} />
                    Employer brand centre
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Company branding
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                    Showcase your company culture, tell your story, and help
                    students discover why they should work with you.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <Eye size={17} />
                    {showPreview ? "Hide preview" : "Show preview"}
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                  >
                    <Save size={17} />
                    Save changes
                  </button>
                </div>
              </div>

              {/* Completion overview */}
              <section className="mb-7 grid gap-5 md:grid-cols-[1fr_1.3fr]">
                <div className="rounded-2xl bg-gradient-to-br from-violet-700 via-violet-700 to-indigo-800 p-6 text-white shadow-lg shadow-violet-100 sm:p-7">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-violet-100">
                        Profile completion
                      </p>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold">
                          {completion}%
                        </span>
                        <span className="text-xs text-violet-200">
                          completed
                        </span>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <ShieldCheck size={25} />
                    </div>
                  </div>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <p className="mt-4 text-xs leading-5 text-violet-100">
                    Complete your company profile to create a stronger first
                    impression with potential candidates.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">
                        Branding checklist
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Track your profile setup
                      </p>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {completedCount}/8
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
                    {[
                      ["Company name", Boolean(company.name)],
                      ["Tagline", Boolean(company.tagline)],
                      ["Industry", Boolean(company.industry)],
                      ["About company", Boolean(company.about)],
                      ["Website", Boolean(company.website)],
                      ["Location", Boolean(company.location)],
                      ["Company logo", Boolean(logo)],
                      ["Cover image", Boolean(cover)],
                    ].map(([label, complete]) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        {complete ? (
                          <CheckCircle2
                            size={16}
                            className="shrink-0 text-emerald-500"
                          />
                        ) : (
                          <Circle
                            size={16}
                            className="shrink-0 text-slate-300"
                          />
                        )}
                        <span
                          className={
                            complete ? "text-slate-700" : "text-slate-400"
                          }
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
                >
                  {error}
                </div>
              )}

              {saved && (
                <div
                  role="status"
                  className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                >
                  <CheckCircle2 size={18} />
                  Changes saved in this browser. Connect your backend to
                  persist them to your employer account.
                </div>
              )}

              <div
                className={`grid items-start gap-7 ${
                  showPreview
                    ? "xl:grid-cols-[minmax(0,1fr)_minmax(330px,0.85fr)]"
                    : "grid-cols-1"
                }`}
              >
                {/* Branding form */}
                <div id="branding-form" className="min-w-0 space-y-6">
                  {/* Logo and cover */}
                  <section className={sectionClass}>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-slate-900">
                        Visual identity
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Add your company logo and cover image to make your
                        profile recognizable.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className={labelClass}>Company logo</label>
                        <div className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-4 sm:flex-row sm:items-center">
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white text-violet-600 shadow-sm">
                            {logo ? (
                              <img
                                src={logo}
                                alt="Company logo preview"
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <span className="text-xl font-extrabold">
                                {company.name.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-slate-800">
                              Upload your company logo
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              PNG, JPG, or WebP. Maximum file size: 5 MB.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => logoInputRef.current?.click()}
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-violet-300 hover:text-violet-700"
                              >
                                <Upload size={15} /> Upload logo
                              </button>
                              {logo && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLogo("");
                                    setSaved(false);
                                  }}
                                  className="rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <input
                              ref={logoInputRef}
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImage(e, "logo")}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Cover image</label>
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="group relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-gradient-to-br from-violet-50 via-indigo-50 to-slate-100 transition hover:border-violet-400 sm:h-44"
                        >
                          {cover ? (
                            <img
                              src={cover}
                              alt="Company cover preview"
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm transition group-hover:scale-105">
                                <ImagePlus size={22} />
                              </div>
                              <p className="mt-3 text-sm font-bold text-slate-700">
                                Add a cover image
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                Recommended landscape image
                              </p>
                            </div>
                          )}
                          {cover && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-slate-700 shadow">
                              <Camera size={15} /> Change cover
                            </span>
                          )}
                        </button>
                        <input
                          ref={coverInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImage(e, "cover")}
                          className="hidden"
                        />
                        {cover && (
                          <button
                            type="button"
                            onClick={() => {
                              setCover("");
                              setSaved(false);
                            }}
                            className="mt-2 text-xs font-semibold text-rose-600 hover:underline"
                          >
                            Remove cover image
                          </button>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Basic company details */}
                  <section className={sectionClass}>
                    <div className="mb-6 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Building2 size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Company information
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Introduce your organization to candidates.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Company name *</label>
                        <input
                          name="name"
                          value={company.name}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="Enter company name"
                          required
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Company tagline</label>
                        <input
                          name="tagline"
                          value={company.tagline}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="A short statement about your company"
                          maxLength={150}
                        />
                        <p className="mt-1.5 text-right text-xs text-slate-400">
                          {company.tagline.length}/150
                        </p>
                      </div>

                      <div>
                        <label className={labelClass}>About the company</label>
                        <textarea
                          name="about"
                          value={company.about}
                          onChange={updateField}
                          rows={5}
                          maxLength={1500}
                          className={`${inputClass} resize-y leading-6`}
                          placeholder="Share your mission, company culture, and what makes your workplace special..."
                        />
                        <p className="mt-1.5 text-right text-xs text-slate-400">
                          {company.about.length}/1500 characters
                        </p>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Industry</label>
                          <select
                            name="industry"
                            value={company.industry}
                            onChange={updateField}
                            className={inputClass}
                          >
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
                          <label className={labelClass}>Company size</label>
                          <select
                            name="size"
                            value={company.size}
                            onChange={updateField}
                            className={inputClass}
                          >
                            <option>1–10 employees</option>
                            <option>11–50 employees</option>
                            <option>51–200 employees</option>
                            <option>201–500 employees</option>
                            <option>501–1000 employees</option>
                            <option>1000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Contact information */}
                  <section className={sectionClass}>
                    <div className="mb-6 flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Globe size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Contact & online presence
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Help candidates find and contact your organization.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Company website</label>
                        <input
                          type="url"
                          name="website"
                          value={company.website}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="https://www.yourcompany.com"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Company location</label>
                        <input
                          name="location"
                          value={company.location}
                          onChange={updateField}
                          className={inputClass}
                          placeholder="City, State, Country"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Contact email</label>
                          <input
                            type="email"
                            name="email"
                            value={company.email}
                            onChange={updateField}
                            className={inputClass}
                            placeholder="careers@company.com"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Contact phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={company.phone}
                            onChange={updateField}
                            className={inputClass}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-5">
                        <p className="mb-4 text-sm font-bold text-slate-800">
                          Social media links
                        </p>
                        <div className="space-y-4">
                          {[
                            {
                              name: "linkedin",
                              label: "LinkedIn",
                              icon: Globe,
                              placeholder: "https://linkedin.com/company/...",
                            },
                            {
                              name: "instagram",
                              label: "Instagram",
                              icon: Globe,
                              placeholder: "https://instagram.com/...",
                            },
                            {
                              name: "facebook",
                              label: "Facebook",
                              icon: Globe,
                              placeholder: "https://facebook.com/...",
                            },
                          ].map((social) => {
                            const Icon = social.icon;
                            return (
                              <div
                                key={social.name}
                                className="flex items-center gap-3"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500">
                                  <Icon size={18} />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    {social.label}
                                  </label>
                                  <input
                                    type="url"
                                    name={social.name}
                                    value={company[social.name]}
                                    onChange={updateField}
                                    className={inputClass}
                                    placeholder={social.placeholder}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Bottom action */}
                  <div className="sticky bottom-3 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md sm:px-5">
                    <p className="hidden text-xs text-slate-500 sm:block">
                      Your changes aren't sent to a server yet.
                    </p>
                    <button
                      onClick={handleSave}
                      className="ml-auto inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
                    >
                      <Save size={17} /> Save branding
                    </button>
                  </div>
                </div>

                {/* Live preview */}
                {showPreview && (
                  <aside className="min-w-0 xl:sticky xl:top-[100px]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          Live profile preview
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          See how your branding appears to candidates.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        LIVE PREVIEW
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="relative h-36 overflow-hidden bg-gradient-to-r from-violet-800 via-indigo-700 to-slate-800 sm:h-44">
                        {cover && (
                          <img
                            src={cover}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
                        <div className="absolute right-4 top-4 rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                          COMPANY PROFILE
                        </div>
                      </div>

                      <div className="px-5 pb-6 sm:px-6">
                        <div className="relative -mt-10 flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-violet-50 text-2xl font-extrabold text-violet-700 shadow-sm">
                          {logo ? (
                            <img
                              src={logo}
                              alt="Company logo"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            company.name.slice(0, 2).toUpperCase()
                          )}
                        </div>

                        <h3 className="mt-4 break-words text-xl font-extrabold text-slate-900">
                          {company.name || "Your Company Name"}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {company.tagline || "Your company tagline goes here."}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {company.industry && (
                            <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                              {company.industry}
                            </span>
                          )}
                          {company.size && (
                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                              {company.size}
                            </span>
                          )}
                        </div>

                        <div className="my-5 border-t border-slate-100" />

                        <h4 className="text-sm font-bold text-slate-900">
                          About us
                        </h4>
                        <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-500">
                          {company.about || "Your company description will appear here."}
                        </p>

                        <div className="mt-5 space-y-3">
                          {company.location && (
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                              <MapPin
                                size={17}
                                className="mt-0.5 shrink-0 text-violet-500"
                              />
                              <span className="break-words">
                                {company.location}
                              </span>
                            </div>
                          )}
                          {company.website && (
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                              <Globe
                                size={17}
                                className="mt-0.5 shrink-0 text-violet-500"
                              />
                              <a
                                href={
                                  /^https?:\/\//i.test(company.website)
                                    ? company.website
                                    : "#"
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="break-all text-violet-700 hover:underline"
                              >
                                {company.website}
                              </a>
                            </div>
                          )}
                          {company.email && (
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                              <Mail
                                size={17}
                                className="mt-0.5 shrink-0 text-violet-500"
                              />
                              <span className="break-all">{company.email}</span>
                            </div>
                          )}
                          {company.phone && (
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                              <Phone
                                size={17}
                                className="mt-0.5 shrink-0 text-violet-500"
                              />
                              <span>{company.phone}</span>
                            </div>
                          )}
                        </div>

                        {(company.linkedin ||
                          company.instagram ||
                          company.facebook) && (
                          <>
                            <div className="my-5 border-t border-slate-100" />
                            <h4 className="text-sm font-bold text-slate-900">
                              Connect with us
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[
                                ["linkedin", Linkedin],
                                ["instagram", Instagram],
                                ["facebook", Facebook],
                              ].map(([key, Icon]) =>
                                company[key] ? (
                                  <a
                                    key={key}
                                    href={company[key]}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={key}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                                  >
                                    <Icon size={18} />
                                  </a>
                                ) : null
                              )}
                            </div>
                          </>
                        )}

                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                            <BriefcaseBusiness
                              size={17}
                              className="text-violet-600"
                            />
                            Explore opportunities
                          </div>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Discover career opportunities with this company.
                          </p>
                          <button
                            onClick={() => setActiveNav("Job Postings")}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                          >
                            View job postings
                            <ExternalLink size={15} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          Branding tip
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Use a clear company logo, a concise tagline, and an
                          authentic company description to make your profile
                          more informative.
                        </p>
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  UserRound,
  Bell,
  Lock,
  ShieldCheck,
  Globe,
  Moon,
  Sun,
  Camera,
  Save,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  LogOut,
  Trash2,
  Smartphone,
  Mail,
  GraduationCap,
  X,
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [applicationUpdates, setApplicationUpdates] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Ananya Rao",
    email: "ananya.rao@example.com",
    mobile: "+91 98765 43210",
    usn: "1AB21CS001",
    organization: "ABC Engineering College",
  });

  const tabs = [
    {
      name: "Profile",
      icon: UserRound,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
    {
      name: "Security",
      icon: Lock,
    },
    {
      name: "Privacy",
      icon: ShieldCheck,
    },
    {
      name: "Preferences",
      icon: Globe,
    },
  ];

  const Toggle = ({ enabled, onChange }) => {
    return (
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          enabled
            ? "bg-indigo-600"
            : darkMode
            ? "bg-slate-700"
            : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* PROFILE HEADER */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
              AR
            </div>

            <button className="absolute -right-2 -bottom-2 w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center border-4 border-white dark:border-[#111827]">
              <Camera size={16} />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {profile.fullName}
            </h2>

            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Computer Science & Engineering
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  darkMode
                    ? "bg-emerald-900/30 text-emerald-300"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                Profile Active
              </span>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  darkMode
                    ? "bg-indigo-900/30 text-indigo-300"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                Final Year
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold">Personal Information</h2>

          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            Update your basic profile information.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>

            <div className="relative mt-2">
              <UserRound
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fullName: e.target.value,
                  })
                }
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              Mobile Number
            </label>

            <div className="relative mt-2">
              <Smartphone
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={profile.mobile}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    mobile: e.target.value,
                  })
                }
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              USN
            </label>

            <div className="relative mt-2">
              <GraduationCap
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={profile.usn}
                disabled
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none cursor-not-allowed ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium">
              Institution
            </label>

            <input
              value={profile.organization}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  organization: e.target.value,
                })
              }
              className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-[#0b1120] border-slate-700 text-white"
                  : "bg-white border-slate-200"
              }`}
            />
          </div>
        </div>

        <button className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-2">
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div
      className={`rounded-2xl border ${
        darkMode
          ? "bg-[#111827] border-slate-800"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="p-5 sm:p-6 border-b border-inherit">
        <h2 className="text-lg font-bold">
          Notification Settings
        </h2>

        <p
          className={`text-sm mt-1 ${
            darkMode ? "text-slate-500" : "text-slate-500"
          }`}
        >
          Choose what notifications you want to receive.
        </p>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              Email Notifications
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Receive important account notifications by email.
            </p>
          </div>

          <Toggle
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />
        </div>

        <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Job Alerts</h3>

            <p className="text-sm text-slate-500 mt-1">
              Get notified about new opportunities matching your profile.
            </p>
          </div>

          <Toggle
            enabled={jobAlerts}
            onChange={setJobAlerts}
          />
        </div>

        <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              Application Updates
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Receive updates when your application status changes.
            </p>
          </div>

          <Toggle
            enabled={applicationUpdates}
            onChange={setApplicationUpdates}
          />
        </div>

        <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              Promotional Emails
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Receive career tips, events and platform announcements.
            </p>
          </div>

          <Toggle
            enabled={marketingEmails}
            onChange={setMarketingEmails}
          />
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-5">
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <h2 className="text-lg font-bold">
          Change Password
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Keep your account secure with a strong password.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-sm font-medium">
              Current Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className={`w-full px-4 py-3 pr-11 rounded-xl border outline-none ${
                  darkMode
                    ? "bg-[#0b1120] border-slate-700 text-white"
                    : "bg-white border-slate-200"
                }`}
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-[#0b1120] border-slate-700 text-white"
                  : "bg-white border-slate-200"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              className={`w-full mt-2 px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-[#0b1120] border-slate-700 text-white"
                  : "bg-white border-slate-200"
              }`}
            />
          </div>

          <button className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium">
            Update Password
          </button>
        </div>
      </div>

      {/* LOGIN ACTIVITY */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <h2 className="text-lg font-bold">
          Login Activity
        </h2>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">
              Chrome · Windows
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Current session · Bengaluru, India
            </p>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
            Active
          </span>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div
      className={`rounded-2xl border ${
        darkMode
          ? "bg-[#111827] border-slate-800"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-bold">
          Privacy & Visibility
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Control how your profile information is shared.
        </p>
      </div>

      <div className="border-t border-inherit">
        <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">
              Employer Profile Visibility
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Allow verified employers to discover your profile.
            </p>
          </div>

          <Toggle enabled={true} onChange={() => {}} />
        </div>

        <div className="p-5 sm:p-6 flex items-center justify-between gap-4 border-t border-inherit">
          <div>
            <h3 className="font-semibold">
              Show Skills
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Display your skills on your public student profile.
            </p>
          </div>

          <Toggle enabled={true} onChange={() => {}} />
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-5">
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <h2 className="text-lg font-bold">
          Appearance
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Customize how Udyam Sethu looks for you.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setDarkMode(false)}
            className={`flex-1 p-4 rounded-xl border flex items-center gap-3 ${
              !darkMode
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-slate-200"
            }`}
          >
            <Sun size={19} />
            <span className="font-medium">Light</span>

            {!darkMode && (
              <Check size={17} className="ml-auto" />
            )}
          </button>

          <button
            onClick={() => setDarkMode(true)}
            className={`flex-1 p-4 rounded-xl border flex items-center gap-3 ${
              darkMode
                ? "border-indigo-500 bg-indigo-950/40 text-indigo-300"
                : "border-slate-200"
            }`}
          >
            <Moon size={19} />
            <span className="font-medium">Dark</span>

            {darkMode && (
              <Check size={17} className="ml-auto" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <h2 className="text-lg font-bold">
          Language
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Select your preferred platform language.
        </p>

        <select
          className={`w-full sm:w-72 mt-5 px-4 py-3 rounded-xl border outline-none ${
            darkMode
              ? "bg-[#0b1120] border-slate-700 text-white"
              : "bg-white border-slate-200"
          }`}
        >
          <option>English</option>
          <option>Kannada</option>
          <option>Hindi</option>
        </select>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-[#0b1120] text-white"
          : "bg-[#f7f9fc] text-slate-800"
      }`}
    >
      {/* HEADER */}
      <header
        className={`border-b ${
          darkMode
            ? "bg-[#111827] border-slate-800"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Settings
              </h1>

              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Manage your account, preferences and privacy.
              </p>
            </div>

            {/* QUICK DARK MODE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-yellow-300"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              {darkMode ? (
                <Sun size={19} />
              ) : (
                <Moon size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* SIDEBAR */}
          <aside className="lg:w-64 shrink-0">
            <div
              className={`rounded-2xl border p-2 lg:sticky lg:top-5 ${
                darkMode
                  ? "bg-[#111827] border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex lg:block overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`w-full min-w-fit lg:min-w-0 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition ${
                        activeTab === tab.name
                          ? darkMode
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-50 text-indigo-700"
                          : darkMode
                          ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={18} />

                      <span>{tab.name}</span>

                      <ChevronRight
                        size={16}
                        className="ml-auto hidden lg:block"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACCOUNT ACTIONS */}
            <div
              className={`hidden lg:block rounded-2xl border p-2 mt-4 ${
                darkMode
                  ? "bg-[#111827] border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20">
                <LogOut size={18} />
                Sign Out
              </button>

              <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="flex-1 min-w-0">
            {activeTab === "Profile" && renderProfile()}
            {activeTab === "Notifications" && renderNotifications()}
            {activeTab === "Security" && renderSecurity()}
            {activeTab === "Privacy" && renderPrivacy()}
            {activeTab === "Preferences" && renderPreferences()}

            {/* MOBILE ACCOUNT ACTIONS */}
            <div
              className={`lg:hidden mt-5 rounded-2xl border p-2 ${
                darkMode
                  ? "bg-[#111827] border-slate-800"
                  : "bg-white border-slate-200"
              }`}
            >
              <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-red-500">
                <LogOut size={18} />
                Sign Out
              </button>

              <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium text-red-600">
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}


import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  FolderKanban,
  Download,
  Eye,
  Pencil,
  Plus,
  FileText,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Upload,
  Trash2,
  Save,
  X,
  LoaderCircle,
  AlertCircle,
  FileCheck,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/resumes";

const EMPTY_CONTENT = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

function normalizeContent(content = {}) {
  return {
    ...EMPTY_CONTENT,
    ...content,
    personal: {
      ...EMPTY_CONTENT.personal,
      ...(content.personal || {}),
    },
    experience: Array.isArray(content.experience) ? content.experience : [],
    education: Array.isArray(content.education) ? content.education : [],
    skills: Array.isArray(content.skills) ? content.skills : [],
    projects: Array.isArray(content.projects) ? content.projects : [],
    certifications: Array.isArray(content.certifications)
      ? content.certifications
      : [],
    languages: Array.isArray(content.languages) ? content.languages : [],
  };
}

function getResumeFromResponse(data) {
  return data?.data?.resume || data?.resume || data?.data;
}

function getMessage(data, fallback) {
  return data?.message || data?.error || fallback;
}

export default function Resume() {
  const [resumes, setResumes] = useState([]);
  const [settings, setSettings] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [content, setContent] = useState(() => normalizeContent());
  const [title, setTitle] = useState("My Resume");
  const [templateId, setTemplateId] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume.id === selectedResumeId) || null,
    [resumes, selectedResumeId]
  );

  const token = () => localStorage.getItem("token");

  const request = useCallback(async (url, options = {}) => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      throw new Error("Your session has expired. Please log in again.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        Authorization: `Bearer ${currentToken}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(getMessage(data, "The request failed."));
    }

    return data;
  }, []);

  const loadResumeDashboard = useCallback(async (preferredId = null) => {
    setLoading(true);
    setError("");

    try {
      const [dashboardData, templateData] = await Promise.all([
        request(API_URL),
        request(`${API_URL}/templates`).catch(() => null),
      ]);

      const dashboard = dashboardData?.data || dashboardData;
      const list = Array.isArray(dashboard?.resumes)
        ? dashboard.resumes
        : [];

      setResumes(list);
      setSettings(dashboard?.settings || null);

      const templateList =
        templateData?.data?.templates ||
        templateData?.data ||
        templateData?.templates ||
        [];

      setTemplates(Array.isArray(templateList) ? templateList : []);

      const nextId =
        preferredId && list.some((resume) => resume.id === preferredId)
          ? preferredId
          : selectedResumeId &&
            list.some((resume) => resume.id === selectedResumeId)
            ? selectedResumeId
            : list[0]?.id || null;

      setSelectedResumeId(nextId);

      const activeResume = list.find((resume) => resume.id === nextId);

      if (activeResume) {
        setTitle(activeResume.title || "My Resume");
        setContent(normalizeContent(activeResume.content));
        setTemplateId(
          activeResume.template_id
            ? String(activeResume.template_id)
            : ""
        );
      } else {
        setTitle("My Resume");
        setContent(normalizeContent());
        setTemplateId("");
      }
    } catch (err) {
      console.error("Resume dashboard error:", err);
      setError(err.message || "Could not load your resumes.");
    } finally {
      setLoading(false);
    }
  }, [request, selectedResumeId]);

  useEffect(() => {
    loadResumeDashboard();
  }, [loadResumeDashboard]);

  const selectResume = (resume) => {
    setSelectedResumeId(resume.id);
    setTitle(resume.title || "My Resume");
    setContent(normalizeContent(resume.content));
    setTemplateId(
      resume.template_id ? String(resume.template_id) : ""
    );
    setEditing(false);
    setNotice("");
    setError("");
  };

  const updatePersonal = (field, value) => {
    setContent((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value,
      },
    }));
  };

  const updateList = (field, value) => {
    setContent((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const ensureSlotAndCreate = async () => {
    setError("");
    setNotice("");

    try {
      const used = Number(settings?.used ?? resumes.length);
      const limit = Number(settings?.limit ?? 2);

      if (used >= limit) {
        await request(`${API_URL}/slots`, {
          method: "POST",
          body: JSON.stringify({}),
        });
      }

      setAiLoading(true);

      const result = await request(API_URL, {
        method: "POST",
        body: JSON.stringify({
          title: "New Resume",
          sourceType: "manual",
          content: normalizeContent(),
          templateId: templateId ? Number(templateId) : null,
        }),
      });

      const created = getResumeFromResponse(result);

      if (!created?.id) {
        await loadResumeDashboard();
        setNotice("Resume creation was submitted. Refreshing your list.");
        return;
      }

      await loadResumeDashboard(created.id);
      setEditing(true);
      setShowCreateOptions(false);
      setNotice("New resume created. Fill in your details and save.");
    } catch (err) {
      setError(err.message || "Could not create a resume.");
    } finally {
      setAiLoading(false);
    }
  };

  const generateAiResume = async () => {
    setError("");
    setNotice("");
    setAiLoading(true);

    try {
      const used = Number(settings?.used ?? resumes.length);
      const limit = Number(settings?.limit ?? 2);

      if (used >= limit) {
        await request(`${API_URL}/slots`, {
          method: "POST",
          body: JSON.stringify({}),
        });
      }

      const result = await request(`${API_URL}/generate`, {
        method: "POST",
        body: JSON.stringify({
          title: "AI Generated Resume",
          targetRole: targetRole || content.personal.role || "Full Stack Developer",
          profile: content.personal,
          experience: content.experience,
          education: content.education,
          skills: content.skills,
          projects: content.projects,
          template: "modern",
        }),
      });

      const generated = getResumeFromResponse(result);

      if (generated?.id) {
        await loadResumeDashboard(generated.id);
        setEditing(true);
      } else {
        await loadResumeDashboard();
      }

      setShowCreateOptions(false);
      setNotice("AI resume generation completed.");
    } catch (err) {
      setError(err.message || "AI resume generation failed.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      input.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("The file must be 10 MB or smaller.");
      input.value = "";
      return;
    }

    if (file.size === 0) {
      setError("The selected file is empty. Please choose another file.");
      input.value = "";
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");

    try {
      const formData = new FormData();
      console.log("Selected resume file:", {
  name: file.name,
  type: file.type,
  size: file.size,
});

const firstBytes = new Uint8Array(
  await file.slice(0, 1024).arrayBuffer()
);

const header = new TextDecoder().decode(firstBytes);

console.log("PDF signature found:", header.includes("%PDF-"));
      
console.log("Selected resume file:", {
  name: file.name,
  type: file.type,
  size: file.size,
});

if (extension === ".pdf") {
  const firstBytes = new Uint8Array(
    await file.slice(0, 1024).arrayBuffer()
  );

  const header = new TextDecoder().decode(firstBytes);
  const isPdf = header.includes("%PDF-");

  console.log("PDF signature found:", isPdf);

  if (!isPdf) {
    setError(
      `This file does not appear to be a valid PDF: ${file.name}. Open the original resume and export it as a new PDF.`
    );
    input.value = "";
    return;
  }
}

formData.append("resume", file);

      const result = await request(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploaded = getResumeFromResponse(result);

      if (uploaded?.id) {
        await loadResumeDashboard(uploaded.id);
      } else {
        await loadResumeDashboard();
      }

      setShowCreateOptions(false);
      setNotice("Resume uploaded successfully.");
      setEditing(true);
    } catch (err) {
      console.error("Resume upload error:", err);
      setError(err.message || "Resume upload failed.");
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  const saveResume = async () => {
    if (!selectedResumeId) {
      setError("Create or select a resume before saving.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      await request(`${API_URL}/${selectedResumeId}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          templateId: templateId ? Number(templateId) : null,
          content,
        }),
      });

      await loadResumeDashboard(selectedResumeId);
      setEditing(false);
      setNotice("Resume saved successfully.");
    } catch (err) {
      setError(err.message || "Could not save the resume.");
    } finally {
      setSaving(false);
    }
  };

  const analyzeResume = async () => {
    if (!selectedResumeId) {
      setError("Select a saved resume to analyze.");
      return;
    }

    setAiLoading(true);
    setError("");
    setNotice("");

    try {
      const result = await request(
        `${API_URL}/${selectedResumeId}/analyze`,
        { method: "POST" }
      );

      await loadResumeDashboard(selectedResumeId);

      const analysis =
        result?.analysis ||
        result?.data?.analysis ||
        result?.data?.resume?.ai_feedback;

      setNotice(
        analysis
          ? `Analysis complete: ${JSON.stringify(analysis)}`
          : "Resume analysis completed. Your score and feedback have been refreshed."
      );
    } catch (err) {
      setError(err.message || "Resume analysis failed.");
    } finally {
      setAiLoading(false);
    }
  };

  const improveResume = async () => {
    if (!selectedResumeId) {
      setError("Select a saved resume to improve.");
      return;
    }

    setAiLoading(true);
    setError("");
    setNotice("");

    try {
      await request(`${API_URL}/${selectedResumeId}/improve`, {
        method: "POST",
      });

      await loadResumeDashboard(selectedResumeId);
      setNotice("Resume improved. Review the changes before using it.");
    } catch (err) {
      setError(err.message || "Resume improvement failed.");
    } finally {
      setAiLoading(false);
    }
  };

  const deleteResume = async (resume) => {
    const confirmed = window.confirm(
      `Archive "${resume.title}"? It will no longer appear in your active resumes.`
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      await request(`${API_URL}/${resume.id}`, {
        method: "DELETE",
      });

      await loadResumeDashboard(
        resume.id === selectedResumeId ? null : selectedResumeId
      );

      setNotice("Resume archived.");
    } catch (err) {
      setError(err.message || "Could not archive the resume.");
    }
  };

  const previewResume = () => {
    if (!selectedResumeId) {
      setError("Create or select a resume before previewing.");
      return;
    }

    setEditing(false);
    window.setTimeout(() => window.print(), 100);
  };

  const downloadResume = () => {
    if (!selectedResumeId) {
      setError("Create or select a resume before downloading.");
      return;
    }

    // Opens the browser's print dialog, where Save as PDF is available.
    window.print();
  };

  const completedSections = [
    Boolean(content.personal.name && content.personal.email),
    content.education.length > 0,
    content.skills.length > 0,
    content.experience.length > 0,
    content.projects.length > 0,
    Boolean(content.personal.summary),
  ];

  const completion = Math.round(
    (completedSections.filter(Boolean).length / completedSections.length) *
    100
  );

  const usedSlots = Number(settings?.used ?? resumes.length);
  const slotLimit = Number(settings?.limit ?? 2);
  const aiScore = selectedResume?.ai_score;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8 print:bg-white print:p-0 print:text-black">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between print:hidden">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <FileText size={16} />
              Student Portal
              <ChevronRight size={14} />
              Resume
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">My Resume</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Create, edit, analyze and manage your professional profile.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={previewResume}
              disabled={!selectedResumeId}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900"
            >
              <Eye size={17} /> Preview
            </button>
            <button
              onClick={downloadResume}
              disabled={!selectedResumeId}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              <Download size={17} /> Download PDF
            </button>
          </div>
        </header>

        {(error || notice) && (
          <div
            className={`mb-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${error
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
              }`}
          >
            {error ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <p className="min-w-0 flex-1 break-words">{error || notice}</p>
            <button
              onClick={() => {
                setError("");
                setNotice("");
              }}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
          <aside className="space-y-5 print:hidden">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Resume Strength</h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Complete your resume
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {completion}%
                </div>
              </div>

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all"
                  style={{ width: `${completion}%` }}
                />
              </div>

              {[
                ["Basic Information", completedSections[0]],
                ["Education", completedSections[1]],
                ["Skills", completedSections[2]],
                ["Experience", completedSections[3]],
                ["Projects", completedSections[4]],
                ["Resume Summary", completedSections[5]],
              ].map(([label, done]) => (
                <div key={label} className="mb-3 flex items-center gap-3 text-sm last:mb-0">
                  <CheckCircle2
                    size={17}
                    className={done ? "text-emerald-500" : "text-slate-300"}
                  />
                  <span className={done ? "" : "text-slate-400"}>{label}</span>
                </div>
              ))}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  <Sparkles size={19} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Create a Resume</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Start from scratch or use AI to build a draft.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCreateOptions((value) => !value)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={17} /> Add Resume
              </button>

              {showCreateOptions && (
                <div className="mt-4 space-y-3">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                    Target job role (for AI)
                    <input
                      value={targetRole}
                      onChange={(event) => setTargetRole(event.target.value)}
                      placeholder="e.g. Full Stack Developer"
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                    />
                  </label>

                  <button
                    onClick={ensureSlotAndCreate}
                    disabled={aiLoading}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    Start from scratch
                  </button>

                  <button
                    onClick={generateAiResume}
                    disabled={aiLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                      <Sparkles size={16} />
                    )}
                    Generate with AI
                  </button>

                  <label className="block cursor-pointer rounded-lg border border-dashed border-slate-300 px-3 py-3 text-center text-sm font-medium hover:border-indigo-400 dark:border-slate-700">
                    <span className="flex items-center justify-center gap-2">
                      {uploading ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                      {uploading ? "Uploading..." : "Upload existing resume"}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-slate-500">
                      PDF, DOC or DOCX · Max 10 MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      disabled={uploading}
                      onChange={handleResumeUpload}
                    />
                  </label>
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold">My Resumes</h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Select a resume to edit
                  </p>
                </div>
                <button
                  onClick={() => loadResumeDashboard()}
                  title="Refresh resumes"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-800/60">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Slots used
                </span>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {usedSlots} / {slotLimit}
                </span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                  <LoaderCircle size={18} className="animate-spin" />
                  Loading resumes...
                </div>
              ) : resumes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center dark:border-slate-700">
                  <FileText size={25} className="mx-auto mb-3 text-slate-400" />
                  <p className="text-sm font-medium">No saved resumes</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Create or upload your first resume.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className={`rounded-xl border p-3 transition ${selectedResumeId === resume.id
                        ? "border-indigo-400 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-950/30"
                        : "border-slate-200 dark:border-slate-800"
                        }`}
                    >
                      <button
                        onClick={() => selectResume(resume)}
                        className="flex w-full items-start gap-3 text-left"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400">
                          <FileCheck size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {resume.title || "Untitled Resume"}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {resume.source_type === "ai_generated"
                              ? "AI generated"
                              : resume.source_type === "uploaded"
                                ? "Uploaded resume"
                                : "Manual resume"}
                          </p>
                          {resume.ai_score != null && (
                            <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                              AI score: {resume.ai_score}/100
                            </p>
                          )}
                        </div>
                      </button>

                      <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-200 pt-2 dark:border-slate-800">
                        <button
                          onClick={() => {
                            selectResume(resume);
                            setEditing(true);
                          }}
                          title="Edit resume"
                          className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-indigo-600 dark:hover:bg-slate-800"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => deleteResume(resume)}
                          title="Archive resume"
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {selectedResume && (
              <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-lg">
                <Sparkles size={22} className="mb-3" />
                <h2 className="font-semibold">AI Resume Assistant</h2>
                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Analyze your current resume or ask AI to improve its content.
                  Review generated changes before applying them to an application.
                </p>
                <button
                  onClick={analyzeResume}
                  disabled={aiLoading}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 disabled:opacity-50"
                >
                  <Sparkles size={16} /> Analyze Resume
                </button>
                <button
                  onClick={improveResume}
                  disabled={aiLoading}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 disabled:opacity-50"
                >
                  <RefreshCw size={16} /> Improve Resume
                </button>
              </section>
            )}
          </aside>

          <main className="min-w-0">
            {!selectedResume ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <FileText size={40} className="mb-4 text-slate-400" />
                <h2 className="text-lg font-semibold">Your resume workspace</h2>
                <p className="mt-2 max-w-md text-sm text-slate-500">
                  Create a resume, generate one with AI, or upload an existing
                  file. Your saved resumes will appear on the left.
                </p>
                <button
                  onClick={() => setShowCreateOptions(true)}
                  className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Create your first resume
                </button>
              </div>
            ) : (
              <div
                id="resume-print-area"
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 print:rounded-none print:border-0 print:shadow-none"
              >
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between print:hidden">
                  <div className="min-w-0 flex-1">
                    {editing ? (
                      <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Resume title"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-lg font-semibold outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
                      />
                    ) : (
                      <h2 className="truncate text-lg font-semibold">{title}</h2>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedResume.source_type === "uploaded"
                        ? "Uploaded resume"
                        : selectedResume.source_type === "ai_generated"
                          ? "AI generated resume"
                          : "Manually created resume"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {editing ? (
                      <>
                        <button
                          onClick={() => {
                            selectResume(selectedResume);
                          }}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
                        >
                          <X size={16} /> Cancel
                        </button>
                        <button
                          onClick={saveResume}
                          disabled={saving}
                          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
                        >
                          {saving ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Save size={16} />
                          )}
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
                      >
                        <Pencil size={16} /> Edit Resume
                      </button>
                    )}
                  </div>
                </div>

                {editing && (
                  <div className="space-y-5 border-b border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/40 print:hidden">
                    <div>
                      <h3 className="mb-3 text-sm font-semibold">Personal information</h3>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {[
                          ["name", "Full name"],
                          ["role", "Professional title"],
                          ["email", "Email"],
                          ["phone", "Phone"],
                          ["location", "Location"],
                        ].map(([field, label]) => (
                          <label key={field} className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            {label}
                            <input
                              value={content.personal[field] || ""}
                              onChange={(event) =>
                                updatePersonal(field, event.target.value)
                              }
                              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Professional summary
                      <textarea
                        rows={4}
                        value={content.personal.summary || ""}
                        onChange={(event) =>
                          updatePersonal("summary", event.target.value)
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Skills (separate each skill with a comma)
                      <textarea
                        rows={3}
                        value={content.skills.join(", ")}
                        onChange={(event) =>
                          updateList(
                            "skills",
                            event.target.value
                              .split(",")
                              .map((skill) => skill.trim())
                              .filter(Boolean)
                          )
                        }
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Education (JSON array)
                      <textarea
                        rows={4}
                        defaultValue={JSON.stringify(content.education, null, 2)}
                        onBlur={(event) => {
                          try {
                            const parsed = JSON.parse(event.target.value);
                            if (!Array.isArray(parsed)) throw new Error("Expected an array");
                            updateList("education", parsed);
                          } catch {
                            setError("Education must be a valid JSON array. Changes were not applied.");
                          }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-xs outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Experience (JSON array)
                      <textarea
                        rows={5}
                        defaultValue={JSON.stringify(content.experience, null, 2)}
                        onBlur={(event) => {
                          try {
                            const parsed = JSON.parse(event.target.value);
                            if (!Array.isArray(parsed)) throw new Error("Expected an array");
                            updateList("experience", parsed);
                          } catch {
                            setError("Experience must be a valid JSON array. Changes were not applied.");
                          }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-xs outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                      Projects (JSON array)
                      <textarea
                        rows={5}
                        defaultValue={JSON.stringify(content.projects, null, 2)}
                        onBlur={(event) => {
                          try {
                            const parsed = JSON.parse(event.target.value);
                            if (!Array.isArray(parsed)) throw new Error("Expected an array");
                            updateList("projects", parsed);
                          } catch {
                            setError("Projects must be a valid JSON array. Changes were not applied.");
                          }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 font-mono text-xs outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-900"
                      />
                    </label>

                    {templates.length > 0 && (
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                        Resume template
                        <select
                          value={templateId}
                          onChange={(event) => setTemplateId(event.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                        >
                          <option value="">Default template</option>
                          {templates.map((template) => (
                            <option key={template.id} value={String(template.id)}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                )}

                <article className="resume-document p-6 sm:p-10 print:p-0">
                  <header className="border-b-2 border-slate-800 pb-6">
                    <h1 className="break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                      {content.personal.name || "Your Name"}
                    </h1>
                    <p className="mt-2 text-lg font-medium text-indigo-700">
                      {content.personal.role || "Professional Title"}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                      {content.personal.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail size={14} /> {content.personal.email}
                        </span>
                      )}
                      {content.personal.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} /> {content.personal.phone}
                        </span>
                      )}
                      {content.personal.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {content.personal.location}
                        </span>
                      )}
                    </div>
                  </header>

                  <section className="mt-7">
                    <DocumentSection title="Professional Summary" icon={<User size={17} />}>
                      <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                        {content.personal.summary || "Add a short professional summary to introduce your experience, strengths and career goals."}
                      </p>
                    </DocumentSection>
                  </section>

                  <section className="mt-7">
                    <DocumentSection title="Experience" icon={<Briefcase size={17} />}>
                      {content.experience.length ? (
                        <div className="space-y-5">
                          {content.experience.map((item, index) => (
                            <div key={item.id || index}>
                              <div className="flex flex-col justify-between gap-1 sm:flex-row">
                                <div>
                                  <h3 className="font-semibold text-slate-900">
                                    {item.role || item.position || "Position"}
                                  </h3>
                                  <p className="text-sm text-indigo-700">
                                    {item.company || item.organization || ""}
                                  </p>
                                </div>
                                <span className="text-xs text-slate-500">
                                  {item.duration || item.dates || ""}
                                </span>
                              </div>
                              {item.description && (
                                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                                  {item.description}
                                </p>
                              )}
                              {Array.isArray(item.achievements) && item.achievements.length > 0 && (
                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                                  {item.achievements.map((achievement, i) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No experience added yet.</p>
                      )}
                    </DocumentSection>
                  </section>

                  <section className="mt-7">
                    <DocumentSection title="Education" icon={<GraduationCap size={17} />}>
                      {content.education.length ? (
                        <div className="space-y-4">
                          {content.education.map((item, index) => (
                            <div key={item.id || index}>
                              <h3 className="font-semibold text-slate-900">
                                {item.degree || item.qualification || "Degree"}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {item.college || item.institution || ""}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.year || item.duration || ""}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No education added yet.</p>
                      )}
                    </DocumentSection>
                  </section>

                  <section className="mt-7">
                    <DocumentSection title="Technical Skills" icon={<Code2 size={17} />}>
                      {content.skills.length ? (
                        <div className="flex flex-wrap gap-2">
                          {content.skills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-md bg-slate-100 px-3 py-1.5 text-sm text-slate-800"
                            >
                              {typeof skill === "string" ? skill : skill.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No skills added yet.</p>
                      )}
                    </DocumentSection>
                  </section>

                  <section className="mt-7">
                    <DocumentSection title="Projects" icon={<FolderKanban size={17} />}>
                      {content.projects.length ? (
                        <div className="space-y-4">
                          {content.projects.map((project, index) => (
                            <div key={project.id || project.name || index}>
                              <h3 className="font-semibold text-slate-900">
                                {project.name || "Project"}
                              </h3>
                              {project.description && (
                                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-700">
                                  {project.description}
                                </p>
                              )}
                              {(project.tech || project.technologies) && (
                                <p className="mt-1 text-xs font-medium text-indigo-700">
                                  {Array.isArray(project.technologies)
                                    ? project.technologies.join(" • ")
                                    : project.tech || project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No projects added yet.</p>
                      )}
                    </DocumentSection>
                  </section>

                  {content.certifications.length > 0 && (
                    <section className="mt-7">
                      <DocumentSection title="Certifications" icon={<CheckCircle2 size={17} />}>
                        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {content.certifications.map((item, index) => (
                            <li key={index}>
                              {typeof item === "string" ? item : item.name}
                            </li>
                          ))}
                        </ul>
                      </DocumentSection>
                    </section>
                  )}

                  {content.languages.length > 0 && (
                    <section className="mt-7">
                      <DocumentSection title="Languages" icon={<FileText size={17} />}>
                        <p className="text-sm text-slate-700">
                          {content.languages
                            .map((item) => typeof item === "string" ? item : item.name)
                            .join(" • ")}
                        </p>
                      </DocumentSection>
                    </section>
                  )}
                </article>

                {aiScore != null && (
                  <div className="border-t border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/40 print:hidden">
                    <span className="font-semibold">Latest AI score:</span>{" "}
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {aiScore}/100
                    </span>
                    {selectedResume.ai_feedback && (
                      <pre className="mt-3 whitespace-pre-wrap break-words text-xs text-slate-600 dark:text-slate-300">
                        {typeof selectedResume.ai_feedback === "string"
                          ? selectedResume.ai_feedback
                          : JSON.stringify(selectedResume.ai_feedback, null, 2)}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-print-area,
          #resume-print-area * {
            visibility: visible;
          }
          #resume-print-area {
            position: absolute;
            inset: 0;
            width: 100%;
            background: white !important;
            color: #111827 !important;
          }
          #resume-print-area .resume-document {
            padding: 24px !important;
          }
          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  );
}

function DocumentSection({ title, icon, children }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
        <span className="text-indigo-700">{icon}</span>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
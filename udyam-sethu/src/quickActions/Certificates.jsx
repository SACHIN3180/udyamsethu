
import React, { useRef, useState } from "react";
import {
  Upload,
  Award,
  Plus,
  X,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Building2,
  FileText,
  Sparkles,
} from "lucide-react";

function Certificates() {
  const fileInputRef = useRef(null);

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "JavaScript Fundamentals",
      issuer: "Infosys Springboard",
      date: "15 March 2026",
      description:
        "This certificate represents successful completion of JavaScript fundamentals, including variables, conditions, loops, arrays, functions, and basic problem solving.",
      file: null,
      preview:
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=80",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    file: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      file,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.issuer || !formData.description) {
      alert("Please fill all required fields.");
      return;
    }

    const newCertificate = {
      id: Date.now(),
      title: formData.title,
      issuer: formData.issuer,
      date: formData.date,
      description: formData.description,
      file: formData.file,
      preview: formData.file
        ? URL.createObjectURL(formData.file)
        : "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1200&q=80",
    };

    setCertificates([newCertificate, ...certificates]);

    setFormData({
      title: "",
      issuer: "",
      date: "",
      description: "",
      file: null,
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setCertificates(
      certificates.filter((certificate) => certificate.id !== id)
    );
  };

  const openView = (certificate) => {
    setSelectedCertificate(certificate);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Award size={22} />
              </div>

              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Student Portfolio
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Certificates
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Showcase your achievements, certifications, courses and
              professional accomplishments.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            <Plus size={19} />
            Add Certificate
          </button>
        </div>


        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total Certificates
            </p>

            <p className="mt-1 text-2xl font-bold">
              {certificates.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Achievements
            </p>

            <p className="mt-1 text-2xl font-bold">
              {certificates.length}
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-500/20 dark:bg-indigo-500/10 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-indigo-600 dark:text-indigo-400"
              />

              <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                Build Your Profile
              </p>
            </div>

            <p className="mt-1 text-xs text-indigo-600/80 dark:text-indigo-300/70">
              Add certificates to strengthen your professional profile.
            </p>
          </div>

        </div>


        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {certificates.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Award size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No certificates yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Upload your first certificate and showcase your achievements
              to employers and institutions.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Upload size={18} />
              Upload Certificate
            </button>

          </div>
        )}


        {/* =====================================================
            CERTIFICATES
        ====================================================== */}

        <div className="grid gap-7 lg:grid-cols-2">

          {certificates.map((certificate) => (

            <div
              key={certificate.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >

              {/* Certificate Image */}

              <div className="relative bg-slate-100 p-3 dark:bg-slate-950">

                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md">

                  <img
                    src={certificate.preview}
                    alt={certificate.title}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

                    <button
                      onClick={() => openView(certificate)}
                      className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg"
                    >
                      <Eye size={17} />
                      View Certificate
                    </button>

                  </div>

                </div>

              </div>


              {/* Certificate Details */}

              <div className="p-5 sm:p-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">

                    <h2 className="truncate text-lg font-bold sm:text-xl">
                      {certificate.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Building2 size={16} />
                      <span>{certificate.issuer}</span>
                    </div>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <Award size={19} />
                  </div>

                </div>


                {/* Date */}

                {certificate.date && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <CalendarDays size={15} />
                    Issued on {certificate.date}
                  </div>
                )}


                {/* Represents */}

                <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">

                  <div className="mb-2 flex items-center gap-2">

                    <FileText
                      size={16}
                      className="text-indigo-600 dark:text-indigo-400"
                    />

                    <h3 className="text-sm font-semibold">
                      What this certificate represents
                    </h3>

                  </div>

                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {certificate.description}
                  </p>

                </div>


                {/* Actions */}

                <div className="mt-5 flex gap-2">

                  <button
                    onClick={() => openView(certificate)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          ADD CERTIFICATE MODAL
      ====================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-slate-900">

            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-6">

              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  Add Certificate
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Add your certification details and upload the certificate.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>

            </div>


            {/* Form */}

            <form
              onSubmit={handleAddCertificate}
              className="space-y-5 p-5 sm:p-6"
            >

              {/* Upload */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Certificate File
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 px-5 py-10 text-center transition hover:border-indigo-500 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/5"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <Upload size={25} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    {formData.file
                      ? formData.file.name
                      : "Upload your certificate"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    PNG, JPG or PDF
                  </p>

                </button>

              </div>


              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Certificate Name *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Example: React.js Certification"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                />

              </div>


              {/* Issuer + Date */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Issuing Organization *
                  </label>

                  <input
                    type="text"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    placeholder="Example: Coursera"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Issue Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                  />

                </div>

              </div>


              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  What does this certificate represent? *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Explain what you learned, what skills you demonstrated, or what achievement this certificate represents..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
                />

              </div>


              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Save Certificate
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =====================================================
          FULL CERTIFICATE VIEW
      ====================================================== */}

      {selectedCertificate && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6">

          <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white dark:bg-slate-900">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6">

              <div>
                <h2 className="font-bold">
                  {selectedCertificate.title}
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedCertificate.issuer}
                </p>
              </div>

              <button
                onClick={() => setSelectedCertificate(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={21} />
              </button>

            </div>


            <div className="p-3 sm:p-6">

              <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-950">

                <img
                  src={selectedCertificate.preview}
                  alt={selectedCertificate.title}
                  className="mx-auto max-h-[70vh] w-full object-contain"
                />

              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">

                <div className="flex items-center gap-2">

                  <FileText
                    size={18}
                    className="text-indigo-600 dark:text-indigo-400"
                  />

                  <h3 className="font-semibold">
                    What this certificate represents
                  </h3>

                </div>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {selectedCertificate.description}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Certificates;

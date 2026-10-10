import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  IndianRupee,
  Info,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  Video,
  X,
} from "lucide-react";

const PostGig = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "Freelance Graphic Designer",
    description: "",
    budget: "28000",
    duration: "7 Days",
    experience: "Intermediate",
    skills: "",
    company: "Tech Solutions Inc",
    notes: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [verification, setVerification] = useState({
    identity: false,
    facial: false,
    work: false,
  });

  const steps = [
    {
      number: 1,
      title: "Gig Details",
    },
    {
      number: 2,
      title: "Verify Identity",
    },
    {
      number: 3,
      title: "Submit Work",
    },
    {
      number: 4,
      title: "Publish Gig",
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">

      {/* ================= HEADER ================= */}

      <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-5 lg:px-10">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-[#172033] flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-xl">
              U
            </span>
          </div>

          <div>
            <h1 className="font-bold text-lg text-[#172033]">
              Udyam Sethu
            </h1>

            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              Digital Gig Platform
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">
              Sophia Bennett
            </p>

            <p className="text-xs text-slate-400">
              Job Poster
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#172033] flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              SB
            </span>
          </div>

        </div>

      </header>

      {/* ================= PAGE ================= */}

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">

          <span>Home</span>

          <ChevronRight size={15} />

          <span>Dashboard</span>

          <ChevronRight size={15} />

          <span>Role Selection</span>

          <ChevronRight size={15} />

          <span className="text-slate-700 font-medium">
            Post a Gig
          </span>

        </div>

        {/* PAGE HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center">
                <BriefcaseBusiness
                  size={18}
                  className="text-cyan-600"
                />
              </div>

              <span className="text-sm font-semibold text-cyan-600">
                Hiring Workspace
              </span>

            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Post a Gig
            </h2>

            <p className="text-slate-500 mt-1">
              Create an opportunity and connect with skilled professionals.
            </p>

          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">

            <ShieldCheck
              size={17}
              className="text-emerald-600"
            />

            <span className="text-sm font-medium text-emerald-700">
              Secure & Verified Platform
            </span>

          </div>

        </div>

        {/* ================= STEPPER ================= */}

        <div className="bg-white border border-slate-200 rounded-xl p-5 lg:p-6 mb-6">

          <div className="flex items-center justify-between max-w-4xl mx-auto">

            {steps.map((step, index) => {

              const active = currentStep === step.number;
              const completed = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        w-9
                        h-9
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-semibold
                        transition
                        ${
                          completed
                            ? "bg-emerald-500 text-white"
                            : active
                            ? "bg-[#172033] text-white"
                            : "bg-slate-100 text-slate-400"
                        }
                      `}
                    >

                      {completed ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        step.number
                      )}

                    </div>

                    <div className="hidden sm:block">

                      <p
                        className={`text-xs ${
                          active || completed
                            ? "text-slate-800 font-semibold"
                            : "text-slate-400"
                        }`}
                      >
                        Step {step.number}
                      </p>

                      <p
                        className={`text-sm ${
                          active
                            ? "text-slate-900 font-semibold"
                            : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </p>

                    </div>

                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`
                        hidden sm:block
                        flex-1
                        h-px
                        mx-4
                        ${
                          currentStep > step.number
                            ? "bg-emerald-400"
                            : "bg-slate-200"
                        }
                      `}
                    />
                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-6">

          {/* MAIN CARD */}

          <section className="bg-white border border-slate-200 rounded-xl shadow-sm">

            {/* STEP 1 */}

            {currentStep === 1 && (
              <GigDetails
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {/* STEP 2 */}

            {currentStep === 2 && (
              <IdentityVerification
                verification={verification}
                setVerification={setVerification}
              />
            )}

            {/* STEP 3 */}

            {currentStep === 3 && (
              <SubmitWork
                uploadedFiles={uploadedFiles}
                handleFileUpload={handleFileUpload}
                removeFile={removeFile}
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {/* STEP 4 */}

            {currentStep === 4 && (
              <PublishGig
                formData={formData}
                verification={verification}
                uploadedFiles={uploadedFiles}
              />
            )}

            {/* FOOTER */}

            <div className="px-6 lg:px-8 py-5 border-t border-slate-100 flex items-center justify-between">

              <button
                onClick={previousStep}
                disabled={currentStep === 1}
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  h-10
                  rounded-lg
                  text-sm
                  font-medium
                  ${
                    currentStep === 1
                      ? "text-slate-300 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <ArrowLeft size={17} />
                Back
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="
                    h-10
                    px-5
                    rounded-lg
                    bg-[#172033]
                    text-white
                    text-sm
                    font-semibold
                    flex
                    items-center
                    gap-2
                    hover:bg-[#24334d]
                    transition
                  "
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  className="
                    h-10
                    px-6
                    rounded-lg
                    bg-cyan-600
                    hover:bg-cyan-700
                    text-white
                    text-sm
                    font-semibold
                    flex
                    items-center
                    gap-2
                  "
                >
                  <Sparkles size={17} />
                  Publish Gig
                </button>
              )}

            </div>

          </section>

          {/* ================= SUMMARY ================= */}

          <aside>

            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-6">

              <div className="flex items-center gap-2 mb-5">

                <FileText
                  size={18}
                  className="text-cyan-600"
                />

                <h3 className="font-semibold">
                  Gig Summary
                </h3>

              </div>

              <div className="pb-5 border-b border-slate-100">

                <p className="text-xs text-slate-400 mb-1">
                  Gig title
                </p>

                <p className="font-semibold text-slate-900">
                  {formData.title || "Untitled Gig"}
                </p>

              </div>

              <div className="py-5 space-y-4">

                <SummaryItem
                  icon={IndianRupee}
                  label="Budget"
                  value={
                    formData.budget
                      ? `₹${Number(
                          formData.budget
                        ).toLocaleString("en-IN")}`
                      : "Not set"
                  }
                />

                <SummaryItem
                  icon={CalendarDays}
                  label="Duration"
                  value={formData.duration}
                />

                <SummaryItem
                  icon={UserRound}
                  label="Experience"
                  value={formData.experience}
                />

                <SummaryItem
                  icon={BriefcaseBusiness}
                  label="Company"
                  value={formData.company}
                />

              </div>

              <div className="rounded-lg bg-cyan-50 border border-cyan-100 p-4">

                <div className="flex gap-3">

                  <Info
                    size={17}
                    className="text-cyan-600 shrink-0"
                  />

                  <p className="text-xs text-cyan-800 leading-5">
                    Complete verification before publishing your gig.
                    This helps maintain a trusted community on Udyam Sethu.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};


/* ============================================================
   GIG DETAILS
============================================================ */

const GigDetails = ({
  formData,
  handleChange,
}) => {

  return (
    <div className="p-6 lg:p-8">

      <SectionHeader
        title="Gig Details"
        description="Provide the information candidates need to understand your opportunity."
      />

      <div className="space-y-6">

        <InputField
          label="Gig Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Freelance Graphic Designer"
          required
        />

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Gig Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the project, responsibilities and expected outcome..."
            className="
              w-full
              rounded-lg
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              text-sm
              outline-none
              resize-none
              focus:bg-white
              focus:border-cyan-500
              focus:ring-4
              focus:ring-cyan-500/10
            "
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <InputField
            label="Budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            placeholder="28000"
            icon={IndianRupee}
            required
          />

          <SelectField
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            options={[
              "3 Days",
              "5 Days",
              "7 Days",
              "14 Days",
              "30 Days",
              "Custom",
            ]}
          />

          <SelectField
            label="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            options={[
              "Beginner",
              "Intermediate",
              "Experienced",
              "Expert",
            ]}
          />

        </div>

        <InputField
          label="Skills Required"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="e.g. Figma, Photoshop, Illustrator, UI/UX"
        />

        <InputField
          label="Company / Organization"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company name"
        />

      </div>

    </div>
  );
};


/* ============================================================
   IDENTITY VERIFICATION
============================================================ */

const IdentityVerification = ({
  verification,
  setVerification,
}) => {

  const updateVerification = (key) => {

    setVerification({
      ...verification,
      [key]: !verification[key],
    });

  };

  return (
    <div className="p-6 lg:p-8">

      <SectionHeader
        title="Verify Your Identity"
        description="To ensure trust and safety for our community, verify your identity before publishing."
      />

      <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-5 mb-7">

        <div className="flex gap-3">

          <ShieldCheck
            size={22}
            className="text-cyan-600 shrink-0"
          />

          <div>

            <p className="font-semibold text-cyan-900">
              Why verification is required
            </p>

            <p className="text-sm text-cyan-800 mt-1 leading-6">
              Identity verification helps Udyam Sethu maintain a
              trusted environment for businesses and professionals.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-4">

        <VerificationCard
          icon={LockKeyhole}
          title="Government ID Verification"
          description="Upload a valid government-issued ID such as Aadhaar or Passport."
          completed={verification.identity}
          onClick={() =>
            updateVerification("identity")
          }
        />

        <VerificationCard
          icon={Video}
          title="Facial Recognition Scan"
          description="Complete a quick facial verification to confirm your identity."
          completed={verification.facial}
          onClick={() =>
            updateVerification("facial")
          }
        />

        <VerificationCard
          icon={ShieldCheck}
          title="Trusted Profile"
          description="Build a verified profile and increase confidence with potential talent."
          completed={
            verification.identity &&
            verification.facial
          }
          onClick={() => {}}
        />

      </div>

    </div>
  );
};


/* ============================================================
   SUBMIT WORK
============================================================ */

const SubmitWork = ({
  uploadedFiles,
  handleFileUpload,
  removeFile,
  formData,
  handleChange,
}) => {

  return (
    <div className="p-6 lg:p-8">

      <SectionHeader
        title="Submit Work"
        description="Upload supporting documents, images or completed work related to your gig."
      />

      <label
        className="
          block
          border-2
          border-dashed
          border-slate-300
          rounded-xl
          p-10
          text-center
          hover:border-cyan-400
          hover:bg-cyan-50/30
          transition
          cursor-pointer
        "
      >

        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="w-14 h-14 mx-auto rounded-xl bg-cyan-50 flex items-center justify-center mb-4">

          <Upload
            size={25}
            className="text-cyan-600"
          />

        </div>

        <h3 className="font-semibold text-slate-800">
          Upload documents, images or completed work
        </h3>

        <p className="text-sm text-slate-400 mt-2">
          Tap to upload files
        </p>

        <p className="text-xs text-slate-400 mt-3">
          PDF, JPG, PNG, DOCX up to 10MB
        </p>

      </label>

      {uploadedFiles.length > 0 && (

        <div className="mt-5 space-y-2">

          {uploadedFiles.map((file, index) => (

            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
            >

              <FileText
                size={18}
                className="text-cyan-600"
              />

              <div className="flex-1 min-w-0">

                <p className="text-sm font-medium truncate">
                  {file.name}
                </p>

                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

              <button
                onClick={() => removeFile(index)}
                className="p-1.5 hover:bg-white rounded-md"
              >
                <X size={16} />
              </button>

            </div>

          ))}

        </div>

      )}

      <div className="mt-7">

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Additional Notes
        </label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Add any additional notes or instructions..."
          className="
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            text-sm
            resize-none
            outline-none
            focus:bg-white
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/10
          "
        />

      </div>

    </div>
  );
};


/* ============================================================
   PUBLISH
============================================================ */

const PublishGig = ({
  formData,
  verification,
  uploadedFiles,
}) => {

  return (
    <div className="p-6 lg:p-8">

      <SectionHeader
        title="Publish Gig"
        description="Review your gig details before making the opportunity available."
      />

      <div className="rounded-xl border border-slate-200 overflow-hidden">

        <div className="p-6 bg-slate-50 border-b border-slate-200">

          <div className="flex items-start justify-between gap-4">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                Freelance Opportunity
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {formData.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                {formData.company}
              </p>

            </div>

            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
              Ready to publish
            </div>

          </div>

        </div>

        <div className="p-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">

            <ReviewItem
              icon={IndianRupee}
              label="Budget"
              value={`₹${Number(
                formData.budget
              ).toLocaleString("en-IN")}`}
            />

            <ReviewItem
              icon={Clock3}
              label="Duration"
              value={formData.duration}
            />

            <ReviewItem
              icon={UserRound}
              label="Experience"
              value={formData.experience}
            />

          </div>

          <div className="space-y-3">

            <PublishCheck
              title="Gig details completed"
              completed={Boolean(formData.title)}
            />

            <PublishCheck
              title="Identity verification completed"
              completed={
                verification.identity &&
                verification.facial
              }
            />

            <PublishCheck
              title="Supporting documents submitted"
              completed={uploadedFiles.length > 0}
            />

          </div>

        </div>

      </div>

    </div>
  );
};


/* ============================================================
   COMPONENTS
============================================================ */

const SectionHeader = ({
  title,
  description,
}) => {

  return (
    <div className="mb-8">

      <h3 className="text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        {description}
      </p>

    </div>
  );
};


const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  required,
}) => {

  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <div className="relative">

        {Icon && (
          <Icon
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            h-11
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            pr-4
            text-sm
            outline-none
            focus:bg-white
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-500/10
            ${
              Icon
                ? "pl-10"
                : "px-4"
            }
          `}
        />

      </div>

    </div>
  );
};


const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {

  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-11
          rounded-lg
          border
          border-slate-200
          bg-slate-50
          px-4
          text-sm
          outline-none
          focus:bg-white
          focus:border-cyan-500
          focus:ring-4
          focus:ring-cyan-500/10
        "
      >

        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}

      </select>

    </div>
  );
};


const VerificationCard = ({
  icon: Icon,
  title,
  description,
  completed,
  onClick,
}) => {

  return (
    <button
      onClick={onClick}
      className="
        w-full
        text-left
        p-5
        border
        border-slate-200
        rounded-xl
        flex
        items-center
        gap-4
        hover:border-cyan-300
        hover:bg-cyan-50/20
        transition
      "
    >

      <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">

        <Icon
          size={20}
          className="text-slate-600"
        />

      </div>

      <div className="flex-1">

        <p className="font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-sm text-slate-400 mt-1">
          {description}
        </p>

      </div>

      {completed ? (
        <CheckCircle2
          size={22}
          className="text-emerald-500"
        />
      ) : (
        <ArrowRight
          size={19}
          className="text-slate-400"
        />
      )}

    </button>
  );
};


const SummaryItem = ({
  icon: Icon,
  label,
  value,
}) => {

  return (
    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">

        <Icon
          size={17}
          className="text-slate-500"
        />

      </div>

      <div>

        <p className="text-[11px] text-slate-400">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
};


const ReviewItem = ({
  icon: Icon,
  label,
  value,
}) => {

  return (
    <div className="p-4 bg-slate-50 rounded-lg">

      <div className="flex items-center gap-2 text-slate-400">

        <Icon size={16} />

        <span className="text-xs">
          {label}
        </span>

      </div>

      <p className="font-bold text-lg mt-2">
        {value}
      </p>

    </div>
  );
};


const PublishCheck = ({
  title,
  completed,
}) => {

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">

      <CheckCircle2
        size={19}
        className={
          completed
            ? "text-emerald-500"
            : "text-slate-300"
        }
      />

      <span
        className={`text-sm ${
          completed
            ? "text-slate-700"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>

    </div>
  );
};

export default PostGig;
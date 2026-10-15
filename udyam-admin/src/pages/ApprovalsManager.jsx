import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Building2,
  Landmark,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Clock,
  Globe,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  X,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { getApprovals, handleApprovalAction } from "../api";

export default function ApprovalsManager() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending"); // 'pending' | 'approved' | 'rejected' | 'all'
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'employer' | 'institution'
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);

  // Modals
  const [detailModalItem, setDetailModalItem] = useState(null);
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchRequests();
  }, [activeTab, typeFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getApprovals(typeFilter, activeTab);
      if (data && data.requests) {
        setRequests(data.requests);
      }
    } catch (err) {
      console.error("Fetch approvals error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (req) => {
    try {
      setActionLoading(req.id);
      const res = await handleApprovalAction(req.request_type, req.id, "approve");
      setNotification({
        type: "success",
        title: "Registration Accepted & Validated!",
        message: `${req.name} (${req.request_type}) has been approved. Their login credentials are now active and they can sign into their portal.`,
      });
      await fetchRequests();
    } catch (err) {
      setNotification({
        type: "error",
        title: "Approval Failed",
        message: err.response?.data?.message || "Could not complete approval action.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (req) => {
    setRejectModalItem(req);
    setRejectionReason("");
  };

  const submitReject = async () => {
    if (!rejectModalItem) return;
    try {
      setActionLoading(rejectModalItem.id);
      await handleApprovalAction(
        rejectModalItem.request_type,
        rejectModalItem.id,
        "reject",
        rejectionReason || "Application did not meet verification criteria"
      );
      setNotification({
        type: "info",
        title: "Registration Request Rejected",
        message: `${rejectModalItem.name}'s registration was marked as rejected.`,
      });
      setRejectModalItem(null);
      await fetchRequests();
    } catch (err) {
      setNotification({
        type: "error",
        title: "Action Failed",
        message: err.response?.data?.message || "Could not reject application.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.contact_person && r.contact_person.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.industry && r.industry.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Registration Approvals Desk
            </h1>
            <span className="h-6 px-2.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center">
              Task 1 & 2 Core
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Accept or reject employer and institution registrations. When you click <strong>Accept</strong>, their login credentials immediately become active.
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw size={15} />
          Refresh Requests
        </button>
      </div>

      {/* NOTIFICATION BANNER */}
      {notification && (
        <div
          className={`p-4 rounded-2xl border shadow-sm flex items-start justify-between gap-3 ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : notification.type === "info"
              ? "bg-blue-50 border-blue-200 text-blue-900"
              : "bg-red-50 border-red-200 text-red-900"
          }`}
        >
          <div className="flex items-start gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" />
            ) : notification.type === "info" ? (
              <AlertCircle size={18} className="text-blue-600 mt-0.5 shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
            )}
            <div>
              <p className="text-sm font-bold">{notification.title}</p>
              <p className="text-xs mt-0.5 opacity-90">{notification.message}</p>
            </div>
          </div>

          <button
            onClick={() => setNotification(null)}
            className="text-xs opacity-60 hover:opacity-100 font-bold p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* CONTROLS CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        {/* TAB NAVIGATION */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          {[
            { id: "pending", label: "Pending Approvals", badge: true },
            { id: "approved", label: "Approved (Valid Credentials)" },
            { id: "rejected", label: "Rejected" },
            { id: "all", label: "All Records" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0B1528] text-white shadow"
                  : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
          ))}
        </div>

        {/* SEARCH & TYPE FILTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company, person, email..."
              className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Filter Portal:</span>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1 rounded-lg transition ${
                  typeFilter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                All Portals
              </button>
              <button
                onClick={() => setTypeFilter("employer")}
                className={`px-3 py-1 rounded-lg transition ${
                  typeFilter === "employer" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Employers
              </button>
              <button
                onClick={() => setTypeFilter("institution")}
                className={`px-3 py-1 rounded-lg transition ${
                  typeFilter === "institution" ? "bg-white text-cyan-700 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Institutions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REQUESTS LIST */}
      {loading ? (
        <div className="py-16 text-center">
          <RefreshCw className="animate-spin text-cyan-600 mx-auto mb-2" size={28} />
          <p className="text-xs font-semibold text-slate-500">Fetching applications...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
          <ShieldCheck size={44} className="mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No Registration Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {activeTab === "pending"
              ? "Great! There are no pending approvals matching this view."
              : "No records found matching your filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const isPending = req.status === "pending";
            const isApproved = req.status === "approved";
            const isRejected = req.status === "rejected";

            return (
              <div
                key={`${req.request_type}-${req.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-5 sm:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* LEFT: INFO */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md ${
                        req.request_type === "employer"
                          ? "bg-purple-600 shadow-purple-200"
                          : "bg-cyan-600 shadow-cyan-200"
                      }`}
                    >
                      {req.request_type === "employer" ? <Building2 size={24} /> : <Landmark size={24} />}
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 text-base">
                          {req.name}
                        </h3>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            req.request_type === "employer"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-cyan-100 text-cyan-700"
                          }`}
                        >
                          {req.request_type === "employer" ? "Employer Portal" : "Institution Portal"}
                        </span>
                        <span
                          className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                            isPending
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : isApproved
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-red-50 text-red-800 border-red-300"
                          }`}
                        >
                          {isPending ? "⏳ Pending Approval" : isApproved ? "✓ Valid & Approved" : "✕ Rejected"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <strong>Contact:</strong> {req.contact_person}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail size={13} className="text-slate-400" />
                          {req.email}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Phone size={13} className="text-slate-400" />
                          {req.phone}
                        </span>
                        {req.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-slate-400" />
                            {req.location}
                          </span>
                        )}
                        {req.industry && (
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                            {req.industry}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          Registered: {new Date(req.created_at).toLocaleDateString()} at {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {req.rejection_reason && (
                          <span className="text-red-500 font-medium">
                            Reason: "{req.rejection_reason}"
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: ACTION BUTTONS */}
                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      onClick={() => setDetailModalItem(req)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Eye size={14} />
                      Inspect
                    </button>

                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleApprove(req)}
                          disabled={actionLoading === req.id}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                          title="Accept registration and validate login credentials"
                        >
                          <CheckCircle2 size={16} />
                          Accept & Validate Credentials
                        </button>
                        <button
                          onClick={() => openRejectModal(req)}
                          disabled={actionLoading === req.id}
                          className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </>
                    ) : isApproved ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                          <CheckCircle2 size={14} />
                          Credentials Active
                        </span>
                        <button
                          onClick={() => openRejectModal(req)}
                          className="text-xs text-slate-400 hover:text-red-500 underline px-1"
                        >
                          Revoke
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApprove(req)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        Re-Approve Credentials
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center text-white ${
                    detailModalItem.request_type === "employer" ? "bg-purple-600" : "bg-cyan-600"
                  }`}
                >
                  {detailModalItem.request_type === "employer" ? <Building2 size={20} /> : <Landmark size={20} />}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {detailModalItem.name}
                  </h3>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    {detailModalItem.request_type} Registration Details
                  </span>
                </div>
              </div>

              <button
                onClick={() => setDetailModalItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 text-xs block">Official Email</span>
                  <span className="font-semibold text-slate-900">{detailModalItem.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Contact Phone</span>
                  <span className="font-semibold text-slate-900">{detailModalItem.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Contact Person</span>
                  <span className="font-semibold text-slate-900">{detailModalItem.contact_person}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Type / Industry</span>
                  <span className="font-semibold text-slate-900">{detailModalItem.industry || "Not provided"}</span>
                </div>
                {detailModalItem.company_size && (
                  <div>
                    <span className="text-slate-400 text-xs block">Company Size</span>
                    <span className="font-semibold text-slate-900">{detailModalItem.company_size}</span>
                  </div>
                )}
                {detailModalItem.location && (
                  <div>
                    <span className="text-slate-400 text-xs block">Location</span>
                    <span className="font-semibold text-slate-900">{detailModalItem.location}</span>
                  </div>
                )}
                {detailModalItem.website && (
                  <div className="col-span-2">
                    <span className="text-slate-400 text-xs block">Website</span>
                    <a
                      href={detailModalItem.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      {detailModalItem.website}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Credential & Approval Status
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      detailModalItem.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : detailModalItem.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {detailModalItem.status}
                  </span>
                  <span className="text-xs text-slate-500">
                    {detailModalItem.status === "approved"
                      ? "Login credentials are VALID. The user can sign in."
                      : "Login credentials are NOT valid. Sign-in is blocked."}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setDetailModalItem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Close
              </button>

              {detailModalItem.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      const item = detailModalItem;
                      setDetailModalItem(null);
                      openRejectModal(item);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-xs hover:bg-red-50"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      const item = detailModalItem;
                      setDetailModalItem(null);
                      handleApprove(item);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
                  >
                    Accept Registration
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECT CONFIRMATION MODAL */}
      {rejectModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Reject Registration
                </h3>
                <p className="text-xs text-slate-500">
                  {rejectModalItem.name} ({rejectModalItem.request_type})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2 mb-4 leading-relaxed">
              When rejected, this applicant will not be allowed to log into the portal. You can optionally specify a reason below.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Rejection Reason (Visible to user on login attempt)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Official domain mismatch, incomplete organization documentation..."
                rows={3}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setRejectModalItem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitReject}
                disabled={actionLoading === rejectModalItem.id}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-600/20 transition cursor-pointer disabled:opacity-60"
              >
                {actionLoading === rejectModalItem.id ? "Processing..." : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

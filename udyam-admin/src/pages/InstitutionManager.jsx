import React, { useState, useEffect } from "react";
import {
  Landmark,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Phone,
  GraduationCap,
  ShieldAlert,
  X,
  RefreshCw,
  Globe,
  UserCheck,
} from "lucide-react";
import {
  getInstitutions,
  updateInstitution,
  updateInstitutionStatus,
  deleteInstitution,
} from "../api";

export default function InstitutionManager() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notification, setNotification] = useState(null);

  // Modals
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchInstitutionsList();
  }, [statusFilter]);

  const fetchInstitutionsList = async () => {
    try {
      setLoading(true);
      const data = await getInstitutions(search, statusFilter);
      if (data && data.institutions) {
        setInstitutions(data.institutions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (inst, newStatus) => {
    try {
      await updateInstitutionStatus(inst.id, newStatus);
      setNotification({
        type: "success",
        text: `Institution ${inst.institution_name} status updated to ${newStatus}.`,
      });
      fetchInstitutionsList();
    } catch (err) {
      setNotification({
        type: "error",
        text: err.response?.data?.message || "Failed to update institution status",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInstitution(editItem.id, editItem);
      setNotification({ type: "success", text: "Institution details updated successfully!" });
      setEditItem(null);
      fetchInstitutionsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to update institution" });
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deleteId) return;
    try {
      await deleteInstitution(deleteId);
      setNotification({ type: "info", text: "Institution account removed." });
      setDeleteId(null);
      fetchInstitutionsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to delete institution" });
    }
  };

  const filtered = institutions.filter((inst) => {
    const q = search.toLowerCase();
    return (
      (inst.institution_name && inst.institution_name.toLowerCase().includes(q)) ||
      (inst.admin_name && inst.admin_name.toLowerCase().includes(q)) ||
      (inst.email && inst.email.toLowerCase().includes(q)) ||
      (inst.institution_type && inst.institution_type.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institution Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Govern registered colleges, universities, training institutes, and institutional admin access.
          </p>
        </div>

        <button
          onClick={fetchInstitutionsList}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw size={15} />
          Refresh List
        </button>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold border ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : notification.type === "info"
              ? "bg-blue-50 text-blue-900 border-blue-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)} className="underline opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* FILTER & SEARCH */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by institution name, admin name, type..."
            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* INSTITUTIONS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <RefreshCw className="animate-spin text-cyan-600 mx-auto mb-2" size={24} />
            Loading institution records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No institutions found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-4">Institution</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Administrator</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inst) => {
                  const isPending = inst.status === "pending";
                  const isApproved = inst.status === "approved";
                  const isSuspended = inst.status === "suspended";

                  return (
                    <tr key={inst.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-cyan-50 text-cyan-700 font-bold flex items-center justify-center shrink-0 border border-cyan-100">
                            <Landmark size={18} />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{inst.institution_name}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-slate-400 text-[11px]">{inst.email}</span>
                              {inst.website && (
                                <a
                                  href={inst.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-600 hover:text-cyan-800"
                                >
                                  <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {inst.institution_type || "College"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{inst.admin_name}</span>
                        <span className="text-slate-400 text-[11px]">{inst.designation || "Admin"}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {inst.phone || "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isPending
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : isApproved
                              ? "bg-emerald-100 text-emerald-800"
                              : isSuspended
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {inst.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending ? (
                            <button
                              onClick={() => handleStatusChange(inst, "approved")}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(inst, isSuspended ? "approved" : "suspended")}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                isSuspended
                                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                              }`}
                            >
                              {isSuspended ? "Activate" : "Suspend"}
                            </button>
                          )}

                          <button
                            onClick={() => setEditItem(inst)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                            title="Edit institution details"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteId(inst.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete institution"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Landmark className="text-cyan-600" size={20} />
                Edit Institution Profile
              </h3>
              <button onClick={() => setEditItem(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution Name</label>
                <input
                  type="text"
                  value={editItem.institution_name}
                  onChange={(e) => setEditItem({ ...editItem, institution_name: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={editItem.institution_type}
                    onChange={(e) => setEditItem({ ...editItem, institution_type: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="University">University</option>
                    <option value="Engineering College">Engineering College</option>
                    <option value="Degree College">Degree College</option>
                    <option value="Polytechnic">Polytechnic</option>
                    <option value="Training Institute">Training Institute</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Phone</label>
                  <input
                    type="text"
                    value={editItem.phone}
                    onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={editItem.email}
                  onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admin Name</label>
                  <input
                    type="text"
                    value={editItem.admin_name}
                    onChange={(e) => setEditItem({ ...editItem, admin_name: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={editItem.designation || ""}
                    onChange={(e) => setEditItem({ ...editItem, designation: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={editItem.website || ""}
                  onChange={(e) => setEditItem({ ...editItem, website: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editItem.status}
                  onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-cyan-500"
                >
                  <option value="approved">Approved (Valid Credentials)</option>
                  <option value="pending">Pending Approval</option>
                  <option value="rejected">Rejected</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold shadow-md shadow-cyan-700/20"
                >
                  Update Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Remove Institution Account?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
              This will permanently revoke institutional administrator access and associated records.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20"
              >
                Delete Institution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

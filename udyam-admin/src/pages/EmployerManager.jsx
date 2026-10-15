import React, { useState, useEffect } from "react";
import {
  Building2,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldAlert,
  X,
  RefreshCw,
  Globe,
  Users,
} from "lucide-react";
import {
  getEmployers,
  updateEmployer,
  updateEmployerStatus,
  deleteEmployer,
} from "../api";

export default function EmployerManager() {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notification, setNotification] = useState(null);

  // Modals
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployersList();
  }, [statusFilter]);

  const fetchEmployersList = async () => {
    try {
      setLoading(true);
      const data = await getEmployers(search, statusFilter);
      if (data && data.employers) {
        setEmployers(data.employers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (emp, newStatus) => {
    try {
      await updateEmployerStatus(emp.id, newStatus);
      setNotification({
        type: "success",
        text: `Employer ${emp.company_name} status updated to ${newStatus}.`,
      });
      fetchEmployersList();
    } catch (err) {
      setNotification({
        type: "error",
        text: err.response?.data?.message || "Failed to update employer status",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployer(editItem.id, editItem);
      setNotification({ type: "success", text: "Employer details updated successfully!" });
      setEditItem(null);
      fetchEmployersList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to update employer" });
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deleteId) return;
    try {
      await deleteEmployer(deleteId);
      setNotification({ type: "info", text: "Employer account removed." });
      setDeleteId(null);
      fetchEmployersList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to delete employer" });
    }
  };

  const filtered = employers.filter((emp) => {
    const q = search.toLowerCase();
    return (
      (emp.company_name && emp.company_name.toLowerCase().includes(q)) ||
      (emp.contact_person && emp.contact_person.toLowerCase().includes(q)) ||
      (emp.email && emp.email.toLowerCase().includes(q)) ||
      (emp.industry && emp.industry.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Employer Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Govern registered hiring companies, review partner verification, and update credentials.
          </p>
        </div>

        <button
          onClick={fetchEmployersList}
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
            placeholder="Search by company name, contact, email..."
            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 bg-slate-50 border border-slate-200 rounded-xl px-3 text-xs text-slate-700 font-medium focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* EMPLOYERS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <RefreshCw className="animate-spin text-purple-600 mx-auto mb-2" size={24} />
            Loading employer records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No employers found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Contact Person</th>
                  <th className="py-3.5 px-4">Industry / Size</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((emp) => {
                  const isPending = emp.status === "pending";
                  const isApproved = emp.status === "approved";
                  const isSuspended = emp.status === "suspended";

                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center shrink-0 border border-purple-100">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{emp.company_name}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-slate-400 text-[11px]">{emp.email}</span>
                              {emp.website && (
                                <a
                                  href={emp.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-purple-600 hover:text-purple-800"
                                >
                                  <ExternalLink size={11} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{emp.contact_person}</span>
                        <span className="text-slate-500 text-[11px]">{emp.phone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium block">{emp.industry || "General"}</span>
                        <span className="text-slate-400 text-[11px]">{emp.company_size || "1-50 employees"}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {emp.location || "Remote"}
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
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending ? (
                            <button
                              onClick={() => handleStatusChange(emp, "approved")}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(emp, isSuspended ? "approved" : "suspended")}
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
                            onClick={() => setEditItem(emp)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                            title="Edit employer details"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteId(emp.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete employer"
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
                <Building2 className="text-purple-600" size={20} />
                Edit Employer Profile
              </h3>
              <button onClick={() => setEditItem(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={editItem.company_name}
                  onChange={(e) => setEditItem({ ...editItem, company_name: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={editItem.contact_person}
                    onChange={(e) => setEditItem({ ...editItem, contact_person: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editItem.phone}
                    onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  value={editItem.email}
                  onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Industry</label>
                  <input
                    type="text"
                    value={editItem.industry || ""}
                    onChange={(e) => setEditItem({ ...editItem, industry: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editItem.location || ""}
                    onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={editItem.website || ""}
                  onChange={(e) => setEditItem({ ...editItem, website: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                <select
                  value={editItem.status}
                  onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-purple-500"
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-600/20"
                >
                  Update Employer
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
            <h3 className="font-extrabold text-slate-900 text-base">Remove Employer Account?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
              This will permanently revoke the employer's portal login access and associated company records.
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
                Delete Employer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

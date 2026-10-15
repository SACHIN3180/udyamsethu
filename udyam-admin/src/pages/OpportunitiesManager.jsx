import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  X,
  RefreshCw,
  Tag,
} from "lucide-react";
import {
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from "../api";

export default function OpportunitiesManager() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [newOpp, setNewOpp] = useState({
    title: "",
    companyName: "",
    type: "Internship",
    location: "Bangalore / Hybrid",
    stipend: "₹25,000 / month",
    duration: "6 Months",
    skills: "React, Node.js, SQL",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      setLoading(true);
      const data = await getOpportunities();
      if (data && data.opportunities) {
        setOpportunities(data.opportunities);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOpportunity(newOpp);
      setNotification({ type: "success", text: `Opportunity "${newOpp.title}" created successfully!` });
      setShowAddModal(false);
      setNewOpp({
        title: "",
        companyName: "",
        type: "Internship",
        location: "Bangalore / Hybrid",
        stipend: "₹25,000 / month",
        duration: "6 Months",
        skills: "React, Node.js, SQL",
        description: "",
        status: "active",
      });
      fetchList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to create opportunity" });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateOpportunity(editItem.id, editItem);
      setNotification({ type: "success", text: "Opportunity updated successfully!" });
      setEditItem(null);
      fetchList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to update opportunity" });
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deleteId) return;
    try {
      await deleteOpportunity(deleteId);
      setNotification({ type: "info", text: "Opportunity removed." });
      setDeleteId(null);
      fetchList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to delete opportunity" });
    }
  };

  const filtered = opportunities.filter((o) => {
    const q = search.toLowerCase();
    return (
      (o.title && o.title.toLowerCase().includes(q)) ||
      (o.company_name && o.company_name.toLowerCase().includes(q)) ||
      (o.type && o.type.toLowerCase().includes(q)) ||
      (o.location && o.location.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Opportunities & Gigs Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage student career opportunities, internships, full-time postings, and employer listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            <Plus size={16} />
            Post Opportunity
          </button>
          <button
            onClick={fetchList}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition"
            title="Refresh list"
          >
            <RefreshCw size={16} />
          </button>
        </div>
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

      {/* SEARCH */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search opportunities by title, company, type..."
            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Active Opportunities: <span className="text-slate-900 font-bold">{opportunities.length}</span>
        </div>
      </div>

      {/* OPPORTUNITIES GRID */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 text-xs">
          <RefreshCw className="animate-spin text-emerald-600 mx-auto mb-2" size={24} />
          Loading opportunities...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 text-xs shadow-sm">
          No opportunities listed yet. Click "Post Opportunity" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block truncate">
                    {opp.company_name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      opp.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {opp.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {opp.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                      {opp.type}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin size={12} />
                      {opp.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1">
                    <span>Stipend: <strong className="text-slate-800">{opp.stipend}</strong></span>
                    <span>Duration: <strong className="text-slate-800">{opp.duration}</strong></span>
                  </div>
                </div>

                {opp.skills && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(Array.isArray(opp.skills) ? opp.skills : [opp.skills]).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Users size={12} />
                  {opp.applicants_count || 0} applicants
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditItem(opp)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteId(opp.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POST OPPORTUNITY MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Briefcase className="text-emerald-600" size={20} />
                Post Career Opportunity
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  value={newOpp.title}
                  onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                  placeholder="e.g. Frontend Engineering Intern"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newOpp.companyName}
                    onChange={(e) => setNewOpp({ ...newOpp, companyName: e.target.value })}
                    placeholder="e.g. Innovatech Labs"
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type</label>
                  <select
                    value={newOpp.type}
                    onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Project">Project / Gig</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newOpp.location}
                    onChange={(e) => setNewOpp({ ...newOpp, location: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stipend / Salary</label>
                  <input
                    type="text"
                    value={newOpp.stipend}
                    onChange={(e) => setNewOpp({ ...newOpp, stipend: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={newOpp.skills}
                  onChange={(e) => setNewOpp({ ...newOpp, skills: e.target.value })}
                  placeholder="React, TypeScript, CSS, Git"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newOpp.description}
                  onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                  placeholder="Describe responsibilities and requirements..."
                  className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Publish Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-lg">Edit Opportunity</h3>
              <button onClick={() => setEditItem(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editItem.title}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={editItem.company_name}
                    onChange={(e) => setEditItem({ ...editItem, company_name: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editItem.status}
                    onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editItem.location || ""}
                    onChange={(e) => setEditItem({ ...editItem, location: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stipend</label>
                  <input
                    type="text"
                    value={editItem.stipend || ""}
                    onChange={(e) => setEditItem({ ...editItem, stipend: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20"
                >
                  Save Changes
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
            <h3 className="font-extrabold text-slate-900 text-base">Remove Opportunity?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              This posting will be deleted and no longer visible to candidates.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

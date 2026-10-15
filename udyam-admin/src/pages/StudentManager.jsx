import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Search,
  Plus,
  Edit2,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  Phone,
  Building,
  User,
  X,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import {
  getStudents,
  createStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} from "../api";

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // New Student Form
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    email: "",
    mobile: "",
    usn: "",
    organization: "",
    password: "",
  });

  useEffect(() => {
    fetchStudentsList();
  }, []);

  const fetchStudentsList = async () => {
    try {
      setLoading(true);
      const data = await getStudents(search);
      if (data && data.students) {
        setStudents(data.students);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (student) => {
    const newStatus = student.status === "suspended" ? "approved" : "suspended";
    try {
      await updateStudentStatus(student.id, newStatus);
      setNotification({
        type: "success",
        text: `Student ${student.full_name} status updated to ${newStatus === "approved" ? "Active" : "Suspended"}.`,
      });
      fetchStudentsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to update status" });
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(newStudent);
      setNotification({ type: "success", text: `Student ${newStudent.fullName} enrolled successfully!` });
      setShowAddModal(false);
      setNewStudent({ fullName: "", email: "", mobile: "", usn: "", organization: "", password: "" });
      fetchStudentsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to create student" });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editStudentData.id, editStudentData);
      setNotification({ type: "success", text: `Student details updated successfully!` });
      setEditStudentData(null);
      fetchStudentsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to update student" });
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deleteId) return;
    try {
      await deleteStudent(deleteId);
      setNotification({ type: "info", text: "Student account deleted." });
      setDeleteId(null);
      fetchStudentsList();
    } catch (err) {
      setNotification({ type: "error", text: err.response?.data?.message || "Failed to delete student" });
    }
  };

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      (s.full_name && s.full_name.toLowerCase().includes(q)) ||
      (s.usn && s.usn.toLowerCase().includes(q)) ||
      (s.email && s.email.toLowerCase().includes(q)) ||
      (s.organization && s.organization.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Management Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control student portal users, academic verification, credentials, and access status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition cursor-pointer"
          >
            <Plus size={16} />
            Add Student
          </button>
          <button
            onClick={fetchStudentsList}
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

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by Name, USN, Email, College..."
            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Total Enrolled: <span className="text-slate-900 font-bold">{students.length}</span>
        </div>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <RefreshCw className="animate-spin text-indigo-600 mx-auto mb-2" size={24} />
            Loading student records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No students found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">USN</th>
                  <th className="py-3.5 px-4">College / Organization</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Resumes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => {
                  const isSuspended = s.status === "suspended";

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center shrink-0 border border-indigo-100">
                            {s.full_name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{s.full_name}</span>
                            <span className="text-slate-400 text-[11px]">{s.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                        {s.usn || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium max-w-[200px] truncate">
                        {s.organization || "Independent"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {s.mobile || "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          <FileText size={12} />
                          {s.resume_count || 0}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isSuspended
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isSuspended ? "Suspended" : "Active"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleStatus(s)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                              isSuspended
                                ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            }`}
                            title={isSuspended ? "Re-activate account" : "Suspend account"}
                          >
                            {isSuspended ? "Activate" : "Suspend"}
                          </button>
                          <button
                            onClick={() => setEditStudentData(s)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                            title="Edit student"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteId(s.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                            title="Delete student"
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

      {/* ADD STUDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <GraduationCap className="text-indigo-600" size={20} />
                Enroll New Student
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.fullName}
                  onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">USN *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.usn}
                    onChange={(e) => setNewStudent({ ...newStudent, usn: e.target.value })}
                    placeholder="1MS21CS001"
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    placeholder="9876543210"
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="student@college.edu"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / Organization</label>
                <input
                  type="text"
                  value={newStudent.organization}
                  onChange={(e) => setNewStudent({ ...newStudent, organization: e.target.value })}
                  placeholder="e.g. MSRIT Bangalore"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  placeholder="Minimum 6 characters"
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
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
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {editStudentData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="font-bold text-slate-900 text-lg">Edit Student Record</h3>
              <button onClick={() => setEditStudentData(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editStudentData.full_name}
                  onChange={(e) => setEditStudentData({ ...editStudentData, full_name: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">USN</label>
                  <input
                    type="text"
                    value={editStudentData.usn || ""}
                    onChange={(e) => setEditStudentData({ ...editStudentData, usn: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={editStudentData.mobile || ""}
                    onChange={(e) => setEditStudentData({ ...editStudentData, mobile: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editStudentData.email}
                  onChange={(e) => setEditStudentData({ ...editStudentData, email: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / Organization</label>
                <input
                  type="text"
                  value={editStudentData.organization || ""}
                  onChange={(e) => setEditStudentData({ ...editStudentData, organization: e.target.value })}
                  className="w-full h-10 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditStudentData(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center">
            <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Delete Student Account?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
              This action permanently removes the student account and related records. This action cannot be undone.
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
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

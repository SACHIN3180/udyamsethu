import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to attach admin token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("udyam_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("udyam_admin_token");
      localStorage.removeItem("udyam_admin_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const adminLogin = async (email, password) => {
  const res = await api.post("/auth/admin/login", { email, password });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// Dashboard Stats
export const getDashboardStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};

// Approvals (Task 1 & 2 Core)
export const getApprovals = async (type = "all", status = "all") => {
  const res = await api.get("/admin/approvals", { params: { type, status } });
  return res.data;
};

export const handleApprovalAction = async (type, id, action, rejectionReason = "") => {
  const res = await api.post(`/admin/approvals/${type}/${id}/action`, {
    action,
    rejectionReason,
  });
  return res.data;
};

// Students Management
export const getStudents = async (search = "", organization = "") => {
  const res = await api.get("/admin/students", { params: { search, organization } });
  return res.data;
};

export const createStudent = async (data) => {
  const res = await api.post("/admin/students", data);
  return res.data;
};

export const updateStudent = async (id, data) => {
  const res = await api.put(`/admin/students/${id}`, data);
  return res.data;
};

export const updateStudentStatus = async (id, status) => {
  const res = await api.patch(`/admin/students/${id}/status`, { status });
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await api.delete(`/admin/students/${id}`);
  return res.data;
};

// Employers Management
export const getEmployers = async (search = "", status = "all") => {
  const res = await api.get("/admin/employers", { params: { search, status } });
  return res.data;
};

export const updateEmployer = async (id, data) => {
  const res = await api.put(`/admin/employers/${id}`, data);
  return res.data;
};

export const updateEmployerStatus = async (id, status) => {
  const res = await api.patch(`/admin/employers/${id}/status`, { status });
  return res.data;
};

export const deleteEmployer = async (id) => {
  const res = await api.delete(`/admin/employers/${id}`);
  return res.data;
};

// Institutions Management
export const getInstitutions = async (search = "", status = "all") => {
  const res = await api.get("/admin/institutions", { params: { search, status } });
  return res.data;
};

export const updateInstitution = async (id, data) => {
  const res = await api.put(`/admin/institutions/${id}`, data);
  return res.data;
};

export const updateInstitutionStatus = async (id, status) => {
  const res = await api.patch(`/admin/institutions/${id}/status`, { status });
  return res.data;
};

export const deleteInstitution = async (id) => {
  const res = await api.delete(`/admin/institutions/${id}`);
  return res.data;
};

// Opportunities / Gigs
export const getOpportunities = async () => {
  const res = await api.get("/admin/opportunities");
  return res.data;
};

export const createOpportunity = async (data) => {
  const res = await api.post("/admin/opportunities", data);
  return res.data;
};

export const updateOpportunity = async (id, data) => {
  const res = await api.put(`/admin/opportunities/${id}`, data);
  return res.data;
};

export const deleteOpportunity = async (id) => {
  const res = await api.delete(`/admin/opportunities/${id}`);
  return res.data;
};

// Audit Logs
export const getAuditLogs = async () => {
  const res = await api.get("/admin/logs");
  return res.data;
};

export default api;

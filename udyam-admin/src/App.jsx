import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import DashboardOverview from "./pages/DashboardOverview";
import ApprovalsManager from "./pages/ApprovalsManager";
import StudentManager from "./pages/StudentManager";
import EmployerManager from "./pages/EmployerManager";
import InstitutionManager from "./pages/InstitutionManager";
import OpportunitiesManager from "./pages/OpportunitiesManager";
import AuditLogs from "./pages/AuditLogs";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("udyam_admin_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="approvals" element={<ApprovalsManager />} />
          <Route path="students" element={<StudentManager />} />
          <Route path="employers" element={<EmployerManager />} />
          <Route path="institutions" element={<InstitutionManager />} />
          <Route path="opportunities" element={<OpportunitiesManager />} />
          <Route path="audit-logs" element={<AuditLogs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

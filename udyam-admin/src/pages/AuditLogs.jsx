import React, { useState, useEffect } from "react";
import { History, Shield, RefreshCw, Clock, User, ArrowRight } from "lucide-react";
import { getAuditLogs } from "../api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await getAuditLogs();
      if (data && data.logs) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Administrative Audit & Activity Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-evident system log tracking approvals, status changes, credentials modifications, and admin actions.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm transition"
        >
          <RefreshCw size={15} />
          Refresh Logs
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            <RefreshCw className="animate-spin text-cyan-600 mx-auto mb-2" size={24} />
            Loading audit trail...
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No audit records logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Target Type</th>
                  <th className="py-3.5 px-4">Administrator</th>
                  <th className="py-3.5 px-4">Details Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => {
                  let formattedDetails = "";
                  try {
                    formattedDetails = typeof log.details === "string" ? log.details : JSON.stringify(log.details);
                  } catch (e) {
                    formattedDetails = "—";
                  }

                  const isApprovedAction = log.action.includes("APPROVED");
                  const isRejectAction = log.action.includes("REJECTED");

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                            isApprovedAction
                              ? "bg-emerald-100 text-emerald-800"
                              : isRejectAction
                              ? "bg-red-100 text-red-800"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 uppercase text-[11px]">
                        {log.target_type} (#{log.target_id || "N/A"})
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {log.admin_name || "Super Admin"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] max-w-xs truncate" title={formattedDetails}>
                        {formattedDetails}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

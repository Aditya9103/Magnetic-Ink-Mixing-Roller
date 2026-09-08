import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  fetchSubmissions,
  markSubmissionRead,
  deleteSubmission,
} from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

const SubmissionsTable = ({ type, title, subtitle }) => {
  const { admin } = useAdminAuth();
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { type, limit: 50 };
      if (filter === "unread") params.isRead = false;
      if (filter === "read") params.isRead = true;
      const data = await fetchSubmissions(admin.token, params);
      setSubmissions(data.submissions || []);
      setTotal(data.total || 0);
    } catch {
      // handled silently
    } finally {
      setLoading(false);
    }
  }, [admin.token, type, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleToggleRead = async (id, current) => {
    try {
      await markSubmissionRead(admin.token, id, !current);
      setSubmissions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isRead: !current } : s)),
      );
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    try {
      await deleteSubmission(admin.token, id);
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
      setTotal((t) => t - 1);
    } catch {}
  };

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-900">
            {total} total submissions
          </span>
          <div className="flex items-center gap-2">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  filter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-900 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
            <button
              onClick={load}
              className="ml-2 p-1.5 rounded-lg border border-slate-200 text-slate-900 font-bold hover:text-blue-600 hover:border-blue-400 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <svg
              className="w-7 h-7 text-blue-600 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-20 text-center">
            <svg
              className="w-12 h-12 text-slate-900 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-slate-900 font-semibold text-sm">
              No submissions found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <th className="px-6 py-3">Name / Company</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Product / Industry</th>
                  <th className="px-6 py-3">Message</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {submissions.map((s) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-slate-50/60 transition-colors ${!s.isRead ? "bg-blue-50/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!s.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                        <div>
                          <p className="font-bold text-slate-900 font-bold">
                            {s.fullName}
                          </p>
                          <p className="text-xs text-slate-900 font-bold font-medium">
                            {s.companyName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${s.email}`}
                        className="text-blue-600 hover:underline font-medium block"
                      >
                        {s.email}
                      </a>
                      <p className="text-slate-900 font-bold text-xs">
                        {s.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 font-bold">
                        {s.productInterest || "—"}
                      </p>
                      <p className="text-xs text-slate-900 font-bold">
                        {s.industry || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4 max-w-[240px]">
                      <p className="text-slate-900 line-clamp-2 text-xs">
                        {s.message}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs text-slate-900 font-medium">
                        {new Date(s.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-slate-900 font-bold">
                        {new Date(s.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(s._id, s.isRead)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            s.isRead
                              ? "border-slate-200 text-slate-900 font-bold hover:border-blue-400 hover:text-blue-600"
                              : "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100"
                          }`}
                        >
                          {s.isRead ? "Unread" : "Mark Read"}
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold border border-red-100 text-red-500 bg-red-50 hover:bg-red-100 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export const AdminQuotes = () => (
  <SubmissionsTable
    type="quote"
    title="Quote Requests"
    subtitle="Get a Quote form submissions"
  />
);

export const AdminContacts = () => (
  <SubmissionsTable
    type="contact"
    title="Contact Messages"
    subtitle="Contact Us form submissions"
  />
);

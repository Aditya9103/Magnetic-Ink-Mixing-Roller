import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useAdminSubmissions,
  useMarkSubmissionRead,
  useDeleteSubmission,
} from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

const ALL_WEBSITES = [
  "inkmixingroller.com",
  "stroboscopelight.com",
  "barcoater.com",
  "teflondam.com",
  "doctorblade.co.in",
];

const SubmissionsTable = ({ type, title, subtitle }) => {
  const { admin } = useAdminAuth();
  const [filter, setFilter] = useState("all");
  const [websiteFilter, setWebsiteFilter] = useState("all");

  const queryParams = { type, limit: 50 };
  if (filter === "unread") queryParams.isRead = false;
  if (filter === "read") queryParams.isRead = true;
  if (websiteFilter !== "all") queryParams.sourceWebsite = websiteFilter;

  const { data, isLoading: loading } = useAdminSubmissions(admin?.token, queryParams);

  const submissions = data?.submissions || [];
  const total = data?.total || 0;

  const toggleReadMutation = useMarkSubmissionRead(admin?.token);
  const deleteMutation = useDeleteSubmission(admin?.token);

  const handleToggleRead = (id, current) => {
    toggleReadMutation.mutate({ id, isRead: !current });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    deleteMutation.mutate(id);
  };

  return (
    <AdminLayout title={title} subtitle={subtitle}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900">
              {total} total submissions
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Website Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Website:
              </span>
              <select
                value={websiteFilter}
                onChange={(e) => setWebsiteFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">🌐 All Websites</option>
                {ALL_WEBSITES.map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            </div>

            {/* Read/Unread Filter */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {["all", "unread", "read"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filter === f
                      ? "bg-white text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={load}
              title="Refresh submissions"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-colors bg-white shadow-xs"
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
              className="w-12 h-12 text-slate-400 mx-auto mb-3"
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
            <p className="text-slate-900 font-bold text-base">
              No submissions found.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {websiteFilter !== "all" ? `No inquiries received for ${websiteFilter} yet.` : "New quote inquiries and contact messages will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-3.5">Source Website</th>
                  <th className="px-6 py-3.5">Name / Company</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Product / Industry</th>
                  <th className="px-6 py-3.5">Message</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.map((s) => (
                  <tr
                    key={s._id}
                    className={`hover:bg-slate-50/70 transition-colors ${!s.isRead ? "bg-blue-50/30" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                        🌐 {s.sourceWebsite || "inkmixingroller.com"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!s.isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" title="Unread" />
                        )}
                        <div>
                          <p className="font-extrabold text-slate-900">
                            {s.fullName}
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            {s.companyName || "Individual Inquiry"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${s.email}`}
                        className="text-blue-600 hover:underline font-semibold block text-xs"
                      >
                        {s.email}
                      </a>
                      <p className="text-slate-600 text-xs font-mono mt-0.5">
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

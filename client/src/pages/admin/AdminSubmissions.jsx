import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useAdminSubmissions,
  useMarkSubmissionRead,
  useDeleteSubmission,
} from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

const ALL_WEBSITES = [
  "doctorblade.co.in",
  "stroboscopelight.com",
  "barcoater.com",
  "teflondam.com",
  "inkmixingroller.com",
];

const TableSkeleton = () => (
  <div className="animate-pulse">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="px-6 py-5 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-200 rounded"></div>
        <div className="h-4 w-48 bg-slate-200 rounded"></div>
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
      </div>
    ))}
  </div>
);

const SubmissionsTable = ({ type, title, subtitle }) => {
  // ... rest of component starts below

  const { admin } = useAdminAuth();
  const [filter, setFilter] = useState("all");
  const [websiteFilter, setWebsiteFilter] = useState("all");

  const queryParams = { type, limit: 50 };
  if (filter === "unread") queryParams.isRead = false;
  if (filter === "read") queryParams.isRead = true;
  if (websiteFilter !== "all") queryParams.sourceWebsite = websiteFilter;

  const { data, isLoading: loading, refetch } = useAdminSubmissions(admin?.token, queryParams);

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
              Total: {total}
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
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filter === f
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={refetch}
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
          <TableSkeleton />
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
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto overflow-y-auto max-h-[70vh]">
              <table className="w-full text-sm relative">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-50 text-left text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100 shadow-sm">
                    <th className="px-6 py-3.5">Source Website</th>
                    <th className="px-6 py-3.5">Name / Company</th>
                    <th className="px-6 py-3.5">Contact</th>
                    <th className="px-6 py-3.5">Product / Industry</th>
                    <th className="px-6 py-3.5">Message</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
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
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleToggleRead(s._id, s.isRead)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${s.isRead
                              ? "border-slate-200 text-slate-900 hover:border-blue-400 hover:text-blue-600"
                              : "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100"
                              }`}
                          >
                            {s.isRead ? "Unread" : "Mark Read"}
                          </button>
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                            title="Delete"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden divide-y divide-slate-100">
              {submissions.map((s) => (
                <div key={s._id} className={`p-5 ${!s.isRead ? "bg-blue-50/30" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                      🌐 {s.sourceWebsite || "doctorblade.co.in"}
                    </span>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 font-bold">
                        {new Date(s.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      {!s.isRead && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>}
                      <p className="font-extrabold text-slate-900 text-base">{s.fullName}</p>
                    </div>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">{s.companyName || "Individual Inquiry"}</p>
                  </div>

                  <div className="mb-4 flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <a href={`mailto:${s.email}`} className="text-blue-600 hover:underline font-bold text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      {s.email}
                    </a>
                    <p className="text-slate-600 text-sm font-mono flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      {s.phone}
                    </p>
                  </div>

                  {(s.productInterest || s.industry) && (
                    <div className="mb-4">
                      <p className="font-bold text-slate-900 text-sm">{s.productInterest || "—"}</p>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{s.industry || "—"}</p>
                    </div>
                  )}

                  <div className="mb-5 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                    <p className="text-slate-700 text-sm leading-relaxed">{s.message}</p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleRead(s._id, s.isRead)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${s.isRead
                        ? "border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600"
                        : "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                        }`}
                    >
                      {s.isRead ? "Mark as Unread" : "Mark as Read"}
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
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

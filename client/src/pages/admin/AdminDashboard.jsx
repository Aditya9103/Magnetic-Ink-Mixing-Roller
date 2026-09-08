import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { fetchStats, fetchSubmissions } from "../../services/api";
import { useAdminAuth } from "../../context/AdminAuthContext";

const StatCard = ({
  label,
  value,
  sub,
  subColor = "text-blue-600",
  icon,
  iconBg,
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-3">
    <div className="flex items-start justify-between">
      <p className="text-xs font-bold text-black-500 uppercase tracking-widest">
        {label}
      </p>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        {icon}
      </div>
    </div>
    <p className="text-4xl font-extrabold text-slate-900">{value ?? "—"}</p>
    {sub && <span className={`text-xs font-semibold ${subColor}`}>{sub}</span>}
  </div>
);

const AdminDashboard = () => {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, r] = await Promise.all([
          fetchStats(admin.token),
          fetchSubmissions(admin.token, { limit: 8 }),
        ]);
        setStats(s);
        setRecent(r.submissions || []);
      } catch {
        // handled silently
      } finally {
        setLoadingStats(false);
      }
    };
    load();
  }, [admin.token]);

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of all form submissions">
      {loadingStats ? (
        <div className="flex items-center justify-center py-20">
          <svg
            className="w-8 h-8 text-blue-600 animate-spin"
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
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              label="Total Submissions"
              value={stats?.totalSubmissions}
              sub={`↑ ${stats?.todaySubmissions} today`}
              subColor="text-blue-600"
              iconBg="bg-blue-50"
              icon={
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Quote Requests"
              value={stats?.totalQuotes}
              sub={`${stats?.unreadQuotes} unread`}
              subColor="text-red-500"
              iconBg="bg-indigo-50"
              icon={
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Contact Messages"
              value={stats?.totalContacts}
              sub={`${stats?.unreadContacts} unread`}
              subColor="text-red-500"
              iconBg="bg-emerald-50"
              icon={
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Today's Submissions"
              value={stats?.todaySubmissions}
              sub="Last 24 hours"
              subColor="text-amber-600"
              iconBg="bg-amber-50"
              icon={
                <svg
                  className="w-5 h-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </div>

          {/* Recent table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900">
                Recent Submissions
              </h2>
              <span className="text-xs text-slate-900 font-semibold">
                {stats?.totalSubmissions} total
              </span>
            </div>
            {recent.length === 0 ? (
              <div className="py-16 text-center text-slate-900 text-sm font-medium">
                No submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs font-bold text-slate-900 uppercase tracking-wider">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recent.map((s) => (
                      <tr
                        key={s._id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="px-6 py-3.5 font-semibold text-slate-900">
                          {s.fullName}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${s.type === "quote" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}
                          >
                            {s.type === "quote" ? "Quote" : "Contact"}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-slate-900">
                          {s.email}
                        </td>
                        <td className="px-6 py-3.5 text-slate-900 text-xs">
                          {new Date(s.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.isRead ? "text-slate-900 font-bold" : "text-blue-600"}`}
                          >
                            {!s.isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                            )}
                            {s.isRead ? "Read" : "New"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;

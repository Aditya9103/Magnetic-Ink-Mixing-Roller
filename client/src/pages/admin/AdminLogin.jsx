import React, { useState, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { isTokenExpired, QUERY_KEYS, fetchStats, fetchSubmissions } from "../../services/api";

const AdminLogin = () => {
  const { admin, login } = useAdminAuth();
  const [username, setUsername] = useState(() => {
    return (typeof window !== "undefined" && localStorage.getItem("admin_username")) || "admin";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // If already logged in with a non-expired token, skip login immediately
  if (admin?.token && !isTokenExpired(admin.token)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();
    if (!cleanUser || !cleanPass || loading) return;

    setError("");
    setLoading(true);

    try {
      const data = await login(cleanUser, cleanPass);

      // Fast-prefetch dashboard stats & recent submissions in parallel
      if (data?.token) {
        queryClient.prefetchQuery({
          queryKey: [...QUERY_KEYS.adminStats, data.token],
          queryFn: () => fetchStats(data.token),
        });
        queryClient.prefetchQuery({
          queryKey: [...QUERY_KEYS.adminSubmissions({ limit: 8 }), data.token],
          queryFn: () => fetchSubmissions(data.token, { limit: 8 }),
        });
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid username or password.");
      setLoading(false);
      // Auto-select the password field so user can instantly re-type
      setTimeout(() => passwordInputRef.current?.select(), 50);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
                Ink Mixing Roller
              </h1>
              <p className="text-xs text-slate-900 font-medium">Admin Panel</p>
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
            Welcome back 👋
          </h2>
          <p className="text-slate-900 text-sm font-medium mb-7">
            Sign in to access the admin dashboard.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fade-in">
              <svg
                className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="block text-sm font-bold text-slate-900 mb-1.5"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                autoFocus={!username}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 font-bold bg-slate-50 font-medium text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-bold text-slate-900 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordInputRef}
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus={!!username}
                  autoComplete="current-password"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 font-bold bg-slate-50 font-medium text-sm"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 focus:outline-none rounded-lg transition-colors"
                  title={showPassword ? "Hide password" : "Show password"}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !username.trim() || !password.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
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
                  Signing in...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-900 text-xs mt-5">
          © {new Date().getFullYear()} ImageTech Industries. Admin access only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

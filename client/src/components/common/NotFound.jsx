import React from "react";
import { Link } from "react-router-dom";
import SEO from "./SEO";

export default function NotFound({
  title = "Page Not Found",
  message = "The page, location, or product you are looking for does not exist or may have been moved.",
}) {
  return (
    <>
      <SEO
        title="404 - Not Found | ImageTech Industries"
        description="The requested page could not be found."
        noindex={true}
      />
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center font-extrabold text-3xl shadow-inner">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {message}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors text-sm"
            >
              Back to Home
            </Link>
            <Link
              to="/sitemap"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
            >
              Browse Locations
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

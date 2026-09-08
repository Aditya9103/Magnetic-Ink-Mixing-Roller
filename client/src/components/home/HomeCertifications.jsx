import React from "react";
import { Link } from "react-router-dom";

const HomeCertifications = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Split */}
      <div className="absolute top-0 left-0 w-full lg:w-5/12 h-full bg-slate-900 z-0 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row shadow-2xl lg:shadow-none rounded-3xl overflow-hidden lg:rounded-none">
          {/* Left Dark Content */}
          <div className="w-full lg:w-4/12 bg-slate-900 text-white p-8 lg:py-24 lg:pr-12">
            <h4 className="text-blue-400 font-bold tracking-wider text-xs uppercase mb-2">
              Quality & Certifications
            </h4>
            <h2 className="text-3xl font-extrabold leading-tight mb-6">
              Committed to Global Standards
            </h2>
            <p className="text-white font-bold mb-8 leading-relaxed text-sm">
              Our products are manufactured and inspected to meet strict quality
              standards, ensuring consistent performance and reliability in
              every application.
            </p>
            <Link
              to="/certifications"
              className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              View Certifications
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Middle Certificate Image (Overlapping) */}
          <div className="w-full lg:w-4/12 bg-slate-800 lg:bg-transparent flex items-center justify-center p-8 lg:p-0 relative z-20">
            <div className="bg-white p-2 rounded-xl shadow-2xl w-full max-w-sm transform lg:scale-110 border border-gray-200 hover:zoom-200 transition-transform ">
              <div className="border-4 border-double border-gray-200 p-2 flex flex-col items-center justify-center text-center bg-gray-50 relative overflow-hidden">
                <img
                  src="/certification.jpg"
                  alt="ISO 9001:2015 Certificate"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right White Content */}
          <div className="w-full lg:w-4/12 bg-white p-8 lg:py-24 lg:pl-16">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-sm">
                    ISO 9001:2015 Certified
                  </h4>
                  <p className="text-xs text-gray-900 mt-1">
                    Quality management system
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-sm">
                    Reliable Performance
                  </h4>
                  <p className="text-xs text-gray-900 mt-1">
                    Tested for consistent results
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-sm">
                    Premium Raw Materials
                  </h4>
                  <p className="text-xs text-gray-900 mt-1">
                    For long service life
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 shrink-0 mt-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-sm">
                    Global Customer Trust
                  </h4>
                  <p className="text-xs text-gray-900 mt-1">
                    Preferred by printing companies worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCertifications;

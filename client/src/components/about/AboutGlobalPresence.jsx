import React from "react";

const AboutGlobalPresence = () => {
  return (
    <section className="bg-white border-t border-slate-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <h4 className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3">
              Our Global Presence
            </h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Serving Industries Across the Globe
            </h2>
            <p className="text-gray-900 text-lg leading-relaxed max-w-lg">
              Our products are trusted by customers in India and across
              international markets, supporting diverse industries with
              consistent quality and performance.
            </p>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <svg
                className="w-8 h-8 text-blue-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  Global Export
                </h4>
                <p className="text-gray-900 text-sm">
                  Serving multiple countries
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg
                className="w-8 h-8 text-blue-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">India</h4>
                <p className="text-gray-900 text-sm">Strong domestic network</p>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:col-span-2">
              <svg
                className="w-8 h-8 text-blue-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">
                  Growing Together
                </h4>
                <p className="text-gray-900 text-sm">
                  Building lasting partnerships
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGlobalPresence;

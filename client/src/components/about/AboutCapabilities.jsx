import React from "react";
import { Link } from "react-router-dom";

const AboutCapabilities = () => {
  return (
    <section className="py-12 lg:py-18 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Large Image */}
          <div className="w-full lg:w-5/12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px]">
              <img
                src="/quality.jpg"
                alt="Manufacturing Excellence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0 border border-white/30">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <h3 className="text-2xl font-extrabold text-white">
                    Manufacturing
                    <br />
                    Excellence
                  </h3>
                </div>
                <p className="text-slate-900 font-bold text-sm font-medium">
                  Advanced facilities for superior quality and consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="w-full lg:w-4/12">
            <h4 className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3">
              Our Capabilities
            </h4>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              Advanced Manufacturing for Superior Performance
            </h2>
            <p className="text-gray-900 mb-8 leading-relaxed">
              We combine modern manufacturing technology with strict quality
              control processes to produce Magnetic Ink Mixing Rollers and allied products
              that meet global standards.
            </p>

            <ul className="space-y-4 mb-8">
              {[
              "Precision manufacturing and finishing",
              "Custom sizes and specifications",
              "Consistent quality inspection at every stage",
              "Reliable supply and on-time delivery",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm font-semibold text-gray-900 font-bold"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/certifications"
              className="inline-flex items-center px-6 py-3 border border-blue-200 text-blue-600 bg-blue-50 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              Our Manufacturing Process
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

          {/* Right Small Images Grid */}
          <div className="w-full lg:w-3/12 flex flex-col gap-4 hidden md:flex">
            <div className="h-32 rounded-2xl overflow-hidden shadow-md">
              <img
                src="/about.jpg"
                alt="Process 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden shadow-md">
              <img
                src="/certification.jpg"
                alt="Process 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-32 rounded-2xl overflow-hidden shadow-md bg-blue-50 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-blue-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCapabilities;

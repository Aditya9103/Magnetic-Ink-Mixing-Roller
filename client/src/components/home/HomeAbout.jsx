import React from "react";
import { Link } from "react-router-dom";

const HomeAbout = () => {
  return (
    <section className="py-8 lg:py-12 pb-24 lg:pb-32 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Image & Floating Card */}
          <div className="w-full lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl relative h-[450px]">
              <img
                src="/about.jpg"
                alt="ImageTech Manufacturing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
            </div>

            {/* Floating Checklist Card */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-xs border border-slate-700/50">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-slate-700">
                <div className="bg-blue-600/20 p-2.5 rounded-lg text-blue-400">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-lg leading-tight">
                  Manufacturing Excellence Since 1992
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                "Advanced Manufacturing",
                "Strict Quality Control",
                "Customized Solutions",
                "On-Time Delivery",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-white text-sm font-bold"
                  >
                    <svg
                      className="w-5 h-5 mr-3 text-blue-500 shrink-0"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Content & Stats */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:pl-10">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              About ImageTech Industries
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              Your Trusted Magnetic Ink Mixing Roller Manufacturer in India
            </h2>
            <p className="text-lg text-gray-900 mb-8 leading-relaxed ">
              Based in Delhi, ImageTech Industries is recognized for manufacturing
              the best Magnetic Ink Mixing Rollers in India for the printing and packaging
              sectors. With an unwavering focus on quality and innovation, we deliver
              high-performance rollers that ensure uniform ink consistency, reduce pigment
              settling, and provide long-term stable print quality for your business.
            </p>
            <Link
              to="/about"
              className="bg-blue-600 text-white px-8 py-4 pb-4 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 mb-12"
            >
              Learn More About Us &rarr;
            </Link>
            <div className="grid grid-cols-2 pt-8 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 leading-none mb-1">
                    30+
                  </h4>
                  <p className="text-xs text-gray-900 font-medium">
                    Years of Experience
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 leading-none mb-1">
                    500+
                  </h4>
                  <p className="text-xs text-gray-900 font-medium">
                    Satisfied Clients
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 leading-none mb-1">
                    25+
                  </h4>
                  <p className="text-xs text-gray-900 font-medium">
                    Countries Served
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0">
                  <svg
                    className="w-6 h-6"
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
                  <h4 className="text-2xl font-bold text-gray-900 leading-none mb-1">
                    100%
                  </h4>
                  <p className="text-xs text-gray-900 font-medium">
                    Quality Commitment
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

export default HomeAbout;

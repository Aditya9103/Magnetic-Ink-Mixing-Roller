import React from "react";

const industries = [
  {
    name: "Flexible Packaging",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    name: "Gravure & Flexographic Printing",
    icon: "M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z",
  },
  {
    name: "Label & Sticker Industry",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  },
  {
    name: "Paper Industry",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Coating Industry",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    name: "Industrial Manufacturing",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const HomeIndustries = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Text and Grid */}
          <div>
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Industries We Serve
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              Supporting Diverse Industries with Reliable Solutions
            </h2>
            <p className="text-lg text-gray-900 mb-10">
              Our Magnetic Ink Mixing Rollers are widely used across various industries to
              ensure consistent ink mixing, efficiency and reliability in printing and packaging processes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all group cursor-default"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d={industry.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                    {industry.name}
                  </h3>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Explore All Industries
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
            </a>
          </div>

          {/* Right Side: Image and Features */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px] w-full">
              {/* Fallback image */}
              <img
                src="/quality.jpg"
                alt="Printing Process"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute bottom-0 left-0 bg-blue-900/95 backdrop-blur text-white p-6 rounded-tr-3xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl leading-tight">
                      Precision
                    </h3>
                    <p className="text-blue-200 text-sm font-medium">
                      in Every Print
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  Uniform Ink Mixing
                </h4>
                <p className="text-xs text-gray-900">
                  Ensure consistent ink application across substrates.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  Highly Accurate
                </h4>
                <p className="text-xs text-gray-900">
                  Reliable results for consistent print quality.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  Printing Efficiency
                </h4>
                <p className="text-xs text-gray-900">
                  Optimized for fast and reliable press runs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeIndustries;

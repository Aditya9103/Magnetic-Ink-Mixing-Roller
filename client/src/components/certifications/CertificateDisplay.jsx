import React from "react";

const CertificateDisplay = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Certificate Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-700 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-1">
                <img
                  src="/certification.jpg"
                  alt="ISO 9001:2015 Certificate"
                  className="w-full h-auto rounded-xl border border-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Details Side */}
          <div className="w-full lg:w-1/2">
            <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
              Quality Assurance
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-8">
              Certified ISO 9001:2015
            </h2>
            <p className="text-lg text-gray-900 mb-10 leading-relaxed">
              Our quality management system has been rigorously audited and
              certified to meet international standards. We maintain strict
              protocols at every stage of production to guarantee the finest
              products for our global clientele.
            </p>

            <div className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
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
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Certificate Number
                  </h3>
                  <p className="text-gray-900 font-medium">IN57402A</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Registration Date
                  </h3>
                  <p className="text-gray-900 font-medium">27 July 2024</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    Valid Until
                  </h3>
                  <p className="text-gray-900 font-medium">26 July 2027</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/certification.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
                Download Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateDisplay;

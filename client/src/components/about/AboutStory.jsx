import React from "react";

const AboutStory = () => {
  return (
    <section className="py-8 lg:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (Story) */}
          <div className="lg:col-span-5">
            <h4 className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3 flex items-center">
              <span className="w-4 h-0.5 bg-blue-600 mr-2"></span>
              Our Story
            </h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              A Legacy of Precision and Progress
            </h2>
            <div className="text-gray-900 space-y-5 mb-8">
              <p>
                Established in 1992, ImageTech Industries began its journey with
                a clear vision — to become the most trusted Magnetic Ink Mixing Roller
                supplier in India. We aim to deliver highly reliable
                industrial products that help businesses achieve flawless print
                quality, higher press speeds, and long-term value.
              </p>
              <p>
                Over the years, we have grown through constant innovation and
                strong customer relationships. Today, when companies search for
                the best Magnetic Ink Mixing Rollers in Delhi or across the nation, they trust
                ImageTech Industries to supply precision-engineered
                devices for their exact printing and industrial needs.
              </p>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors shadow-md flex items-center">
              Our Journey
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
            </button>
          </div>

          {/* Right Image + Stats Panel */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row rounded-3xl overflow-hidden shadow-xl bg-white h-auto sm:h-[450px]">
            {/* Image section */}
            <div className="w-full sm:w-3/5 h-64 sm:h-full relative">
              <img
                src="/about.jpg"
                alt="ImageTech Manufacturing Facility"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats Sidebar */}
            <div className="w-full sm:w-2/5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-center space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1">
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
                <div>
                  <h4 className="font-extrabold text-xl leading-none mb-1">
                    1992
                  </h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    Established
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1">
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
                <div>
                  <h4 className="font-extrabold text-xl leading-none mb-1">
                    30+
                  </h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    Years of Experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-xl leading-none mb-1">
                    500+
                  </h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    Satisfied Clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1">
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
                  <h4 className="font-extrabold text-xl leading-none mb-1">
                    25+
                  </h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
                    Countries Served
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1">
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
                <div>
                  <h4 className="font-extrabold text-xl leading-none mb-1">
                    100%
                  </h4>
                  <p className="text-white text-xs font-bold uppercase tracking-wider">
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

export default AboutStory;

import React from "react";

const HomeHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-white overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/5 skew-x-12 translate-x-32 -z-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-blue-600 font-semibold tracking-wider text-sm uppercase">
              <span>Precision</span>
              <span>|</span>
              <span>Performance</span>
              <span>|</span>
              <span>Trust</span>
              <div className="h-[2px] w-12 bg-blue-600 ml-2"></div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
              Best <span className="text-blue-600">Magnetic Ink Mixing Roller</span> <br />
              <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-900 font-bold">
                Manufacturer in India
              </span>
            </h1>

            <p className="text-lg text-gray-900 max-w-xl">
              ImageTech Industries is widely recognized for manufacturing the best
              Magnetic Ink Mixing Rollers in Delhi and across India. We offer premium
              rollers that ensure uniform ink mixing and consistent print quality for
              gravure and flexographic printing applications.
            </p>

            <div className="flex flex-row gap-2 sm:gap-4 overflow-x-auto hide-scrollbar pb-1">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-quote-modal"))
                }
                className="flex items-center whitespace-nowrap px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Get a Quote
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </button>

              <a
                href="https://www.imagetechindustries.com/products"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-nowrap px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-sm"
              >
                Explore Our Products
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>

            {/* Features row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600">
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    Premium Quality
                  </h4>
                  <p className="text-xs text-gray-900">
                    Strict quality control
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    Custom Sizes
                  </h4>
                  <p className="text-xs text-gray-900">
                    As per your requirement
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600">
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
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    Reliable Delivery
                  </h4>
                  <p className="text-xs text-gray-900">PAN India & Global</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600">
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
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">
                    Technical Support
                  </h4>
                  <p className="text-xs text-gray-900">Expert guidance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Container for Image and Badges */}
          <div className="relative mt-12 lg:mt-0 flex justify-center items-center h-full min-h-[300px] lg:min-h-full">
            <img
              src="heroimage.webp"
              alt="Magnetic Ink Mixing Roller Device"
              fetchpriority="high"
              loading="eager"
              decoding="sync"
              className="relative z-10 w-full max-w-2xl scale-[1.1] translate-x-0 md:-translate-x-8 lg:-translate-x-12 -translate-y-24 object-contain drop-shadow-2xl rounded-2xl"
            />

            {/* Side Floating Badges - Expanding on Hover */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-20 hidden md:flex">
              <div className="group flex items-center bg-blue-900/80 backdrop-blur-sm p-2 rounded-l-full border border-blue-700/50 text-white shadow-xl cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    ></path>
                  </svg>
                </div>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-semibold tracking-wide flex items-center">
                  <span className="pr-3">UNIFORM INK MIXING</span>
                </span>
              </div>

              <div className="group flex items-center bg-blue-900/80 backdrop-blur-sm p-2 rounded-l-full border border-blue-700/50 text-white shadow-xl cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-semibold tracking-wide flex items-center">
                  <span className="pr-3">PRINT CONSISTENCY</span>
                </span>
              </div>

              <div className="group flex items-center bg-blue-900/80 backdrop-blur-sm p-2 rounded-l-full border border-blue-700/50 text-white shadow-xl cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-semibold tracking-wide flex items-center">
                  <span className="pr-3">QUALITY CONTROL</span>
                </span>
              </div>

              <div className="group flex items-center bg-blue-900/80 backdrop-blur-sm p-2 rounded-l-full border border-blue-700/50 text-white shadow-xl cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-blue-400 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-blue-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-semibold tracking-wide flex items-center">
                  <span className="pr-3">PRECISION RESULTS</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;

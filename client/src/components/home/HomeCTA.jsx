import React from "react";

const HomeCTA = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <section className="bg-slate-800 text-white relative overflow-hidden rounded-3xl shadow-2xl my-4">
        {/* Background gradients and decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-800 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 py-16 lg:py-20 flex flex-col md:flex-row items-center justify-between">
          {/* Left Side Content */}
          <div className="w-full md:w-2/3 lg:w-3/4 mb-10 md:mb-0 z-20">
            <h4 className="text-blue-400 font-bold tracking-wider text-xs uppercase mb-3">
              Let's Work Together
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
              Need the Right Magnetic Ink Mixing Roller for Your Application?
            </h2>
            <p className="text-white font-bold text-lg max-w-3xl">
              Get in touch with our experts for product recommendations, custom
              solutions or a quick quote.
            </p>
          </div>

          {/* Right Side Button */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex md:justify-end shrink-0 z-20">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-quote-modal"))
              }
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold transition-colors shadow-xl shadow-blue-900/50 flex items-center group whitespace-nowrap"
            >
              Get a Quote now
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        </div>

        {/* Decorative Image Overlap */}
        <div className="absolute top-1/2 -translate-y-1/2 right-10 lg:right-40 w-1/2 max-w-[600px] opacity-10 pointer-events-none z-10 mix-blend-screen scale-150">
          <img
            src="heroimage.webp"
            alt="Magnetic Ink Mixing Roller"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeCTA;

import React from "react";

const CertificationsHero = () => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-5 lg:py-8">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
          <span className="flex w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-blue-300 tracking-wider uppercase">
            Global Standards
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Quality &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Certifications
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
          At ImageTech Industries, our commitment to excellence is validated by
          internationally recognized standards, ensuring we deliver reliable,
          high-performance solutions every time.
        </p>
      </div>
    </section>
  );
};

export default CertificationsHero;

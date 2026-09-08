import React from "react";

const AboutVisionMission = () => {
  return (
    <>
      {/* Vision Section */}
      <section className="bg-white border-t border-slate-100 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3">
              Our Vision
            </h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              To Be a Global Leader in Industrial Solutions
            </h2>
            <p className="text-gray-900 text-lg leading-relaxed">
              To establish ImageTech Industries as a trusted Indian
              manufacturing brand recognized worldwide for precision
              engineering, innovation, and dependable industrial solutions.
            </p>
          </div>
        </div>
        {/* Background Icon */}
        <svg
          className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-96 h-96 text-slate-50 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </section>

      {/* Mission Section */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-blue-600 font-bold tracking-wider text-xs uppercase mb-3">
              Our Mission
            </h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Delivering Quality Through Innovation
            </h2>
            <p className="text-gray-900 text-lg leading-relaxed">
              To manufacture high-quality industrial products by combining
              technology, experience, and customer requirements while
              maintaining excellence in quality and service.
            </p>
          </div>
        </div>
        {/* Background Icon */}
        <svg
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 text-white pointer-events-none"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </section>
    </>
  );
};

export default AboutVisionMission;

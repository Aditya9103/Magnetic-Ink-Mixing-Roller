import React from "react";
import { Link } from "react-router-dom";

const ContactHero = () => {
  return (
    <section className="bg-slate-50 relative overflow-hidden pt-5 pb-10 lg:pt-8 lg:pb-14 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 pr-0 lg:pr-12 xl:pr-20 z-20">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-sm font-semibold text-blue-600 mb-6">
            <Link to="/" className="hover:text-blue-800 transition-colors">
              Home
            </Link>
            <span className="text-gray-900 font-bold">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="text-gray-900">Contact Us</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-900 mb-10 leading-relaxed font-medium max-w-lg">
            We're here to help. Reach out to our team for product inquiries,
            technical support, quotations, or any other information.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm mr-3 shrink-0">
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
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm text-gray-900 leading-snug">
                Quick
                <br />
                Response
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm mr-3 shrink-0">
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
              <span className="font-bold text-sm text-gray-900 leading-snug">
                Expert
                <br />
                Support
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm mr-3 shrink-0">
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
              <span className="font-bold text-sm text-gray-900 leading-snug">
                Reliable
                <br />
                Partnership
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Image & Text Overlay */}
        <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full z-0 overflow-hidden">
          {/* Subtle gradient overlay to blend image edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 w-1/3"></div>

          <img
            src="/heroimage.webp"
            alt="ImageTech Products"
            className="w-full h-full object-cover object-left opacity-90 mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHero;

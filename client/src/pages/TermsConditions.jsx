import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions | ImageTech Industries",
    "description": "Terms and conditions for using ImageTech Industries website and services. Learn about our policies regarding Magnetic Ink Mixing Roller orders, intellectual property, and more."
  };

  return (
    <>
      <SEO 
        title="Terms and Conditions | ImageTech Industries"
        description="Terms and conditions for using ImageTech Industries website and services. Learn about our policies regarding Magnetic Ink Mixing Roller orders, intellectual property, and more."
        schema={termsSchema}
      />
      <div className="bg-slate-50 min-h-screen py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-gray-900 font-medium">Last Updated: 9/7/2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none text-gray-900 font-bold">
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-0">
              1. Agreement to Terms
            </h3>
            <p className="mb-8 leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and ImageTech Industries, concerning your access to and use of our website as well as any other media form, related products, or services.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              2. Intellectual Property Rights
            </h3>
            <p className="mb-8 leading-relaxed">
              Unless otherwise indicated, the website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              3. Products and Pricing
            </h3>
            <p className="mb-8 leading-relaxed">
              All industrial products, including our precision Magnetic Ink Mixing Rollers, are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change without notice. We make every effort to display as accurately as possible the specifications and details of the products available on our website.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              4. Orders and Payment
            </h3>
            <p className="mb-8 leading-relaxed">
              We reserve the right to refuse any order placed through the Site. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. Payment terms are subject to mutual agreement upon quotation and order confirmation.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              5. Governing Law
            </h3>
            <p className="mb-8 leading-relaxed">
              These Terms shall be governed by and defined following the laws of India. ImageTech Industries and yourself irrevocably consent that the courts of New Delhi, India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              6. Contact Us
            </h3>
            <p className="mb-4 leading-relaxed">
              In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 font-medium">
              <p className="mb-1 text-gray-900 font-bold">ImageTech Industries</p>
              <p className="mb-1">RZ-I-13, 2nd Floor, Nanda Block</p>
              <p className="mb-1">Mahavir Enclave, Delhi-110045, India</p>
              <p className="mt-2 text-gray-900">
                <span className="text-gray-900">Email:</span> <a href="mailto:imagetechindustries@gmail.com" className="text-blue-600 hover:underline">imagetechindustries@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;

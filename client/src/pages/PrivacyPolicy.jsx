import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | ImageTech Industries",
    "description": "Privacy policy for ImageTech Industries. Read how we handle and protect your personal information."
  };

  return (
    <>
      <SEO
        title="Privacy Policy | ImageTech Industries"
        description="Privacy policy for ImageTech Industries. Read how we handle and protect your personal information."
        schema={privacySchema}
      />
      <div className="bg-slate-50 min-h-screen py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-900 font-medium">Last Updated: 9/7/2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none text-gray-900 font-bold">
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-0">
              1. Introduction
            </h3>
            <p className="mb-8 leading-relaxed">
              At ImageTech Industries, we are committed to protecting your privacy
              and ensuring the security of your personal information. This Privacy
              Policy outlines how we collect, use, disclose, and safeguard your
              data when you visit our website or interact with our services.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              2. Information We Collect
            </h3>
            <p className="mb-4 leading-relaxed">
              We may collect personal information that you voluntarily provide to
              us when you express an interest in obtaining information about us or
              our products, when you participate in activities on the website, or
              otherwise when you contact us. The personal information we collect
              may include:
            </p>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li>
                <strong>Name and Contact Data:</strong> email address, phone
                number, postal address
              </li>
              <li>
                <strong>Business Information:</strong> company name, industry, job
                title
              </li>
              <li>
                <strong>Inquiry details:</strong> and product requirements
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              3. How We Use Your Information
            </h3>
            <p className="mb-4 leading-relaxed">
              We use the information we collect or receive to:
            </p>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              <li>Fulfill and manage your orders, requests, and inquiries.</li>
              <li>
                Send administrative information to you regarding our products and
                terms.
              </li>
              <li>
                Deliver targeted advertising, newsletters, and promotional
                materials.
              </li>
              <li>
                Improve our website, services, and overall customer experience.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              4. Sharing Your Information
            </h3>
            <p className="mb-8 leading-relaxed">
              We do not sell, rent, or trade your personal information with third
              parties for their promotional purposes. We may share your data with
              trusted service providers who assist us in operating our website,
              conducting our business, or servicing you, provided that those
              parties agree to keep this information confidential.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              5. Data Security
            </h3>
            <p className="mb-8 leading-relaxed">
              We have implemented appropriate technical and organizational
              security measures designed to protect the security of any personal
              information we process. However, please also remember that we cannot
              guarantee that the internet itself is 100% secure.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              6. Contact Us
            </h3>
            <p className="mb-4 leading-relaxed">
              If you have questions or comments about this policy, you may email
              us at{" "}
              <a
                href="mailto:imagetechindustries@gmail.com"
                className="text-blue-600 hover:underline"
              >
                imagetechindustries@gmail.com
              </a>{" "}
              or contact us by post at:
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 font-medium">
              <p className="mb-1 text-gray-900 font-bold">ImageTech Industries</p>
              <p className="mb-1">RZ-I-13, 2nd Floor, Nanda Block</p>
              <p className="mb-1">Mahavir Enclave, Delhi-110045, India</p>
              <p className="mt-2 text-gray-900">
                <span className="text-gray-900">Phone:</span> +91 8448336036
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

export default PrivacyPolicy;

import React, { useState, useRef } from "react";
import { submitContact } from "../../services/api";

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.target);
    const payload = {
      fullName: formData.get("fullName"),
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      productInterest: formData.get("productInterest"),
      industry: formData.get("industry"),
      message: formData.get("message"),
    };

    try {
      await submitContact(payload);
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-sm h-full flex flex-col">
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
        Send Us a Message
      </h3>
      <p className="text-gray-900 mb-6 font-medium">
        Fill out the form below with your requirements, and our technical sales
        team will get back to you promptly.
      </p>

      {/* Success Banner */}
      {status === "success" && (
        <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-green-800 font-bold text-sm">
              Message Sent Successfully!
            </p>
            <p className="text-green-700 text-xs mt-0.5">
              Our team will get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {status === "error" && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div>
            <p className="text-red-800 font-bold text-sm">Submission Failed</p>
            <p className="text-red-700 text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        className="flex-grow flex flex-col space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="Acme Packaging Corp"
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="+91 98765 43210"
              required
            />
          </div>
        </div>

        {/* Product & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="productInterest"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Product Interest
            </label>
            <input
              type="text"
              id="productInterest"
              name="productInterest"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="e.g. Magnetic Ink Mixing Roller with Rope"
            />
          </div>
          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-bold text-gray-900 font-bold mb-2"
            >
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
              placeholder="e.g. Printing, Packaging"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex-grow">
          <label
            htmlFor="message"
            className="block text-sm font-bold text-gray-900 font-bold mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="w-full h-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 resize-y placeholder-gray-900"
            placeholder="Please provide details about your requirements..."
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-4 flex flex-col items-center">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
          >
            {status === "loading" ? (
              <>
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2 transform -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Message
              </>
            )}
          </button>
          <div className="flex items-center mt-4 text-xs font-semibold text-gray-900">
            <svg
              className="w-3.5 h-3.5 mr-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Your information is safe with us. We respect your privacy.
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

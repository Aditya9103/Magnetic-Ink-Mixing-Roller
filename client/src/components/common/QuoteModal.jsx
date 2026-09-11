import React, { useState, useEffect, useRef } from "react";
import { useSubmitQuote } from "../../services/api";

const QuoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);

  const mutation = useSubmitQuote();

  const status = mutation.isPending
    ? "loading"
    : mutation.isSuccess
    ? "success"
    : mutation.isError
    ? "error"
    : "idle";
  const errorMsg = mutation.error?.message || "";

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      mutation.reset();
    };
    window.addEventListener("open-quote-modal", handleOpen);
    return () => window.removeEventListener("open-quote-modal", handleOpen);
  }, [mutation]);

  const handleClose = () => {
    setIsOpen(false);
    mutation.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

    mutation.mutate(payload, {
      onSuccess: () => {
        formRef.current?.reset();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50 shrink-0">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Get a Quote
            </h3>
            <p className="text-sm text-gray-900 font-medium mt-0.5">
              Fill out the form below with your requirements.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Success State */}
          {status === "success" && (
            <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-green-600"
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
                <p className="text-green-800 font-bold">
                  Quote Request Submitted!
                </p>
                <p className="text-green-700 text-sm mt-0.5">
                  Our sales team will reach out to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 text-sm font-bold text-green-800 underline underline-offset-2 hover:text-green-900"
                >
                  Close this window →
                </button>
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
                <p className="text-red-800 font-bold text-sm">
                  Submission Failed
                </p>
                <p className="text-red-700 text-xs mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          <form
            ref={formRef}
            className="flex flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            {/* Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="quoteFullName"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="quoteFullName"
                  name="fullName"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="quoteCompanyName"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="quoteCompanyName"
                  name="companyName"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="Acme Packaging Corp"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="quoteEmail"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="quoteEmail"
                  name="email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="quotePhone"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="quotePhone"
                  name="phone"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            {/* Product & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="quoteProduct"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Product Interest
                </label>
                <input
                  type="text"
                  id="quoteProduct"
                  name="productInterest"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="e.g. Magnetic Ink Mixing Roller with Rope"
                />
              </div>
              <div>
                <label
                  htmlFor="quoteIndustry"
                  className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
                >
                  Industry
                </label>
                <input
                  type="text"
                  id="quoteIndustry"
                  name="industry"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 placeholder-gray-900"
                  placeholder="e.g. Printing, Packaging"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="quoteMessage"
                className="block text-sm font-bold text-gray-900 font-bold mb-1.5"
              >
                Message / Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                id="quoteMessage"
                name="message"
                rows="4"
                className="w-full min-h-[100px] px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors outline-none text-gray-900 font-bold placeholder:font-normal bg-gray-50/50 resize-y placeholder-gray-900"
                placeholder="Please provide details about your requirements..."
                required
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-col items-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group"
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
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                    Request Quote
                  </>
                )}
              </button>
              <div className="flex items-center mt-3 text-xs font-semibold text-gray-900">
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
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
 @keyframes fadeInUp {
 from { opacity: 0; transform: translateY(10px) scale(0.98); }
 to { opacity: 1; transform: translateY(0) scale(1); }
 }
 .animate-fade-in-up { animation: fadeInUp 0.2s ease-out forwards; }
 .custom-scrollbar::-webkit-scrollbar { width: 6px; }
 .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
 .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
 .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
 `,
        }}
      />
    </div>
  );
};

export default QuoteModal;

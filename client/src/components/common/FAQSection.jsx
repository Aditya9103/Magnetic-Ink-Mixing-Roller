import React, { useState } from "react";

const FAQSection = ({ title, subtitle, description, faqs }) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 6);

  // SEO Schema Markup for FAQ
  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
    "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
      "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-100">
      {/* Inject SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h4 className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-3">
            {subtitle || "Frequently Asked Questions"}
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 uppercase">
            {title || "Everything You Need To Know"}
          </h2>
          <p className="text-gray-900 text-lg">
            {description ||
            "Find answers to common questions about our products and services."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl transition-all duration-300 h-max ${
                  isOpen
                    ? "border-blue-200 shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none rounded-2xl"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start pr-4">
                    <span className="flex-shrink-0 mt-0.5 mr-3 text-blue-500">
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors ${isOpen ? "text-blue-600" : "text-blue-500"}`}
                  >
                    {isOpen ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-900 leading-relaxed text-sm ml-8">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {faqs.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 border border-blue-200 text-blue-600 bg-blue-50 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              {showAll ? "View Less" : "View More"}
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;

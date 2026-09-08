import React from "react";
import FAQSection from "../common/FAQSection";

const certificationsFaqData = [
  {
    question: "What does ISO 9001:2015 certification mean?",
    answer:
    "ISO 9001:2015 is an international standard that specifies requirements for a quality management system (QMS). It demonstrates our ability to consistently provide products and services that meet customer and regulatory requirements, and our commitment to continuous improvement.",
  },
  {
    question: "How does your ISO certification benefit me as a customer?",
    answer:
    "Working with an ISO certified manufacturer ensures you receive products of consistent, high quality. It means our manufacturing processes, testing procedures, and customer service protocols adhere to strict international standards, reducing your risk of receiving defective products.",
  },
  {
    question: "Can you provide a copy of your ISO certificate?",
    answer:
    "Yes, you can view our ISO 9001:2015 certificate directly on this page. If you require a high-resolution PDF copy for your vendor compliance or procurement records, please contact our support team.",
  },
  {
    question: "How often are you audited for compliance?",
    answer:
    "To maintain our ISO 9001:2015 certification, we undergo rigorous internal audits regularly and are subjected to strict surveillance audits by an independent, accredited third-party certification body annually.",
  },
  {
    question:
    "Do you provide Material Test Reports (MTR) or Certificates of Analysis (COA)?",
    answer:
    "Yes, upon request, we can provide Material Test Reports (MTRs) and Certificates of Analysis (COAs) for our steel and polymer materials to verify metallurgical composition and physical properties.",
  },
  {
    question: "How do you ensure the quality of raw materials?",
    answer:
    "We source our raw materials only from approved, globally recognized suppliers. Every batch of raw material undergoes strict inward quality inspection for hardness, straightness, and composition before entering the production floor.",
  },
  {
    question: "What quality checks are performed during manufacturing?",
    answer:
    "Yes, we implement rigorous testing at every stage of production. Our quality control process includes continuous dimensional checks, material inspection, and coating consistency analysis to ensure flawless Magnetic Ink Mixing Rollers.",
  },
  {
    question: "Are your products compliant with food packaging regulations?",
    answer:
    "Our inspection equipment is designed to be used safely around high-speed machinery in compliance with industry standards. If you have specific regulatory requirements, please discuss this with our technical team.",
  },
  {
    question:
    "What is your policy if a product fails to meet quality standards?",
    answer:
    "Quality is our top priority. In the rare event that a product is found defective due to manufacturing faults, we have a strict Non-Conformance policy. We will replace the defective product promptly after investigating the root cause.",
  },
  {
    question: "How do you track continuous improvement?",
    answer:
    "As part of our ISO QMS, we track key performance indicators including defect rates, customer feedback, and on-time delivery metrics. This data is reviewed by management to implement corrective and preventive actions continuously.",
  },
];

import { SchemaInjector } from "../common/SEO";

const CertificationsFAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": certificationsFaqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SchemaInjector schema={faqSchema} />
      <FAQSection
        title="Understanding Our Quality Commitment"
        subtitle="Certifications FAQ"
        description="Find answers regarding our ISO standards, quality control processes, and material compliance."
        faqs={certificationsFaqData}
      />
    </>
  );
};

export default CertificationsFAQ;

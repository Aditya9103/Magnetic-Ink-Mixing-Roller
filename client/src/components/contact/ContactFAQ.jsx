import React from "react";
import FAQSection from "../common/FAQSection";

const contactFaqData = [
  {
    question: "What is the best way to request a quote?",
    answer:
    "The fastest way to request a quote is to use our 'Get a Quote' form available throughout the website. You can also email us directly at sales.imagetechindustries@gmail.com with your specifications, quantities, and delivery location.",
  },
  {
    question: "How quickly do you respond to inquiries?",
    answer:
    "Our dedicated sales and support team strives to respond to all inquiries within 24 business hours. For urgent matters, we recommend calling our support line directly.",
  },
  {
    question: "What are your business hours?",
    answer:
    "Our corporate office and manufacturing facilities operate Monday through Saturday, from 9:00 AM to 6:00 PM (IST). We are closed on Sundays and major public holidays.",
  },
  {
    question: "Do you offer technical support for your products?",
    answer: "Yes, we provide comprehensive technical support. Whether you need help selecting the right Magnetic Ink Mixing Roller for your ink tray, troubleshooting a mixing issue, or optimizing your print consistency, our experts are just a phone call or email away.",
  },
  {
    question: "Can I request product samples before placing a bulk order?",
    answer:
    "Absolutely. We understand the importance of testing products in your specific environment. Contact our sales team to discuss seeing the Magnetic Ink Mixing Roller in action in your presses.",
  },
  {
    question: "Where is your corporate office located?",
    answer:
    "Our corporate office is located at RZ-I-13, 2nd Floor, Nanda Block, Mahavir Enclave, Delhi-110045, India. You can find detailed directions on our Contact Us page map.",
  },
  {
    question: "Do you have distributors in other countries?",
    answer:
    "We supply directly to many international clients and also work through a network of trusted global distributors. Please contact us to find out if we have a local representative in your region.",
  },
  {
    question: "What information should I include in my support email?",
    answer:
    "To help us assist you faster, please include your company name, the specific product you are using, the machine model, ink type, and a detailed description of the issue or defect you are experiencing.",
  },
  {
    question: "Can I place an order over the phone?",
    answer:
    "Yes, you can place orders over the phone by calling our sales team at +91 8448338038. However, we typically require an email confirmation or purchase order for our records before processing.",
  },
  {
    question: "Who should I contact regarding billing or invoice questions?",
    answer:
    "For any questions related to invoices, payments, or billing, please reply directly to the invoice email you received, or contact our main support email with 'Billing Inquiry' in the subject line.",
  },
];

import { SchemaInjector } from "../common/SEO";

const ContactFAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": contactFaqData.map((faq) => ({
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
        title="Got Questions? We Have Answers."
        subtitle="Contact & Support FAQ"
        description="Find quick answers regarding quotes, technical support, sample requests, and general communication."
        faqs={contactFaqData}
      />
    </>
  );
};

export default ContactFAQ;

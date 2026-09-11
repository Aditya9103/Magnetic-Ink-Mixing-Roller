import React from "react";
import FAQSection from "../common/FAQSection";

const faqData = [
  {
    question: "What is a Magnetic Ink Mixing Roller with Rope?",
    answer: "It is a device placed in an ink tray that uses magnetic attraction from the cylinder to roll and mix ink constantly during printing. The rope makes it easier to position, remove, and clean.",
  },
  {
    question: "What is the purpose of the rope?",
    answer: "The rope makes positioning, removal, and cleaning of the roller more convenient, and helps retrieve it easily from the ink tray without getting hands dirty.",
  },
  {
    question: "What diameters are available?",
    answer: "Our WIPEX Magnetic Ink Mixing Rollers are available in 25 mm, 30 mm, 38 mm, and 45 mm diameters.",
  },
  {
    question: "What lengths are available?",
    answer: "We supply lengths ranging from 150 mm up to 2400 mm to perfectly match various machine sizes and ink tray widths.",
  },
  {
    question: "Does the magnetic ink mixing roller require external power?",
    answer: "No, it operates entirely using the magnetic movement and rotation of the cylinder, requiring no external power source.",
  },
  {
    question: "Where are Magnetic Ink Mixing Rollers used?",
    answer: "They are widely used in gravure printing, flexographic printing, flexible packaging, and label printing applications to maintain ink consistency.",
  },
  {
    question: "What are the benefits of using an ink mixing roller?",
    answer: "It maintains uniform ink mixing, prevents pigment settling at the bottom of the tray, supports consistent ink viscosity and color, and significantly improves overall print consistency.",
  },
  {
    question: "Do you offer a Rope-Free version?",
    answer: "Yes, we also manufacture the WIPEX Magnetic Ink Mixing Roller (Rope-Free) for enclosed setups or environments where a rope might snag on moving parts.",
  },
  {
    question: "How do I choose the correct diameter for my press?",
    answer: "The correct diameter depends on your ink tray size and the clearance available. The 38 mm and 45 mm are popular for larger presses, while 25 mm and 30 mm are better suited for smaller label presses.",
  },
  {
    question: "How do I clean the ink mixing roller?",
    answer: "Cleaning is straightforward. Simply remove the roller from the tray using the rope (if applicable) and clean it using standard press room solvents that are compatible with the ink type you are using.",
  },
  {
    question: "What materials are the rollers made of?",
    answer: "Our rollers are constructed with strong internal magnets encased in a durable, solvent-resistant exterior to withstand harsh printing chemicals and provide long-lasting performance.",
  },
  {
    question: "Can I use the roller with water-based and solvent-based inks?",
    answer: "Yes, our WIPEX Magnetic Ink Mixing Rollers are compatible with both solvent-based and water-based inks commonly used in gravure and flexographic printing.",
  }
];

import { SchemaInjector } from "../common/SEO";

const HomeFAQ = ({ locationData }) => {
  const locName = locationData ? locationData.name : "";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
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
        title={`Everything You Need To Know About Magnetic Ink Mixing Rollers ${locName ? 'in ' + locName : ''}`}
        subtitle="Frequently Asked Questions"
        description={`Find answers to common questions about our Ink Mixing Rollers, printing applications, and technical specifications ${locName ? 'in ' + locName : ''}.`}
        faqs={faqData}
      />
    </>
  );
};

export default HomeFAQ;

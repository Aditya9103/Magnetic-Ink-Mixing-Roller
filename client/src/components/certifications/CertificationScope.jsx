import React from "react";

const scopeItems = [
"Lab Instruments",
"Dyne Check Pen (Magnet)",
"Magnetic Ink Mixing Roller with Rope",
"Magnetic Ink Mixing Roller (Rope-Free)",
"Custom Size Ink Mixing Roller",
"Tensile Strength Tester",
"Reel and Box Wrapping Machine",
"Hot Air Oven",
"Bursting Strength Tester",
"Color Matching Cabinet",
"Draw Down Rod and Pads",
];

const CertificationScope = () => {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h4 className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2">
            Scope of Operations
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Manufacturer & Supplier
          </h2>
          <p className="text-lg text-gray-900">
            Our ISO 9001:2015 certification formally covers a comprehensive
            range of premium printing accessories and industrial products designed for
            precision and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {scopeItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex items-start space-x-4"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 font-bold leading-snug">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationScope;

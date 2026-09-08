import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shippingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Shipping & Delivery Policy | ImageTech Industries",
    "description": "Learn about the shipping and delivery policy at ImageTech Industries. We ship precision Magnetic Ink Mixing Rollers and printing accessories domestically within India and internationally."
  };

  return (
    <>
      <SEO 
        title="Shipping & Delivery Policy | ImageTech Industries"
        description="Learn about the shipping and delivery policy at ImageTech Industries. We ship precision Magnetic Ink Mixing Rollers and printing accessories domestically within India and internationally."
        schema={shippingSchema}
      />
      <div className="bg-slate-50 min-h-screen py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Shipping and Delivery Policy
            </h1>
            <p className="text-gray-900 font-medium">Last Updated: 9/7/2026</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-blue max-w-none text-gray-900 font-bold">
            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-0">
              1. Order Processing Time
            </h3>
            <p className="mb-8 leading-relaxed">
              All orders are processed within 2-3 business days after receiving your order confirmation email. You will receive another notification when your order has shipped. Processing times may vary depending on the availability of industrial products and custom specifications requested.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              2. Domestic Shipping Rates and Estimates
            </h3>
            <p className="mb-8 leading-relaxed">
              For domestic orders within India, shipping charges for your order will be calculated and displayed at checkout or provided during the quotation process. Delivery times vary based on the destination, generally ranging from 3 to 7 business days for major cities.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              3. International Shipping
            </h3>
            <p className="mb-8 leading-relaxed">
              We offer international shipping to various countries. Shipping charges and delivery times for international orders will be calculated based on the weight of the shipment and the destination country. Please note that your order may be subject to import duties and taxes, which are incurred once a shipment reaches your destination country. ImageTech Industries is not responsible for these charges if they are applied and are your responsibility as the customer.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              4. Shipping Couriers
            </h3>
            <p className="mb-8 leading-relaxed">
              We partner with reliable and reputed logistics providers to ensure the safe and timely delivery of our precision printing products, such as Magnetic Ink Mixing Rollers. Tracking information will be provided once the consignment is dispatched.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              5. Damages and Returns
            </h3>
            <p className="mb-8 leading-relaxed">
              ImageTech Industries is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim. For any defects in manufacturing, please refer to our standard return and warranty policy.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              6. Contact Information
            </h3>
            <p className="mb-4 leading-relaxed">
              If you have any further questions about your shipment or our shipping policy, please contact us at:
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 font-medium">
              <p className="mb-1 text-gray-900 font-bold">ImageTech Industries</p>
              <p className="mt-2 text-gray-900">
                <span className="text-gray-900">Email:</span> <a href="mailto:sales.imagetechindustries@gmail.com" className="text-blue-600 hover:underline">sales.imagetechindustries@gmail.com</a>
              </p>
              <p className="mt-1 text-gray-900">
                <span className="text-gray-900">Phone:</span> +91 8448441345
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

export default ShippingPolicy;

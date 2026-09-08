import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { productsData } from "../data/products";
import SEO from "../components/common/SEO";
import FAQSection from "../components/common/FAQSection";
import HomeCTA from "../components/home/HomeCTA";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = productsData.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0); // Reset image index on route change
  }, [slug]);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: `https://inkmixingroller.com${product.images[0]}`,
    description: product.shortDescription,
    brand: {
      "@type": "Brand",
      name: "ImageTech Industries",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={`${product.metaTitle}`}
        description={product.metaDescription}
        schema={[productSchema, faqSchema]}
      />
      <div className="bg-slate-50 min-h-screen py-4 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <nav className="text-sm font-semibold mb-8 flex text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-12 items-start mb-16">

            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {/* Main Image */}
              <div className="bg-gray-50 p-8 rounded-2xl w-full aspect-square flex items-center justify-center border border-gray-100 relative">
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} - Image ${activeImage + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-500"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`border-2 rounded-lg overflow-hidden aspect-square bg-gray-50 p-2 flex items-center justify-center transition-all ${activeImage === idx ? 'border-blue-600 shadow-md scale-105' : 'border-gray-200 hover:border-blue-300 opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {product.name}
              </h1>

              {/* Overview Text */}
              <div className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {product.overview}
              </div>

              {/* Quick Feature Highlights */}
              <ul className="space-y-2 mb-8">
                {product.keyFeatures.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-quote-modal"))}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg flex items-center justify-center"
                >
                  Get a Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <a
                  href={product.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-base transition-colors shadow-lg flex items-center justify-center uppercase"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.476 0 1.46 1.065 2.872 1.213 3.07.149.198 2.096 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  BUY NOW / WHATSAPP US
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Product Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {product.detailedDescription}
            </div>
          </div>

          {/* Specifications, Features and Applications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

            {/* Key Features */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
              </div>
              <ul className="space-y-4">
                {product.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-blue-50 p-1 rounded-full mr-3 mt-0.5 shrink-0">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industrial Applications */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Applications</h3>
              </div>
              <p className="text-gray-800 font-medium leading-relaxed mb-6">
                {product.applications}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col h-full lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Specifications</h3>
              </div>
              <div className="space-y-3">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-gray-100 pb-2 last:border-0">
                    <span className="text-gray-600 font-semibold pr-4">{spec.label}</span>
                    <span className="text-gray-900 font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Product FAQ */}
          <div className="mb-16">
            <FAQSection
              title={`${product.name} FAQs`}
              subtitle="Common Questions"
              description={`Find answers to the most common questions about our ${product.name}.`}
              faqs={product.faqs}
            />
          </div>

          <HomeCTA />

        </div>
      </div>
    </>
  );
};

export default ProductDetail;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation as useLocationQuery } from "../services/api";
import SEO from "../components/common/SEO";
import NotFound from "../components/common/NotFound";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeCTA from "../components/home/HomeCTA";

const CityPageSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Hero Skeleton */}
    <div className="bg-gradient-to-r from-blue-50/70 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="h-6 w-48 bg-blue-100/80 rounded-full"></div>
          <div className="space-y-3">
            <div className="h-10 sm:h-12 w-3/4 bg-slate-200 rounded-2xl"></div>
            <div className="h-8 sm:h-10 w-1/2 bg-blue-200/70 rounded-2xl"></div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-200 rounded-md"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-2/3 bg-slate-200 rounded-md"></div>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="h-12 w-44 bg-blue-600/30 rounded-full"></div>
            <div className="h-12 w-44 bg-slate-200 rounded-full"></div>
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md aspect-square bg-slate-100 border border-slate-200/60 rounded-3xl"></div>
        </div>
      </div>
    </div>

    {/* Products Section Skeleton */}
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="space-y-3 mb-10 text-center max-w-md mx-auto">
        <div className="h-4 w-28 bg-blue-100 mx-auto rounded-full"></div>
        <div className="h-8 w-64 bg-slate-200 mx-auto rounded-xl"></div>
        <div className="h-4 w-80 bg-slate-100 mx-auto rounded-md"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-6">
            <div className="aspect-video bg-slate-100 rounded-2xl"></div>
            <div className="h-6 w-3/4 bg-slate-200 rounded-lg"></div>
            <div className="h-4 w-full bg-slate-100 rounded-md"></div>
            <div className="h-10 w-full bg-slate-100 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const isInvalidSlug = (slug) =>
  !slug || slug.includes(".") || slug === "robots" || slug === "sitemap";

const CityPage = () => {
  const { locationSlug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationSlug]);

  const invalid = isInvalidSlug(locationSlug);

  const {
    data: locationData,
    isLoading,
    isError,
    error,
    refetch,
  } = useLocationQuery(locationSlug, { enabled: !invalid });

  if (invalid || (isError && error?.status === 404)) {
    return (
      <NotFound
        title="Location Not Found"
        message={`We could not find any active location matching "${locationSlug}". Please check our sitemap to view all supported locations.`}
      />
    );
  }

  if (isLoading) {
    return <CityPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to load location details</h2>
        <p className="text-gray-600 mb-6 max-w-md">There was a temporary problem communicating with our server. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!locationData || !locationData.isActive) {
    return (
      <NotFound
        title="Location Not Found"
        message={`We could not find any active location matching "${locationSlug}". Please check our sitemap to view all supported locations.`}
      />
    );
  }
  const locName = locationData.name;
  const locState = locationData.state;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageTech Industries",
    "url": "https://inkmixingroller.com/",
    "logo": "https://inkmixingroller.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8448336036",
      "contactType": "sales",
      "areaServed": locName,
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locName,
      "addressRegion": locState,
      "addressCountry": "IN"
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Magnetic Ink Mixing Rollers",
    "image": "https://inkmixingroller.com/heroimage.webp",
    "description": `Premium Magnetic Ink Mixing Rollers available in ${locName}, ${locState}. Designed for gravure and flexographic printing presses.`,
    "brand": {
      "@type": "Brand",
      "name": "ImageTech Industries"
    },
    "areaServed": locName
  };

  return (
    <>
      <SEO
        title={`Best Magnetic Ink Mixing Roller Manufacturer in ${locName}`}
        description={`Looking for the best Magnetic Ink Mixing Rollers in ${locName}, ${locState}? ImageTech Industries manufactures and supplies premium WIPEX Magnetic Ink Mixing Rollers.`}
        keywords={[
          `Best Magnetic Ink Mixing Roller in ${locName}`,
          `Magnetic Ink Mixing Roller Manufacturer in ${locName}`,
          `Ink Mixing Rollers in ${locName}`,
          `Magnetic Ink Mixing Roller ${locState}`,
          'ImageTech Industries',
          'WIPEX Magnetic Ink Mixing Roller',
          'Gravure Printing',
          'Flexographic Printing'
        ]}
        schema={[orgSchema, productSchema]}
      />

      <main className="flex flex-col">
        <HomeHero locationData={locationData} />
        <HomeProducts locationData={locationData} />
        <HomeIndustries locationData={locationData} />
        <HomeAbout locationData={locationData} />
        <HomeCertifications locationData={locationData} />
        <HomeWhyChoose locationData={locationData} />
        <HomeFAQ locationData={locationData} />
        <HomeCTA locationData={locationData} />
      </main>
    </>
  );
};

export default CityPage;

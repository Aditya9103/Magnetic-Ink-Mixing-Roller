import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLocation } from "../services/api";
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

const CityPage = () => {
  const { locationSlug } = useParams();

  const [state, setState] = useState({
    slug: null,
    data: null,
    loading: true,
    notFound: false,
    apiError: false,
  });

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);


    // Guard: Prevent file requests (like .xml, .txt) from being treated as location slugs
    if (!locationSlug || locationSlug.includes('.') || locationSlug === 'robots' || locationSlug === 'sitemap') {
      setState({
        slug: locationSlug,
        data: null,
        loading: false,
        notFound: true,
        apiError: false,
      });
      return;
    }

    fetchLocation(locationSlug)

      .then((data) => {
        if (!isMounted) return;
        if (!data || !data.isActive) {
          setState({
            slug: locationSlug,
            data: null,
            loading: false,
            notFound: true,
            apiError: false,
          });
        } else {
          setState({
            slug: locationSlug,
            data,
            loading: false,
            notFound: false,
            apiError: false,
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        if (err.status === 404) {
          setState({
            slug: locationSlug,
            data: null,
            loading: false,
            notFound: true,
            apiError: false,
          });
        } else {
          console.error("API error fetching location:", err);
          setState({
            slug: locationSlug,
            data: null,
            loading: false,
            notFound: false,
            apiError: true,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [locationSlug]);

  const isLoading = state.loading || state.slug !== locationSlug;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-gray-500 text-sm font-medium animate-pulse">Loading location details...</p>
      </div>
    );
  }

  if (state.notFound) {
    return (
      <NotFound
        title="Location Not Found"
        message={`We could not find any active location matching "${locationSlug}". Please check our sitemap to view all supported locations.`}
      />
    );
  }

  if (state.apiError || !state.data) {
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
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const locationData = state.data;
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

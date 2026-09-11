import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Home = ({ locationData: initialLocationData, isDynamicLocation }) => {
  const { locationSlug } = useParams();
  const [locationData, setLocationData] = useState(initialLocationData || null);
  const [loading, setLoading] = useState(isDynamicLocation && !initialLocationData);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we are on a dynamic route but don't have initial data (e.g. client-side navigation)
    if (isDynamicLocation && !initialLocationData && locationSlug) {
      const fetchLocation = async () => {
        try {
          let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
          if (!apiUrl.endsWith('/api')) apiUrl += '/api';
          const res = await fetch(`${apiUrl}/locations/${locationSlug}`);
          if (res.ok) {
            const data = await res.json();
            setLocationData(data);
          } else {
            setError(true);
          }
        } catch (err) {
          console.error(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchLocation();
    }
  }, [isDynamicLocation, initialLocationData, locationSlug]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Location Not Found</h1>
        <p className="text-lg text-gray-600">Sorry, we could not find the location you are looking for.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const locName = locationData ? locationData.name : "India";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ImageTech Industries",
    "url": "https://inkmixingroller.com/",
    "logo": "https://inkmixingroller.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9811000000",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressCountry": "IN"
    }
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Magnetic Ink Mixing Rollers",
    "image": "https://inkmixingroller.com/MAGNETIC_INK_MIXING_ROLLER/INK MIXING ROLLER WITH ROPE/204.jpg",
    "description": `The best Magnetic Ink Mixing Rollers in ${locName}. Premium rollers for consistent ink mixing in printing and packaging.`,
    "brand": {
      "@type": "Brand",
      "name": "ImageTech Industries"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    }
  };

  return (
    <>
      <SEO 
        title={`Best Magnetic Ink Mixing Rollers in ${locName}`}
        description={`Looking for the best Magnetic Ink Mixing Rollers in ${locName}? ImageTech Industries supplies premium WIPEX Magnetic Ink Mixing Rollers for flawless printing operations.`}
        keywords={[
          `Best Magnetic Ink Mixing Roller in ${locName}`,
          `Magnetic Ink Mixing Roller Manufacturer in ${locName}`,
          `Ink Mixing Rollers in ${locName}`,
          'ImageTech Industries',
          'WIPEX Magnetic Ink Mixing Roller',
          'Gravure Printing',
          'Flexographic Printing',
          locName
        ]}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        {/* Pass locationData to HomeHero so it can dynamically update the H1 */}
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

export default Home;

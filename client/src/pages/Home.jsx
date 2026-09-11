import React from "react";
import HomeHero from "../components/home/HomeHero";
import HomeProducts from "../components/home/HomeProducts";
import HomeIndustries from "../components/home/HomeIndustries";
import HomeAbout from "../components/home/HomeAbout";
import HomeCertifications from "../components/home/HomeCertifications";
import HomeWhyChoose from "../components/home/HomeWhyChoose";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const Home = ({ locationData = null }) => {
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

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

const Home = () => {
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
    "description": "The best Magnetic Ink Mixing Rollers in India. Premium rollers for consistent ink mixing in printing and packaging.",
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
        title="Best Magnetic Ink Mixing Rollers in India | ImageTech Industries"
        description="Looking for the best Magnetic Ink Mixing Rollers in India? ImageTech Industries supplies premium WIPEX Magnetic Ink Mixing Rollers for flawless printing operations."
        keywords={['best magnetic ink mixing rollers in india', 'ink mixing roller supplier', 'magnetic roller with rope', 'rope free ink mixing roller', 'gravure printing roller']}
        schema={[orgSchema, productSchema]}
      />
      <main className="flex flex-col">
        <HomeHero />
        <HomeProducts />
        <HomeIndustries />
        <HomeAbout />
        <HomeCertifications />
        <HomeWhyChoose />
        <HomeFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default Home;

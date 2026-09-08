import React, { useEffect } from "react";
import AboutStory from "../components/about/AboutStory";
import AboutCapabilities from "../components/about/AboutCapabilities";
import AboutValues from "../components/about/AboutValues";
import AboutVisionMission from "../components/about/AboutVisionMission";
import AboutGlobalPresence from "../components/about/AboutGlobalPresence";
import HomeCertifications from "../components/home/HomeCertifications";
import AboutFAQ from "../components/about/AboutFAQ";
import HomeCTA from "../components/home/HomeCTA";
import SEO from "../components/common/SEO";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ImageTech Industries",
    "description": "Learn about ImageTech Industries, a leading manufacturer of Magnetic Ink Mixing Rollers in India with over 30 years of experience.",
    "publisher": {
      "@type": "Organization",
      "name": "ImageTech Industries"
    }
  };

  return (
    <>
      <SEO 
        title="About Us | ImageTech Industries"
        description="Learn about ImageTech Industries, a trusted manufacturer of Magnetic Ink Mixing Rollers in Delhi, India. Discover our history, manufacturing capabilities, and global presence."
        keywords={['about imagetech industries', 'magnetic ink mixing roller manufacturer history', 'best ink mixing roller in delhi', 'printing roller manufacturer']}
        schema={aboutSchema}
      />
      <main>
        <AboutStory />
        <AboutCapabilities />
        <AboutValues />
        <AboutVisionMission />
        <HomeCertifications />
        <AboutGlobalPresence />
        <AboutFAQ />
        <HomeCTA />
      </main>
    </>
  );
};

export default AboutUs;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://inkmixingroller.com';
const SITE_NAME = 'ImageTech Industries';
const DEFAULT_IMAGE = `${SITE_URL}/heroimage.webp`;
const TWITTER_HANDLE = '@ImageTech_Ind'; // Placeholder

/**
 * Central SEO/meta component. Renders standard meta tags, Open Graph,
 * Twitter Card tags, and any number of JSON-LD structured data blocks.
 *
 * `schema` accepts either a single schema object or an array of them
 */
export default function SEO({
  title,
  description,
  name = SITE_NAME,
  type = 'website',
  image = DEFAULT_IMAGE,
  keywords,
  schema,
  noindex = false,
}) {
  const location = useLocation();
  const fullTitle = title === name ? title : `${title} | ${name}`;

  // Strip trailing slash (except root) so "/foo" and "/foo/" don't produce
  // two different canonical URLs for the same page.
  const path = location.pathname.replace(/\/+$/, '');
  const currentUrl = `${SITE_URL}${path || ''}`;

  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={currentUrl} />

      {/* Structured data — one <script> per schema object */}
      {schemaList.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Lightweight component to inject structured data (JSON-LD) without modifying other meta tags.
 * Useful for deep components (like FAQs) that need to append schema to the page.
 */
export function SchemaInjector({ schema }) {
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];
  if (schemaList.length === 0) return null;

  return (
    <Helmet>
      {schemaList.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocations, usePrefetchLocation } from "../services/api";
import SEO from "../components/common/SEO";

const SitemapSkeleton = () => (
  <div className="space-y-12 animate-pulse" aria-hidden="true">
    {[1, 2, 3].map((group) => (
      <div key={group} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* State Header Skeleton */}
        <div className="bg-gradient-to-r from-blue-50/50 to-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="h-6 w-36 bg-gray-200 rounded-md"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Cities Grid Skeleton */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-11 bg-gray-100 border border-gray-200/70 rounded-xl px-4 flex items-center justify-between"
            >
              <div className="h-3.5 bg-gray-200 rounded w-20"></div>
              <div className="w-3.5 h-3.5 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const Sitemap = () => {
  const prefetchLocation = usePrefetchLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: locations = [], isLoading } = useLocations();

  // Group locations by state
  const groupedLocations = locations.reduce((acc, loc) => {
    if (!acc[loc.state]) acc[loc.state] = [];
    acc[loc.state].push(loc);
    return acc;
  }, {});

  // Sort states alphabetically
  const sortedStates = Object.keys(groupedLocations).sort();

  return (
    <>
      <SEO
        title="Sitemap - Locations & Cities | ImageTech Industries"
        description="Browse all nationwide distribution locations and cities for the best Magnetic Ink Mixing Rollers by ImageTech Industries in India."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            PAN India Presence
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our <span className="text-blue-600">Locations</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Find the best Magnetic Ink Mixing Rollers in a city near you. Select your state and city below.
          </p>
        </div>

        {isLoading ? (
          <SitemapSkeleton />
        ) : (
          <div className="space-y-12">
            {sortedStates.length > 0 ? (
              sortedStates.map((stateName) => (
                <div key={stateName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* State Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-blue-900">{stateName}</h2>
                    <span className="text-blue-600 bg-white rounded-full px-3 py-1 text-xs font-bold border border-blue-100 shadow-sm">
                      {groupedLocations[stateName].length} {groupedLocations[stateName].length === 1 ? "City" : "Cities"}
                    </span>
                  </div>

                  {/* Cities Grid */}
                  <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {groupedLocations[stateName]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((loc) => (
                        <Link
                          key={loc._id || loc.slug}
                          to={`/${loc.slug}`}
                          onMouseEnter={() => prefetchLocation(loc.slug)}
                          className="group flex items-center justify-between bg-white border border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-700 font-medium py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-md"
                        >
                          <span className="text-sm truncate mr-2">{loc.name}</span>
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-900">No locations available</p>
                <p className="text-sm text-gray-500 mt-1">Please check back later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Sitemap;

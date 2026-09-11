import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLocations } from "../services/api";
import SEO from "../components/common/SEO";

const Sitemap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo(0, 0);

    fetchLocations()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          setLocations(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching locations for sitemap:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="text-gray-500 text-sm font-medium animate-pulse">Loading location directory...</p>
          </div>
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

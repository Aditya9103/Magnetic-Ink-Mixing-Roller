import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Certifications", href: "/certifications" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href) || location.hash === href;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="https://www.imagetechindustries.com/"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="ImageTech Industries Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, index) =>
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors text-gray-900 font-bold hover:text-blue-600"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className={`flex items-center px-3 py-2 text-sm font-semibold rounded-md transition-colors ${isActive(link.href) ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-900 font-bold hover:text-blue-600"}`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-quote-modal"))
              }
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center"
            >
              Get A Quote
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 hover:text-gray-900 focus:outline-none p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
            {navLinks.map((link, index) =>
              link.external ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-semibold text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-center">
                    {link.name}
                  </div>
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-semibold ${isActive(link.href) ? "text-blue-600 bg-blue-50" : "text-gray-900 font-bold hover:text-blue-600 hover:bg-gray-50"}`}
                >
                  <div className="flex justify-between items-center">
                    {link.name}
                  </div>
                </Link>
              ),
            )}
            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.dispatchEvent(new CustomEvent("open-quote-modal"));
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
              >
                Get A Quote
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

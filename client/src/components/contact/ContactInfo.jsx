import React from "react";

const ContactInfo = () => {
  return (
    <div className="w-full flex flex-col h-full space-y-6">
      {/* 2x2 Grid of Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Our Office */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-gray-900 font-extrabold mb-1">Our Office</h4>
            <p className="text-gray-900 text-sm font-semibold">
              ImageTech Industries
            </p>
            <p className="text-gray-900 text-sm leading-relaxed">
              RZ-I-13, 2ND FLOOR, NANDA BLOCK, MAHAVIR ENCLAVE, DELHI-110045,
              INDIA.
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-gray-900 font-extrabold mb-1">Phone</h4>
            <div className="flex flex-col space-y-1 mt-1">
              <a
                href="tel:+918448336036"
                className="text-gray-900 text-sm hover:text-blue-600 transition-colors"
              >
                +91 8448336036
              </a>
              <a
                href="tel:+918851016580"
                className="text-gray-900 text-sm hover:text-blue-600 transition-colors"
              >
                +91 8851016580
              </a>
              <a
                href="tel:+918448441345"
                className="text-gray-900 text-sm hover:text-blue-600 transition-colors"
              >
                +91 8448441345
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-gray-900 font-extrabold mb-1">Email</h4>
            <div className="flex flex-col space-y-1 mt-1">
              <a
                href="mailto:imagetechindustries@gmail.com"
                className="text-gray-900 text-sm hover:text-blue-600 transition-colors break-all"
              >
                imagetechindustries@gmail.com
              </a>
              <a
                href="mailto:sales.imagetechindustries@gmail.com"
                className="text-gray-900 text-sm hover:text-blue-600 transition-colors break-all"
              >
                sales.imagetechindustries@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-gray-900 font-extrabold mb-1">
              Business Hours
            </h4>
            <div className="flex flex-col space-y-1 mt-1">
              <span className="text-gray-900 text-sm font-semibold">
                Monday - Saturday
              </span>
              <span className="text-gray-900 text-sm">
                9:00 AM - 6:00 PM (IST)
              </span>
              <span className="text-gray-900 text-sm mt-1">Sunday: Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex-grow min-h-[250px] relative">
        <iframe
          title="ImageTech Industries Location"
          src="https://maps.google.com/maps?q=Imagetech%20Industries%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "300px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>

        {/* Map Overlay Card (Optional nice touch to match design) */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-100 max-w-xs z-10 hidden sm:block">
          <h5 className="font-extrabold text-gray-900 text-sm">
            ImageTech Industries
          </h5>
          <p className="text-xs text-gray-900 mt-1 mb-2">
            RZ-I-13, 2ND FLOOR, NANDA BLOCK, MAHAVIR ENCLAVE, DELHI-110045,
            INDIA.
          </p>
          <a
            href="https://www.google.com/maps/place/Imagetech+Industries/@28.5996122,77.0723191,17z/data=!3m1!5s0x390d1b3740912e73:0x8a7a9bbea280f1f8!4m14!1m7!3m6!1s0x390d1b1f0285f955:0xfa61bce24bb44c06!2sImagetech+Industries!8m2!3d28.5996075!4d77.074894!16s%2Fg%2F11vjggt0r3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xs font-bold hover:underline flex items-center"
          >
            View larger map
            <svg
              className="w-3 h-3 ml-1"
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
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

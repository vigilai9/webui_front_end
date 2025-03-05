// components/Navbar.js
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-800">
              VigilAI
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Features
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Pricing
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600">
              Contact
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Features
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Pricing
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

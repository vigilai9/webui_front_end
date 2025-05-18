import { motion } from 'framer-motion';
import { useState } from 'react';

const SecurityDashboard = () =>{
    
  const [activeSection, setActiveSection] = useState("Overview");
   return (
    <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 sm:px-6 w-full py-12"
          >
           
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">Comprehensive Overview</span>
            </div>
          <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                Intuitive Security <span className="text-[#1b3b5f]">Dashboard</span>
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
                Monitor your entire security operation from a single, user-friendly interface designed for maximum situational awareness.
              </p>
            </div>

             <div className="w-full max-w-3xl py-4 sm:py-8">
              <div className="flex justify-center overflow-x-auto scrollbar-hide px-2 sm:px-0 gap-1 sm:gap-4 pb-2">
                <button
                  onClick={() => setActiveSection("Overview")}
                  className={`px-3 py-2 rounded text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeSection === "Overview"
                      ? "bg-gray-200 shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  Live Monetring
                </button>
                <button
                  onClick={() => setActiveSection("Analytics")}
                  className={`px-3 py-2 rounded text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeSection === "Analytics"
                      ? "bg-gray-200 shadow-sm"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  Video Forensic
                </button>
              </div>
            </div>

           <div className="w-full max-w-5xl px-0 sm:px-4">
              <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:translate-y-0.5 transition-all duration-300">
                <img
                  className="w-full h-auto object-contain"
                  src="https://media.istockphoto.com/id/1387900612/photo/automation-data-analytic-with-robot-and-digital-visualization-for-big-data-scientist.jpg?s=1024x1024&w=is&k=20&c=BdevKMKtOgXoPwbZE9v_PU_q94-G5LgboedYsvyKP-g="
                  alt="Security dashboard interface"
                />
              </div>
            </div>
          </motion.div>
        </div>
   )
}

export default SecurityDashboard;
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { fadeIn } from "@/lib/variants";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import UserQuery from "@/components/UserQuery";
import Features from "@/components/Features";
import { Activity, Bell, Box, Calendar, Cctv, Check, Clock5, Columns2, File, Lock, MonitorCog, Users } from "lucide-react";
import Hero from "./Hero";

import { RotateCw } from 'lucide-react';


const Landing = () => {

  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const handleTryVigil = (): void => {
    if (!authLoading && !currentUser) {
      router.push("/login");
      return;
    }
    router.push("/");
    return;
  };

  const [activeSection, setActiveSection] = useState("Overview");

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex h-full flex-col items-center justify-center">

        <Hero />
        <TrustedBy/>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 w-full py-12 "
          >
            {/* Tagline */}
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">Smart Monitoring</span>
            </div>

            {/* Heading section */}
            <div className="flex gap-4 flex-col items-center text-center">
              <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
                No Incident Goes Unreported
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm">
                Vigil AI deploys 30 layer processing, to ensure no relevant incident goes unreported with unparallelled accuracy and speed. 
              </p>
            </div>

            {/* Image and content container */}
            <div className="flex flex-col lg:flex-row w-full gap-8 py-12">
              {/* Image Container - full width on mobile, 50% on desktop */}
              <div className="w-full lg:w-1/2 flex items-center hover:translate-y-1 transition-all duration-300 order-1">
                <img
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  src="https://media.istockphoto.com/id/1387900612/photo/automation-data-analytic-with-robot-and-digital-visualization-for-big-data-scientist.jpg?s=1024x1024&w=is&k=20&c=BdevKMKtOgXoPwbZE9v_PU_q94-G5LgboedYsvyKP-g="
                  alt="AI data analysis"
                />
              </div>

              {/* Content Container - full width on mobile, 50% on desktop */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6 order-2">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-1 bg-gray-200 rounded group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <Check className="h-4 w-4 " />
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold ">Under 30 Sec, Human Level Reporting</h2>
                      <p className="text-gray-500 text-sm pt-2">
                      Receive alerts within 30 sec of any common and custom incidents. Theft, Regulation Compliance, Tracking People/Vehicles among others.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer  hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-1 bg-gray-200 rounded group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <Clock5  className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">Timestamped Threat Reports</h2>
                      <p className="text-gray-500 text-sm pt-2">
                        Easily jump to the part of the footage, mentioned in the alert and see the incident for yourself!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer  hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-1 bg-gray-200 rounded group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <Clock5  className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold">Timestamped Threat Reports</h2>
                      <p className="text-gray-500 text-sm pt-2">
                        Easily jump to the part of the footage, mentioned in the alert and see the incident for yourself!
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 w-full py-12"
          >
            {/* Tagline */}
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">AI Intelligence</span>
            </div>

            {/* Heading section */}
            <div className="flex gap-4 flex-col items-center text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                We understand your need
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm">
                 Leverage Generative AI, to ask anything to your cameras. It has seen all, it remembers all. Imagine a Live Witness!
              </p>
            </div>

            {/* Image and content container */}
            <div className="flex flex-col lg:flex-row w-full gap-8 py-12">
              {/* Image Container - full width on mobile, 50% on desktop (on top for mobile) */}
              <div className="w-full lg:w-1/2 flex items-center hover:translate-y-1 transition-all duration-300">
                <img
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  src="https://media.istockphoto.com/id/1387900612/photo/automation-data-analytic-with-robot-and-digital-visualization-for-big-data-scientist.jpg?s=1024x1024&w=is&k=20&c=BdevKMKtOgXoPwbZE9v_PU_q94-G5LgboedYsvyKP-g="
                  alt="AI surveillance analysis"
                />
              </div>

              {/* Content Container - full width on mobile, 50% on desktop */}
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Access Control Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="min-h-44 flex justify-center items-center flex-col shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex mx-auto items-center gap-2 mb-2 ">
                      <MonitorCog className="h-4 w-4" />
                      <h2 className="text-gray-800 font-semibold text-sm">Easy Deployment</h2>
                    </div>
                    {/* <p className="text-gray-500 text-xs sm:text-sm">
                     Vigil AI deploys on any existing CCTV infrastructure within 15 mins, using our free hardware.
                    </p> */}
                  </motion.div>

                  {/* Perimeter Security Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="min-h-44  flex justify-center items-center flex-col shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex mx-auto items-center gap-2 mb-2">
                      <Cctv className="h-4 w-4" />
                      <h2 className="text-gray-800 font-semibold text-sm">Multi Camera Understanding</h2>
                    </div>
                    {/* <p className="text-gray-500 text-xs sm:text-sm">
                      All the cameras that you want, speak to each other live. Each camera know what others have seen.
                    </p> */}
                  </motion.div>

                  {/* Behavior Analysis Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="min-h-44 flex justify-center items-center flex-col shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex mx-auto items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      <h2 className="text-gray-800 font-semibold text-sm">Always Up To Date</h2>
                    </div>
                   
                    <HorizontalFlipCard 
                       title="Horizontal Flip"
                       content="This card flips horizontally on the Y-axis when you hover over it, creating a classic flip effect."
                       gradient="from-blue-500 to-cyan-400"
                       backGradient="from-blue-600 to-cyan-500"
                       icon="rotate-3d"
                    />

                    {/* <p className="text-gray-500 text-xs sm:text-sm">
                      You'll always have the latest version of our system at your service no matter when your purchased it, at no additional cost.
                    </p> */}
                  </motion.div>

                  {/* Object Detection Card */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="min-h-44 flex justify-center items-center flex-col shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex mx-auto items-center gap-2 mb-2">
                      <Box className="h-4 w-4" />
                      <h2 className="text-gray-800 font-semibold text-sm">Understand Subtle Nuance</h2>
                    </div>
                    {/* <p className="text-gray-500 text-xs sm:text-sm">
                      Vigil AI is specially designed to understand extreme nuances in movements, actions and incidents.
                    </p> */}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 w-full py-12"
          >
            {/* Main container - column on mobile (image forced to bottom), row on md+ */}

            
               <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
                  <span className="text-blue-800">•</span>
                  <span className="text-blue-800 font-semibold">Simple Setup</span>
                </div>

              <div className="flex gap-4 flex-col items-center text-center">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                 Connect Our Free Hardware
                </h1>
                <p className="max-w-2xl text-gray-600 text-sm">
                  We'll ship free hardware to you. Connect it to your private network alongside your existing NVR, and access advanced security analytics instantly. No complex installation required.
                </p>
              </div>

            

            <div className="flex flex-col md:flex-row w-full gap-8 py-12">
              {/* Content Container - comes first in DOM but visually stays on top */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div className="space-y-4">
                  {/* Step 1 */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <span className="flex items-center justify-center text-xs h-5 w-5 font-semibold">1</span>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold text-sm">Seamless Connection</h2>
                      <p className="text-gray-500 text-sm">
                        Simply plug our device into your network and power it on. It automatically starts working with your existing setup.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <span className="flex items-center justify-center text-xs h-5 w-5 font-semibold">2</span>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold text-sm">Automatic Camera Detection</h2>
                      <p className="text-gray-500 text-sm">
                        Our system automatically identifies and connects to your cameras.
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <span className="flex items-center justify-center text-xs h-5 w-5 font-semibold">3</span>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold text-sm">Instant Analytics Access</h2>
                      <p className="text-gray-500 text-sm">
                       Log in to our intuitive web portal to start monitoring your security analytics from anywhere, on any device.
                      </p>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                      <span className="flex items-center justify-center text-xs h-5 w-5 font-semibold">4</span>
                    </div>
                    <div>
                      <h2 className="text-gray-800 font-semibold text-sm">See the source, not just analysis</h2>
                      <p className="text-gray-500 text-sm">
                        Log in to our intuitive web portal to start monitoring your security analytics from anywhere, on any device.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Image Container - forced to bottom on mobile via margin-top auto */}
              <div className="w-full md:w-1/2 flex hover:translate-y-0.5 transition-all duration-300 mt-auto md:mt-0">
                <img
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  src="/connect.png"
                  alt="Connecting Vigil AI Hardware"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 sm:px-6 w-full py-12"
          >
            {/* Tagline */}

            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">Comprehensive Overview</span>
            </div>
            {/* <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded-full px-3 py-1 text-xs sm:text-sm">
              <span className="text-gray-800">•</span>
              <span className="text-gray-800 font-medium sm:font-semibold">Comprehensive Overview</span>
            </div> */}

            {/* Heading section */}
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                Intuitive Security <span className="text-[#1b3b5f]">Dashboard</span>
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
                Monitor your entire security operation from a single, user-friendly interface designed for maximum situational awareness.
              </p>
            </div>

            {/* Tab navigation - responsive with scroll on mobile */}
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

            {/* Dashboard image */}
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

        <div className="w-full bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 sm:px-6 w-full py-12 md:py-16"
          >
            {/* Tagline */}
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">Key Benefits</span>
            </div>
            {/* <div className="flex items-center space-x-2 bg-gray-100 w-fit rounded-full px-3 py-1 text-xs sm:text-sm">
              <span className="text-gray-800">•</span>
              <span className="text-gray-800 font-medium">Key Benefits</span>
            </div> */}

            {/* Heading section */}
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                 Privacy and Security at Heart.
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
                Trust stands supreme in the security domain. We know it and commit to the highest standards.
              </p>
            </div>

            {/* Features component container */}
            <div className="w-full mt-3 sm:mt-6">
              <Features />
            </div>
          </motion.div>
        </div>

        <div className="w-full bg-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 sm:px-6 w-full py-12 md:py-16"
          >
            {/* Tagline */}
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
              <span className="text-blue-800">•</span>
              <span className="text-blue-800 font-semibold">Get Started</span>
            </div>
            {/* <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded-full px-3 py-1 text-xs sm:text-sm">
              <span className="text-gray-800">•</span>
              <span className="text-gray-800 font-medium sm:font-semibold">Get Started</span>
            </div> */}

            {/* Heading section */}
            <div className="flex flex-col items-center text-center gap-4 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
                Ready to <span className="text-[#1b3b5f]">Upgrade</span> Your Security?
              </h1>
              <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
                Fill out the form below and our team will get in touch to schedule a personalized demo of our video surveillance solution.
              </p>
            </div>

            {/* Form container - responsive width with max constraints */}
            <div className="w-full max-w-2xl mt-6 sm:mt-8 px-2 sm:px-0">
              <UserQuery />
            </div>
          </motion.div>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Landing;



interface HorizontalFlipCardProps {
  title: string;
  content: string;
  gradient: string;
  backGradient: string;
  icon: string;
}

const HorizontalFlipCard: React.FC<HorizontalFlipCardProps> = ({
  title,
  content,
  gradient,
  backGradient,
  icon
}) => {
  return (
    <div className="flip-card h-72 perspective-1000 w-full">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-3d hover:rotate-y-180">
        {/* Front of card */}
        <div className={`flip-card-front absolute w-full h-full backface-hidden rounded-xl p-6 flex flex-col justify-between bg-gradient-to-br ${gradient} shadow-lg`}>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{title}</h3>
            <RotateCw className="text-white/70 h-6 w-6" />
          </div>
          <div className="mt-4">
            <p className="text-sm text-white/80">Hover to see effect</p>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`flip-card-back absolute w-full h-full backface-hidden rounded-xl p-6 bg-gradient-to-br ${backGradient} rotate-y-180 shadow-lg`}>
          <h3 className="text-xl font-bold mb-4">{title}</h3>
          <p className="text-white/90">{content}</p>
        </div>
      </div>
    </div>
  );
};


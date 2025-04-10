import React from 'react';
import { Database, Search, Cctv, Lock, MessageSquare, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from "@/lib/variants";

function FeatureCard({ icon: Icon, title, description, caption }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  caption: string 
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="mb-4">
        <Icon className="w-8 h-8 text-black" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-3">{description}</p>
      <p className="text-gray-500 text-sm italic">{caption}</p>
    </div>
  );
}

function Features() {  

   const features = [
    {
      icon: Database,
      title: "Store month of events in under 2GB storage",
      description: "Efficiently store a month's worth of event data without exceeding 2GB. Our smart compression and indexing ensure seamless access to historical records without compromising quality.",
      caption: "Save space without losing critical insights.",
    },
    {
      icon: Search,
      title: "Track severe events",
      description: "Get real-time alerts and insights on severe events. Our AI-powered detection system ensures you stay informed about critical situations as they unfold.",
      caption: "Never miss an important moment.",
    },
    {
      icon: Cctv,
      title: "Deploy on any IP camera",
      description: "Seamlessly integrate with any IP camera setup. No additional hardware required—just plug into your existing infrastructure and start monitoring immediately.",
      caption: "Compatible with your current setup.",
    },
    {
      icon: Lock,
      title: "Safe & Secure",
      description: "Your data is protected with enterprise-grade encryption, ensuring privacy and security from capture to storage.",
      caption: "Security you can trust.",
    },
    {
      icon: MessageSquare,
      title: "Chat with your video feeds",
      description: "Interact with your video footage using AI-powered chat. Search, analyze, and extract insights with simple queries.",
      caption: "Turn video into actionable intelligence.",
    },
    {
      icon: Sliders,
      title: "Set custom instructions",
      description: "Define specific rules and alerts tailored to your needs. Automate responses, notifications, and data filtering based on your unique requirements.",
      caption: "Control your system the way you want.",
    },
   ]

  return (
    <div className="max-w-5xl rounded bg-gray-100 py-12 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center px-4 mx-auto">
          Why add Vigil AI to your security needs.
        </p>
        <motion.div 
         variants={fadeIn('up', 0.2)}
         initial="hidden"
         whileInView="show"
         viewport={{ once: true, amount: 0.3 }}
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Features;
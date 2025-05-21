import React from 'react';
import { GlobeLock, SlidersHorizontal, Cpu, Lock, MessageSquare, EarthLock, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface IFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;

};

const features: IFeature[] = [
  {
    icon: GlobeLock,
    title: "End-to-End Encrypted",
    description: "The data at all times travel through encryped channels, inaccessible to anyone unwanted.",
  },
  {
    icon: SlidersHorizontal,
    title: "Multitier Access Control",
    description: "In many situations you want to allow only certain sections of your taskforce to access certain video feeds or evidence.",
  },
  {
    icon: Cpu,
    title: "In House Processing",
    description: "None of the video feeds goes to any third party organization. We deploy best industry standards while dealing with it.",
  },
  {
    icon: Lock,
    title: "Encrypt Facial Data.",
    description: "Organizations will have option to encrypt the facial data at start and decrypt it only in specific situations when deploying at certain scenarios.",
  },
  {
    icon: MessageSquare,
    title: "Immutable Chats",
    description: "Organziations can choose to keep the chat's immutable. This can be done to maintain vigilance over other members in the team to ensure the system is not being abused for wrongful purposes.",
  },
  {
    icon: EarthLock,
    title: "Your data is Yours",
    description: "We don't use your video feed data to improve our system without your permission. We understand the data we are dealing with might be extremely sensitive.",
  },
]

const FeatureCard: React.FC<IFeature> = ({ icon: Icon, title, description, className }) => {
  return (
    <div className={`bg-white rounded-lg option hover-underline-feature group ${className}`}>
      <div className='cursor-pointer text-sm  p-4 rounded-md'>
        <div className='flex gap-2 pb-4 items-center'>
          <div className="p-1 w-fit rounded bg-gray-300 group-hover:bg-[#1b3b5f]  flex border">
            <Icon className="w-4 h-4 text-black group-hover:text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{description}</p>
      </div>
    </div>
  );
}

const Features: React.FC = () => {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center max-w-7xl mx-auto items-center gap-6 px-4 sm:px-6 w-full py-12 md:py-16"
      >
        <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
          <span className="text-blue-800">•</span>
          <span className="text-blue-800 font-semibold">Key Benefits</span>
        </div>
        <div className="flex flex-col items-center text-center gap-4 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0">
            Privacy and Security at Heart.
          </h1>
          <p className="max-w-2xl text-gray-600 text-sm sm:text-base px-4 sm:px-0">
            Trust stands supreme in the security domain. We know it and commit to the highest standards.
          </p>
        </div>

        <div className="w-full mt-3 sm:mt-6">
          <section
            aria-labelledby="features-heading"
            className="max-w-6xl rounded-lg bg-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 mx-auto"
          >
            <div className="mx-auto w-full">
              {/* Responsive grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="h-full" // Add h-full here to ensure motion div takes full height
                  >
                    <FeatureCard
                      {...feature}
                      className="h-full transition-all duration-300 hover:shadow-md flex flex-col" // Add flex flex-col
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Box, Calendar, Cctv, MonitorCog } from "lucide-react";
import { RotateCw } from 'lucide-react';

const images = [
    {
        id: 0,
        image: "./deploy1.png",
        alt: "deploy1"
    },
    {
        id: 1,
        image: "./deploy2.png",
        alt:  "deploy2"
    }, 
    {
        id: 2,
        image: "./deploy3.png",
        alt:   "deploy3"
    },
    {
        id: 3,
        image: "./deploy4.png",
        name:  "deploy4"
    },
]

const cards = [
    {
        id: 0,
        icon: <MonitorCog className="h-4 w-4"/>,
        title: "Easy Deployment",
        description: "Vigil AI deploys on any existing CCTV infrastructure within 15 mins, using our free hardware."
    },
    {
        id: 1,
        icon: <Cctv className="h-4 w-4"/>,
        title: "Multi Camera Understanding",
        description: "All the cameras that you want, speak to each other live. Each camera know what others have seen."
    },
    {
        id: 2,
        icon: <Calendar className="h-4 w-4"/>,
        title: "Always Up To Date",
        description: "You'll always have the latest version of our system at your service no matter when your purchased it, at no additional cost."
    },
    {
        id: 3,
        icon: <Box className="h-4 w-4"/>,
        title: "Understand Subtle Nuance",
        description: "Vigil AI is specially designed to understand extreme nuances in movements, actions and incidents."
    }
]


const Deployment = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => {
            clearInterval(timer);
        }
    }, [])


    return (

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

                    <div className="rounded-lg overflow-hidden w-full max-w-xl mx-auto">
                        <div className="relative flex flex-col items-center justify-center aspect-[4/3] sm:aspect-video">
                            <div className="relative w-full h-full overflow-hidden">
                                {images.map((image) => {
                                    let positionClass = '';
                                    if (image.id === currentIndex) {
                                        positionClass = 'translate-x-0';
                                    } else if (image.id === (currentIndex + 1) % images.length) {
                                        positionClass = 'translate-x-full';
                                    } else if (image.id === (currentIndex - 1 + images.length) % images.length) {
                                        positionClass = '-translate-x-full';
                                    } else {
                                        positionClass = 'translate-x-full';
                                    }

                                    return (
                                        <div
                                            key={image.id}
                                            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${image.id === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                } ${positionClass}`}
                                        >
                                            <img
                                                src={image.image}
                                                alt={image.alt}
                                                className="w-full h-full rounded"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="absolute bottom-2 flex gap-2 z-10">
                                {images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`h-2 rounded-full transition-all duration-500 ${currentIndex == image.id ? "w-6 bg-gray-400" : "w-2 bg-gray-300"
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Content Container - full width on mobile, 50% on desktop */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
                        <div className="grid justify-between items-center  grid-cols-1 sm:grid-cols-2 gap-4">
                            {
                                cards.map((card)=>{
                                    return(
                                    <motion.div
                                        key={card.id}
                                        className="min-h-36 flex justify-center items-center flex-col shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer"
                                    >
                                        <div className="flex mx-auto items-center gap-2 mb-2 ">
                                            {card.icon}
                                            <h2 className="text-gray-800 font-semibold text-sm">{card.title}</h2>
                                        </div>
                                        {/* <p className="text-gray-500 text-xs sm:text-sm">
                                            {card.description}
                                        </p> */}
                                    </motion.div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

    )
}

export default Deployment;

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
  
  
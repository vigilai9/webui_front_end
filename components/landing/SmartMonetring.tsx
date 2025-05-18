import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Check, Clock5 } from "lucide-react";

const images = [
    {
        id: 0,
        image: "./30secreporting.png",
        alt: "image1"
    },
    {
        id: 1,
        image: "./timestamppedreport.png",
        alt: "image1"
    },
]

const contents = [
    {
        id: 0,
        icon: <Check className="h-4 w-4 " />,
        title: "Under 30 Sec, Human Level Reporting",
        description: "Receive alerts within 30 sec of any common and custom incidents. Theft, Regulation Compliance, Tracking People/Vehicles among others."
    },
    {
        id: 1,
        icon: <Clock5 className="h-4 w-4 " />,
        title: "Timestamped Threat Reports",
        description: "Easily jump to the part of the footage, mentioned in the alert and see the incident for yourself!"
    }
]

const SmartMonetring = () => {

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
                className="flex flex-col justify-center max-w-6xl mx-auto items-center gap-6 px-4 w-full py-12 "
            >
                {/* Tagline */}
                <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm">
                    <span className="text-blue-800">•</span>
                    <span className="text-blue-800 font-semibold">Smart Monitoring</span>
                </div>

                <div className="flex gap-4 flex-col items-center text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
                        No Incident Goes Unreported
                    </h1>
                    <p className="max-w-2xl text-gray-600 text-sm">
                        Vigil AI deploys 30 layer processing, to ensure no relevant incident goes unreported with unparallelled accuracy and speed.
                    </p>
                </div>

                <div className="flex flex-col justify-between items-between lg:flex-row w-full gap-8 py-12">
                  
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
                            <div className="absolute bottom-2 flex gap-2 z-[999]">
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

                    <div className="w-full lg:w-1/2 flex flex-col justify-center  gap-6">
                        <div className="space-y-3">
                            {
                                contents.map((content) => {
                                    return (
                                        <motion.div
                                            key={content.id}
                                            whileHover={{ y: -2 }}
                                            className="flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 bg-white cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group"
                                        >
                                            <div className="p-1 bg-gray-200 rounded group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                                                {content.icon}
                                            </div>
                                            <div>
                                                <h2 className="text-gray-800 font-semibold ">{content.title}</h2>
                                                <p className="text-gray-500 text-sm pt-2">
                                                    {content.description}
                                                </p>
                                            </div>
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

export default SmartMonetring;
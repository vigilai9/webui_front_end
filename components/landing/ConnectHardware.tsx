import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const images = [
    {
        id: 0,
        image: "./connet_free_hardware1.png",
        alt: "connet_free_hardware1"
    },
    {
        id: 1,
        image: "./connet_free_hardware2.png",
        alt: "connet_free_hardware2"
    },
    {
        id: 2,
        image: "./connet_free_hardware3.png",
        alt: "connet_free_hardware3"
    },
    {
        id: 3,
        image: "./connet_free_hardware3.png",
        alt: "connet_free_hardware4"
    }
]

const contents = [
    {
        id: 0,
        title: "Seamless Connection",
        description: "Simply plug our device into your network and power it on. It automatically starts working with your existing setup.",
    },
    {
        id: 1,
        title: "Automatic Camera Detection",
        description: "Our system automatically identifies and connects to your cameras.",
    },
    {
        id: 2,
        title: "Instant Analytics Access",
        description: "Log in to our intuitive web portal to start monitoring your security analytics from anywhere, on any device.",
    },
    {
        id: 3,
        title: "See the source, not just analysis",
        description: "Log in to our intuitive web portal to start monitoring your security analytics from anywhere, on any device.",
    }
]

const ConnectHardware = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000);
            return () => {
                clearInterval(timer);
            }
        }
    }, [isHovered])

    return (

        <div className="w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center max-w-7xl mx-auto items-center gap-6 px-4 w-full py-12"
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
                        <div className="space-y-3">
                            {
                                contents.map((content) => {
                                    return (
                                        <motion.div
                                            key={content.id}
                                            whileHover={{ y: -2 }}
                                            onClick={() => setCurrentIndex(content.id)}
                                            className={` flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 ${currentIndex === content.id ? "bg-gray-200" : "bg-white"} cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group`}
                                        >
                                            <div className="p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1">
                                                <span className="flex items-center justify-center text-xs h-5 w-5 font-semibold">{content.id + 1}</span>
                                            </div>
                                            <div>
                                                <h2 className="text-gray-800 font-semibold text-sm">{content.title}</h2>
                                                <p className="text-gray-500 text-sm">
                                                    {content.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* Image Container - centered on y-axis and matching height */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                        <div className="rounded-lg overflow-hidden w-full max-w-xl">
                            <div className="relative flex flex-col items-center justify-center aspect-[4/3] sm:aspect-video">
                                <div
                                    className="relative w-full h-full overflow-hidden"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
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
                                                    alt="AI surveillance technology"
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
                                            className={`h-2 rounded-full transition-all duration-500 ${currentIndex === image.id ? "w-6 bg-gray-400" : "w-2 bg-gray-300"
                                                }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    )
}

export default ConnectHardware;
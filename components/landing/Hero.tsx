import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from "next/link";
import React, { useEffect, useState } from 'react';

const images = [
  {
    id: 0,
    image: "./1.png",
    alt: "image1"
  },
  {
    id: 1,
    image: "./2.png",
    alt: "image2"
  },
  {
    id: 2,
    image: "./3.png",
    alt: "image3"
  }
]
const words = ["Multi-Camera Tracking", "Timestamped Reporting", "Video Forensics", "Camera Scaling"];

const Hero = () => {

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isDeleting && visibleLetters < words[currentWordIndex].length) {
      const typingSpeed = 100 + Math.random() * 100;

      timeout = setTimeout(() => {
        setVisibleLetters(prev => prev + 1);
      }, typingSpeed);
    }
    else if (!isDeleting && visibleLetters === words[currentWordIndex].length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 500);
    }

    else if (isDeleting && visibleLetters > 0) {
      timeout = setTimeout(() => {
        setVisibleLetters(prev => prev - 1);
      }, 80);
    }

    else if (isDeleting && visibleLetters === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [currentWordIndex, visibleLetters, isDeleting]);

  const currentWord = words[currentWordIndex];
  const visibleText = currentWord.substring(0, visibleLetters);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.25,
        type: 'spring',
        damping: 10,
        stiffness: 100,
      }}
      className="flex flex-col justify-between max-w-7xl items-center gap-6 px-4 w-full py-2 pt-20 md:pt-28 pb-12 mx-auto"
    >
      <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-4 py-1 mb-4 text-sm self-start lg:self-center">
        <span className="text-blue-800">•</span>
        <span className="text-blue-800 font-semibold">AI-Powered Video Surveillance</span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full py-2">
        <div className="flex-1 space-y-6 text-left w-full">
          <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold text-gray-900 leading-tight">
            Intelligent <br />
            <span className="text-[#1b3b5f] text-3xl sm:text-4xl md:text-4xl">{visibleText}</span>
            {/* <span className="inline-block w-1 h-12 bg-[#1b3b5f] ml-1 animate-pulse"></span> */}
            <span className="inline-block w-1 h-6 bg-[#1b3b5f] ml-1 align-middle animate-pulse" />
          </h1>

          <p className="text-gray-500 text-sm max-w-xl">
            Detect incidents in under 30 seconds with gen AI powered video surveillance that transforms how you monitor and secure your environment. Get Instant alerts and comprehensive anlaytics for complete security awareness.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size={'sm'} variant={'outline'} asChild className="rounded bg-[#1b3b5f] hover:bg-[#1b3b5f] hover:text-white hover:translate-y-0.5 transition-all duration-300 text-white">
              <Link href={'/login'}>
                Coming Soon
              </Link>
            </Button>
            <Button size={'sm'} variant={'outline'} asChild className="rounded bg-white hover:translate-y-0.5 transition-all duration-300">
              <Link href={'/login'}>
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-xl mx-auto">
          <div className="relative flex flex-col items-center justify-center aspect-[4/3] sm:aspect-video">
            <div className="relative w-full h-full overflow-hidden"
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
          
          <div className='flex justify-between shadow-md rounded-lg  items-center py-2 gap-4'>
            <button className='w-full rounded py-2 bg-gray-200'>Without VigilAI</button>
            <button className='w-full rounded py-2 bg-gray-200'>With VigilAI</button>
          </div>

        </div>

      </div>
    </motion.div>
  )
}

export default Hero;
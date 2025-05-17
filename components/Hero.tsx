import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from "next/link";
import { useEffect, useState } from 'react';

const Hero = () => {


    const words = ["Multi-Camera Tracking", "Timestamped Reporting" , "Video Forensics" , "Camera Scaling"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [visibleLetters, setVisibleLetters] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
      let timeout;
      
      // Typing effect
      if (!isDeleting && visibleLetters < words[currentWordIndex].length) {
        // Random typing speed between 100-200ms for realistic effect
        const typingSpeed = 100 + Math.random() * 100;
        
        timeout = setTimeout(() => {
          setVisibleLetters(prev => prev + 1);
        }, typingSpeed);
      }
      // Pause at the end of typing a word
      else if (!isDeleting && visibleLetters === words[currentWordIndex].length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 500); // Pause for 1 second at the end of the word
      }
      // Deleting effect
      else if (isDeleting && visibleLetters > 0) {
        // Delete a bit faster than typing
        timeout = setTimeout(() => {
          setVisibleLetters(prev => prev - 1);
        }, 80);
      }
      // Word is completely deleted, move to next word
      else if (isDeleting && visibleLetters === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length); // Loop through words
      }
      
      return () => clearTimeout(timeout);
    }, [currentWordIndex, visibleLetters, isDeleting]);
    
    const currentWord = words[currentWordIndex];
    const visibleText = currentWord.substring(0, visibleLetters);
  


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
            className="flex flex-col justify-between max-w-6xl items-center gap-6 px-4 w-full py-2 pt-20 md:pt-28 pb-12 mx-auto"
        >
            {/* Tagline - stays at top on all screens */}
            <div className="flex items-center space-x-2 bg-gray-200 w-fit rounded px-4 py-1 text-sm self-start lg:self-center">
                <span className="text-blue-800">•</span>
                <span className="text-blue-800 font-semibold">AI-Powered Video Surveillance</span>
            </div>

            {/* Main content - column on mobile, row on lg+ */}
            <div className="flex flex-col lg:flex-row justify-between gap-8 w-full py-2">
                {/* Text content - comes first naturally in DOM order */}
                <div className="flex-1 space-y-6 text-left w-full">
                    <h1 className="text-4xl sm:text-5xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Intelligent <br/>
                        <span className="text-[#1b3b5f] text-3xl sm:text-4xl md:text-4xl">{visibleText}</span>
                        <span className="inline-block w-1 h-12 bg-[#1b3b5f] ml-1 animate-pulse"></span>
                    </h1>

                    <p className="text-gray-500 text-sm max-w-xl">
                      Detect incidents in under 30 seconds with gen AI powered video surveillance that transforms how you monitor and secure your environment. Get Instant alerts and comprehensive anlaytics for complete security awareness.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size={'sm'} variant={'outline'} asChild className="rounded bg-[#1b3b5f] hover:bg-[#1b3b5f] hover:text-white hover:translate-y-0.5 transition-all duration-300 text-white">
                            <Link href={'/login'}>
                                Try VigilAI Free
                            </Link>
                        </Button>
                        <Button size={'sm'} variant={'outline'} asChild className="rounded hover:translate-y-0.5 transition-all duration-300">
                            <Link href={'/login'}>
                                Watch Demo
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Image content - comes after text on mobile, moves to side on lg+ */}
                <div className="flex justify-center p-4 bg-gray-200 rounded hover:translate-y-1 transition-all duration-300 w-full lg:w-auto">
                    <div className="rounded-lg overflow-hidden shadow-lg bg-gray-300 p-2 w-full max-w-md lg:max-w-xl">
                        <div className="relative flex items-center justify-center">
                            <img
                                src="https://media.istockphoto.com/id/1387900612/photo/automation-data-analytic-with-robot-and-digital-visualization-for-big-data-scientist.jpg?s=1024x1024&w=is&k=20&c=BdevKMKtOgXoPwbZE9v_PU_q94-G5LgboedYsvyKP-g="
                                alt="AI surveillance technology"
                                className="h-auto object-cover rounded w-[80%]"
                            />
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Hero;
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Calendar, Cctv, MonitorCog } from 'lucide-react'

const images = [
  {
    id: 0,
    image: './deploy1.png',
    alt: 'deploy1',
  },
  {
    id: 1,
    image: './deploy2.png',
    alt: 'deploy2',
  },
  {
    id: 2,
    image: './deploy3.png',
    alt: 'deploy3',
  },
  {
    id: 3,
    image: './deploy4.png',
    name: 'deploy4',
  },
]

const cards = [
  {
    id: 0,
    icon: <MonitorCog className='h-4 w-4' />,
    title: 'Easy Deployment',
    description:
      'Vigil AI deploys on any existing CCTV infrastructure within 15 mins, using our free hardware.',
  },
  {
    id: 1,
    icon: <Cctv className='h-4 w-4' />,
    title: 'Multi Camera Understanding',
    description:
      'All the cameras that you want, speak to each other live. Each camera knows what others have seen.',
  },
  {
    id: 2,
    icon: <Calendar className='h-4 w-4' />,
    title: 'Always Up To Date',
    description:
      "You'll always have the latest version of our system at your service no matter when your purchased it, at no additional cost.",
  },
  {
    id: 3,
    icon: <Box className='h-4 w-4' />,
    title: 'Understand Nuanced Situations',
    description:
      'Vigil AI is specially designed to understand extreme nuances in movements, actions and incidents.',
  },
]

const Deployment = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [flippedCard, setFlippedCard] = useState(null)

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 4000)
      return () => {
        clearInterval(timer)
      }
    }
  }, [isHovered])

  return (
    <div className='w-full max-w-7xl lg:px-0 md:px-2 sm:px-2 px-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-center mx-auto items-center gap-6 py-8 md:py-12'
      >
        {/* Tagline */}
        <div className='flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm'>
          <span className='text-blue-800'>•</span>
          <span className='text-blue-800 font-semibold'>
            Digital Intelligence
          </span>
        </div>

        {/* Heading section */}
        <div className='flex gap-4 flex-col items-center text-center px-2'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
            We Understand Your Need
          </h1>
          <p className='max-w-2xl text-gray-600 text-sm md:text-base'>
            Query your cameras with Generative AI—it's seen all, remembers all,
            and serves as your Live Witness.
          </p>
        </div>

        {/* Image and content container */}
        <div className='flex flex-col md:flex-row w-full gap-8'>
          {/* Image Container - centered on mobile, left-aligned on desktop */}
          <div className='w-full md:w-1/2 flex items-center justify-center md:justify-start'>
            <div className='rounded-lg overflow-hidden w-full max-w-xl'>
              <div className='relative flex flex-col items-center justify-center aspect-[4/3] sm:aspect-video'>
                <div
                  className='relative w-full h-full overflow-hidden'
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {images.map((image) => {
                    let positionClass = ''
                    if (image.id === currentIndex) {
                      positionClass = 'translate-x-0'
                    } else if (
                      image.id ===
                      (currentIndex + 1) % images.length
                    ) {
                      positionClass = 'translate-x-full'
                    } else if (
                      image.id ===
                      (currentIndex - 1 + images.length) % images.length
                    ) {
                      positionClass = '-translate-x-full'
                    } else {
                      positionClass = 'translate-x-full'
                    }

                    return (
                      <div
                        key={image.id}
                        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
                          image.id === currentIndex
                            ? 'opacity-100 z-10'
                            : 'opacity-0 z-0'
                        } ${positionClass}`}
                      >
                        <img
                          src={image.image}
                          alt={image.alt}
                          className='w-full h-full rounded'
                        />
                      </div>
                    )
                  })}
                </div>
                <div className='absolute bottom-2 flex gap-2 z-[999]'>
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        currentIndex === image.id
                          ? 'w-6 bg-gray-400'
                          : 'w-2 bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards Container */}
          <div className='w-full md:w-1/2 flex flex-col justify-center gap-4 md:gap-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className='min-h-36 h-36'
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setCurrentIndex(card.id)}
                >
                  <div className='relative w-full h-full group perspective-1000'>
                    <div className='relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180'>
                      {/* Front Side */}
                      <div
                        className={`absolute h-full w-full inset-0 flex flex-col justify-center items-center p-4 shadow-md border border-gray-100 rounded-lg backface-hidden ${currentIndex == card.id ? 'bg-gray-200' : 'bg-white'}`}
                      >
                        <div className='flex items-center gap-2 mb-2'>
                          {card.icon}
                          <h2 className='text-gray-800 font-semibold text-sm md:text-base'>
                            {card.title}
                          </h2>
                        </div>
                      </div>

                      {/* Back Side */}
                      <div
                        className={`absolute h-full w-full inset-0 flex flex-col justify-center items-center p-4 rounded-lg shadow-md border border-gray-200 backface-hidden rotate-y-180 ${currentIndex == card.id ? 'bg-gray-200' : 'bg-white'}`}
                      >
                        <p className='text-gray-500 text-xs md:text-sm text-center'>
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Deployment

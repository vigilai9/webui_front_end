import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock5 } from 'lucide-react'

const images = [
  {
    id: 0,
    image: './30secreporting.png',
    alt: 'image1',
  },
  {
    id: 1,
    image: './timestamppedreport.png',
    alt: 'image1',
  },
]

const contents = [
  {
    id: 0,
    icon: <Check className='h-4 w-4 ' />,
    title: 'Under 30 Sec, Human Level Reporting',
    description:
      'Get alerts within 30 sec for common & custom incidents—theft, regulatory compliance, people/vehicle tracking, and more.',
  },
  {
    id: 1,
    icon: <Clock5 className='h-4 w-4 ' />,
    title: 'Timestamped Threat Reports',
    description:
      'Instantly jump to the alerted segments and review the incident yourself!',
  },
]

const SmartMonetring = ({ id }: { id: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

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
    <div id={id} className='w-full max-w-7xl lg:px-0 md:px-2 sm:px-2 px-2'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-center mx-auto items-center gap-6 py-8 md:py-12'
      >
        {/* Tagline */}
        <div className='flex items-center space-x-2 bg-gray-200 w-fit rounded px-2 py-1 text-sm'>
          <span className='text-blue-800'>•</span>
          <span className='text-blue-800 font-semibold'>Smart Monitoring</span>
        </div>

        <div className='flex gap-4 flex-col items-center text-center px-2'>
          <h1 className='text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 leading-tight'>
            No Incident Goes Unreported
          </h1>
          <p className='max-w-2xl text-gray-600 text-sm md:text-base'>
            Vigil AI deploys 30 step processing, to ensure no relevant incident
            goes unreported with unparalleled accuracy and speed.
          </p>
        </div>

        <div className='flex flex-col md:flex-row w-full gap-8'>
          {/* Image Container - centered on mobile, justify-start on desktop */}
          <div className='w-full md:w-1/2 flex justify-center md:justify-start'>
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
                          alt='AI surveillance technology'
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

          {/* Content Container - comes first in DOM but visually stays on top */}
          <div className='w-full md:w-1/2 flex items-center justify-center flex-col gap-6'>
            <div className='space-y-3'>
              {contents.map((content) => {
                return (
                  <motion.div
                    key={content.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setCurrentIndex(content.id)}
                    className={` flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 ${currentIndex === content.id ? 'bg-gray-200' : 'bg-white'} cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group`}
                  >
                    <div className='p-1 bg-gray-200 rounded group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1'>
                      {content.icon}
                    </div>

                    <div>
                      <h2 className='text-gray-800 font-semibold text-sm'>
                        {content.title}
                      </h2>
                      <p className='text-gray-500 text-sm'>
                        {content.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SmartMonetring

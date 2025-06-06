import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const images = [
  {
    id: 0,
    image: './connet_free_hardware1.png',
    alt: 'connet_free_hardware1',
  },
  {
    id: 1,
    image: './connet_free_hardware2.png',
    alt: 'connet_free_hardware2',
  },
  {
    id: 2,
    image: './connet_free_hardware4.png',
    alt: 'connet_free_hardware3',
  },
  {
    id: 3,
    image: './connet_free_hardware3.png',
    alt: 'connet_free_hardware4',
  },
]

const contents = [
  {
    id: 0,
    title: 'Seamless Connection',
    description:
      'Simply plug our device into your network and power it on. It automatically starts working with your existing setup.',
  },
  {
    id: 1,
    title: 'Automatic Camera Detection',
    description:
      'Our system automatically identifies and connects to your cameras.',
  },
  {
    id: 2,
    title: 'Instant Analytics Access',
    description:
      'Unlock instance analytics access for real-time insights on every event.',
  },
  {
    id: 3,
    title: 'See the source, not just analysis',
    description:
      'Our timestamp and source cited analysis gives easy access and navigation to the original material for maximum credibility.',
  },
]

const ConnectHardware = ({ id }: { id: string }) => {
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
          <span className='text-blue-800 font-semibold'>Simple Setup</span>
        </div>

        {/* Heading section */}
        <div className='flex gap-4 flex-col items-center text-center px-2'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight'>
            Connect Our Free Hardware
          </h1>
          <p className='max-w-2xl text-gray-600 text-sm md:text-base'>
            Get free hardware shipped to you—plug into your network & existing
            NVR and unlock advanced security analytics instantly with no complex
            installation!
          </p>
        </div>

        {/* Main content container */}
        <div className='flex flex-col md:flex-row w-full gap-8'>
          {/* Content Container - comes first in DOM */}
          <div className='w-full md:w-1/2 flex flex-col justify-center gap-4 md:gap-6'>
            <div className='space-y-3'>
              {contents.map((content) => (
                <motion.div
                  key={content.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setCurrentIndex(content.id)}
                  className={`flex items-start gap-4 shadow-md rounded-lg px-4 py-3 border border-gray-200 ${
                    currentIndex === content.id ? 'bg-gray-200' : 'bg-white'
                  } cursor-pointer hover:translate-y-1 hover:shadow-lg transition-all duration-300 group w-full`}
                >
                  <div className='p-2 bg-gray-200 rounded-full group-hover:bg-[#1b3b5f] group-hover:text-white transition-all duration-300 mt-1 flex-shrink-0'>
                    <span className='flex items-center justify-center text-xs h-5 w-5 font-semibold'>
                      {content.id + 1}
                    </span>
                  </div>
                  <div>
                    <h2 className='text-gray-800 font-semibold text-sm md:text-base'>
                      {content.title}
                    </h2>
                    <p className='text-gray-500 text-xs md:text-sm'>
                      {content.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Container - centered on mobile, right-aligned on desktop */}
          <div className='w-full md:w-1/2 flex items-center justify-center lg:justify-end'>
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
        </div>
      </motion.div>
    </div>
  )
}

export default ConnectHardware
4

'use client'
import React, { useEffect, useState } from 'react'

const OfflineNotification = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    setIsOffline(!window.navigator.onLine)

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (!isMounted) return null
  if (!isOffline) return null

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center space-y-4 bg-white dark:bg-[#020817] z-1000'>
      <div className='flex flex-col items-center space-y-4 p-6 rounded-lg'>
        <div className='flex items-center gap-2'>
          <a
            href='/'
            className='font-bold bg-gradient-to-r from-[#1b3b5f] to-[#1b3b5f] bg-clip-text text-transparent'
          >
            VigilAI by S3cura
          </a>
        </div>
        <h2 className='text-xl font-semibold text-black dark:text-white'>
          You are offline
        </h2>
        <p className='text-neutral-500 dark:text-neutral-200 text-center'>
          Please check your internet connection
        </p>
      </div>
    </div>
  )
}

export default OfflineNotification

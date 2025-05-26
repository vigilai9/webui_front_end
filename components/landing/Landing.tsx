'use client'
import { useRouter } from 'next/navigation'
import Footer from '@/components/landing/Footer'
import TrustedBy from '@/components/landing/TrustedBy'
import UserQuery from '@/components/landing/UserQuery'
import Features from '@/components/landing/Features'
import {
  Activity,
  Bell,
  Box,
  Calendar,
  Cctv,
  Check,
  Clock5,
  Columns2,
  File,
  Lock,
  MonitorCog,
  Users,
} from 'lucide-react'
import Hero from './Hero'

import SmartMonetring from './SmartMonetring'
import ConnectHardware from './ConnectHardware'
import Deployment from './Deployment'
import SecurityDashboard from './SecurityDashboard'

import { useRef } from 'react'

const Landing = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex h-full flex-col items-center justify-center'>
        <Hero />
        <TrustedBy />
        <SmartMonetring id='features' />
        <Deployment />
        <ConnectHardware id='connecthardware' />
        <SecurityDashboard id='dashboard' />
        <Features id='security' />
        <UserQuery id='contact' />
        <Footer />
      </main>
    </div>
  )
}

export default Landing

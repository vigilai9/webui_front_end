"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { fadeIn } from "@/lib/variants";
import { ChangeEvent, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import UserQuery from "@/components/UserQuery";
import Features from "@/components/Features";


const Landing=()=> {
 
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const handleTryVigil = (): void => {
    if (!authLoading && !currentUser) {
      router.push("/login");
      return;
    }
    router.push("/");
    return;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex h-full flex-col items-center justify-center gap-4">

        {/* hero section */}
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
          className="flex max-w-5xl flex-col items-center justify-center gap-2 px-4 w-full"
        >
          <h1 className="max-w-4xl py-2 pt-24 md:pt-36 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            Under <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 animate-gradient text-transparent bg-clip-text">30-Sec</span><span className="text-amber-400 animate-comma font-serif">,</span><br />
            <span className="py-1">
              Human Level Reporting
            </span>
          </h1>
          <p className="my-8 md:my-12 text-gray-500 text-base md:text-lg tracking-tight px-4 md:px-8 lg:px-30 mx-auto text-center max-w-2xl">
            Protect and stay ahead of risks, with the ultimate tool for anomaly
            detection. Launching soon for complete peace of mind!
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="flex items-center justify-center"
        >
          <Button onClick={() => handleTryVigil()} size={'lg'} asChild variant={'default'} className="rounded">
            <Link href={'/login'}>
              Try VigilAI!
            </Link>
          </Button>
        </motion.div>

        <motion.div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.75,
              type: 'spring',
              damping: 10,
              stiffness: 100,
            }}
            className="flex justify-center mt-16 md:mt-20"
          >
             <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center px-4 mx-auto">
              Your Personalized AI Research Assistant
            </p>
          </motion.div>

          {/* How It Works Section */}
          <div className="my-16 md:my-20 space-y-16 md:space-y-24 ">
            {/* Step 1 */}
            <motion.div
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <img src="/dvr.png" width={50} className="mb-4" alt="DVR Hardware Icon" />
                <p className="font-medium text-xl md:text-2xl mb-3">Connect our free hardware</p>
                <p className="text-gray-500 text-base md:text-lg tracking-tight mx-auto">
                    We'll ship free hardware. Connect it to the same private network
                    as your NVR and login to Vigil AI's web portal.
                </p>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
                <img
                  className="rounded-xl shadow-md w-full"
                  src="/connect.png"
                  alt="Connecting Vigil AI Hardware"
                />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-1">
                <img
                  className="rounded-xl shadow-md w-full"
                  src="/setup.png"
                  alt="Vigil AI Setup Screen"
                />
              </div>
              <div className="w-full md:w-1/2 order-2">
                <img src="/setup_icon.png" width={40} className="mb-4" alt="Setup Icon" />
                <p className="font-medium text-xl md:text-2xl mb-3">Setup in 10 min</p>
                <p className="text-gray-500 text-base md:text-lg tracking-tight mx-auto">
                Setup the different cameras and camera location detail along
                with deployment presets or customized settings.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <img src="/fast.png" width={50} className="mb-4" alt="Speed Icon" />
                <p className="font-medium text-xl md:text-2xl mb-3">Experience Live Witness</p>
                <p className="text-gray-500 text-base md:text-lg tracking-tight mx-auto">
                  Vigil AI's gen AI powered surveillance system will give under 30
                  sec analysis on simple and complex anomalies such as theft,
                  organised crime, violent crimes and more.
                </p>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 mb-8 md:mb-0">
                <img
                  className="rounded-xl shadow-md w-full"
                  src="/experience.png"
                  alt="Vigil AI Live Analysis Example"
                />
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16"
            >
              <div className="w-full md:w-1/2 order-1">
                <img
                  className="rounded-xl shadow-md w-full"
                  src="/see.png"
                  alt="Source Verification Example"
                />
              </div>
              <div className="w-full md:w-1/2 order-2">
                <img src="/source.png" width={40} className="mb-4" alt="Source Document Icon" />
                <p className="font-medium text-xl md:text-2xl mb-3">See the source, not just analysis</p>
                <p className="text-gray-500 text-base md:text-lg tracking-tight mx-auto">
                  Our timestamp and source cited analysis gives easy access and
                  navigation to the original material for maximum credibility.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Privacy Section */}
        <motion.div className="bg-gray-100 mx-auto flex w-full justify-center items-center py-8 md:py-8 lg:py-12 px-4">
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
            className="flex max-w-5xl flex-col items-center justify-center gap-2 px-4 w-full"
          >
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold text-center px-2 md:px-20 lg:px-44 mx-auto">
              We value your privacy and do not use your personal data to train Vigil AI.
            </p>

            <p className="my-8 md:my-12 text-gray-500 text-center text-base md:text-lg tracking-tight px-4 md:px-8 lg:px-44 mx-auto">
              Not only that, the facial data of individuals in the video is jumbled at the start and is not part of the decision making process.
            </p>
            <motion.div
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative mt-10"
            >
              <img
                src="/privacy-tornado.png"
                className="block mx-auto w-full max-w-[500px]"
                alt="Privacy Visualization"
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-1/5">
                <img src="/lock.png" width={80} alt="Lock Icon" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <Features/>
        <TrustedBy />
        <UserQuery />
        <Footer />
      </main>
    </div>
  );
}

export default Landing;
"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { signOut } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      router.push("/home");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`z-50 w-full transition-all duration-500 ${hasScrolled
        ? 'fixed top-2 px-2'
        : 'fixed top-0 left-0 right-0'
        }`}
    >
      <div className={`transition-all duration-500 ${hasScrolled
         ? 'max-w-4xl mx-auto border border-gray-200 rounded-lg px-4 py-4 backdrop-blur-3xl'
          : 'w-full max-w-7xl mx-auto px-12 py-6 shadow-none bg-transparent'
        }`}>
        <div className="flex w-full items-center justify-between">
          {/* Rest of your navbar content remains exactly the same */}
          {/* Logo/Brand */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-4"
          >
          <div className="flex items-center">
              <img width={100} src="/secura_logo.png" alt="VigilAI Logo" />
            </div>
          </motion.div>

          {/* Desktop Navigation (hidden on mobile) */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            className="hidden md:flex items-center gap-4"
          >
            <ul className="flex items-center gap-6 lg:gap-8 text-gray-500">
              <li className="cursor-pointer text-sm option hover-underline">
                 Features
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                How It Works
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Dashboard
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Security
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Contact Us
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
            </ul>
          </motion.div>

          {/* Mobile Menu Button (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Buttons (hidden on mobile) */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            className="hidden md:flex items-center gap-4"
          >
            {pathName === "/" && (
              <motion.div className="flex items-center justify-center">
                <Button onClick={handleSignOut} size={'sm'} variant={'outline'} className="rounded cursor-pointer">
                  Logout
                </Button>
              </motion.div>
            )}

            {pathName === "/home" && (
              <motion.div className="flex items-center justify-center gap-2">
                <Button size={'sm'} variant={'outline'} asChild className="rounded bg-white hover:translate-y-0.5 transition-all duration-300 py-4">
                  <Link href={'/login'}>
                    Sign In
                  </Link>
                </Button>
                <Button size={'sm'} variant={'outline'} asChild className="rounded bg-[#1b3b5f] hover:bg-[#1b3b5f] hover:text-white hover:translate-y-0.5 transition-all duration-300 text-white py-4">
                  <Link href={'/login'}>
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu (hidden by default) */}
        {isMobileMenuOpen && (
          <div className={`md:hidden bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg ${hasScrolled ? 'rounded-b-lg' : ''
            }`}>
            <ul className="flex flex-col gap-1 text-gray-700">
            <li className="cursor-pointer text-sm option hover-underline">
                Features
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                How It Works
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Dashboard
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Security
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
              <li className="cursor-pointer text-sm option hover-underline">
                Contact Us
                <div className={`h-[2px] bg-gray-500 hidden`}></div>
              </li>
            </ul>

            <div className="mt-2 px-2 py-3 border-t border-gray-100">
              {pathName === "/" && (
                <Button
                  onClick={handleSignOut}
                  size={'sm'}
                  variant={'outline'}
                  className="w-full rounded cursor-pointer"
                >
                  Logout
                </Button>
              )}

              {pathName === "/home" && (
                <div className="flex flex-col gap-2">
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    asChild
                    className="w-full rounded hover:translate-y-0.5 transition-all duration-300"
                  >
                    <Link href={'/login'}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    asChild
                    className="w-full rounded bg-[#1b3b5f] hover:bg-[#1b3b5f] hover:text-white hover:translate-y-0.5 transition-all duration-300 text-white"
                  >
                    <Link href={'/login'}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
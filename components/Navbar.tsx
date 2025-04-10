// components/Navbar.js
"use client"
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        className="fixed top-0 z-[999] w-full shadow-md bg-white"
      >
        <div className="wrapper flex w-full items-center justify-between p-3">
          <motion.div
            initial="hidden"
            animate="visible"
            // variants={navItemVariants}
            custom={0}
            className="flex items-center gap-4"
          >
          <div className="flex items-center gap-2">
            <img className="w-10 h-10" src="/vai.png" alt="VigilAI Logo" />
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
                 VigilAI
            </a>
          </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial="hidden"
            animate="visible"
            // variants={navItemVariants}
            custom={1}
          >
          {pathName === "/" && (
            <button
              onClick={handleSignOut}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Out
            </button>
          )}
          </motion.div>
        </div>
      </motion.nav>
  );
}
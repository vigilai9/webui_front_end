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
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";


export default function Homepage() {
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
    <main>
       <Navbar/>
       <Landing/>
    </main>
  );
}
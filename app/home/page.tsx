"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';
import { fadeIn } from "@/lib/variants";
import { ChangeEvent, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import Footer from "@/components/landing/Footer";
import TrustedBy from "@/components/landing/TrustedBy";
import UserQuery from "@/components/landing/UserQuery";
import Features from "@/components/landing/Features";
import Navbar from "@/components/Navbar";
import Landing from "@/components/landing/Landing";


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
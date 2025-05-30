"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/landing/Footer";
import TrustedBy from "@/components/landing/TrustedBy";
import UserQuery from "@/components/landing/UserQuery";
import Features from "@/components/landing/Features";
import { Activity, Bell, Box, Calendar, Cctv, Check, Clock5, Columns2, File, Lock, MonitorCog, Users } from "lucide-react";
import Hero from "./Hero";

import SmartMonetring from "./SmartMonetring";
import ConnectHardware from "./ConnectHardware";
import Deployment from "./Deployment";
import SecurityDashboard from "./SecurityDashboard";


const Landing = () => {

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
      <main className="flex h-full flex-col items-center justify-center">
        <Hero />
        <TrustedBy/>
        <SmartMonetring/>
        <Deployment/>
        <ConnectHardware/>
        <SecurityDashboard/>
        <Features/>
        <UserQuery />
        <Footer />
      </main>
    </div>
  );
}

export default Landing;

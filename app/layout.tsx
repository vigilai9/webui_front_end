"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import OfflineNotification from "@/components/OfflineNavigator";

export default function RootLayout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OfflineNotification/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

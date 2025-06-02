'use client'
import './globals.css'
import OfflineNotification from '@/components/OfflineNavigator'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <OfflineNotification />
        {children}
      </body>
    </html>
  )
}

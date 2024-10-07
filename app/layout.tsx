import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WebSocketProvider } from "@/lib/websocket_context";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aimpower Zoom App',
  description: 'This is zoom app developed by Aimpower.org',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebSocketProvider>
          {children}
        </WebSocketProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dezprox ERP System',
  description:
    'Dezprox ERP System is a comprehensive and integrated system for managing all aspects of a business. It includes modules for managing customers, suppliers, inventory, sales, purchases, accounting, and payroll. The system is designed to be user-friendly and easy to use, and it is accessible from anywhere with an internet connection.',
  icons: {
    icon: [
      {
        url: '/dezproxlogo.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/dezproxlogo.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/dezproxlogo.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        url: '/dezproxlogo.png',
        sizes: '64x64',
        type: 'image/png'
      }
    ],
    apple: '/dezproxlogo.png',
    shortcut: '/dezproxlogo.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

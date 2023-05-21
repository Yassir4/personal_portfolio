import Navbar from '@/components/Navbar';
import './globals.css';
import React from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="md:mx-[20%] mx-7 px-8 bg-zinc-50 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

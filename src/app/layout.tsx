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
      <body className="mx-7 px-8 bg-zinc-50 min-h-screen flex justify-center ">
        <div className='bg-white ring-zinc-100  w-[60rem] lg:px-8 px-9 min-h-screen inset-0 flex flex-col justify-between'>
          <div className='w-full'>
            <Navbar />
            {children}
          </div>
          <div className='ml-14'>
            <div className='pb-8 mt-10 pt-10'>

              <div className='text-sm text-zinc-400 font-medium ml-auto'>
                © 2023 Yassir Hartani
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

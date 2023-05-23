'use client';
import React from 'react';
import { SOCIAL_ITEMS } from './Navbar';
import Link from 'next/link';

export interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className='my-20 w-full ml-10 md:ml-15'>
      <div className='w-[60%] sm:w-[90%] md:w-[70%]'>
        <h1 className="my:20 text-3xl font-bold tracking-tight text-zinc-800 sm:text-1xl">Hi, I’m Yassir.</h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">Front End Developer based in Morocco. I am passionate about creating high-quality web and mobile applications that meet the needs of clients and end-users. </p>
      </div>
      
      <div className='flex flex-row mt-10'>
        {SOCIAL_ITEMS.map((item, index) => (
          <Link href={item.link} key={index} className={`${index > 0 ? 'ml-5' : ''} rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300`}>
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Main;
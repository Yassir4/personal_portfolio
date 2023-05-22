'use client';
import React from 'react';
import { SOCIAL_ITEMS } from './Navbar';

export interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className='my-20 w-full ml-10 md:ml-15'>
      <div className='w-[60%] sm:w-[90%] md:w-[70%]'>
        <h1 className="my:20 text-3xl font-bold tracking-tight text-zinc-800 sm:text-1xl">Front End Developer, React/React Native.</h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">I’m Yassir, a Front End Developer based in Morocco. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.</p>
      </div>
      
      <div className='flex flex-row mt-10'>
        {SOCIAL_ITEMS.map((item, index) => (
          <div key={index} className={`${index > 0 ? 'ml-5' : ''} rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300`}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
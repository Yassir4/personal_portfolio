'use client';
import React, { useState } from 'react';
import { Link } from 'react-scroll/modules';
import { useTheme } from 'next-themes';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';


interface NavItem {
    label: string
    page: string
}

const NAV_ITEMS = [
  {
    label: 'Home',
    page: 'home',
  },
  {
    label: 'About',
    page: 'about',
  },
  {
    label: 'Projects',
    page: 'projects',
  },
  {
    label: 'Blogs',
    page: 'blogs',
  }
];
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <header className='fixed w-full h-20 shadow-xl border-b-gray-50'>
      <div className='flex justify-between items-center w-full h-full py-4 px-2 2xl:px16 flex-row'>
        <p>Yassir Hartani</p>
        <div>
          <ul className="hidden md:flex md:flex-row">
            {NAV_ITEMS.map((item, index) => (
              <Link href="/" key={index}>
                <li className='ml-10 text-sm hover:border-b'>{item.label}</li>
              </Link>
            ))}
          </ul>
          <div className='md:hidden cursor-pointer' onClick={() => setNavbar(!navbar)}>
            <AiOutlineMenu size={25}/>
          </div>
        </div>
      </div>
      <div className={navbar ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70' : ''}>
        <div className={navbar ? 'fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-300' : 'fixed left-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500'}>
          <div className='flex w-full items-center justify-between'>
            <p>Yassir Hartani</p>
            <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer' onClick={() => setNavbar(!navbar)}>
              <AiOutlineClose size={20}/>
            </div>
          </div>
          <div className='border-b border-gray-300 my-4'>
            <p>{'let\'s built something legendary together'}</p>
          </div>

          <div className='flex flex-col'>
            <ul>
              {NAV_ITEMS.map((item, index) => (
                <Link href="/" key={index}>
                  <li className='py-4 text-sm hover:border-b'>{item.label}</li>
                </Link>
              ))}
            </ul>
            <div className='mt-40'>
              <p className='text-color- '>{'Let\'s Connect'}</p>
              <div className='flex flex-row items-center justify-start my-4 w-full sm:w-[80%]'>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                  <FaLinkedinIn />
                </div>
                <div className='rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300 ml-5'>
                  <FaGithub />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
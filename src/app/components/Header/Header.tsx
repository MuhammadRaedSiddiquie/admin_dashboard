'use client'
import React, { useEffect, useState } from 'react'
import { FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
// import Dialogdemo from '../Dialogdemo/Dialogdemo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import useAuthStore from '@/app/stores/useAuthStore';
// import useCartStore from '@/app/stores/useCartStore';


function Header() {

  const [open, setOpen] = useState(false)
  // const { user } = useUser();
  const user='raed'
  const items=['1']
  const userId = user;
  // const { items } = useCartStore();
  // const { user } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

  const [cartSize, setCartSize] = useState(0)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  useEffect(() => {
    const updateCartSize = () => {
      const cartStored = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartSize(cartStored.length);
    };
    updateCartSize();
   


  }, [])


  if (!isHydrated) return null;
  return (
    <header className='w-[250px] h-screen flex px-2 py-4 flex-col gap-8 bg-[#e3e3e3] border-r-2 border-[#c3c3c3]'>

      <nav className='w-full h-[58px] bg-white flex items-center justify-between px-[30px] gap-[40px]'>
        <h1 className='text-[24px] montserrat-bolder text-primaryCol xxl:text-4xl'>SwiftCart</h1>
      </nav>
      <div className='w-full h-full flex flex-col gap-3 bg-[#e3e3e3]'>
        <label className='text-sm'>Overview</label>
        <ul className='flex-col items-center w-full border-t-2 border-[#c3c3c3]'>
          <li className='border-b-2 border-[#c3c3c3] flex items-center text-md justify-start w-full h-[50px]'>Overview</li>
          <li className='border-b-2 border-[#c3c3c3] flex items-center text-md justify-start w-full h-[50px]'>Products</li>
          <li className='border-b-2 border-[#c3c3c3] flex items-center text-md justify-start w-full h-[50px]'>Account</li>
          <li className='border-b-2 border-[#c3c3c3] flex items-center text-md justify-start w-full h-[50px]'>Settings</li>
        </ul>
      </div>
    </header>
  )
}
export default Header

import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='pt-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-32 text-sm'>

        {/* Brand Section */}
        <div>
            <img 
              src={assets.logo} 
              className='mb-6 w-32 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out' 
              alt="Logo" 
            />
            <p className='w-full md:w-2/3 text-gray-400 leading-relaxed tracking-wide'>
              Dreams Clothing brings you the latest in fashion with trendy, high-quality clothing for every occasion. Discover stylish collections, enjoy a seamless shopping experience, and express your unique style effortlessly. Fast shipping, exclusive deals, and hassle-free returns await you!  
            </p>
        </div>

        {/* Company Links */}
        <div>
            <p className='text-xl font-semibold mb-6 text-white tracking-widest'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-400 font-light'>
                <li className='cursor-pointer hover:text-white hover:pl-1 transition-all duration-300 w-max'>Home</li>
                <li className='cursor-pointer hover:text-white hover:pl-1 transition-all duration-300 w-max'>About us</li>
                <li className='cursor-pointer hover:text-white hover:pl-1 transition-all duration-300 w-max'>Delivery</li>
                <li className='cursor-pointer hover:text-white hover:pl-1 transition-all duration-300 w-max'>Privacy policy</li>
            </ul>
        </div>

        {/* Contact Info */}
        <div>
            <p className='text-xl font-semibold mb-6 text-white tracking-widest'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-400 font-light'>
                <li className='cursor-pointer hover:text-white transition-colors duration-300 w-max'>+91 1234567890</li>
                <li className='cursor-pointer hover:text-white transition-colors duration-300 w-max'>contactxshop@gmail.com</li>
            </ul>
        </div>

      </div>

      {/* Copyright Section */}
      <div className='mt-16'>
          <hr className='border-white/10' />
          <p className='py-6 text-sm text-center text-gray-400 tracking-wide'>
            Copyright 2026@ X-shop.com - All Right Reserved.
          </p>
      </div>

    </div>
  )
}

export default Footer
import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-md'>
        <img className='w-[max(10%,80px)] filter invert' src={assets.logo} alt="Logo" />
        <button 
          onClick={()=>setToken('')} 
          className='bg-white/10 hover:bg-white/25 text-white border border-white/20 px-6 py-2 sm:px-8 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 shadow-sm'
        >
          Logout
        </button>
    </div>
  )
}

export default Navbar
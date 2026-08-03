import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-black/20 backdrop-blur-md border-r border-white/10 pt-6'>
        <div className='flex flex-col gap-3 px-3 text-[15px]'>

            <NavLink 
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/15 border border-white/30 text-white shadow-lg font-semibold backdrop-blur-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`} 
              to="/add"
            >
                <img className='w-5 h-5 filter invert opacity-80' src={assets.add_icon} alt="Add" />
                <p className='hidden md:block tracking-wide'>Add Items</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/15 border border-white/30 text-white shadow-lg font-semibold backdrop-blur-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`} 
              to="/list"
            >
                <img className='w-5 h-5 filter invert opacity-80' src={assets.order_icon} alt="List" />
                <p className='hidden md:block tracking-wide'>List Items</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/15 border border-white/30 text-white shadow-lg font-semibold backdrop-blur-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`} 
              to="/orders"
            >
                <img className='w-5 h-5 filter invert opacity-80' src={assets.order_icon} alt="Orders" />
                <p className='hidden md:block tracking-wide'>Orders</p>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar
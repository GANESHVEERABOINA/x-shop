import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[20%] min-h-[95vh] my-4 ml-4 bg-[#8B5CF6] rounded-3xl shadow-2xl flex flex-col'>
        
        {/* Logo Area */}
        <div className='py-8 px-8 flex items-center gap-3'>
            <div className='bg-white/20 p-2 rounded-xl'>
              <h2 className='text-white font-bold text-xl'>XS</h2>
            </div>
            <h1 className='text-white font-bold text-xl tracking-wider hidden lg:block'>X-SHOP</h1>
        </div>

        {/* Navigation Links */}
        <div className='flex flex-col gap-2 px-4 text-[15px] flex-1'>
            
            <NavLink 
              className={({isActive}) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner font-bold' : 'text-purple-200 hover:text-white hover:bg-white/10 font-medium'}`} 
              to="/"
            >
                <img className='w-5 h-5 filter invert opacity-100' src={assets.order_icon} alt="Dashboard" />
                <p className='hidden md:block tracking-wide'>Dashboard</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner font-bold' : 'text-purple-200 hover:text-white hover:bg-white/10 font-medium'}`} 
              to="/add"
            >
                <img className='w-5 h-5 filter invert opacity-100' src={assets.add_icon} alt="Add" />
                <p className='hidden md:block tracking-wide'>Add Items</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner font-bold' : 'text-purple-200 hover:text-white hover:bg-white/10 font-medium'}`} 
              to="/list"
            >
                <img className='w-5 h-5 filter invert opacity-100' src={assets.order_icon} alt="List" />
                <p className='hidden md:block tracking-wide'>List Items</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner font-bold' : 'text-purple-200 hover:text-white hover:bg-white/10 font-medium'}`} 
              to="/orders"
            >
                <img className='w-5 h-5 filter invert opacity-100' src={assets.order_icon} alt="Orders" />
                <p className='hidden md:block tracking-wide'>Orders</p>
            </NavLink>

            <NavLink 
              className={({isActive}) => `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 text-white shadow-inner font-bold' : 'text-purple-200 hover:text-white hover:bg-white/10 font-medium'}`} 
              to="/payments"
            >
                <img className='w-5 h-5 filter invert opacity-100' src={assets.order_icon} alt="Payments" />
                <p className='hidden md:block tracking-wide'>Payments</p>
            </NavLink>

        </div>

        {/* Bottom Premium Card */}
        <div className='p-4 mt-auto mb-4 mx-4 bg-white/10 rounded-2xl hidden lg:block border border-white/20'>
           <p className='text-white text-xs font-semibold leading-relaxed'>Manage your store<br/>with ease.</p>
        </div>

    </div>
  )
}

export default Sidebar
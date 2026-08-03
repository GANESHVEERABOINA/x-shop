import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t border-white/10'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-16 flex flex-col justify-center md:flex-row gap-12 mb-28 items-center'>
        
        {/* Contact Image with rounded corners and subtle shadow */}
        <img 
          className='w-full md:max-w-[480px] rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
          src={assets.contact_img} 
          alt="Contact Us" 
        />
        
        {/* Glassmorphism Card for Contact Information */}
        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-center items-start gap-6 w-full md:w-1/2'>
          
          <div className='w-full'>
            <p className='font-semibold text-lg sm:text-xl text-white tracking-widest uppercase mb-4'>Our Store</p>
            <p className='text-gray-400 leading-relaxed'>
              Hyderabad <br /> Charminar, Hyderabad, Telangana, India
            </p>
            <p className='text-gray-400 leading-relaxed mt-3'>
              Tel: (415) 555-0132 <br /> Email: contactxshop@gmail.com
            </p>
          </div>

          {/* Divider inside the card */}
          <hr className='w-full border-white/10 my-2' />

          <div className='w-full'>
            <p className='font-semibold text-lg sm:text-xl text-white tracking-widest uppercase mb-4'>Careers at Dreams Clothing</p>
            <p className='text-gray-400 leading-relaxed mb-8'>
              Learn more about our teams and job openings.
            </p>
            {/* Premium Button */}
            <button className='bg-white text-black font-semibold text-sm tracking-wide px-10 py-4 rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
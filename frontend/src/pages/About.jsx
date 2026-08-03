import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-10 border-t border-white/10'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-16 flex flex-col md:flex-row gap-16 items-center'>
          {/* Left Image with subtle shadow and rounded corners */}
          <img 
            className='w-full md:max-w-[450px] rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)]' 
            src={assets.about_img} 
            alt="About Us" 
          />
          
          {/* Right Text Content */}
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-300 text-base leading-relaxed tracking-wide'>
              <p>
                Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
              </p>
              <p>
                Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
              </p>
              
              {/* Mission Statement in a Glass Box */}
              <div className='bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg mt-2 transition-all hover:bg-white/10 duration-300'>
                <b className='text-white text-lg tracking-widest uppercase block mb-3'>Our Mission</b>
                <p className='text-gray-400'>
                  Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                </p>
              </div>
          </div>
      </div>

      <div className='text-2xl py-8 mt-10'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Why Choose Us - Glassmorphism Cards */}
      <div className='flex flex-col md:flex-row gap-6 mb-20'>
          <div className='flex-1 bg-white/5 backdrop-blur-md border border-white/10 px-10 md:px-12 py-12 rounded-3xl shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300 ease-in-out flex flex-col gap-4'>
            <b className='text-white tracking-widest text-lg'>Quality Assurance</b>
            <p className='text-gray-400 leading-relaxed'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          
          <div className='flex-1 bg-white/5 backdrop-blur-md border border-white/10 px-10 md:px-12 py-12 rounded-3xl shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300 ease-in-out flex flex-col gap-4'>
            <b className='text-white tracking-widest text-lg'>Convenience</b>
            <p className='text-gray-400 leading-relaxed'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          
          <div className='flex-1 bg-white/5 backdrop-blur-md border border-white/10 px-10 md:px-12 py-12 rounded-3xl shadow-2xl hover:scale-105 hover:bg-white/10 transition-all duration-300 ease-in-out flex flex-col gap-4'>
            <b className='text-white tracking-widest text-lg'>Exceptional Service</b>
            <p className='text-gray-400 leading-relaxed'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
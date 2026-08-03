import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  // 1. Ikkada mee images ni add chesukondi
  const sliderImages = [
    assets.hero_img,
    // assets.hero_img_2,  <-- Meeru assets.js lo link chesaka ila add cheyandi
    // assets.hero_img_3, 
  ];

  // Current active image index ni track cheyadaniki state
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Auto-slide logic (Prathi 3 seconds ki image change avtundi)
  useEffect(() => {
    // Okavela array lo okkate image unte slide avvakarledu
    if (sliderImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <div className='flex flex-col sm:flex-row bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-10 min-h-[60vh] lg:min-h-[70vh]'>
      
      {/* Hero Left Side (Text) */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-14 sm:py-0 relative z-10'>
            <div className='text-white'>
                <div className='flex items-center gap-3 mb-2'>
                    <p className='w-8 md:w-12 h-[2px] bg-gray-400'></p>
                    <p className='font-medium text-sm md:text-base text-gray-300 tracking-widest uppercase'>Festive Offers</p>
                </div>
                
                <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight tracking-wide'>
                  Latest Arrivals
                </h1>
                
                <div className='flex items-center gap-3 mt-4 cursor-pointer group w-max'>
                    <p className='font-semibold text-sm md:text-base tracking-widest group-hover:text-gray-300 transition-colors'>SHOP NOW</p>
                    <p className='w-8 md:w-12 h-[2px] bg-white group-hover:bg-gray-300 transition-colors'></p>
                </div>
            </div>
      </div>

      {/* Hero Right Side (Image Slider) */}
      <div className='w-full sm:w-1/2 relative h-[40vh] sm:h-auto overflow-hidden'>
        {sliderImages.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`Hero Slide ${index + 1}`} 
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        
        {/* Dark gradient overlay for mobile screens to make text readable if they overlap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:hidden z-20"></div>
      </div>
      
    </div>
  )
}

export default Hero
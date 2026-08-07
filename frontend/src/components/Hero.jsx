import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Hero = () => {
    // DB nunchi products data thechukuntunnam
    const { products } = useContext(ShopContext);
    
    // Slider kosam states
    const [sliderImages, setSliderImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Products load ayyaka, latest 5 products images ni theesukuni slider array lo peduthunnam
    useEffect(() => {
        if (products && products.length > 0) {
            // Reverse chesi latest products vi theeskuntunnam (Top 5)
            const latestProducts = [...products].reverse().slice(0, 5);
            const images = latestProducts.map(item => item.image[0]); // Prathi product first image
            setSliderImages(images);
        }
    }, [products])

    // Every 3 seconds ki slide change avvadaniki Timer logic
    useEffect(() => {
        if (sliderImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
            }, 3000); // 3000ms = 3 seconds
            
            return () => clearInterval(interval); // Cleanup function
        }
    }, [sliderImages])

    return (
        <div className='flex flex-col sm:flex-row bg-[#111111] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl my-8 min-h-[400px]'>
            
            {/* ------------- Left Side (Static Text) ------------- */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0 relative z-10'>
                <div className='text-white px-8 md:px-12'>
                    <div className='flex items-center gap-2 mb-4'>
                        <p className='w-8 md:w-11 h-[2px] bg-gray-400'></p>
                        <p className='font-medium text-sm md:text-base tracking-[0.2em] text-gray-400 uppercase'>Festive Offers</p>
                    </div>
                    
                    <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight mb-6'>
                        Latest Arrivals
                    </h1>
                    
                    <div className='flex items-center gap-2 cursor-pointer group w-max'>
                        <p className='font-bold text-sm md:text-base uppercase tracking-widest group-hover:text-gray-300 transition-colors'>Shop Now</p>
                        <p className='w-8 md:w-12 h-[2px] bg-white group-hover:bg-gray-300 transition-colors'></p>
                    </div>
                </div>
            </div>
            
            {/* ------------- Right Side (Dynamic Image Slider) ------------- */}
            <div className='w-full sm:w-1/2 relative min-h-[300px] sm:min-h-full'>
                {sliderImages.length > 0 ? (
                    sliderImages.map((imgSrc, index) => (
                        <img 
                            key={index}
                            src={imgSrc} 
                            alt={`Latest Product ${index + 1}`}
                            // Smooth Fade In/Out Effect kosam opacity transitions vadam
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))
                ) : (
                    // DB nunchi load ayye lopu leda products lekapothe default image chupisthundi
                    <img className='w-full h-full object-cover' src={assets.hero_img} alt="Default Hero" />
                )}
                
                {/* Image meeda chinna gradient overlay (Text clear ga undadaniki) */}
                <div className='absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent opacity-80 sm:hidden'></div>
                <div className='absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent opacity-100 hidden sm:block w-[10%]'></div>
            </div>
            
        </div>
    )
}

export default Hero
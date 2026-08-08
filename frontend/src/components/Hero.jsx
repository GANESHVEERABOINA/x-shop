import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import AnimatedButton from './ui/AnimatedButton'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
    const { products, navigate } = useContext(ShopContext);
    
    // Initial ga empty array untundi, only DB data vasthane fill avuthundi
    const [sliderImages, setSliderImages] = useState([]);
    const [activeImage, setActiveImage] = useState(0); 

    useEffect(() => {
        // Products DB nunchi vachaka matrame ee block run avuthundi
        if (products && products.length > 0) {
            // Latest 5 products theeskuntunnam
            const latestProducts = [...products].reverse().slice(0, 5);
            
            // Direct ga DB lo unna 'image[0]' ni theeskuntunnam
            const imagesData = latestProducts.map((item) => ({
                id: item._id,
                src: item.image[0], 
                name: item.name
            }));
            
            setSliderImages(imagesData); 
        }
    }, [products]) // Products update avvagane trigger avuthundi

    return (
        <div className='flex flex-col lg:flex-row bg-[#111111] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl my-8 min-h-[450px]'>
            
            {/* ------------- Left Side (Static Text) ------------- */}
            <div className='w-full lg:w-1/2 flex items-center justify-center py-12 lg:py-0 relative z-10'>
                <div className='text-white px-8 md:px-12'>
                    <div className='flex items-center gap-2 mb-4'>
                        <p className='w-8 md:w-11 h-[2px] bg-gray-400'></p>
                        <p className='font-medium text-sm md:text-base tracking-[0.2em] text-gray-400 uppercase'>Festive Offers</p>
                    </div>
                    
                    <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight mb-6'>
                        Latest Arrivals
                    </h1>
                    
                    <div className='mt-4'>
                        <AnimatedButton 
                            onClick={() => navigate('/collection')} 
                            className="bg-white text-black font-bold"
                        >
                            SHOP NOW
                        </AnimatedButton>
                    </div>
                </div>
            </div>
            
            {/* ------------- Right Side (Hover Expand Animation from DB) ------------- */}
            <div className='w-full lg:w-1/2 relative min-h-[350px] lg:min-h-full p-4 sm:p-8 flex items-center justify-center overflow-hidden'>
                
                {/* DB nunchi array loki data vasthene idi render avuthundi */}
                {sliderImages.length > 0 ? (
                    <div className="flex w-full h-[300px] sm:h-[350px] items-center justify-center gap-2 sm:gap-3 z-10 relative">
                        {sliderImages.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                className="relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 bg-[#1a1a1a] flex-shrink-0"
                                initial={{ width: "3.5rem", height: "100%" }}
                                animate={{
                                    // Expand ayyela explicit rem units isthunnam
                                    width: activeImage === index ? "22rem" : "3.5rem",
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                onHoverStart={() => setActiveImage(index)}
                                onClick={() => {
                                    setActiveImage(index);
                                    // User image meeda click chesthe aa product page ki vellipothadu
                                    if(item.id) navigate(`/product/${item.id}`);
                                }}
                            >
                                {/* DB Image Rendering */}
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Dark Gradient Overlay */}
                                <AnimatePresence>
                                    {activeImage === index && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Product Name from DB */}
                                <AnimatePresence>
                                    {activeImage === index && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ delay: 0.1, duration: 0.3 }}
                                            className="absolute bottom-4 left-4 right-4"
                                        >
                                            <p className="text-white text-sm sm:text-base font-extrabold tracking-wide drop-shadow-lg truncate">
                                                {item.name}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </motion.div>
                        ))}
                    </div>
                ) : (
                    // DB nunchi load ayye lopu ee Loading Animation kanipisthundi
                    <div className="w-full h-[300px] sm:h-[350px] rounded-3xl bg-white/5 animate-pulse flex items-center justify-center border border-white/10 z-10 relative">
                        <p className="text-gray-500 tracking-widest text-xs sm:text-sm font-bold">FETCHING LATEST COLLECTIONS...</p>
                    </div>
                )}
                
                {/* Background Shadow Effect */}
                <div className='absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#111111] to-transparent pointer-events-none hidden lg:block z-20'></div>
            </div>
            
        </div>
    )
}

export default Hero
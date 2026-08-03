import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10)); // Loading 10 items for the slider
    }, [products])

    return (
        <div className='my-16'>

            {/* Scrollbar ni hide cheyyadaniki chinna custom CSS */}
            <style>
                {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
            </style>

            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400 tracking-wide mt-3'>
                    Fresh Finds Just for You
                </p>
            </div>

            {/* Render Container ONLY if products are available from DB */}
            {latestProducts && latestProducts.length > 0 && (
                <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300'>

                    {/* Flipkart Style Horizontal Scroll Container */}
                    <div className='flex overflow-x-auto gap-4 sm:gap-6 pb-4 pt-2 hide-scrollbar snap-x snap-mandatory px-2 sm:px-0'>
                        {
                            latestProducts.map((item, index) => (
                                // flex-shrink-0: Items shrink avvakunda original width maintain chesthai
                                // Fixed widths for Flipkart style cards
                                <div
                                    key={index}
                                    className='flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px] snap-start hover:scale-105 transition-transform duration-300 ease-in-out bg-white/5 p-3 rounded-2xl border border-white/10'
                                >
                                    <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                                </div>
                            ))
                        }
                    </div>

                </div>
            )}
        </div>
    )
}

export default LatestCollection
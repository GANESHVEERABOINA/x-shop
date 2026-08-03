import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='my-16'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400 tracking-wide mt-3'>
          Discover the Trendsetters of Today
        </p>
      </div>

      {/* Render Container ONLY if best selling products are available from DB */}
      {bestSeller && bestSeller.length > 0 && (
        <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8'>
            {
                bestSeller.map((item,index)=>(
                  <div key={index} className='hover:scale-105 transition-transform duration-300 ease-in-out'>
                    <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                  </div>
                ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default BestSeller
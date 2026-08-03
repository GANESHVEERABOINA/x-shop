import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
    
    const { currency } = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='cursor-pointer block group' to={`/product/${id}`}>
      
      {/* Flipkart Style Image Container with Glass effect */}
      <div className='relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-2 aspect-[4/5] flex items-center justify-center'>
        <img 
          className='w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-in-out' 
          src={image[0]} 
          alt={name} 
        />
        
        {/* Flipkart Style Rating Badge */}
        <div className='absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium text-white flex items-center gap-1 border border-white/20 shadow-sm'>
            4.1 <span className='text-green-400 text-xs'>★</span>
        </div>
      </div>
      
      {/* Product Details */}
      <div className='pt-3 pb-1 px-1'>
          {/* truncate class: Peru peddaga unte 1 line tarvata '...' vasthundi */}
          <p className='text-sm font-medium truncate text-gray-300 group-hover:text-white transition-colors'>{name}</p>
          
          <div className='flex items-center gap-2 mt-1'>
              <p className='text-base font-bold text-white'>{currency}{price}</p>
              {/* Fake original price for Flipkart feel */}
              <p className='text-xs text-gray-500 line-through'>{currency}{price + 500}</p>
              <p className='text-[10px] sm:text-xs text-green-500 font-medium tracking-wide'>60% off</p>
          </div>
      </div>
      
    </Link>
  )
}

export default ProductItem
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import AnimatedButton from '../components/ui/AnimatedButton'
import { AnimatedNumber } from '../components/ui/AnimatedNumber'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='border-t border-white/10 pt-14 text-white min-h-screen'>
      
      {/* Page Title */}
      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Main Container - Desktop lo Side-by-Side (lg:flex-row) */}
      <div className='flex flex-col lg:flex-row gap-10 xl:gap-16 items-start'>
        
        {/* ------------- Left Side (Cart Items List) ------------- */}
        <div className='flex-1 w-full'>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
              <div 
                key={index} 
                className='py-5 px-6 border border-white/10 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-[#13131A] rounded-2xl mb-5 shadow-lg transition-transform hover:shadow-2xl'
              >
                {/* Product Info */}
                <div className='flex items-center gap-6'>
                  <img className='w-16 sm:w-20 rounded-xl object-cover' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-bold tracking-wide text-white'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-3'>
                      <p className='font-medium text-gray-300'>{currency}{productData.price}</p>
                      <p className='px-3 py-1 border border-white/20 bg-white/5 rounded-md text-sm text-gray-300'>{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Animated Quantity Selector */}
                <div className="flex justify-center sm:justify-start">
                  <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/20 rounded-xl px-3 py-1.5 w-max shadow-lg select-none">
                    <button
                      onClick={() => item.quantity > 1 ? updateQuantity(item._id, item.size, item.quantity - 1) : null}
                      className={`text-2xl px-2 transition-colors active:scale-90 ${item.quantity > 1 ? 'text-gray-400 hover:text-white cursor-pointer' : 'text-gray-700 cursor-not-allowed'}`}
                    >
                      -
                    </button>
                    <div className="w-8 flex justify-center text-xl font-bold text-white">
                      <AnimatedNumber value={item.quantity} />
                    </div>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="text-2xl text-gray-400 hover:text-white px-2 cursor-pointer transition-colors active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delete Icon */}
                <div className='flex justify-end'>
                  <img 
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    className='w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform opacity-60 hover:opacity-100 hover:invert' 
                    src={assets.bin_icon} 
                    alt="Delete" 
                  />
                </div>
              </div>
            )
          })}
          
          {/* Cart Empty aythe choopinche text */}
          {cartData.length === 0 && (
            <div className="text-center text-gray-500 py-20 bg-[#13131A] border border-white/10 rounded-3xl">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* ------------- Right Side (Cart Totals & Checkout) ------------- */}
        {/* lg:w-[450px] valla width fix avuthundi, sticky top-24 valla kinda scroll ayina idi ikkade kanipisthundi */}
        {cartData.length > 0 && (
          <div className='w-full lg:w-[400px] xl:w-[450px] shrink-0 sticky top-24'>
            <div className='bg-[#13131A] border border-white/10 p-8 rounded-3xl shadow-xl'>
              
              <CartTotal />
              
              <div className='w-full mt-8 flex justify-center lg:justify-end'>
                <AnimatedButton 
                  onClick={() => navigate('/place-order')} 
                  className='bg-white text-black font-bold tracking-widest w-full'
                >
                    PROCEED TO CHECKOUT
                </AnimatedButton>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart
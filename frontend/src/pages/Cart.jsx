import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext);
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

  // --- Checkout Auth Check ---
  const checkoutHandler = () => {
    if (!token) {
      toast.error("Please login to place an order!");
      navigate('/login');
    } else {
      navigate('/place-order');
    }
  }

  return (
    <div className='border-t border-white/10 pt-10 sm:pt-14 text-white min-h-[80vh]'>

      <div className='text-2xl mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* --- Main Container: Divides screen into 2 columns --- */}
      <div className='flex flex-col lg:flex-row gap-10 xl:gap-14 items-start'>
        
        {/* ------------- LEFT SIDE: CART ITEMS ------------- */}
        <div className='flex-1 flex flex-col gap-4 w-full'>
          {cartData.length === 0 ? (
             <div className='text-gray-400 py-10 text-center bg-white/5 rounded-2xl border border-white/10'>
                Your cart is currently empty.
             </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              if (!productData) return null;

              return (
                <div 
                  key={index} 
                  className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 shadow-lg transition-all duration-300 hover:bg-white/10'
                >
                  {/* Product Image & Info */}
                  <div className='flex items-center gap-6'>
                    <img className='w-16 sm:w-20 rounded-xl object-cover border border-white/10' src={productData.image[0]} alt={productData.name} />
                    <div>
                      <p className='text-sm sm:text-lg font-medium text-white'>{productData.name}</p>
                      <div className='flex items-center gap-4 mt-2'>
                        <p className='text-base font-bold text-white'>{currency}{productData.price}</p>
                        <p className='px-3 py-1 border border-white/20 bg-white/10 rounded-lg text-xs sm:text-sm text-gray-200'>{item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <input 
                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                    className='bg-transparent border border-white/20 rounded-xl max-w-14 sm:max-w-20 px-2 py-1 text-white text-center focus:outline-none focus:border-white/50' 
                    type="number" 
                    min={1} 
                    defaultValue={item.quantity} 
                  />

                  {/* Delete Button */}
                  <div className='flex justify-end pr-2 sm:pr-4'>
                    <img 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className='w-5 sm:w-6 cursor-pointer filter invert opacity-70 hover:opacity-100 transition-opacity duration-300' 
                      src={assets.bin_icon} 
                      alt="Remove" 
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* ------------- RIGHT SIDE: CART TOTALS ------------- */}
        {cartData.length > 0 && (
          <div className='w-full lg:w-[400px] xl:w-[450px] shrink-0'>
            {/* Sticky attribute to keep the total visible while scrolling items */}
            <div className='sticky top-28'>
              <CartTotal />
              
              <div className='w-full mt-8'>
                <button 
                  onClick={checkoutHandler} 
                  className='w-full bg-white text-black font-semibold text-sm tracking-widest px-10 py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Cart
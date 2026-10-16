import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products, navigate } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 space-y-8 text-white">
      {/* Unified Theme Header (No Flipkart names, consistent white/yellow styling) */}
      <div className="flex flex-col items-center text-center space-y-2.5">
        <span className="bg-neutral-900 border border-neutral-700 text-[#ffc200] text-[11px] font-bold px-3.5 py-1 rounded-full tracking-wider uppercase shadow">
          ⚡ X-SHOP SUPER DEALS
        </span>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
            LATEST <span className="text-[#ffc200]">COLLECTIONS</span>
          </h2>
          <span className="w-10 h-[3px] bg-[#ffc200] rounded-full"></span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 font-medium">
          Fresh Finds Just for You • Up to 60% Off
        </p>
      </div>

      {/* Product Cards Container */}
      <div className="bg-[#0b0b0b] border border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      </div>

      {/* X-Shop Theme Banner Strip */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-700">
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-[#ffc200] text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
            X-Shop Special
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Extra 10% Instant Discount on Prepaid & UPI Orders
          </h3>
        </div>
        <button
          onClick={() => navigate('/collection')}
          className="bg-[#ffc200] hover:bg-[#ffcf33] text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shrink-0 cursor-pointer shadow-lg transition"
        >
          Explore All Deals →
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
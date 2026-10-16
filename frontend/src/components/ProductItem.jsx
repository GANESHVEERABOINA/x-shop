import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  const sellingPrice = Number(price) || 499;
  const mrpPrice = Math.round(sellingPrice * 2.5);
  const discount = Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);

  const imgSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group block w-full bg-[#121212] border border-neutral-800/90 rounded-xl overflow-hidden hover:border-neutral-600 transition-all duration-200"
    >
      {/* Responsive Image Box - Fixed Aspect Ratio */}
      <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />

        {/* Flipkart Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm border border-neutral-700 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold text-white flex items-center gap-1">
          <span>4.1</span>
          <span className="text-emerald-400">★</span>
        </div>
      </div>

      {/* Compact Product Info */}
      <div className="p-2.5 sm:p-3">
        <p className="text-xs sm:text-sm font-medium text-gray-200 truncate">
          {name}
        </p>

        <div className="mt-1 flex items-baseline flex-wrap gap-1.5">
          <span className="text-sm sm:text-base font-bold text-white">
            {currency}{sellingPrice}
          </span>
          <span className="text-[11px] sm:text-xs text-gray-500 line-through">
            {currency}{mrpPrice}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-emerald-400">
            {discount}% off
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [showOffers, setShowOffers] = useState(true);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');

  useEffect(() => {
    const item = products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      setSize(item.sizes?.[0] || '');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading product details...
      </div>
    );
  }

  // Flipkart-style price calculations
  const sellingPrice = Number(productData.price) || 999;
  const mrpPrice = Math.round(sellingPrice * 2.4);
  const discountPercent = Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);
  const wowDealPrice = Math.max(sellingPrice - Math.round(sellingPrice * 0.08), 99);

  // Handle Add to Cart with quantity
  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size first!');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(productData._id, size);
    }
    toast.success('Added to cart!');
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    if (!size) {
      toast.error('Please select a size first!');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(productData._id, size);
    }
    navigate('/cart');
  };

  // Share button handler
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info('Product link copied to clipboard!');
  };

  // Check Pincode handler
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && !isNaN(pincode)) {
      setDeliveryMsg('Free Delivery available by 3-4 Days • Cash on Delivery eligible');
    } else {
      setDeliveryMsg('Please enter a valid 6-digit pincode');
    }
  };

  const images = Array.isArray(productData.image) ? productData.image : [productData.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 text-white">
      {/* 1. Flipkart-Style Breadcrumbs */}
      <nav className="text-xs sm:text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-1.5">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <span>/</span>
        <Link to="/collection" className="hover:text-white transition">
          {productData.category || 'Clothing'}
        </Link>
        <span>/</span>
        <span className="text-gray-400">{productData.subCategory || 'Topwear'}</span>
        <span>/</span>
        <span className="text-gray-200 font-medium truncate max-w-[260px] sm:max-w-md">
          {productData.name}
        </span>
      </nav>

      {/* 2. Main Flipkart 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Compact 2-Column Image Grid (7 Cols on Desktop) */}
        <div className="lg:col-span-7 relative">
          <div
            className={`grid gap-3 ${
              images.length === 1 ? 'grid-cols-1 max-w-[380px] mx-auto' : 'grid-cols-2'
            }`}
          >
            {images.map((imgUrl, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageModal(imgUrl)}
                className="relative group bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden cursor-zoom-in h-[280px] sm:h-[350px] md:h-[380px]"
              >
                <img
                  src={imgUrl}
                  alt={`${productData.name} - view ${index + 1}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist & Share Floating Icons on Top-Right Image */}
                {index === (images.length > 1 ? 1 : 0) && (
                  <div
                    className="absolute top-3 right-3 flex flex-col gap-2.5 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setWishlisted(!wishlisted)}
                      title="Wishlist"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={wishlisted ? '#ef4444' : 'none'}
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke={wishlisted ? '#ef4444' : 'currentColor'}
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={handleShare}
                      title="Share"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Flipkart-Style Product Details (5 Cols on Desktop, Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-6 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-5 sm:p-6 space-y-5">
          
          {/* Size Selection at Top (Flipkart Style) */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-sm font-semibold text-gray-200">Select Size</span>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline cursor-pointer"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`min-w-[48px] h-11 px-3.5 rounded-lg font-medium text-sm border transition-all ${
                      item === size
                        ? 'border-white bg-white text-black font-bold shadow-sm'
                        : 'border-neutral-700 bg-neutral-900 text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand Store Link & Product Title */}
          <div className="space-y-1.5">
            <Link
              to="/collection"
              className="text-xs font-semibold text-blue-400 hover:underline inline-block"
            >
              Visit X-SHOP {productData.category} Store
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-white leading-snug">
              {productData.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
              {productData.description}
            </p>
          </div>

          {/* Flipkart Rating Pill */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded-md text-xs font-semibold">
              <span className="text-white">4.2</span>
              <span className="text-emerald-400">★</span>
              <span className="text-neutral-600">|</span>
              <span className="text-gray-300">1,248 Ratings</span>
            </div>
            {productData.bestseller && (
              <span className="text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                Bestseller
              </span>
            )}
          </div>

          {/* Price & Discount Block */}
          <div className="space-y-1.5 pt-1">
            <span className="inline-block bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
              Lowest Price Live • Special Deal
            </span>
            <div className="flex items-baseline gap-2.5">
              <span className="text-emerald-400 font-bold text-xl sm:text-2xl">
                ↓{discountPercent}%
              </span>
              <span className="text-gray-500 line-through text-lg">
                {currency}{mrpPrice}
              </span>
              <span className="text-white font-bold text-2xl sm:text-3xl">
                {currency}{sellingPrice}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Inclusive of all taxes</p>
          </div>

          {/* Flipkart WOW! DEAL Box */}
          <div className="rounded-xl overflow-hidden border border-indigo-500/30 bg-indigo-950/20">
            <button
              onClick={() => setShowOffers(!showOffers)}
              className="w-full flex items-center justify-between bg-gradient-to-r from-indigo-700 to-blue-600 px-3.5 py-2.5 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="bg-black/30 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded leading-tight">
                  WOW! DEAL
                </span>
                <span className="text-xs font-medium text-white">
                  Apply offers for maximum savings
                </span>
              </div>
              <span className="text-white text-xs">{showOffers ? '▲' : '▼'}</span>
            </button>

            {showOffers && (
              <div className="p-3.5 bg-neutral-900/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    Buy at {currency}{wowDealPrice}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    Extra 8% Instant Discount
                  </span>
                </div>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• 5% Unlimited Cashback on Flipkart Axis & SBI Cards</li>
                  <li>• Flat ₹50 off on first UPI transaction</li>
                </ul>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-gray-400">Quantity</span>
            <div className="inline-flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-gray-300 hover:text-white text-base"
              >
                −
              </button>
              <span className="px-3 py-1 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-gray-300 hover:text-white text-base"
              >
                +
              </button>
            </div>
          </div>

          {/* Flipkart Side-by-Side Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-4 rounded-xl border border-neutral-600 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition cursor-pointer"
            >
              Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-4 rounded-xl bg-[#ffc200] hover:bg-[#ffcf33] text-black font-bold text-sm shadow-md transition cursor-pointer"
            >
              Buy at {currency}{sellingPrice}
            </button>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="pt-3 border-t border-neutral-800 space-y-2">
            <span className="text-xs font-semibold text-gray-300">Delivery Options</span>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg"
              >
                Check
              </button>
            </form>
            {deliveryMsg && (
              <p className="text-xs text-emerald-400">{deliveryMsg}</p>
            )}
          </div>

          {/* Trust & Return Policies */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-800 text-center text-[11px] text-gray-400">
            <div className="bg-neutral-900/60 p-2 rounded-lg">
              <p className="font-semibold text-gray-200">100% Original</p>
              <p>Authentic Brand</p>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg">
              <p className="font-semibold text-gray-200">Cash on Delivery</p>
              <p>Pay at Doorstep</p>
            </div>
            <div className="bg-neutral-900/60 p-2 rounded-lg">
              <p className="font-semibold text-gray-200">7 Days Return</p>
              <p>Easy Exchange</p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Popup Modal */}
      {showSizeChart && (
        <div
          onClick={() => setShowSizeChart(false)}
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-md w-full p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white">Standard Size Chart (Inches)</h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>
            <table className="w-full text-xs text-left text-gray-300">
              <thead className="bg-neutral-800 text-gray-200">
                <tr>
                  <th className="p-2">Size</th>
                  <th className="p-2">Chest</th>
                  <th className="p-2">Length</th>
                  <th className="p-2">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                <tr><td className="p-2 font-semibold">S</td><td className="p-2">38</td><td className="p-2">27.5</td><td className="p-2">17</td></tr>
                <tr><td className="p-2 font-semibold">M</td><td className="p-2">40</td><td className="p-2">28.5</td><td className="p-2">17.5</td></tr>
                <tr><td className="p-2 font-semibold">L</td><td className="p-2">42</td><td className="p-2">29.5</td><td className="p-2">18.5</td></tr>
                <tr><td className="p-2 font-semibold">XL</td><td className="p-2">44</td><td className="p-2">30.5</td><td className="p-2">19</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Image Zoom Modal on Click */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={selectedImageModal}
            alt="Zoomed Product"
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
          />
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-14">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  );
};

export default Product;
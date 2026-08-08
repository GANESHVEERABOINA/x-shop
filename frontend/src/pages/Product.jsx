import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import AnimatedButton from "../components/ui/AnimatedButton";
import { AnimatedNumber } from "../components/ui/AnimatedNumber"; // Kotha component import chesam

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, navigate } = useContext(ShopContext); 
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  
  // Quantity kosam kotha state add chesam (Default: 1)
  const [quantity, setQuantity] = useState(1);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Quantity ni add/reduce chese functions
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return productData ? (
    <div className="border-t border-white/10 pt-10 transition-opacity ease-in duration-500 opacity-100 text-white">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full hide-scrollbar snap-x">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-xl transition-all duration-300 snap-center object-cover ${image === item ? "border-2 border-white opacity-100 shadow-[0_0_10px_rgba(255,255,255,0.2)]" : "opacity-50 hover:opacity-100 border border-white/10"}`}
                alt="Thumbnail"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              src={image}
              alt="Main Product"
            />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-semibold text-2xl sm:text-3xl mt-2 tracking-wide">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-3">
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_icon} alt="star" className="w-4" />
            <img src={assets.star_dull_icon} alt="star" className="w-4 opacity-50" />
            <p className="pl-2 text-gray-400">(122)</p>
          </div>
          <p className="mt-5 text-3xl sm:text-4xl font-bold tracking-widest">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-300 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* ---------- Size Selector ---------- */}
          <div className="flex flex-col gap-4 mt-8 mb-4">
            <p className="text-gray-300 font-medium tracking-wide">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 font-medium ${
                    item === size
                      ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-110"
                      : "bg-white/5 text-gray-300 border-white/20 hover:bg-white/10 hover:border-white/50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- Quantity Selector ---------- */}
          <div className="flex flex-col gap-4 mb-8">
            <p className="text-gray-300 font-medium tracking-wide">Quantity</p>
            <div className="flex items-center gap-4 bg-[#1a1a1a] border border-white/20 rounded-xl px-4 py-2 w-max shadow-lg select-none">
              <button onClick={decreaseQuantity} className="text-2xl text-gray-400 hover:text-white transition-colors px-2 cursor-pointer active:scale-90">
                -
              </button>
              <div className="w-8 flex justify-center text-xl font-bold text-white">
                <AnimatedNumber value={quantity} />
              </div>
              <button onClick={increaseQuantity} className="text-2xl text-gray-400 hover:text-white transition-colors px-2 cursor-pointer active:scale-90">
                +
              </button>
            </div>
          </div>

          {/* ---------- Add to Cart & Buy Now Buttons ---------- */}
          <div className="flex flex-col sm:flex-row gap-4 mb-2">
            <AnimatedButton 
              onClick={() => {
                if (size) {
                  // Enta quantity select chesthe anni sarlu add to cart trigger avuthundi
                  for(let i=0; i<quantity; i++) addToCart(productData._id, size);
                } else {
                  addToCart(productData._id, size); 
                }
              }}
              className="bg-transparent text-white border border-gray-500 hover:bg-white/10"
            >
              ADD TO CART
            </AnimatedButton>

            <AnimatedButton 
              onClick={() => {
                if (size) {
                  for(let i=0; i<quantity; i++) addToCart(productData._id, size);
                  navigate('/cart'); 
                } else {
                  addToCart(productData._id, size); 
                }
              }}
              className="bg-white text-black font-bold"
            >
              BUY NOW
            </AnimatedButton>
          </div>

          <hr className="mt-10 sm:w-4/5 border-white/10" />

          <div className="text-sm text-gray-400 mt-6 flex flex-col gap-2 leading-relaxed">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className="mt-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-white/10">
          <b className="px-8 py-5 text-sm tracking-widest bg-white/10 text-white cursor-pointer">Description</b>
          <p className="px-8 py-5 text-sm tracking-widest text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-colors duration-300">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-8 py-8 text-sm text-gray-300 leading-relaxed">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services...</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <div className="mt-10">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
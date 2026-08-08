import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryShowcase = ({ title, items, headerColor = "from-blue-900/60" }) => {
  const navigate = useNavigate();

  // Items empty unte emi render avvakunda aapadam
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full my-10 bg-[#13131A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* ----------- Header ----------- */}
      <div className={`flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 bg-gradient-to-r ${headerColor} to-transparent border-b border-white/5`}>
        <h2 className="text-lg sm:text-2xl font-bold text-white tracking-wide">{title}</h2>
        
        <button
          onClick={() => navigate('/collection')}
          className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors shadow-lg flex items-center justify-center active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* ----------- Dynamic Items Grid ----------- */}
      <div className="p-4 sm:p-6">
        <div className="flex overflow-x-auto gap-4 sm:gap-6 hide-scrollbar snap-x">
          {items.map((item, index) => (
            <div
              key={index}
              // Card paina click chesthe direct aa product ki velthundi
              onClick={() => navigate(`/product/${item.id}`)}
              className="min-w-[130px] sm:min-w-[180px] lg:min-w-[200px] flex-1 flex flex-col items-center gap-3 cursor-pointer group snap-start bg-[#1a1a1a] p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-full aspect-[4/5] sm:aspect-square bg-white/5 rounded-lg overflow-hidden flex items-center justify-center relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-center w-full mt-1">
                <p className="text-white text-xs sm:text-sm font-semibold truncate tracking-wide">{item.title}</p>
                {/* Real DB Price vastundi ikkada */}
                <p className="text-[#37ff1a] text-xs sm:text-sm font-bold mt-1 tracking-wider">{item.offer}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CategoryShowcase;
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t border-white/10'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl font-semibold tracking-wider flex items-center cursor-pointer gap-2 text-white'>
          FILTERS
          <img className={`h-3 sm:hidden transition-transform duration-300 filter invert ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Toggle Filters" />
        </p>

        {/* Category Filter */}
        <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-6 transition-all duration-300 shadow-lg ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-4 text-sm font-semibold tracking-widest text-white'>CATEGORIES</p>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-300'>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Men'} onChange={toggleCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Men</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Women'} onChange={toggleCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Women</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Kids'} onChange={toggleCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Kids</span>
            </label>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 my-6 transition-all duration-300 shadow-lg ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-4 text-sm font-semibold tracking-widest text-white'>TYPE</p>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-300'>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Topwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Bottomwear</span>
            </label>
            <label className='flex items-center gap-3 cursor-pointer hover:text-white transition-colors group'>
              <input className='w-4 h-4 accent-white bg-transparent cursor-pointer' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> 
              <span className='group-hover:pl-1 transition-all duration-300'>Winterwear</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center text-base sm:text-2xl mb-8 gap-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            
            {/* Product Sort - Glassmorphism Dropdown */}
            <select 
              onChange={(e)=>setSortType(e.target.value)} 
              className='bg-transparent border border-white/20 text-gray-200 text-sm px-4 py-2.5 rounded-xl backdrop-blur-md focus:outline-none focus:border-white/50 focus:bg-white/5 cursor-pointer transition-all duration-300 shadow-sm'
            >
              {/* Note: Options styling is limited by browsers, so keeping them dark is best */}
              <option className='bg-gray-900 text-white' value="relavent">Sort by: Relevant</option>
              <option className='bg-gray-900 text-white' value="low-high">Sort by: Low to High</option>
              <option className='bg-gray-900 text-white' value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
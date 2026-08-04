import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState("Men");
   const [subCategory, setSubCategory] = useState("Topwear");
   const [bestseller, setBestseller] = useState(false);
   const [sizes, setSizes] = useState([]);

   const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }

   // Reusable glassmorphism input style
   const inputStyle = 'w-full max-w-[500px] bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-300';

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6 text-white'>
        
        {/* Upload Images */}
        <div>
          <p className='mb-3 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Upload Image</p>
          <div className='flex gap-3 flex-wrap'>
            {[image1, image2, image3, image4].map((img, idx) => {
              const setters = [setImage1, setImage2, setImage3, setImage4];
              return (
                <label key={idx} htmlFor={`image${idx + 1}`} className='cursor-pointer group'>
                  <div className='w-20 h-20 bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden hover:border-white/50 transition-all duration-300 shadow-sm'>
                    <img className={`w-full h-full object-cover ${!img && 'w-10 h-10 filter invert opacity-50 group-hover:opacity-100 transition-opacity'}`} src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="Upload" />
                  </div>
                  <input onChange={(e) => setters[idx](e.target.files[0])} type="file" id={`image${idx + 1}`} hidden />
                </label>
              )
            })}
          </div>
        </div>

        {/* Product Name */}
        <div className='w-full'>
          <p className='mb-2 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className={inputStyle} type="text" placeholder='Type here' required/>
        </div>

        {/* Product Description */}
        <div className='w-full'>
          <p className='mb-2 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className={`${inputStyle} resize-none h-28`} placeholder='Write content here' required/>
        </div>

        {/* Categories and Price */}
        <div className='flex flex-col sm:flex-row gap-4 w-full sm:gap-8'>
            <div className='w-full sm:w-auto'>
              <p className='mb-2 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} className={`${inputStyle} cursor-pointer`}>
                  <option className='bg-gray-900 text-white' value="Men">Men</option>
                  <option className='bg-gray-900 text-white' value="Women">Women</option>
                  <option className='bg-gray-900 text-white' value="Kids">Kids</option>
              </select>
            </div>

            <div className='w-full sm:w-auto'>
              <p className='mb-2 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} className={`${inputStyle} cursor-pointer`}>
                  <option className='bg-gray-900 text-white' value="Topwear">Topwear</option>
                  <option className='bg-gray-900 text-white' value="Bottomwear">Bottomwear</option>
                  <option className='bg-gray-900 text-white' value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div className='w-full sm:w-auto'>
              <p className='mb-2 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className={`${inputStyle} sm:w-[150px]`} type="Number" placeholder='25' required />
            </div>
        </div>

        {/* Product Sizes */}
        <div>
          <p className='mb-3 text-sm font-semibold tracking-widest text-gray-300 uppercase'>Product Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <div key={sz} onClick={()=>setSizes(prev => prev.includes(sz) ? prev.filter( item => item !== sz) : [...prev,sz])} className='cursor-pointer'>
                <p className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${sizes.includes(sz) ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] scale-105' : 'bg-white/5 text-gray-300 border-white/20 hover:bg-white/10'}`}>
                  {sz}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex gap-3 mt-2 items-center cursor-pointer'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-4 h-4 accent-white cursor-pointer' />
          <label className='cursor-pointer text-sm text-gray-300' htmlFor="bestseller">Add to bestseller</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className='mt-6 bg-white text-black font-semibold tracking-wider text-sm px-12 py-3.5 rounded-full hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer'>
          ADD PRODUCT
        </button>

    </form>
  )
}

export default Add
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState("")

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // --- REAL DB UPDATE FUNCTION ---
  const updatePrice = async (id) => {
    try {
      // Direct ga Database ki request pampistunnam
      const response = await axios.post(backendUrl + '/api/product/update', { id, price: Number(editPrice) }, { headers: { token } });
      
      if (response.data.success) {
        // DB lo success ayyaka UI update chestunnam
        setList(prevList => prevList.map(item => item._id === id ? { ...item, price: Number(editPrice) } : item));
        setEditingId(null);
        toast.success("Price updated in Database!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update price in Database.");
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='text-white w-full max-w-6xl'>
      <p className='mb-6 text-xl font-semibold tracking-wider text-gray-200'>All Products List</p>
      
      <div className='flex flex-col gap-4'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3.5 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-semibold text-gray-300 tracking-widest shadow-lg'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-4 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-sm text-gray-200 hover:bg-white/10 transition-all duration-300 shadow-md' key={index}>
              <img className='w-14 h-14 object-cover rounded-xl border border-white/10 shadow-sm' src={item.image[0]} alt="" />
              <p className='font-medium text-white truncate pr-2'>{item.name}</p>
              <p className='text-gray-400'>{item.category}</p>
              
              {/* Editable Price Section */}
              <div className='flex items-center'>
                {editingId === item._id ? (
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-white'>{currency}</span>
                    <input 
                      type="number" 
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className='w-16 bg-black/50 border border-white/30 rounded px-1.5 py-1 text-white text-sm focus:outline-none focus:border-green-400'
                      autoFocus
                    />
                    <button onClick={() => updatePrice(item._id)} className='text-green-400 font-bold hover:scale-125 transition-transform'>✓</button>
                    <button onClick={() => setEditingId(null)} className='text-red-400 font-bold hover:scale-125 transition-transform'>✕</button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 group cursor-pointer w-max' onClick={() => { setEditingId(item._id); setEditPrice(item.price); }}>
                    <p className='font-bold text-white'>{currency}{item.price}</p>
                    <span className='opacity-0 group-hover:opacity-100 text-[10px] bg-white/10 px-2 py-0.5 rounded transition-all'>✏️ Edit</span>
                  </div>
                )}
              </div>

              <div className='text-right md:text-center'>
                 <button onClick={()=>removeProduct(item._id)} className='bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer'>
                    DELETE
                 </button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default List
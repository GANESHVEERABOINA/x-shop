import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('All') 

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  const orderTabs = ['All', 'Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(order => order.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Out for delivery': return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]'; 
      case 'Delivered': return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]'; 
      case 'Shipped': return 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]'; 
      case 'Packing': return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]'; 
      case 'Order Placed': return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]'; 
      default: return 'bg-gray-500';
    }
  }

  return (
    <div className='text-white w-full max-w-6xl'>
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <h3 className='text-2xl font-semibold tracking-wider mb-6 text-gray-100'>Manage Orders</h3>
      
      <div className='flex overflow-x-auto gap-3 mb-8 pb-2 hide-scrollbar'>
        {orderTabs.map((tab, index) => (
          <button 
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeTab === tab 
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='flex flex-col gap-5'>
        {filteredOrders.length === 0 ? (
          <div className='text-center py-12 text-gray-400 bg-white/5 border border-white/10 rounded-2xl'>
            No orders found in '{activeTab}' category.
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[auto_2fr_1fr] lg:grid-cols-[auto_2fr_1fr_1fr_1fr] gap-6 items-start bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-7 shadow-xl transition-all hover:bg-white/10 duration-300 text-sm' key={index}>
              
              <div className='relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm flex items-center justify-center'>
                {order.items[0]?.image?.[0] ? (
                  <img className='w-full h-full object-cover' src={order.items[0].image[0]} alt="Product" />
                ) : (
                  <img className='w-8 filter invert opacity-90' src={assets.parcel_icon} alt="Parcel" />
                )}
                {order.items.length > 1 && (
                  <div className='absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded-md backdrop-blur-md border border-white/20 font-medium shadow-lg'>
                    +{order.items.length - 1}
                  </div>
                )}
              </div>
              
              <div>
                <div className='mb-3'>
                  {order.items.map((item, idx) => (
                     <p className='font-medium text-white py-0.5' key={idx}> 
                       {item.name} x {item.quantity} <span className='text-gray-400'> ({item.size}) </span>
                       {idx !== order.items.length - 1 && ','}
                     </p>
                  ))}
                </div>
                <p className='mt-2 mb-1 font-semibold text-white tracking-wide'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-gray-400 leading-relaxed'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + " - " + order.address.zipcode}</p>
                </div>
                <p className='text-gray-400 mt-1'>{order.address.phone}</p>
              </div>

              <div className='text-gray-300 flex flex-col gap-1.5'>
                <p><span className='text-gray-400 font-medium'>Items:</span> {order.items.length}</p>
                <p><span className='text-gray-400 font-medium'>Method:</span> {order.paymentMethod}</p>
                <p><span className='text-gray-400 font-medium'>Payment:</span> <span className={order.payment ? 'text-green-400 font-semibold' : 'text-amber-400 font-semibold'}>{ order.payment ? 'Done' : 'Pending' }</span></p>
                <p><span className='text-gray-400 font-medium'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className='flex flex-col sm:items-end gap-4'>
                <p className='text-base sm:text-lg font-bold text-white'>{currency}{order.amount}</p>
                
                {/* Fixed the Dropdown Container Width */}
                <div className='flex items-center gap-3 bg-black/40 border border-white/25 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-sm transition-all focus-within:border-white min-w-[160px] sm:min-w-[175px]'>
                  
                  {/* Added flex-shrink-0 so the dot doesn't get squeezed */}
                  <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full ${getStatusColor(order.status)}`}></div>
                  
                  <select 
                    onChange={(event) => statusHandler(event, order._id)} 
                    value={order.status} 
                    className='bg-transparent text-white text-xs sm:text-sm font-medium tracking-wide focus:outline-none cursor-pointer w-full'
                  >
                    <option className='bg-gray-900 text-white' value="Order Placed">Order Placed</option>
                    <option className='bg-gray-900 text-white' value="Packing">Packing</option>
                    <option className='bg-gray-900 text-white' value="Shipped">Shipped</option>
                    <option className='bg-gray-900 text-white' value="Out for delivery">Out for delivery</option>
                    <option className='bg-gray-900 text-white' value="Delivered">Delivered</option>
                  </select>
                </div>

              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
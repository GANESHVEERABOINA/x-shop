import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [productsCount, setProductsCount] = useState(0)

  const fetchData = async () => {
    if (!token) return;
    try {
      const orderRes = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (orderRes.data.success) {
        setOrders(orderRes.data.orders)
      }
      const prodRes = await axios.get(backendUrl + '/api/product/list')
      if (prodRes.data.success) {
        setProductsCount(prodRes.data.products.length)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchData();
  }, [token])

  // --- STATS CALCULATIONS ---
  const totalRevenue = orders.reduce((sum, order) => order.payment ? sum + order.amount : sum, 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  
  // Bar Chart Data (Orders Status)
  const statusCounts = { 'Order Placed': 0, 'Packing': 0, 'Shipped': 0, 'Out for delivery': 0, 'Delivered': 0 };
  orders.forEach(o => {
    if (statusCounts[o.status] !== undefined) statusCounts[o.status]++;
  });
  
  const barData = Object.keys(statusCounts).map(key => ({
    name: key.replace('Order Placed', 'Placed').replace('Out for delivery', 'Out'), 
    count: statusCounts[key]
  }));

  // Line Chart Data (Revenue)
  const lineData = [...orders].reverse().slice(-10).map(o => ({
    date: new Date(o.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    amount: o.amount
  }));

  return (
    <div className='text-white w-full max-w-7xl pb-10'>
      
      {/* Top Header like Smart Home */}
      <div className='flex justify-between items-center mb-8 bg-[#1C1C24] p-4 rounded-full border border-white/5 shadow-md'>
          <input 
            type="text" 
            placeholder="Search orders, products..." 
            className="bg-transparent border-none outline-none text-sm text-white px-4 w-full md:w-[300px] placeholder-gray-500"
          />
          <div className='flex gap-3 items-center pr-2'>
            <div className='w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(147,51,234,0.5)]'>JR</div>
          </div>
      </div>

      <h3 className='text-2xl font-bold tracking-wide mb-6 text-white'>Overview</h3>

      {/* --- STATS CARDS (Premium Dark Mode) --- */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8'>
        
        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl hover:shadow-purple-900/20 transition-all duration-300'>
          <p className='text-gray-400 text-xs sm:text-sm font-semibold tracking-widest mb-1'>Total Revenue</p>
          <p className='text-2xl sm:text-4xl font-bold text-white'>{currency}{totalRevenue}</p>
          <p className='text-purple-400 text-xs mt-3'>+12% this month</p>
        </div>

        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl hover:shadow-purple-900/20 transition-all duration-300'>
          <p className='text-gray-400 text-xs sm:text-sm font-semibold tracking-widest mb-1'>Total Orders</p>
          <p className='text-2xl sm:text-4xl font-bold text-white'>{totalOrders}</p>
          <p className='text-purple-400 text-xs mt-3'>Active deliveries</p>
        </div>

        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl hover:shadow-purple-900/20 transition-all duration-300'>
          <p className='text-gray-400 text-xs sm:text-sm font-semibold tracking-widest mb-1'>Delivered</p>
          <p className='text-2xl sm:text-4xl font-bold text-white'>{deliveredOrders}</p>
          <p className='text-purple-400 text-xs mt-3'>Successfully completed</p>
        </div>

        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl hover:shadow-purple-900/20 transition-all duration-300'>
          <p className='text-gray-400 text-xs sm:text-sm font-semibold tracking-widest mb-1'>Total Products</p>
          <p className='text-2xl sm:text-4xl font-bold text-white'>{productsCount}</p>
          <p className='text-purple-400 text-xs mt-3'>In inventory</p>
        </div>

      </div>

      {/* --- CHARTS SECTION --- */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        
        {/* Line Chart */}
        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl'>
          <p className='text-white text-base font-bold tracking-wide mb-6'>Revenue Analytics</p>
          <div className='h-[280px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13131A', border: 'none', borderRadius: '15px', color: '#fff' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#a855f7" strokeWidth={4} dot={{ r: 0 }} activeDot={{ r: 6, fill: '#fff', stroke: '#a855f7', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className='bg-[#1C1C24] border border-white/5 rounded-[2rem] p-6 shadow-xl'>
          <p className='text-white text-base font-bold tracking-wide mb-6'>Order Statistics</p>
          <div className='h-[280px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#13131A', border: 'none', borderRadius: '15px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                />
                <Bar dataKey="count" fill="#a855f7" radius={[6, 6, 6, 6]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
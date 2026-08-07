import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        // --- NEW: Extra Security Check ---
        if (!token) {
            toast.error("Please login to place an order");
            navigate('/login');
            return null;
        }

        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;
                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const inputStyle = 'w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:bg-white/5 transition-colors duration-300';

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-white/10'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-5 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className={inputStyle} type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className={inputStyle} type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className={inputStyle} type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className={inputStyle} type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className={inputStyle} type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className={inputStyle} type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className={inputStyle} type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className={inputStyle} type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className={inputStyle} type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-4 flex-col lg:flex-row'>
                        <div 
                          onClick={() => setMethod('stripe')} 
                          className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-all duration-300 ${method === 'stripe' ? 'bg-white/10 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                            <p className={`min-w-4 h-4 border rounded-full transition-colors duration-300 ${method === 'stripe' ? 'bg-white border-white' : 'border-gray-500'}`}></p>
                            <img className='h-5 mx-4 object-contain filter invert opacity-90' src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        
                        <div 
                          onClick={() => setMethod('razorpay')} 
                          className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'bg-white/10 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                            <p className={`min-w-4 h-4 border rounded-full transition-colors duration-300 ${method === 'razorpay' ? 'bg-white border-white' : 'border-gray-500'}`}></p>
                            <img className='h-5 mx-4 object-contain' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        <div 
                          onClick={() => setMethod('cod')} 
                          className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition-all duration-300 ${method === 'cod' ? 'bg-white/10 border-white/40 shadow-[0_0_10px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                        >
                            <p className={`min-w-4 h-4 border rounded-full transition-colors duration-300 ${method === 'cod' ? 'bg-white border-white' : 'border-gray-500'}`}></p>
                            <p className={`text-sm font-medium mx-4 tracking-wide transition-colors ${method === 'cod' ? 'text-white' : 'text-gray-400'}`}>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-10'>
                        <button 
                          type='submit' 
                          className='bg-white text-black font-semibold text-sm tracking-wide px-12 py-3 rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg'
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
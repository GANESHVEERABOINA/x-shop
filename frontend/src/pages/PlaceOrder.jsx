import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, products, currency } = useContext(ShopContext);

  const [method, setMethod] = useState('cod');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [upiId, setUpiId] = useState('');

  // Fetch Real Addresses from DB for Checkout
  const fetchUserAddresses = async () => {
    try {
      if (!token) return;
      const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
      if (response.data.success && response.data.userData.addresses.length > 0) {
        setAddresses(response.data.userData.addresses);
        setSelectedAddress(response.data.userData.addresses[0]); // Select first address by default
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, [token]);

  const sellingSubtotal = getCartAmount() || 0;
  const mrpTotal = Math.round(sellingSubtotal * 2.2);
  const mrpDiscount = mrpTotal - sellingSubtotal;
  const platformFee = 10;
  const handlingFee = method === 'cod' ? 7 : 0;
  const finalPayable = Math.max(sellingSubtotal + platformFee + handlingFee, 0);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please add a delivery address in your Profile first!');
      navigate('/profile');
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: selectedAddress,
        items: orderItems,
        amount: finalPayable,
      };

      if (method === 'cod' || method === 'upi' || method === 'card') {
        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
        if (response.data.success) {
          setCartItems({});
          toast.success('Order Placed Successfully!');
          navigate('/orders');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!selectedAddress) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white space-y-4">
        <h2 className="text-xl font-bold">No Delivery Address Found</h2>
        <p className="text-gray-400">Please save a delivery address in your profile to proceed with checkout.</p>
        <button onClick={() => navigate('/profile')} className="bg-[#2874f0] text-white font-bold px-6 py-2.5 rounded-lg">
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 text-white">
      {/* Real Delivery Address Bar */}
      <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#2874f0] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Deliver To: {selectedAddress.type || 'HOME'}
            </span>
            <span className="font-bold text-white">
              {selectedAddress.firstName} {selectedAddress.lastName}
            </span>
            <span className="text-gray-400">({selectedAddress.phone})</span>
          </div>
          <p className="text-gray-300 text-xs">
            {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state} - <strong className="text-white">{selectedAddress.zipcode}</strong>
          </p>
        </div>
        <button onClick={() => navigate('/profile')} className="text-xs font-bold text-[#2874f0] border border-[#2874f0]/50 hover:bg-[#2874f0]/10 px-3.5 py-2 rounded-xl">
          Change Address
        </button>
      </div>

      {/* Payment Container */}
      <div className="bg-[#0e0e0e] border border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
          <h1 className="text-base sm:text-lg font-bold text-white">Complete Payment</h1>
          <span className="bg-neutral-900 border border-neutral-700 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-lg">
            🔒 100% Secure
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Payment Methods */}
          <div className="lg:col-span-4 space-y-2.5">
            <div onClick={() => setMethod('cod')} className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${method === 'cod' ? 'bg-[#1a1f2e] border-[#2874f0]' : 'bg-[#141414] border-neutral-800'}`}>
              <span className="text-lg">👍</span>
              <div><p className="text-sm font-bold text-white">Cash on Delivery</p><p className="text-[11px] text-gray-400">Pay at your doorstep</p></div>
            </div>
            <div onClick={() => setMethod('upi')} className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${method === 'upi' ? 'bg-[#1a1f2e] border-[#2874f0]' : 'bg-[#141414] border-neutral-800'}`}>
              <span className="text-lg">📲</span>
              <div><p className="text-sm font-bold text-white">UPI</p><p className="text-[11px] text-gray-400">Pay by any UPI app</p></div>
            </div>
          </div>

          {/* Active Payment Box */}
          <div className="lg:col-span-4 bg-[#141414] border border-neutral-800 rounded-2xl p-5 space-y-4">
            {method === 'cod' && (
              <div className="space-y-4 border-t-2 border-[#ffc200] pt-3">
                <h3 className="text-sm font-bold text-white">Cash on Delivery</h3>
                <button onClick={handlePlaceOrder} className="w-full py-3.5 rounded-xl bg-[#ffc200] hover:bg-[#ffcf33] text-black font-extrabold text-sm shadow-lg transition">
                  Place Order
                </button>
              </div>
            )}
            {method === 'upi' && (
              <div className="space-y-4 border-t-2 border-[#ffc200] pt-3">
                <h3 className="text-sm font-bold text-white">Pay using UPI ID</h3>
                <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="Enter UPI ID" className="w-full bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                <button onClick={handlePlaceOrder} className="w-full py-3.5 rounded-xl bg-[#ffc200] hover:bg-[#ffcf33] text-black font-extrabold text-sm shadow-lg transition">
                  Pay {currency}{finalPayable}
                </button>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="lg:col-span-4 bg-[#151824] border border-indigo-500/20 rounded-2xl p-5 space-y-3.5 text-sm">
            <div className="flex justify-between text-gray-300"><span>MRP Total</span><span className="font-semibold text-white">{currency}{mrpTotal}</span></div>
            <div className="flex justify-between text-gray-400 text-xs"><span>Platform Fee</span><span>{currency}{platformFee}</span></div>
            {handlingFee > 0 && <div className="flex justify-between text-gray-400 text-xs"><span>COD Fee</span><span>{currency}{handlingFee}</span></div>}
            <div className="flex justify-between text-xs"><span className="text-gray-400">MRP Discount</span><span className="text-emerald-400 font-semibold">-{currency}{mrpDiscount}</span></div>
            <div className="border-t border-neutral-700 pt-3 flex justify-between items-center text-base font-extrabold">
              <span className="text-[#60a5fa]">Total Amount</span><span className="text-[#60a5fa]">{currency}{finalPayable}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
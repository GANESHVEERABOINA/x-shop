import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-black text-white px-4'>
        <div className='bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-3xl px-8 py-10 max-w-md w-full'>
            
            <div className='text-center mb-8'>
                <h1 className='text-3xl font-bold tracking-wider mb-2'>Admin Panel</h1>
                <p className='text-gray-400 text-sm'>Enter your credentials to access dashboard</p>
            </div>

            <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
                <div className='w-full'>
                    <p className='text-xs font-semibold text-gray-300 tracking-widest uppercase mb-2'>Email Address</p>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-300' 
                        type="email" 
                        placeholder='your@email.com' 
                        required 
                    />
                </div>

                <div className='w-full'>
                    <p className='text-xs font-semibold text-gray-300 tracking-widest uppercase mb-2'>Password</p>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-300' 
                        type="password" 
                        placeholder='Enter your password' 
                        required 
                    />
                </div>

                <button 
                    className='mt-4 w-full py-3.5 px-4 rounded-full text-black bg-white font-semibold tracking-wide hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-lg cursor-pointer' 
                    type="submit"
                > 
                    Login 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
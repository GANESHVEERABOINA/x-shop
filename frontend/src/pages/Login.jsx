import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPassword] = useState('') // Fixed typo: setPasword -> setPassword
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  // --- Premium Input Styling Reusable Class ---
  const inputStyle = 'w-full bg-black/20 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-white/60 focus:bg-white/10 transition-all duration-300';

  return (
    <div className='flex items-center justify-center min-h-[75vh] px-4'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
          
          {/* Title Area */}
          <div className='inline-flex items-center gap-2 mb-8'>
              <p className='prata-regular text-3xl text-white font-medium tracking-wide'>{currentState}</p>
              <hr className='border-none h-[2px] w-8 bg-white' />
          </div>
          
          {/* Inputs Area */}
          <div className='w-full flex flex-col gap-5'>
            {currentState === 'Login' ? null : (
              <input 
                onChange={(e)=>setName(e.target.value)} 
                value={name} 
                type="text" 
                className={inputStyle} 
                placeholder='Name' 
                required
              />
            )}
            <input 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email} 
              type="email" 
              className={inputStyle} 
              placeholder='Email' 
              required
            />
            <input 
              onChange={(e)=>setPassword(e.target.value)} 
              value={password} 
              type="password" 
              className={inputStyle} 
              placeholder='Password' 
              required
            />
          </div>

          {/* Links Area */}
          <div className='w-full flex justify-between text-sm mt-5 mb-8 text-gray-300 font-medium'>
              <p className='cursor-pointer hover:text-white transition-colors'>Forgot your password?</p>
              {
                currentState === 'Login' 
                ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white'>Create account</p>
                : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white'>Login Here</p>
              }
          </div>
          
          {/* Submit Button */}
          <button className='w-full bg-white text-black font-bold tracking-wide px-8 py-3.5 rounded-xl mt-2 hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>

      </form>
    </div>
  )
}

export default Login
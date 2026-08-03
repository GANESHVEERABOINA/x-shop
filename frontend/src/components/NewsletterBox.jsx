import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 mx-auto max-w-3xl shadow-2xl my-10'>
      
      <p className='text-3xl font-semibold text-white tracking-wide'>
        Subscribe now & get 20% off
      </p>
      
      <p className='text-gray-300 mt-3 text-sm sm:text-base'>
        Join our community and enjoy perks, updates, and more!
      </p>
      
      <form onSubmit={onSubmitHandler} className='w-full sm:w-4/5 flex items-center mx-auto mt-8 bg-black/40 border border-white/20 rounded-full p-1 backdrop-blur-lg shadow-inner'>
        <input 
          className='w-full sm:flex-1 bg-transparent outline-none text-white px-5 placeholder:text-gray-500' 
          type="email" 
          placeholder='Enter your email address...' 
          required
        />
        <button 
          type='submit' 
          className='bg-white text-black font-semibold text-xs sm:text-sm px-8 py-3 rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out'
        >
          SUBSCRIBE
        </button>
      </form>
      
    </div>
  )
}

export default NewsletterBox
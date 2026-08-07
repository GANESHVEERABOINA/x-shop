import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import CategoryNav from '../components/CategoryNav'
import PromoBanners from '../components/PromoBanners' // <-- Kotha Banners Component Import

const Home = () => {
  return (
    <div>
      <CategoryNav /> 
      
      {/* Category icons kinda ee Flipkart style banners vasthayi */}
      <PromoBanners />
      
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
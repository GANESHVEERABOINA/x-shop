import React, { useContext, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import CategoryNav from '../components/CategoryNav'
import CategoryShowcase from '../components/CategoryShowcase'
import { ShopContext } from '../context/ShopContext' // ShopContext import chesam

const Home = () => {
  // DB nunchi anni products thechukuntunnam
  const { products, currency } = useContext(ShopContext);

  const [mensCollection, setMensCollection] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      
      // 1. SECTION: Men's Clothing (Only Category === 'Men' unnavi thesthunnam)
      const menProducts = products.filter(item => item.category === 'Men').slice(0, 8);
      const formattedMens = menProducts.map(item => ({
        id: item._id,
        image: item.image[0],
        title: item.name,
        offer: `${currency}${item.price}` // Price chupisthunnam
      }));
      setMensCollection(formattedMens);

      // 2. SECTION: Today's Hot Deals (Prastuthaniki Bestseller === true unnavi thesthunnam)
      const dealsProducts = products.filter(item => item.bestseller).slice(0, 8);
      const formattedDeals = dealsProducts.map(item => ({
        id: item._id,
        image: item.image[0],
        title: item.name,
        offer: `Hot Deal: ${currency}${item.price}` // Custom text
      }));
      setHotDeals(formattedDeals);

    }
  }, [products, currency]);

  return (
    <div>
      <CategoryNav />
      <Hero />
      <LatestCollection />

      {/* ----------- Dynamic DB Sections ----------- */}
      <div className="my-8">
        
        {/* Idi matram 'Men' category vi chupisthundi */}
        <CategoryShowcase 
          title="Top Men's Collection" 
          items={mensCollection} 
          headerColor="from-blue-900/60" 
        />
        
        {/* Idi matram Bestsellers vi chupisthundi */}
        <CategoryShowcase 
          title="Today's Hot Deals" 
          items={hotDeals} 
          headerColor="from-purple-900/60" 
        />

      </div>
      {/* --------------------------------------------- */}

      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import "/src/App.css"
import Header from '../components/Header'
import FeaturedProducts from '../components/Featuredprod'
import ProductCategories from '../components/ProductsCategory'

const Home = () => {
  const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

  if (loading) {
    return (
        <div className="loading">
            <div className="i"></div>
            <div className="a"></div>
            <div className="u"></div>
        </div>
    );
}

  return (
    <div className="home">
      <Header/>
      <FeaturedProducts/>
      <ProductCategories/>
    </div>
  )
}

export default Home
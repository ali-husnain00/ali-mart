// Header.jsx
import React, { useState, useEffect } from 'react';
import '/src/App.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const images = [
  {
    url: "/src/assets/images/image4.jpg",
    title: "Welcome to Ali Mart",
    description: "Explore the latest trends and products!",
    btn: <Link to="/products"><button className='shop-btn'>Shop Now</button></Link>
  },
  {
    url: "/src/assets/images/image2.jpg",
    title: "Amazing Discounts",
    description: <p>Get up to <span style={{ fontWeight: 'bold', color: 'rgb(230, 230, 45)' }}>50% off</span> on selected items.</p>,
    btn: <Link to="/products"><button className='shop-btn'>Shop Now</button></Link>
  },
    
  {
    url: "/src/assets/images/image3.jpg",
    title: "Fast Delivery",
    description: "We deliver right to your doorstep.",
    btn: <Link to="/products"><button className='shop-btn'>Shop Now</button></Link>
  },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <header className="carousel-header">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={image.url} alt={`Slide ${index + 1}`} />
            <div className="overlay"></div>
            <div className="carousel-content">
            <h2>{image.title}</h2>
            <p>{image.description}</p>
            <div>{image.btn}</div>
          </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </header>
  );
};

export default Header;

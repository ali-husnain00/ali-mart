import React, { useEffect, useState } from 'react';
import '/src/App.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: "Women's clothing", image: 'https://www.shutterstock.com/image-photo/beautiful-colorful-clothes-flying-isolatedwomens-600nw-2257875171.jpg' },
    { id: 3, name: "Men's clothing", image: 'https://img.freepik.com/premium-photo/collection-men-s-clothing-including-jacket-pants-hat_793585-43.jpg' },
    { id: 4, name: 'Jewelery', image: 'https://cache.net-a-porter.com/content/images/story-head-content-24thOctober2022-1666086890596.jpeg/w1900_q65.jpeg' },
];

const ProductCategories = () => {
    const [loading, setLoading] = useState(true);

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
        <section className="product-categories">
            <h2>Shop by Category</h2>
            <div className="product-grid">
                {categories.map((category) => (
                    <Link to={`/category/${category.name.toLowerCase()}`} key={category.id} className="category-card">
                    <img src={category.image} alt={category.name} />
                    <h3>{category.name}</h3>
                </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductCategories;

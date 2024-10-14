import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "/src/App.css"

const CategoryPage = () => {
    const { categoryName } = useParams(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, [categoryName]);

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
        <div className="category-page">
            <h2>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} className="product">
                    <img src={product.image} alt={product.title} />
                    <p className='title'>{product.title}</p>
                    <p>${product.price}</p>
                    <button className='addtocart'>Add to Cart</button>
                </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;

import React, { useEffect, useState, useContext } from 'react';
import '/src/App.css'; 
import { Link } from 'react-router-dom';
import { CartContext } from '/src/components/Cartcontext.jsx';
import Swal from 'sweetalert2'; 

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext); 
    const { cart } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=5'); 
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const isAlreadyInCart = cart.some((item) => item.id === product.id); 

        if (isAlreadyInCart) {
            Swal.fire({
                title: 'Already in Cart!',
                text: `${product.title} is already in your cart.`,
                icon: 'warning',
                confirmButtonText: 'OK',
                timer: 1500,
                showConfirmButton: false,
            });
        } else {
            addToCart(product); 
            Swal.fire({
                title: 'Added to Cart!',
                text: `${product.title} has been added to your cart.`,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    };


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
        <section className="featured-products">
            <h2>Featured Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} />
                            <p className='title'>{product.title}</p>
                            <p>${product.price}</p>
                        </Link>
                        <button onClick={() => handleAddToCart(product)} className='addtocart'>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;

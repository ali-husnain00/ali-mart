import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '/src/components/Cartcontext.jsx';
import Swal from 'sweetalert2'; 

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { cart, addToCart } = useContext(CartContext);

   
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
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

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="product-container">
            <div className="search">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="products-wrapper">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product">
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt={product.title} />
                                <p className="title">{product.title}</p>
                                <p>${product.price}</p>
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="addtocart"
                            >
                                {cart.some((item) => item.id === product.id)
                                    ? 'Already in Cart'
                                    : 'Add to Cart'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Products;

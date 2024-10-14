import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '/src/components/Cartcontext.jsx';
import Swal from 'sweetalert2';
import "/src/App.css";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                if (!response.ok) throw new Error('Failed to fetch product');
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load product details. Please try again later.',
                    icon: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product) {
                const response = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
                const data = await response.json();
                setRelatedProducts(data.filter(item => item.id !== product.id));
            }
        };

        fetchRelatedProducts();
    }, [product]);

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

    const { image, title, description, price } = product; // Destructuring product

    return (
        <div className="product-details">
            <div className="detailscard">
                <div className="prod-img">
                    <img src={image} alt={title} />
                </div>
                <div className="prod-details">
                    <h1>{title}</h1>
                    <h4>Description:</h4>
                    <p>{description}</p>
                    <h2>${price}</h2>
                    <div>
                        <button onClick={() => handleAddToCart(product)} className='addtocart'>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="related-products">
                <div className="related-heading">
                    <h2>Related Products</h2>
                </div>
                <div className='relatedproducts'>
                    {relatedProducts.map(related => (
                        <Link to={`/product/${related.id}`} className="product" key={related.id}>
                            <img src={related.image} alt={related.title} />
                            <p className='title'>{related.title}</p>
                            <p>${related.price}</p>
                            <button onClick={() => handleAddToCart(related)} className='addtocart'>Add to Cart</button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

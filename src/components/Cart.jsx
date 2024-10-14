import React, { useContext } from 'react';
import { CartContext } from '/src/components/Cartcontext.jsx';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import Swal from 'sweetalert2'; 
import '/src/App.css';
import { useNavigate } from 'react-router';
import { useAuth } from '/src/components/AuthContext.jsx';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
    const { user, logout } = useAuth();
    const navigate  = useNavigate();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleRemoveFromCart = (id, title) => {
        removeFromCart(id);
        toast.success(`Item removed from cart!`); 
    };

    const handleClearCart = () => {
        clearCart();
        Swal.fire({
            title: 'Cart cleared!',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 1500,
            showConfirmButton: false,
        });
    };
    
    if (cart.length === 0) {
        return <div className='emptycart'><h1>Your Cart is Empty.</h1></div>;
    }

    return (
        <div className='cart'>
            <h2>Your Shopping Cart</h2>
            <p>Welcome, {user.username}!</p>
            <ul>
                {cart.map((item) => (
                    <li key={item.id} className='cart-product'>
                        <div className="cart-img">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="cart-info">
                            <p>{item.title}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <div className="quantity-controls">
                                <button className='plus'
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                <button className='minus'
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                            </div>
                            <div>
                                <button className='remove' onClick={() => handleRemoveFromCart(item.id, item.title)}>Remove</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <h3>Total Price: ${getTotalPrice()}</h3>
            <div className='cart-actions'>
                <button onClick={() =>navigate("/checkout")} className='addtocart'>Checkout</button>
                <button className='clear-btn' onClick={handleClearCart}>Clear Cart</button>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default Cart;

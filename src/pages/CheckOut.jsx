import React, { useContext, useState } from 'react';
import { CartContext } from '/src/components/Cartcontext.jsx';
import Swal from 'sweetalert2';
import "/src/App.css";
import { useNavigate } from 'react-router';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit card');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!name || !address) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

       else{
        Swal.fire({
            title: 'Order Placed!',
            text: 'Thank you for your order!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
        setName('');
        setAddress('');
        setPaymentMethod('credit card');
        clearCart();
        navigate("/");
       }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className='checkout-form'>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Payment Method:</label>
                    <select 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)} 
                    >
                        <option value="credit card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank transfer">Bank Transfer</option>
                    </select>
                </div>
                <h3>Order Summary</h3>
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.title} - ${item.price}
                        </li>
                    ))}
                </ul>
                <h3>Total: ${calculateTotal()}</h3>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;

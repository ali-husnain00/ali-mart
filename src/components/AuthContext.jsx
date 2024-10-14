// /src/components/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

    const login = (username, password) => {
        if (username === 'Admin' && password === 'Ali-husnain') {
            setUser({ username });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
    };

   
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) setCart(savedCart);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, cart, addToCart, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

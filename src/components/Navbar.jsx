import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '/src/components/Cartcontext.jsx';
import { AuthContext } from '/src/components/AuthContext.jsx'; // Import AuthContext
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "/src/App.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { getTotalItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const totalItems = getTotalItems();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <h1 onClick={() => navigate("/")} className={scrolled ? 'scrolled' : ''}>
                    <i className="fa-solid fa-store"></i>Ali <span>Mart</span>
                </h1>
            </div>
            <ul>
                <li>
                    <NavLink to="/" exact className={`navlink ${scrolled ? 'scrolled' : ''}`} activeClassName="active">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={`navlink ${scrolled ? 'scrolled' : ''}`} activeClassName="active">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={`navlink ${scrolled ? 'scrolled' : ''}`} activeClassName="active">
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div className="cart-icon">
                <ul className={scrolled ? 'scrolled' : ''}>
                    <Link className={scrolled ? 'scrolled' : ''} to="/cart">
                        Cart <i className="fa-solid fa-cart-shopping"></i>
                        <div className={`cartlength ${scrolled ? 'scrolled' : ''}`}>{totalItems}</div>
                    </Link>
                    {user ? (
                        <li onClick={handleLogout} className={scrolled ? 'scrolled' : ''} style={{ cursor: 'pointer' }}>Logout</li> 
                    ) : (
                        <Link to="/login" className={scrolled ? 'scrolled' : ''}>
                            <li>Login</li>
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

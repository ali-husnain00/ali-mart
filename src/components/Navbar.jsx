import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '/src/components/Cartcontext.jsx';
import { AuthContext } from '/src/components/AuthContext.jsx'; 
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "/src/App.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { getTotalItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const totalItems = getTotalItems();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

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

    const handleToggle = () =>{
        setIsOpen(!isOpen);
    }

    const handleCloseMenu = () =>{
        setIsOpen(false);
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <h1 onClick={() => navigate("/")} className={scrolled ? 'scrolled' : ''}>
                    <i className="fa-solid fa-store"></i>Ali <span>Mart</span>
                </h1>
            </div>
            <div className={`nav-links ${isOpen ? 'OpenMenu' : 'CloseMenu'}`}>
                <div className="close-icon">
                    <i onClick={handleToggle} className="fa fa-solid fa-xmark"></i>
                </div>
            <ul className='pages-links'>
                <li>
                    <NavLink onClick={handleCloseMenu} 
                        to="/" 
                        exact="true" 
                        className={`navlink ${scrolled ? 'scrolled' : ''}`} 
                        activeClassName="active"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={handleCloseMenu}
                        to="/products" 
                        className={`navlink ${scrolled ? 'scrolled' : ''}`} 
                        activeClassName="active"
                    >
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={handleCloseMenu} 
                        to="/contact" 
                        className={`navlink ${scrolled ? 'scrolled' : ''}`} 
                        activeClassName="active"
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
            <div className="cart-icon">
                <ul className={scrolled ? 'scrolled' : ''}>
                    <Link className={scrolled ? 'scrolled' : ''} to="/cart" onClick={handleCloseMenu}>
                        Cart <i className="fa-solid fa-cart-shopping"></i>
                        <div className={`cartlength ${scrolled ? 'scrolled' : ''}`}>{totalItems}</div>
                    </Link>
                    {user ? (
                        <li 
                            onClick={handleLogout} 
                            className={scrolled ? 'scrolled' : ''} 
                            style={{ cursor: 'pointer', backgroundColor: "rgb(230, 230, 45)", padding: "10px", borderRadius: "5px", }}
                        >
                            Logout
                        </li>
                    ) : (
                        <Link to="/login" className={scrolled ? 'scrolled' : ''} onClick={handleCloseMenu}>
                            <li>Login</li>
                        </Link>
                    )}
                </ul>
            </div>
            </div>
            <div className="menu-icon">
                <i onClick={handleToggle} className="fa fa-solid fa-bars"></i>
            </div>
        </nav>
    );
};

export default Navbar;

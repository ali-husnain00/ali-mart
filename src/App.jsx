import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/Navbar.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import Footer from './components/Footer.jsx';
import ProductDetails from './pages/Productsdetail.jsx';
import { CartProvider } from '/src/components/Cartcontext.jsx';
import Cart from './components/Cart.jsx';
import ProtectedRoute from '/src/components/ProtectedRoute.jsx';
import Login from '/src/pages/Login.jsx';
import Checkout from './pages/CheckOut.jsx';


function App() {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/checkout" element={<Checkout/>} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/product/:productId"
                        element={<ProductDetails />}
                    />

                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;

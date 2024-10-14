import React, { useState, useEffect } from 'react';
import { useAuth } from '/src/components/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import "/src/App.css";

const Login = () => {
    const { login, user, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAuthenticated = login(username, password);
        if (!isAuthenticated) {
            setError('Invalid username or password');
        } else {
            setError('');
            navigate('/'); 
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className='form'>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Ali-husnain"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className='login-btn'>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

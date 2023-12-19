import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import jweather from '../assets/jweather.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isValidEmail = (email:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password !== 'test1234') {
            setError('Invalid password.');
            return;
        }
        localStorage.setItem('user', JSON.stringify({ email }));
        navigate('/');
    };

    useEffect(() => {
        setError('');
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative">
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                {error && <div className="bg-danger px-4 py-2 rounded text-white font-semibold">{error}</div>}
            </div>
            <div className="bg-gray-500/[0.8] rounded-lg p-6 md:p-16 relative max-h-[80%] max-w-[600px] flex flex-col items-center">
                <img src={jweather} alt="jweather logo" className='w-[120px] mb-8' />
                <form onSubmit={handleSubmit} className="w-full min-w-[300px] flex flex-col gap-4">
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-white placeholder-gray-400"
                    />
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-primary text-white placeholder-gray-400"
                    />
                    <button type="submit" className="bg-primary text-white py-2 px-4 w-full">
                        Login
                    </button>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;

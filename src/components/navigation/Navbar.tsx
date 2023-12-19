import React from 'react';
import jweather from '../../assets/jweather.svg';

const Navbar = () => {
    return (
        <nav className="bg-gray-300 flex items-center">
            <div className="w-[90%] max-w-[1200px] mx-auto py-4 flex items-center justify-between">
                <img src={jweather} alt="jweather logo" className='w-[120px]' />
                <button className="bg-secondary/[0.8] hover:bg-secondary text-white py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

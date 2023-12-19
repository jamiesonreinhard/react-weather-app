import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import Home from './pages/Home';
import City from './pages/City';
import PrivateRoute from './components/routes/private';

const Main = () => {
    const [units, setUnits] = useState(() => {
        const units = localStorage.getItem('units') ?? null;
        if (units) {
            return JSON.parse(units);
        }
        return { value: 'imperial', display: 'Fahrenheit' };
    });
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login' && (
                <Navbar units={units} setUnits={setUnits} />
            )}
            <Routes>
                <Route path="/" element={<PrivateRoute><Home units={units} /></PrivateRoute>} />
                <Route path="/city/:id" element={<PrivateRoute><City units={units} /></PrivateRoute>} />
            </Routes>
        </div>
    );
};

export default Main;

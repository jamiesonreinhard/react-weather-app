import React from 'react';
import jweather from '../../assets/jweather.svg';
import settings from '../../assets/settings.svg';
import ModalWrapper from '../utility/ModalWrapper';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    units: any;
    setUnits: React.Dispatch<React.SetStateAction<any>>;
}

const Navbar: React.FC<NavbarProps> = ({
    units,
    setUnits
}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleUnitChange = (event:any) => {
        const selectedValue = event.target.value;
        const selectedUnit = selectedValue === 'imperial' 
            ? { value: 'imperial', display: 'Fahrenheit' }
            : { value: 'metric', display: 'Celsius' };
        setUnits(selectedUnit);
        localStorage.setItem('units', JSON.stringify(selectedUnit));
    };

    const logout = () => {
        localStorage.removeItem('units');
        localStorage.removeItem('trackedCities');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <div className='relative'>
            <nav className="bg-gray-300 flex items-center">
                <div className="w-[90%] max-w-[1200px] mx-auto py-4 flex items-center justify-between">
                    <img src={jweather} alt="jweather logo" className='w-[120px]' />
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMenuOpen(true)}>
                            <img src={settings} alt="settings icon" />
                        </button>
                        <button
                            className="bg-secondary/[0.8] hover:bg-secondary text-white py-2 px-4 rounded"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </nav>
            {isMenuOpen && (
                <ModalWrapper closeModal={() => setIsMenuOpen(false)}>
                    <h2 className="text-white text-3xl font-bold mb-8">Settings</h2>
                    <div className="mt-4 flex items-center">
                        <label htmlFor="unit-select" className="text-white mr-4 whitespace-nowrap">Temperature Unit:</label>
                        <select 
                            id="unit-select" 
                            value={units.value} 
                            onChange={handleUnitChange}
                            className="bg-gray-200 text-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-primary focus:border-primary"
                        >
                            <option value="imperial">Fahrenheit</option>
                            <option value="metric">Celsius</option>
                        </select>
                    </div>
                </ModalWrapper>
            )}
        </div>

    );
};

export default Navbar;

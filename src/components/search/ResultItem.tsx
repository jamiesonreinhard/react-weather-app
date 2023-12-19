import { useEffect, useState } from "react";
import PlusCircle from "../icons/PlusCircle";
import { fetchWeatherByCity } from "../../services/weatherService";

interface ResultItemProps {
    city: {
        id: string;
        name: string;
        state?: string;
        country: string;
        lat: number;
        lon: number;
    };
    trackedCities: any[];
    setTrackedCities: React.Dispatch<React.SetStateAction<any[]>>;
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    units: any;
}

const ResultItem: React.FC<ResultItemProps> = ({
    city,
    trackedCities,
    setTrackedCities,
    setShowResults,
    units
}) => {
    const [hovered, setHovered] = useState(false);

    const addCityToTracked = async () => {
        setShowResults(false);
        const cityId = `${city.lat.toFixed(2)},${city.lon.toFixed(2)}`;
        if(trackedCities.some((trackedCity) => (trackedCity.id === cityId))) {
            return;
        }
        const weather = await fetchWeatherByCity(city.lat, city.lon, units.value);
        const cityWithId = { ...city, id: cityId, weather: weather };
        setTrackedCities((prev) => [...prev, cityWithId]);
    };

    return (
        <button
            className="flex items-center justify-between w-full py-2 px-2 bg-gray-100 rounded-lg border hover:border-secondary"
            onClick={addCityToTracked}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span>{city.name}, {city.state || city.country}</span>
            <div className="">
                <PlusCircle stroke={hovered ? '#03DAC6' : ''} fill={hovered ? '#03DAC6' : ''} />
            </div>
        </button>
    );
};

export default ResultItem;

import trash from "../../assets/trash.svg";
import { useNavigate } from "react-router-dom";

interface CityIndexCardProps {
    city: any;
    units: any;
    trackedCities: any[];
    setTrackedCities: React.Dispatch<React.SetStateAction<any[]>>;
}

const CityIndexCard: React.FC<CityIndexCardProps> = ({ city, units, trackedCities, setTrackedCities }) => {
    const navigate = useNavigate();

    const removeFromTracked = () => {
        setTrackedCities(trackedCities.filter((trackedCity) => {
            const cityId = `${city.lat.toFixed(2)},${city.lon.toFixed(2)}`;
            return trackedCity.id !== cityId;
        }));
    }

    const getCityName = (city: any) => {
        return `${city.name}, ${city.state || city.country}`;
    }

    const navigateToCityDetails = () => {
        navigate(`/city/${city.name}-${city.lat}`, { state: { city } });
    }

    return (
        <div className="flex flex-col p-4 rounded-lg bg-gray-100 w-full sm:w-[48%] xl:w-[31%] relative">
            <div className="flex w-full items-center justify-between mb-4">
                {getCityName(city).substring(0, 20)}{getCityName(city).length > 20 && '...'}
                <button onClick={removeFromTracked}>
                    <img src={trash} alt="remove from list" />
                </button>
            </div>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold">{Math.round(city.weather.main.temp)}°{units.display.charAt(0)}</span>
                    <div className="flex flex-col">
                        <span className="text-sm">Feels like {Math.round(city.weather.main.feels_like)}°</span>
                        <span className="text-sm">{city.weather.weather[0].description}</span>
                        <span className="text-sm">High: {Math.round(city.weather.main.temp_max)}°</span>
                        <span className="text-sm">Low: {Math.round(city.weather.main.temp_min)}°</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm">Humidity: {city.weather.main.humidity}%</span>
                </div>
            </div>
            <button
                onClick={navigateToCityDetails}
                className="text-[14px] absolute bottom-2 right-2 mt-4 py-1 px-2 bg-accent/[0.8] text-white rounded"
            >
                View Details
            </button>
        </div>
    );
};

export default CityIndexCard;

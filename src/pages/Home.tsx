import React, { useEffect, useState } from "react";
import LocationSearch from "../components/search/LocationSearch";
import CityIndexCard from "../components/cards/CityIndexCard";
import { fetchWeatherByCity } from "../services/weatherService";

interface HomeProps {
    units: any;
}

const Home: React.FC<HomeProps> = ({
    units
}) => {
    const [trackedCities, setTrackedCities] = useState<any[]>(() => {
        const cities = localStorage.getItem("trackedCities");
        if (cities) {
            return JSON.parse(cities);
        }
        return [];
    });

    const updateWeatherForAllCities = async () => {
        try {
            const updatedCities = await Promise.all(trackedCities.map(async city => {
                try {
                    const weatherData = await fetchWeatherByCity(city.lat, city.lon, units.value);
                    return { ...city, weather: weatherData };
                } catch (error) {
                    console.error('Error fetching weather for city:', city.name, error);
                    return city;
                }
            }));
            setTrackedCities(updatedCities);
        } catch (error) {
            console.error('Error updating weather for all cities:', error);
        }
    };


    useEffect(() => {
        localStorage.setItem('trackedCities', JSON.stringify(trackedCities));
    }, [trackedCities]);

    useEffect(() => {
        updateWeatherForAllCities();
    }, [units]);

    return (
        <div className="w-[90%] max-w-[1200px] mx-auto py-[80px] text-white">
            <div className="flex flex-col sm:flex-row sm:items-center w-full justify-between mb-12 gap-4">
                <h1 className="text-4xl font-bold">My Cities</h1>
                <LocationSearch
                    trackedCities={trackedCities}
                    setTrackedCities={setTrackedCities}
                    units={units}
                />
            </div>
            <div className="flex items-start gap-4 flex-wrap">
                {trackedCities.map((city: any) => (
                    <CityIndexCard
                        key={city.id}
                        city={city}
                        trackedCities={trackedCities}
                        setTrackedCities={setTrackedCities}
                    />
                ))}
            </div>
            {trackedCities.length === 0 && (
                <div className="text-2xl mr-auto text-gray-500">No cities added yet!</div>
            )}
        </div>
    );
}

export default Home;

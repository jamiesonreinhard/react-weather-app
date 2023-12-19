import React, { useEffect, useState } from "react";
import LocationSearch from "../components/search/LocationSearch";
import CityIndexCard from "../components/cards/CityIndexCard";
import { fetchWeatherByCity } from "../services/weatherService";

const Home = () => {
    const [trackedCities, setTrackedCities] = useState<any[]>(() => {
        const cities = localStorage.getItem("trackedCities");
        if (cities) {
            return JSON.parse(cities);
        }
        return [];
    });

    const updateWeatherForAllCities = async () => {
        const updatedCities:any = await Promise.all(trackedCities.map(async city => {
          const weatherData = await fetchWeatherByCity(city.lat, city.lon);
          return { ...city, weatherData };
        }));
        
        setTrackedCities(updatedCities);
      };

    useEffect(() => {
        localStorage.setItem('trackedCities', JSON.stringify(trackedCities));
    }, [trackedCities]);

    useEffect(() => {
        updateWeatherForAllCities();
    }, []);

    return (
        <div className="w-[90%] max-w-[1200px] mx-auto py-[80px] text-white">
            <div className="flex items-center w-full justify-between mb-12">
                <h1 className="text-4xl font-bold">My Cities</h1>
                <LocationSearch trackedCities={trackedCities} setTrackedCities={setTrackedCities} />
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
        </div>
    );
}

export default Home;

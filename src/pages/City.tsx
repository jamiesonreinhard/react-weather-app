import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { fetchForecastData } from "../services/weatherService";
import ForecastCard from "../components/cards/ForecastCard";

const City = () => {
    const location = useLocation();
    const city = location.state?.city;
    const [forecastDays, setForecastDays] = useState<any[] | null>(null);

    const processForecastData = (forecasts:any) => {
        let dailyData:any = {};
    
        forecasts.forEach((forecast:any) => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    
            if (!dailyData[day]) {
                dailyData[day] = {
                    high: -Infinity,
                    low: Infinity,
                    overcast: forecast.weather[0].main,
                    date: date,
                    rawForecasts: []
                };
            }
    
            dailyData[day].high = Math.max(dailyData[day].high, forecast.main.temp_max);
            dailyData[day].low = Math.min(dailyData[day].low, forecast.main.temp_min);
            dailyData[day].rawForecasts.push(forecast);
        });
    
        return Object.values(dailyData).slice(0, 5);
    };



    useEffect(() => {
        const loadForecast = async () => {
            if (city.id) {
                const lat = city.id.split(",")[0];
                const lon = city.id.split(",")[1];
                const data = await fetchForecastData(parseInt(lat), parseInt(lon));
                setForecastDays(processForecastData(data?.list || []));
            }
        };

        loadForecast();
    }, [city]);

    if (!forecastDays) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="w-[90%] max-w-[1200px] mx-auto py-[80px] text-white">
            <div className="flex flex-col w-full">
                <Link to="/" className="mb-12 mr-auto py-2 px-4 bg-primary rounded">Back to all cities</Link>
                <h1 className="text-4xl font-bold mb-12">{`${city?.name}, ${city?.state || city?.country}`} <span className="text-secondary">(5 day forecast)</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {forecastDays.map((dayForecast, index) => (
                        <ForecastCard key={index} dayForecast={dayForecast} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default City;

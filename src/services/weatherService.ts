import axios from 'axios';
import { log } from 'console';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org';

// Define types for your data

interface City {
    name: string;
    local_names: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: [
        {
            description: string;
            icon: string;
            id: number;
            main: string;
        }
    ];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
}

interface ForecastData {
    list: {
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        weather: [{
            id: number;
            main: string;
            description: string;
            icon: string;
        }];
    }[];
    city: {
        id: number;
        name: string;
    };
}

const cacheBustUrl = (url:string) => `${url}&_=${new Date().getTime()}`;

// Function to fetch the 5-day forecast
const fetchForecastData = async (lat: number, lon: number, units:string): Promise<ForecastData | null> => {
    try {
        const response = await axios.get<ForecastData>(cacheBustUrl(`${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`));
        
        return response.data;
    } catch (error) {
        console.error('Error fetching 5-day forecast', error);
        return null;
    }
};

// Function to fetch weather by city name
const fetchCities = async (query: string): Promise<City[] | null> => {
    try {
        const response = await axios.get<City[]>(cacheBustUrl(`${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`));
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data', error);
        return null;
    }
};

const fetchWeatherByCity = async (lat: number, lon: number, units:string): Promise<WeatherData | null> => {
    try {
        const response = await axios.get<WeatherData>(cacheBustUrl(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`));
        
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data', error);
        return null;
    }
};

export { fetchCities, fetchWeatherByCity, fetchForecastData };
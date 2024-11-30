import axios from 'axios';
import type { DailyWeather, WeatherData, WeatherForecast } from '../types/WeatherForcastType';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!API_KEY || API_KEY === 'your-api-key-here') {
    console.warn("API_KEY is not set. Please provide a valid key in the .env file.");
    throw new Error("OPENWEATHER_API_KEY ist nicht definiert!");
}

const getWindDirection = (deg: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
};

export const transformWeatherData = (forecast: WeatherForecast): DailyWeather[] => {
    const cityName = forecast.city.name;

    const groupedData = forecast.list.reduce((groupedWeather, weatherEntry) => {
        const date = weatherEntry.dt_txt.split(" ")[0];


        if (!groupedWeather[date]) {
            groupedWeather[date] = [];
        }


        groupedWeather[date].push({
            time: weatherEntry.dt_txt,
            city: cityName,
            temperatureMin: weatherEntry.main.temp_min,
            temperatureMax: weatherEntry.main.temp_max,
            rainProbability: weatherEntry.weather[0].main === "Rain" ? 80 : 10,
            rainVolume: weatherEntry.rain ? weatherEntry.rain["3h"] || 0 : 0,
            humidity: weatherEntry.main.humidity,
            weatherDescription: weatherEntry.weather[0].description,
            windSpeed: weatherEntry.wind.speed,
            windDirection: getWindDirection(weatherEntry.wind.deg),
        });

        return groupedWeather;
    }, {} as { [date: string]: WeatherData[] });


    return Object.entries(groupedData).map(([date, forecasts]) => ({
        date,
        forecasts,
    }));
};


export const getForecastData = async (city: string): Promise<DailyWeather[]> => {
    try {
        const response = await axios.get<WeatherForecast>(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                units: "metric",
                appid: API_KEY,
            },
        });

        return transformWeatherData(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch weather data.");
    }
};

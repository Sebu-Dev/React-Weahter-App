import axios from 'axios';
import type { DailyWeather, WeatherData, WeatherForecast } from '../types/WeatherForcastType';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

console.log(API_KEY);
if (!API_KEY) {
    throw new Error("OPENWEATHER_API_KEY ist nicht definiert!");
}

const getWindDirection = (deg: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
};

export const transformWeatherData = (forecast: WeatherForecast): DailyWeather[] => {
    const groupedData: { [date: string]: WeatherData[] } = {};


    forecast.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!groupedData[date]) groupedData[date] = [];

        groupedData[date].push({
            temperatureMin: entry.main.temp_min,
            temperatureMax: entry.main.temp_max,
            rainProbability: entry.weather[0].main === "Rain" ? 80 : 10,
            rainVolume: entry.rain ? entry.rain["3h"] || 0 : 0,
            humidity: entry.main.humidity,
            weatherDescription: entry.weather[0].description,
            windSpeed: entry.wind.speed,
            windDirection: getWindDirection(entry.wind.deg),
        });
    });

    return Object.entries(groupedData).map(([date, forecasts]) => ({
        date,
        forecasts,
    }));
};

export const getForecastData = async (city: string): Promise<DailyWeather[]> => {
    const response = await axios.get<WeatherForecast>(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            units: "metric",
            appid: API_KEY,
        },
    });

    console.log(transformWeatherData(response.data));
    return transformWeatherData(response.data);
};

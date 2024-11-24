// src/services/weatherService.ts
import axios from 'axios';

const API_KEY = '';
const BASE_URL = '';

export const getWeatherData = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('loading weatherdata faild:', error);
        throw error;
    }
};
export const getForecastData = async (city: string) => {
    const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
        },
    });
    console.log(response.data)
    return response.data;
};

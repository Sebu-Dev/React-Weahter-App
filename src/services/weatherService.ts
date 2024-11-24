// src/services/weatherService.ts
import axios from 'axios';

const API_KEY = '054a1f4685fe0574192d707a41260b68';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

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

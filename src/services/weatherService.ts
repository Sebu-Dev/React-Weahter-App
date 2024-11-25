import axios from 'axios';






const BASE_URL = 'https://api.openweathermap.org/data/2.5/';


const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

console.log(API_KEY);
if (!API_KEY) {
    throw new Error("OPENWEATHER_API_KEY ist nicht definiert!");
}


export const getWeatherData = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Fehler beim Laden der Wetterdaten:', error);
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

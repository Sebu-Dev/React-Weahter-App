export interface WeatherForecast {
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
    };
    list: Array<{
        dt: number;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
        };
        rain?: {
            '3h': number; // Regenmenge in den letzten 3 Stunden
        };
        dt_txt: string;
    }>;
}

export type WeatherData = {
    time: string;
    city: string;
    temperatureMin: number;
    temperatureMax: number;
    rainProbability: number;
    rainVolume: number;
    humidity: number;
    weatherDescription: string;
    windSpeed: number;
    windDirection: string;
};

export type DailyWeather = {
    date: string;
    forecasts: WeatherData[]; // Vorhersagen in 3-Stunden-Schritten
};
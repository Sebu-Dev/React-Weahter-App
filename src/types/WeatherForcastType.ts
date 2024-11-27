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
    temperatureMin: number; // Temperatur Minimum
    temperatureMax: number; // Temperatur Maximum
    rainProbability: number; // Regenwahrscheinlichkeit (%)
    rainVolume: number; // Regenmenge (Liter pro Quadratmeter)
    humidity: number; // Luftfeuchtigkeit (%)
    weatherDescription: string; // Beschreibung des Wetters (z. B. "leicht bewölkt")
    windSpeed: number; // Windgeschwindigkeit (km/h)
    windDirection: string; // Windrichtung (z. B. "Nordwest")
};

export type DailyWeather = {
    date: string; // Datum des Tages
    forecasts: WeatherData[]; // Vorhersagen in 3-Stunden-Schritten
};
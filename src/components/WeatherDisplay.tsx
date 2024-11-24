import React from 'react';
import {
    WiCloudy,
    WiDaySunny,
    WiFog,
    WiHumidity,
    WiRain,
    WiSnow,
    WiStrongWind,
    WiThunderstorm,
} from 'react-icons/wi';
import WeatherForecastNav from './WeatherForecastNav';

interface WeatherProps {
    city: string;
    temperature: number;
    weather: string;
    wind: number;
    humidity: number;
    date: number;
    handleDaySelect: (day: number) => void;
}

const WeatherDisplay: React.FC<WeatherProps> = ({
    city,
    temperature,
    weather,
    wind,
    humidity,
    date,
    handleDaySelect,
}) => {

    const formatDate = (timestamp: number) => {
        if (!timestamp) return 'Invalid Date';
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        };
        return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
    };

    // Funktion, um das passende Icon basierend auf dem Wetter auszuwählen
    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case 'Clear':
                return <WiDaySunny size={40} title="Clear Sky" />;
            case 'Clouds':
                return <WiCloudy size={40} title="Cloudy" />;
            case 'Rain':
                return <WiRain size={40} title="Rainy" />;
            case 'Thunderstorm':
                return <WiThunderstorm size={40} title="Thunderstorm" />;
            case 'Snow':
                return <WiSnow size={40} title="Snowy" />;
            case 'Mist':
            case 'Fog':
                return <WiFog size={40} title="Foggy" />;
            default:
                return <WiStrongWind size={40} title="Windy" />;
        }
    };




    return (
        <div className="card mb-4 shadow, card-transparent">
            {/* Die Wettervorhersage für die nächsten 5 Tage */}
            <WeatherForecastNav onDaySelect={handleDaySelect} />

            <div className="card-body text-center">
                <h2 className="card-title">{city}</h2>
                <p className="card-text text-muted">{formatDate(date)}</p>
                {/* Dynamisches Wetter-Icon */}
                <div className="d-flex flex-column align-items-center mt-3">
                    {getWeatherIcon(weather)}
                </div>
                <div className="weather-details d-flex flex-wrap justify-content-center gap-4 mt-4">
                    {/* Temperatur */}
                    <div className="d-flex flex-column align-items-center">
                        <WiDaySunny size={40} title="Temperature" />
                        <span>{temperature.toFixed(1)}°C</span>
                    </div>
                    {/* Luftfeuchtigkeit */}
                    <div className="d-flex flex-column align-items-center">
                        <WiHumidity size={40} title="Humidity" />
                        <span>{humidity}%</span>
                    </div>
                    {/* Windgeschwindigkeit */}
                    <div className="d-flex flex-column align-items-center">
                        <WiStrongWind size={40} title="Wind Speed" />
                        <span>{wind.toFixed(1)} km/h</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;

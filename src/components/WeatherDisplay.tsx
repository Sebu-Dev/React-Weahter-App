import React from "react";
import {
    WiCloudy,
    WiDaySunny,
    WiFog,
    WiHumidity,
    WiRain,
    WiSnow,
    WiStrongWind,
    WiThunderstorm,
} from "react-icons/wi";

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
        if (!timestamp) return "Invalid Date";
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            day: "numeric",
            month: "short",
        };
        return new Date(timestamp * 1000).toLocaleDateString("en-US", options);
    };

    // Funktion, um das passende Icon basierend auf dem Wetter auszuwählen
    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case "Clear":
                return <WiDaySunny size={40} title="Clear Sky" />;
            case "Clouds":
                return <WiCloudy size={40} title="Cloudy" />;
            case "Rain":
                return <WiRain size={40} title="Rainy" />;
            case "Thunderstorm":
                return <WiThunderstorm size={40} title="Thunderstorm" />;
            case "Snow":
                return <WiSnow size={40} title="Snowy" />;
            case "Mist":
            case "Fog":
                return <WiFog size={40} title="Foggy" />;
            default:
                return <WiStrongWind size={40} title="Windy" />;
        }
    };

    return (
        <div className="card mb-4 shadow">
            <div className="mt-4">
                <h2 className="text-center">{city}</h2>
                <p className="text-center">{formatDate(date)}</p>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="text-center">Temperature</th>
                                <th className="text-center">Wind</th>
                                <th className="text-center">Humidity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    <div>
                                        {getWeatherIcon(weather)}
                                    </div>
                                    <span>{temperature.toFixed(1)}°C</span>
                                </td>
                                <td className="text-center">
                                    <div>
                                        <WiStrongWind size={40} title="Wind Speed" />
                                    </div>
                                    <span>{wind.toFixed(1)} km/h</span>
                                </td>
                                <td className="text-center">
                                    <div>
                                        <WiHumidity size={40} title="Humidity" />
                                    </div>
                                    <span>{humidity}%</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;

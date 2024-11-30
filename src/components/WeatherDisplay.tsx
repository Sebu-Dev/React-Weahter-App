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
import type { WeatherData } from "../types/WeatherForcastType";

interface WeatherProps {
    weatherData: WeatherData;
    handleDaySelect: (day: number) => void;
}

const WeatherDisplay: React.FC<WeatherProps> = ({
    weatherData,
    handleDaySelect,
}) => {
    const {
        city,
        time,
        humidity,
        temperatureMin: tempMin,
        temperatureMax: tempMax,
        windSpeed: wind,
        rainProbability,
        rainVolume,
        weatherDescription,
    } = weatherData;

    // Funktion, um das passende Icon basierend auf dem Wetter auszuwählen
    const getWeatherIcon2 = (condition: string) => {

        switch (condition) {
            case "Clear":
                return <WiDaySunny size={40} title="Clear Sky" />;
            case "Clouds":
                return <WiCloudy size={40} title="Cloudy" />;
            case "Rain":
                return <WiRain size={40} title="Rainy" />;
            case "light rain":
                return <WiRain size={40} title="Rainy" />;
            case "Thunderstorm":
                return <WiThunderstorm size={40} title="Thunderstorm" />;
            case "Snow":
                return <WiSnow size={40} title="Snowy" />;
            case "Mist":
            case "Fog":
                return <WiFog size={40} title="Foggy" />;
            default:
                return <div></div>;
        }
    };

    const getWeatherIcon = (condition: string) => {
        const normalizedCondition = condition.toLowerCase();

        if (normalizedCondition.includes("clear")) {
            return <WiDaySunny size={40} title="Clear Sky" />;
        }
        if (normalizedCondition.includes("cloud")) {
            return <WiCloudy size={40} title="Cloudy" />;
        }
        if (normalizedCondition.includes("rain")) {
            return <WiRain size={40} title="Rainy" />;
        }
        if (normalizedCondition.includes("thunderstorm")) {
            return <WiThunderstorm size={40} title="Thunderstorm" />;
        }
        if (normalizedCondition.includes("snow")) {
            return <WiSnow size={40} title="Snowy" />;
        }
        if (normalizedCondition.includes("mist") || normalizedCondition.includes("fog")) {
            return <WiFog size={40} title="Foggy" />;
        }
        if (normalizedCondition.includes("wind")) {
            return <WiStrongWind size={40} title="Windy" />;
        }

        // Fallback für unbekannte Bedingungen
        return <div title="Unknown Condition">🌍</div>;
    };

    return (

        <div className="card mb-4 shadow  " style={{ maxWidth: '500px' }}>
            <div className="card-body">
                <h2 className="text-center mb-3">{city}</h2>
                <p className="text-center text-muted">{time}</p>
                <div className="d-flex justify-content-around align-items-center mb-4">
                    <div className="text-center">
                        <div>{getWeatherIcon(weatherDescription)}</div>
                        <p className="mt-2">{weatherDescription}</p>
                    </div>
                    <div className="text-center">
                        <h4>{tempMin.toFixed(1)}°C - {tempMax.toFixed(1)}°C</h4>

                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <WiStrongWind size={40} className="mb-2" />
                        <p>{wind.toFixed(1)} km/h</p>

                    </div>
                    <div className="col">
                        <WiRain size={40} className="mb-2" />
                        <p>{rainProbability}%</p>

                    </div>
                    <div className="col">
                        <WiRain size={40} className="mb-2" />
                        <p>{rainVolume.toFixed(1)} mm</p>

                    </div>
                    <div className="col">
                        <WiHumidity size={40} className="mb-2" />
                        <p>{humidity}%</p>

                    </div>
                </div>
            </div>
        </div>
    );


};

export default WeatherDisplay;

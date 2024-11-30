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

}

const WeatherDisplay: React.FC<WeatherProps> = ({
    weatherData,

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

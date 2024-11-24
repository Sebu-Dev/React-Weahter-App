import React from 'react';
import { WiDaySunny, WiHumidity, WiRaindrop, WiStrongWind } from 'react-icons/wi';


interface ForecastSummaryProps {
    forecast: any[];
}

const timePeriods = ['Morning', 'Afternoon', 'Evening', 'Night'];

const groupByPeriod = (forecast: any[]) => {
    const grouped = {
        Morning: forecast.filter((entry) => {
            const hour = new Date(entry.dt * 1000).getHours();
            return hour >= 6 && hour < 12;
        }),
        Afternoon: forecast.filter((entry) => {
            const hour = new Date(entry.dt * 1000).getHours();
            return hour >= 12 && hour < 18;
        }),
        Evening: forecast.filter((entry) => {
            const hour = new Date(entry.dt * 1000).getHours();
            return hour >= 18 && hour < 24;
        }),
        Night: forecast.filter((entry) => {
            const hour = new Date(entry.dt * 1000).getHours();
            return hour >= 0 && hour < 6;
        }),
    };
    // Return one representative for each period
    return timePeriods.map((period) => grouped[period][0] || null);
};

const formatDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
};
const ForecastSummary: React.FC<ForecastSummaryProps> = ({ forecast }) => {
    const summarizedForecast = groupByPeriod(forecast);

    return (
        <div className="row mt-4">
            <h2 className="text-center mb-4 white-text-h2">Daily Overview</h2>
            {summarizedForecast.map((entry, index) =>
                entry ? (
                    <div className="col-6 col-md-3" key={index}>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">{timePeriods[index]}</h5>

                                <p className="card-text">
                                    <strong>Date:</strong> {formatDate(entry.dt)}
                                </p>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    {/* Icons mit minimalem Text */}
                                    <WiDaySunny size={32} title="Temperature" />
                                    <span>{entry.main.temp.toFixed(1)}°C</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <WiRaindrop size={32} title="Rain Probability" />
                                    <span>{(entry.pop * 100).toFixed(0)}%</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <WiHumidity size={32} title="Humidity" />
                                    <span>{entry.main.humidity}%</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <WiStrongWind size={32} title="Wind Speed" />
                                    <span>{entry.wind.speed.toFixed(1)} km/h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-6 col-md-3" key={index}>
                        <div className="card text-center">
                            <div className="card-body">
                                <h5 className="card-title">{timePeriods[index]}</h5>
                                <p className="card-text">No data</p>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default ForecastSummary;

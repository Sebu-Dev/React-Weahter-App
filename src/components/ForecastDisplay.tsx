import React from 'react';

interface ForecastProps {
    forecast: any[];
}

const ForecastDisplay: React.FC<ForecastProps> = ({ forecast }) => {
    return (
        <div className="mt-4">
            <h2 className="text-center">Daily Forecast</h2>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Temperature (°C)</th>
                            <th>Weather</th>
                            <th>Wind (km/h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.map((entry, index) => (
                            <tr key={index}>
                                <td>{new Date(entry.dt * 1000).toLocaleTimeString()}</td>
                                <td>{entry.main.temp.toFixed(1)}</td>
                                <td>{entry.weather[0].description}</td>
                                <td>{entry.wind.speed.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ForecastDisplay;

import React from 'react';

interface WeatherForecastNavProps {
    onDaySelect: (day: number) => void;
}

const WeatherForecastNav: React.FC<WeatherForecastNavProps> = ({ onDaySelect }) => {
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];

    return (
        <div className="d-none d-md-block mb-4">
            <div className="btn-group" role="group" aria-label="Weather Forecast">
                {days.map((day, index) => (
                    <button
                        key={index}
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => onDaySelect(index)}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecastNav;

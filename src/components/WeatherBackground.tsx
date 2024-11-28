import React, { useEffect } from 'react';

interface WeatherBackgroundProps {
    weather: string;
}

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weather }) => {
    const weatherImages: { [key: string]: string } = {
        Clear: '/background/clear.jpg',
        Clouds: '/background/rain.png',
        Rain: '/background/rain.png',
        Snow: '/background/snowy.png',
        Drizzle: '/background/drizzle.jpg',
        Thunderstorm: '/background/thunderstorm.jpg',
        Mist: '/background/mist.jpg',
        Default: '/background/default.jpg',
    };


    const backgroundImage = weatherImages[weather] || weatherImages.Default;

    useEffect(() => {

        const body = document.body;
        body.style.backgroundImage = `url('${backgroundImage}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundAttachment = 'fixed';
        body.style.height = '100vh';
        body.style.margin = '0';
        body.style.zIndex = '-1';


        return () => {
            body.style.backgroundImage = '';
        };
    }, [backgroundImage]);

    return (
        <div>
            { }
        </div>
    );
};
export default WeatherBackground;
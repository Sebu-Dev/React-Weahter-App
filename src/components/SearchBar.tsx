import React, { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { getCityFromCoordinates } from '../services/locationService';

interface SearchBarProps {
    inputCity: string;
    setInputCity: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    setCity: React.Dispatch<React.SetStateAction<string>>;

}

const SearchBar: React.FC<SearchBarProps> = ({
    inputCity,
    setInputCity,
    handleSearch,
    setCity,

}) => {
    const [locationDenied, setLocationDenied] = useState<boolean>(false);

    const handleLocationClick = async () => {
        if (locationDenied) {

            return;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            const city = await getCityFromCoordinates(latitude, longitude);
            setCity(city);
            setInputCity(city);
        } catch (error) {
            setLocationDenied(true);

            console.error('Error fetching location', error);
        }
    };

    return (
        <div className="d-flex justify-content-center mb-4 search-bar">
            <input
                type="text"
                className="form-control w-50"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter a city"
            />
            <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={handleSearch}
            >
                Search
            </button>
            <button
                type="button"
                className="btn btn-light ms-2"
                onClick={handleLocationClick}
                title="Use my location"
            >
                <FaLocationArrow size={20} /> {/* Standort-Icon */}
            </button>
        </div>
    );
};

export default SearchBar;

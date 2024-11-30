import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { getCityFromCoordinates } from "../services/locationService";

interface SearchBarProps {
    inputCity: string;
    setInputCity: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;

}

const SearchBar: React.FC<SearchBarProps> = ({
    inputCity,
    setInputCity,
    handleSearch,

}) => {
    const [error, setError] = useState<string | null>(null);


    const handleLocationClick = async () => {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;
            const city = await getCityFromCoordinates(latitude, longitude);
            setInputCity(city);
            setError(null);
        } catch (err) {
            alert("Unable to fetch location. Please allow location access.");
            console.error("Error fetching location:", err);
        }
    };

    return (
        <div className="d-flex justify-content-center mb-4 search-bar">
            {/* Eingabefeld für die Stadt */}
            <input
                type="text"
                className="form-control w-50"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter a city"
            />
            {/* Suchbutton */}
            <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={handleSearch}
            >
                Search
            </button>
            {/* Standort-Button */}
            <button
                type="button"
                className="btn btn-light ms-2"
                onClick={handleLocationClick}
                title="Use my location"
            >
                <FaLocationArrow size={20} />
            </button>
            {/* Fehlerhinweis */}
            {error && <p className="text-danger ms-2">{error}</p>}
        </div>
    );
};

export default SearchBar;

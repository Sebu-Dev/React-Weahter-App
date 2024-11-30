
import { FaLocationArrow } from "react-icons/fa";
interface SearchBarProps {
    inputCity: string;
    setInputCity: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    handleLocationButton: (fromButton: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({inputCity,setInputCity,handleSearch, handleLocationButton}) => {

    return (
        <div className="d-flex justify-content-center mb-4 search-bar">
            {/* input city */}
            <input
                type="text"
                className="form-control w-50"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                placeholder="Enter a city"
            />
            {/* search-button */}
            <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={handleSearch}
            >
                Search
            </button>
            {/* location-button */}
            <button
                type="button"
                className="btn btn-light ms-2"
                onClick={()=>handleLocationButton(true)}
                title="Use my location"
            >
                <FaLocationArrow size={20} />
            </button>
        </div>
    );
};

export default SearchBar;

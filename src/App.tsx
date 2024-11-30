import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import { getCityFromCoordinates } from "./services/locationService";
import { getForecastData } from "./services/weatherService";
import { Coordinates } from "./types/LocationType";
import { WeatherData } from "./types/WeatherForcastType";

const DEFAULT_CITY = "Berlin";

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [inputCity, setInputCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [locationFetched, setLocationFetched] = useState<boolean>(false);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError("");
    try {
      const forecast = await getForecastData(location);
      setWeather(forecast[0].forecasts[0]);
    } catch {
      alert(`Invalid location. Loading weather data for ${DEFAULT_CITY}.`);
      try {
        const fallbackForecast = await getForecastData(DEFAULT_CITY);
        setWeather(fallbackForecast[0].forecasts[0]);
      } catch {
        setError(`Failed to load weather data for ${DEFAULT_CITY}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  const fetchUserLocation = async (fromButton: boolean = false) => {
    if (fromButton) {
      setError("");
    }
    try {
      const coordinates: Coordinates = await new Promise<Coordinates>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
              }),
            (err) => reject(err)
          );
        }
      );

      const userCity = await getCityFromCoordinates(coordinates);
      setCity(userCity);
    } catch (err) {
      if (fromButton) {
        alert("Unable to fetch location. Please allow your location access.");
      }
      console.warn(err instanceof Error ? err.message : "Could not determine user location.");
    } finally {
      setLocationFetched(true);
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (locationFetched) {
      fetchWeather(city);
    }
  }, [city, locationFetched]);

  return (
    <div className="d-flex justify-content-center p-4">
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="container card mb-4 shadow custom-bg">
          <Header />
          <SearchBar
            inputCity={inputCity}
            setInputCity={setInputCity}
            handleSearch={handleSearch}
            handleLocationButton={fetchUserLocation}
          />
          {loading && <p className="text-center">Loading weather data...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {weather && !loading && !error && (
            <WeatherDisplay weatherData={weather} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import Header from "./components/header";
import SearchBar from "./components/SearchBar";
import WeatherBackground from "./components/WeatherBackground";
import WeatherDisplay from "./components/WeatherDisplay";
import { getCityFromCoordinates } from "./services/locationService";
import { getForecastData } from "./services/weatherService";
import { WeatherData } from "./types/WeatherForcastType";

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Berlin");
  const [inputCity, setInputCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError("");
    try {
      const forecast = await getForecastData(location);
      setWeather(forecast[0].forecasts[0]); // Nur die aktuelle Vorhersage
    } catch {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (inputCity.trim()) setCity(inputCity.trim());
  };

  const fetchUserLocation = async () => {
    try {
      const { lat, lon } = await new Promise<{ lat: number; lon: number }>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => reject(err)
          );
        }
      );
      const userCity = await getCityFromCoordinates(lat, lon);
      setCity(userCity);
    } catch {
      console.error("Could not determine user location.");
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="d-flex justify-content-center" >
      {weather && <WeatherBackground weather={weather.weatherDescription} />}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="container mt-5">
          <Header />
          <SearchBar
            inputCity={inputCity}
            setInputCity={setInputCity}
            handleSearch={handleSearch}
          />
          {loading && <p className="text-center">Loading weather data...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          {weather && !loading && !error && (
            <WeatherDisplay weatherData={weather} handleDaySelect={() => { }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

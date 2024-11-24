import React, { useEffect, useState } from 'react';
import ForecastSummary from './components/ForecastSummary';
import SearchBar from './components/SearchBar.tsx';
import { WeatherBackground } from './components/WeatherBackground.tsx';
import WeatherDisplay from './components/WeatherDisplay';
import { getCityFromCoordinates } from './services/locationService';
import { getForecastData, getWeatherData } from './services/weatherService';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [city, setCity] = useState<string>('Berlin');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [inputCity, setInputCity] = useState<string>('');
  const [selectedForecast, setSelectedForecast] = useState<any>(null);

  const handleDaySelect = (dayIndex: number) => {
    const forecastForDay = forecastData[dayIndex];
    setSelectedForecast(forecastForDay);
    console.log(selectedForecast)
  };

  const getCurrentPosition = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      }
    });
  };

  const handleSearch = () => {
    setCity(inputCity.trim());
  };
  // Hole die 5-Tages-Vorhersage
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecast = await getForecastData(city);
        setForecastData(forecast.list); // Speichern der gesamten Vorhersage-Daten
        setSelectedForecast(forecast.list[0]); // Standardmäßig den ersten Tag auswählen (heute)
      } catch (error) {
        setError('Error fetching forecast data.');
      }
    };

    fetchForecast();
  }, [city]);
  //Hole die aktuelle Position
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { lat, lon } = await getCurrentPosition();
        const userCity = await getCityFromCoordinates(lat, lon);
        setCity(userCity);

        const weather = await getWeatherData(userCity);
        setWeatherData(weather);
      } catch (error) {
        console.error("Error fetching location or weather data", error);
      }
    };

    fetchUserLocation();
  }, []);
  //Hole Weatherdatas
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);
        setCity(data.name)

        const forecast = await getForecastData(city);
        setForecastData(forecast.list);
      } catch (error) {
        setError('Error fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);
  return (
    <div style={{ position: 'relative' }}>
      {weatherData && (
        <WeatherBackground weather={weatherData.weather[0].main} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container mt-5">
          <div className="cut-of">WEATHER APP</div>

          <h1 className="text-center mb-4 white-text">Weather App</h1>

          {/* Search bar as a component */}
          <SearchBar
            inputCity={inputCity}
            setInputCity={setInputCity}
            handleSearch={handleSearch}
            setCity={setCity}


          />

          {/* Loading and Error handling */}
          {loading && <p className="text-center">Loading weather data...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* Weather display */}
          {weatherData && !loading && !error && (
            <WeatherDisplay
              city={city}
              temperature={selectedForecast.main.temp}
              weather={selectedForecast.weather[0].main}
              wind={selectedForecast.wind.speed}
              humidity={selectedForecast.main.humidity}
              date={selectedForecast.dt}
              handleDaySelect={handleDaySelect}
            />
          )}

          {/* Forecast */}
          {forecastData.length > 0 && (
            <ForecastSummary forecast={forecastData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

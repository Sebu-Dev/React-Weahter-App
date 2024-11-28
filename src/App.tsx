import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import { WeatherBackground } from './components/WeatherBackground';
import WeatherDisplay from './components/WeatherDisplay';
import { getCityFromCoordinates } from './services/locationService';
import { getForecastData } from './services/weatherService';
import { DailyWeather, WeatherData } from './types/WeatherForcastType';

const App: React.FC = () => {
  const [forecastData, setForecastData] = useState<DailyWeather[]>([]);
  const [city, setCity] = useState<string>('Berlin');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [inputCity, setInputCity] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<DailyWeather | null>(null);
  const [selectedForecast, setSelectedForecast] = useState<WeatherData | null>(null);

  // Wählt die Tagesvorhersage aus
  const handleDaySelect = (dayIndex: number) => {
    const dayForecast = forecastData[dayIndex];
    setSelectedDay(dayForecast);
    setSelectedForecast(dayForecast.forecasts[0]); // Wählt die erste Vorhersage des Tages
  };

  const getCurrentPosition = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
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


  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError('');
      try {
        const forecast = await getForecastData(city);
        setForecastData(forecast);
        setSelectedDay(forecast[0]);
        setSelectedForecast(forecast[0].forecasts[0]);
      } catch (error) {
        setError('Error fetching forecast data.');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  // Hole die aktuelle Position und setze die Stadt
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const { lat, lon } = await getCurrentPosition();
        const userCity = await getCityFromCoordinates(lat, lon);
        setCity(userCity);
      } catch (error) {
        console.error('Error fetching location or weather data', error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {selectedForecast && (
        <WeatherBackground weather={selectedForecast.weatherDescription} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container mt-5">
          <div className="cut-of">WEATHER APP</div>

          <h1 className="text-center mb-4 white-text">Weather App</h1>

          {/* Suchleiste */}
          <SearchBar
            inputCity={inputCity}
            setInputCity={setInputCity}
            handleSearch={handleSearch}
            setCity={setCity}
          />

          {/* Lade- und Fehlermeldungen */}
          {loading && <p className="text-center">Loading weather data...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {/* Wetteranzeige */}
          {selectedForecast && !loading && !error && (
            <WeatherDisplay

              weatherData={selectedForecast}
              handleDaySelect={handleDaySelect}
            />
          )}

          {/* Vorhersagezusammenfassung */}
          {/* {forecastData.length > 0 && (
            <
              ForecastSummary
              forecast={forecastData}
              handleDaySelect={handleDaySelect}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default App;

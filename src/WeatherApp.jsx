import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import CityInput from './CityInput';
import './App.css'

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState({
    city: null,
    country: null,
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: null,
            country: null
          });
          await fetchWeather(position.coords.latitude, position.coords.longitude);
        } else {
          setError('Geolocation is not supported by your browser. Please enter a city manually.');
        }
      } catch (error) {
        console.error('Error getting position:', error);
        setError('Unable to get your location. Please enter a city.');
      }
    };

    fetchInitialWeather();
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchWeather = debounce(async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WEATHER_API_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );

      // Store the current weather data
      setWeather(response.data.list[0]);

      // Store the 5-day forecast data
      setForecast(response.data.list.slice(1, 40));

      // Store location response
      setLocation({
        city: response.data.city.name,
        country: response.data.city.country,
        latitude: response.data.city.coord.lat,
        longitude: response.data.city.coord.lon
      });

      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else if (error.response && error.response.status === 401) {
        setError('Invalid API key. Please check your API key and try again.');
      } else {
        setError('An error occurred while fetching weather data. Please try again later.');
      }
    }
  }, 500);

  

  const handleCitySubmit = async (city) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WEATHER_API_BASE_URL}/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );

      // Store the current weather data
      setWeather(response.data.list[0]);

      // Store the 5-day forecast data
      setForecast(response.data.list.slice(1, 40));

      // Store location response
      setLocation({
        city: response.data.city.name,
        country: response.data.city.country,
        latitude: response.data.city.coord.lat,
        longitude: response.data.city.coord.lon
      });

      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else if (error.response && error.response.status === 401) {
        setError('Invalid API key. Please check your API key and try again.');
      } else {
        setError('An error occurred while fetching weather data. Please try again later.');
      }
    }
  };

  return (
    <div className="weather-app-container my-5">
      <div className='weather-app-card app-bg'>
        <div className='card-body'>
          <CityInput onSubmit={handleCitySubmit} />
          {error ? (
            <div className='alert alert-danger mt-3'>{error}</div>
          ) : weather && forecast ? (
            <>
              <CurrentWeather
                city={location.city}
                country={location.country}
                temperature={weather.main.temp}
                windSpeed={weather.wind.speed}
                humidity={weather.main.humidity}
                precipitation={weather.rain?.['3h'] || 0}
                description={weather.weather[0].description}
                icon={weather.weather[0].icon}
              />
              <Forecast forecast={forecast} />
            </>
          ) : (
            <div className='text-center mt-3'>Loading...</div>
          )}
          <footer className="app-footer text-light">
        <p>&copy; 2024 Weather App. All rights reserved.</p>
      </footer>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
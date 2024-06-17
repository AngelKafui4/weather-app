import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import CityInput from './CityInput';
import './App.css'


const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        }, delay);
      };
  };

  const fetchWeather = debounce(async (city) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WEATHER_API_BASE_URL}?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );
      setWeather(response.data);
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

  useEffect(() => {
    fetchWeather('Accra');
  }, [fetchWeather]);

  return (
    <div className="container my-5">
      <h1 className='text-center mb-4'>Weather App</h1>
      <div className='card'>
        <div className='card-body'>
      <CityInput onSubmit={fetchWeather} />
      {error ? (
        <div className='alert alert-danger mt-3'>{error}</div>
      ): weather ? (
      <CurrentWeather 
      temperature={weather.main.temp} 
      windSpeed={weather.wind.speed}
      humidity={weather.main.humidity} 
      description={weather.weather[0].description} 
      icon={weather.weather[0].icon} 
      />
      ) : (
        <div className='text-center mt-3'>Loading...</div>
      )}
    </div>
  </div>
</div>
  );
};

export default WeatherApp;
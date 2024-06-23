import React from 'react';
import './App.css'

const WeatherForecast = ({ forecast }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">5-Day Forecast</h2>
      {forecast.slice(0, 40).reduce((result, item, index) => {
        const dayIndex = Math.floor(index / 8);
        if (!result[dayIndex]) {
          result[dayIndex] = {
            dt_txt: item.dt_txt.slice(0, 10),
            data: [],
          };
        }
        result[dayIndex].data.push(item);
        return result;
      }, []).map((day, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header text-center">
            <h5>{day.dt_txt}</h5>
          </div>
          <div className="card-body d-flex flex-wrap justify-content-around">
            {day.data.map((item, i) => (
              <div key={`${day.dt_txt}-${i}`} className="card text-center mx-2 mb-3" style={{ width: '12rem' }}>
                <div className="card-body">
                  <h6 className="card-title">{item.dt_txt.slice(11, 16)}</h6>
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    className="weather-card-icon"
                  />
                  <p className="card-text fw-bold">{Math.round(item.main.temp)}°C</p>
                  <p className="card-text">{item.weather[0].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
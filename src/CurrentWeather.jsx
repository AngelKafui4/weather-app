import React from 'react';

const CurrentWeather = ({ temperature, humidity, windSpeed, description, icon }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="card-title mb-2">{temperature}°C</h5>
            <p className="card-text mb-2">
              <i className="fas fa-tint me-2"></i>Humidity:{humidity}%
            </p>
            <p className="card-text mb-0">
              <i className="fas fa-wind me-2"></i>Wind Speed:{windSpeed} km/h
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <img
              src={`https://openweathermap.org/img/w/${icon}.png`}
              alt={description}
              className="img-fluid"
            />
            <p className="card-text mb-0">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
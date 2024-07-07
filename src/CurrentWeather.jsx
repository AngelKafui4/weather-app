import React, {useState, useEffect} from 'react';

const CurrentWeather = ({ city, country, temperature, humidity, windSpeed, precipitation, description, icon }) => {
  const [currentDate, setCurrentDate] = useState (new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
       setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toISOString().slice(0, 10);
  const formattedTime = currentDate.toISOString().slice(11, 19);

  return (
    <div className="card mb-4">
      <div className="card-body">
      <h5 className="card-title text-center mb-2">{city}, {country}</h5>
      <p className="text-center fw-bold mb-4">{formattedDate} {formattedTime}</p>
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="card-text fw-bold mb-2">
              <i className='fas fa-temperature-high me-2'></i>{temperature}°C</p>
            <p className="card-text fw-bold mb-2">
              <i className="fas fa-tint me-2"></i>Humidity: {humidity}%
            </p>
            <p className="card-text fw-bold mb-2">
              <i className="fas fa-umbrella me-2"></i>Precipitation: {precipitation}%
              </p>
              <p className="card-text fw-bold mb-0">
              <i className="fas fa-wind me-2"></i>Wind Speed: {windSpeed} km/h
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
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WeatherForecast = ({ forecast }) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  return (
    <div className="container my-5">
      <h2 className="text-center text-white fw-bold mb-4">5-Day Forecast</h2>
      {forecast.slice(8, 41).reduce((result, item, index) => {
        const dayIndex = Math.floor(index / 8);
        if (!result[dayIndex]) {
          result[dayIndex] = {
            dt_txt: new Date(item.dt_txt).toISOString().slice(0, 10),
            data: [],
          };
        }
        result[dayIndex].data.push(item);
        return result;
      }, []).map((day, index) => (
        <div key={index} className="card mb-4">
          <div className="card-header text-center text-white fw-bold" style={{ backgroundColor: '#CCA38A' }}>
            <h5>{getWeekday(day.dt_txt)}, {getMonthAndDate(day.dt_txt)}</h5>
          </div>
          <div className="card-body d-flex flex-wrap justify-content-around" style={{ backgroundColor: '#CCA38A' }}>
          {day.data.sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt)).map((item, i) => (
              <div key={`${day.dt_txt}-${i}`} className="card text-center mx-2 mb-3" style={{ width: '12rem' }}>
                <div className="card-body">
                  <h6 className="card-title">{new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</h6>
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

function getWeekday(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

function getMonthAndDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getDate()}`;
}


export default WeatherForecast;
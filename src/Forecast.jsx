import React from 'react';
import './App.css';

// function to calculate the high-level weather summary
function getHighLevelSummary(forecast) {
  return forecast.slice(0, 40).reduce((result, item, index) => {
    const dayIndex = Math.floor(index / 8);
    if (!result[dayIndex]) {
      result[dayIndex] = {
        dt_txt: item.dt_txt.slice(0, 10),
        weather: item.weather[0],
        main: item.main,
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        description: item.weather[0].description,
        iconId: item.weather[0].id,
      };
    } else {
      result[dayIndex].maxTemp = Math.max(result[dayIndex].maxTemp, item.main.temp_max);
      result[dayIndex].minTemp = Math.min(result[dayIndex].minTemp, item.main.temp_min);
      result[dayIndex].description += ` ${item.weather[0].description}`;
      result[dayIndex].iconId = item.weather[0].id;
    }
    return result;
  }, []);
}

// Function to get the appropriate weather icon class based on the weather ID
function getWeatherIconClass(weatherId) {
  if (weatherId >= 200 && weatherId < 300) {
    return 'wi-thunderstorm';
  } else if (weatherId >= 300 && weatherId < 500) {
    return 'wi-sprinkle';
  } else if (weatherId >= 500 && weatherId < 600) {
    return 'wi-rain';
  } else if (weatherId >= 600 && weatherId < 700) {
    return 'wi-snow';
  } else if (weatherId >= 700 && weatherId < 800) {
    return 'wi-fog';
  } else if (weatherId === 800) {
    return 'wi-day-sunny';
  } else if (weatherId > 800 && weatherId < 900) {
    return 'wi-cloud';
  } else {
    return 'wi-na';
  }
}

const WeatherForecast = ({ forecast, city }) => {
  const dailyForecast = getHighLevelSummary(forecast);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">5-Day Forecast for {city}</h2>
      <div className="row justify-content-center">
        {dailyForecast.map((day, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-4">
            <div className="card h-100 weather-card">
              <div className="card-header text-center bg-primary text-white">
                <h5>{getWeekday(day.dt_txt)}, {getMonthAndDate(day.dt_txt)}</h5>
                <div className="weather-icon">
                  <i className={`wi ${getWeatherIconClass(day.iconId)}`}></i>
                </div>
              </div>
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <p className="mb-1">High: {Math.round(day.maxTemp)}°C</p>
                <p className="mb-0">Low: {Math.round(day.minTemp)}°C</p>
                <div className="d-flex flex-wrap justify-content-around">
                  {forecast.slice(index * 8, (index + 1) * 8).map((item, i) => (
                    <div
                      key={`${day.dt_txt}-${i}`}
                      className="text-center weather-icon"
                    >
                      <i className={`wi ${getWeatherIconClass(item.weather[0].id)}`}></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getWeekday(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

function getMonthAndDate(dateString) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateString);
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export default WeatherForecast;
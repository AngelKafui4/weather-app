import React from 'react';
import WeatherApp from './WeatherApp';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    <div className="d-flex justify-content align-items-center" style={{minHeight: '100vh'}}>
      <div className='container'>
      <WeatherApp />
      <footer className="app-footer">
      <p>&copy; 2024 Weather App. All rights reserved.</p>
    </footer>
      </div> 
    </div>
  );
}

export default App;
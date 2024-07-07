import React, { useState } from 'react';
import WeatherApp from './WeatherApp';
//import LoginForm from './Login';
//import UserRegistration from './UserRegistration';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [isRegistered, setIsRegistered] = useState(false);

  //const handleLogin = () => {
    //setIsLoggedIn(true);
  //};

  //const handleRegistration = () => {
    //setIsRegistered(true);
  //};

  return (
    <div className="d-flex justify-content align-items-center">
      <div>
      <WeatherApp />
      {/*
        {!isLoggedIn && !isRegistered && (
          <UserRegistration onRegister={handleRegistration} />
        )}
        {isLoggedIn && !isRegistered && (
          <LoginForm onlogin={handleLogin} />
        )}
        {(isLoggedIn || isRegistered) && (
          <WeatherApp />
        )}
      */}
      </div>
    </div>
  );
};

export default App;
import React, { useState , useEffect} from 'react';





const CityInput = ({ onSubmit }) => {
  const [city, setCity] = useState('Accra');

  // useEffect(() => {
  //   const defaultValue = 'Accra';
  //   handleSubmit(defaultValue);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity('');
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a city"
          value={city}
          
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Get Weather
      </button>
    </form>
  );
};

export default CityInput;
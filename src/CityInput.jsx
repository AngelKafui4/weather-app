import React, { useState , useEffect} from 'react';

// City input validation function
function validateCityInput(cityInput) {
  // Check for valid characters
  const validChars = /^[a-zA-Z\s-']+$/;
  if (!validChars.test(cityInput)) {
    return {
      isValid: false,
      error: 'City name can only contain letters, spaces, hyphens, and apostrophes.'
    };
  }

  // Check minimum and maximum length
  if (cityInput.length < 3 || cityInput.length > 50) {
    return {
      isValid: false,
      error: 'City name must be between 3 and 50 characters long.'
    };
  }

  // Capitalize first letter of each word
  const capitalizedCity = cityInput.replace(/\b\w/g, (letter) => letter.toUpperCase());

  return {
    isValid: true,
    city: capitalizedCity
  };
}

// Fuzzy search and autocomplete suggestions
function findPotentialMatches(partialInput, cityDatabase) {
  if (cityDatabase || cityDatabase.length ===0) {
    return [];
  }

  return cityDatabase.filter((city) =>
    city.toLowerCase().startsWith(partialInput.toLowerCase())
  );
}

const CityInput = ({ onSubmit, cityDatabase = [] }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const calculateSuggestionScore = (partialInput, suggestion) => {
    const partialInputLength = partialInput.length;
    const suggestionLength = suggestion.length;
    const distance = Math.abs(partialInputLength - suggestionLength);
    return distance;
  };

  const getSuggestions = () => {
    const partialInput = city.trim();
    if (partialInput.length === 0) {
      return [];
    }

    const potentialMatches = findPotentialMatches(partialInput, cityDatabase);
    const sortedSuggestions = potentialMatches.sort((a, b) =>
      calculateSuggestionScore(partialInput, a) -
      calculateSuggestionScore(partialInput, b)
    );
    return sortedSuggestions.slice(0, 5); // Limit to 5 suggestions
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setSuggestions(getSuggestions());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity('');
    setSuggestions([]);
    };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    onSubmit(suggestion);
  };

  return (
    <form onSubmit={handleSubmit} className="position-relative">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Get Weather
      </button>
      {suggestions.length > 0 && (
        <div className="autocomplete-suggestions list-group position-absolute w-100">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default CityInput;
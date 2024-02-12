import React, { useState } from 'react';
import axios from 'axios';

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);


    try {
      const response = await axios.get(
        `https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/completion/?text=${value}&terr=METROPOLE&poiType=administratif&type=PositionOfInterest%2CStreetAddress&maximumResponses=10`
      );

      setSuggestions(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.fulltext);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.fulltext}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;

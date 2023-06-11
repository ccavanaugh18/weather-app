import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b2a98cc8f78d76055249b63b45911ede`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      const [city, stateCode] = location.split(',');
      const formattedLocation = `${city},${stateCode.trim()}`;
      const modifiedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formattedLocation}&units=imperial&appid=b2a98cc8f78d76055249b63b45911ede`;

      axios.get(modifiedUrl)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location (City, State)"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main && <p className="bold">{data.main.feels_like.toFixed()}°F</p>}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main && <p className="bold">{data.main.humidity.toFixed()}%</p>}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind && <p className="bold">{data.wind.speed.toFixed()} MPH</p>}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

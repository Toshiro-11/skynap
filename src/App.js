import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('Dallas');
  const [weather, setWeather] = useState(null);
  const [dark, setDark] = useState(false);

  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeather API key

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div
      style={{
        background: dark ? '#121212' : '#f5f5f5',
        color: dark ? '#fff' : '#000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.3s',
      }}
    >
      <div
        style={{
          padding: '20px',
          borderRadius: '12px',
          background: dark ? '#1e1e1e' : '#fff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <button onClick={() => setDark(!dark)}>
          Switch to {dark ? 'Light' : 'Dark'} Mode
        </button>

        <form onSubmit={handleSearch} style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            style={{
              marginTop: '10px',
              padding: '8px',
              width: '100%',
            }}
          />
        </form>

        {weather && weather.main && (
          <div style={{ marginTop: '20px' }}>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].main}</p>
            <h1>{Math.round(weather.main.temp)}°C</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
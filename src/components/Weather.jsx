import React, { useState, useEffect } from 'react';
import './Weather.css';

const API_KEY = 'bd827b5dd33b1072cde8dac5cab15ada';
const CITY = 'London';

const Weather = ({ onClose }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
                );
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <div className="weather-app">Loading...</div>;
    if (error) return <div className="weather-app">Error: {error}</div>;

    const { main, weather, name } = weatherData;

    return (
        <div className="weather-app">
            <button className="close-button" onClick={onClose}>×</button>
            <h1>{name}</h1>
            <div className="weather-main">
                <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].description}
                />
                <p className="temperature">{Math.round(main.temp)}°C</p>
            </div>
            <p className="weather-description">{weather[0].description}</p>
            <div className="weather-details">
                <p>Humidity: {main.humidity}%</p>
                <p>Wind: {weatherData.wind.speed} m/s</p>
                <p>Pressure: {main.pressure} hPa</p>
            </div>
        </div>
    );
};

export default Weather;
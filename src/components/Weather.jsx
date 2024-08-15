import React, { useState, useEffect } from 'react';
import './Weather.css';

const API_KEY = 'bd827b5dd33b1072cde8dac5cab15ada';

const Weather = ({ onClose }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London');

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (cityName) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
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

    const handleCityChange = (e) => {
        if (e.key === 'Enter') {
            setCity(e.target.value);
        }
    };

    if (loading) return <div className="weather-app">Loading...</div>;
    if (error) return <div className="weather-app">Error: {error}</div>;

    const { list, city: cityData } = weatherData;
    const currentWeather = list[0];

    return (
        <div className="weather-app">
            <div className="weather-titlebar">
                <div className="titlebar-button red" onClick={onClose}></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="weather-content">
                <input
                    type="text"
                    placeholder="Enter city name"
                    onKeyPress={handleCityChange}
                    className="city-input"
                />
                <div className="weather-main">
                    <h1>{cityData.name}</h1>
                    <div className="weather-current">
                        <img
                            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                            alt={currentWeather.weather[0].description}
                        />
                        <p className="temperature">{Math.round(currentWeather.main.temp)}°C</p>
                    </div>
                    <p className="weather-description">{currentWeather.weather[0].description}</p>
                </div>
                <div className="weather-details">
                    <p>Humidity: {currentWeather.main.humidity}%</p>
                    <p>Wind: {currentWeather.wind.speed} m/s</p>
                    <p>Pressure: {currentWeather.main.pressure} hPa</p>
                </div>
                {/* <div className="weather-forecast">
                    <h2>Hourly Forecast</h2>
                    <div className="forecast-scroll">
                        {list.slice(0, 8).map((item, index) => (
                            <div key={index} className="forecast-item">
                                <p>{new Date(item.dt * 1000).getHours()}:00</p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt={item.weather[0].description}
                                />
                                <p>{Math.round(item.main.temp)}°C</p>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Weather;
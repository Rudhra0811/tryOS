import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = ({ onClose }) => {
    const [time, setTime] = useState(new Date());
    const [selectedTimezone, setSelectedTimezone] = useState('local');

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date, timezone) => {
        if (timezone === 'local') {
            return date.toLocaleTimeString();
        }
        return date.toLocaleTimeString('en-US', { timeZone: timezone });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const timezones = [
        { value: 'local', label: 'Local Time' },
        { value: 'America/New_York', label: 'New York' },
        { value: 'Europe/London', label: 'London' },
        { value: 'Asia/Tokyo', label: 'Tokyo' },
    ];

    return (
        <div className="clock">
            <div className="clock-titlebar">
                <div className="titlebar-button red" onClick={onClose}></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="clock-content">
                <div className="clock-display">
                    <div className="clock-time">{formatTime(time, selectedTimezone)}</div>
                    <div className="clock-date">{formatDate(time)}</div>
                </div>
                <div className="clock-timezones">
                    <select
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                    >
                        {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                        ))}
                    </select>
                </div>
                <div className="world-clocks">
                    {timezones.filter(tz => tz.value !== selectedTimezone).map((tz) => (
                        <div key={tz.value} className="world-clock-item">
                            <div className="world-clock-city">{tz.label}</div>
                            <div className="world-clock-time">{formatTime(time, tz.value)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clock;
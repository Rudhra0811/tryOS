import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ onClose }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time => time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    const reset = () => {
        setTime(0);
        setIsRunning(false);
    };

    return (
        <div className="timer">
            <div className="timer-titlebar">
                <div className="titlebar-button red" onClick={onClose}></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="timer-display">
                <span>{hours.toString().padStart(2, '0')}:</span>
                <span>{minutes.toString().padStart(2, '0')}:</span>
                <span>{seconds.toString().padStart(2, '0')}.</span>
                <span>{milliseconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="timer-controls">
                <button onClick={startAndStop}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
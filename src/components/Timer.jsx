import React, { useState, useEffect, useRef } from 'react';
import './Timer.css';

const Timer = ({ onClose }) => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const intervalRef = useRef(null);
    const audioRef = useRef(new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'));

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        audioRef.current.play();
                        return prevTime;
                    }
                    let newSeconds = prevTime.seconds - 1;
                    let newMinutes = prevTime.minutes;
                    let newHours = prevTime.hours;

                    if (newSeconds < 0) {
                        newSeconds = 59;
                        newMinutes -= 1;
                    }
                    if (newMinutes < 0) {
                        newMinutes = 59;
                        newHours -= 1;
                    }
                    return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const startAndStop = () => {
        if (!isRunning && (time.hours > 0 || time.minutes > 0 || time.seconds > 0)) {
            setIsRunning(!isRunning);
        } else if (isRunning) {
            setIsRunning(false);
        }
    };

    const reset = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setInputTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsRunning(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputTime(prevTime => ({ ...prevTime, [name]: parseInt(value) || 0 }));
    };

    const setTimer = () => {
        setTime(inputTime);
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
                <span>{time.hours.toString().padStart(2, '0')}:</span>
                <span>{time.minutes.toString().padStart(2, '0')}:</span>
                <span>{time.seconds.toString().padStart(2, '0')}</span>
            </div>
            <div className="timer-input">
                <input type="number" name="hours" value={inputTime.hours} onChange={handleInputChange} min="0" max="23" />
                <input type="number" name="minutes" value={inputTime.minutes} onChange={handleInputChange} min="0" max="59" />
                <input type="number" name="seconds" value={inputTime.seconds} onChange={handleInputChange} min="0" max="59" />
                <button onClick={setTimer}>Set</button>
            </div>
            <div className="timer-controls">
                <button onClick={startAndStop}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Timer;
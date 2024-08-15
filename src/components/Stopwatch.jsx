import React, { useState, useEffect, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = ({ onClose }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => setTime(time => time + 10), 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-titlebar">
        <div className="titlebar-button red" onClick={onClose}></div>
        <div className="titlebar-button yellow"></div>
        <div className="titlebar-button green"></div>
      </div>
      <div className="stopwatch-display">{formatTime(time)}</div>
      <div className="stopwatch-controls">
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleLap} disabled={!isRunning}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="stopwatch-laps">
        {laps.map((lapTime, index) => (
          <div key={index} className="lap-time">
            Lap {index + 1}: {formatTime(lapTime)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Weather from './components/Weather';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import Clock from './components/Clock';
import Reminders from './components/Reminders';
import AppWindow from './components/AppWindow';

const apps = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️' },
  { id: 'clock', name: 'Clock', icon: '🕰️' },
  { id: 'reminders', name: 'Reminders', icon: '📝' },
];

const SearchBar = () => (
  <div className="search-bar">
    <input type="text" placeholder="Search" />
  </div>
);

const AppIcon = ({ app, onClick }) => (
  <div className="app-icon" onClick={() => onClick(app.id)}>
    <span className="app-icon-emoji">{app.icon}</span>
    <span className="app-icon-name">{app.name}</span>
  </div>
);

const Dock = ({ apps, onClick }) => (
  <div className="dock">
    {apps.map(app => (
      <AppIcon key={app.id} app={app} onClick={onClick} />
    ))}
  </div>
);

function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [isAppOpen, setIsAppOpen] = useState(false);

  useEffect(() => {
    if (activeApp) {
      setIsAppOpen(true);
    } else {
      setTimeout(() => setIsAppOpen(false), 300);
    }
  }, [activeApp]);

  const launchApp = (appId) => {
    setActiveApp(appId);
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'calculator': return <Calculator onClose={closeApp} />;
      case 'weather': return <Weather onClose={closeApp} />;
      case 'timer': return <Timer onClose={closeApp} />;
      case 'stopwatch': return <Stopwatch onClose={closeApp} />;
      case 'clock': return <Clock onClose={closeApp} />;
      case 'reminders': return <Reminders onClose={closeApp} />;
      default: return null;
    }
  };

  return (
    <div className="dashboard">
      <SearchBar />
      <main className="dashboard-main">
        {!activeApp && (
          <div className="app-grid">
            {apps.map((app) => (
              <AppIcon key={app.id} app={app} onClick={launchApp} />
            ))}
          </div>
        )}
        <AppWindow isOpen={isAppOpen}>
          {renderActiveApp()}
        </AppWindow>
      </main>
      <Dock apps={apps} onClick={launchApp} />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Weather from './components/Weather';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';
import Clock from './components/Clock';
import Reminders from './components/Reminders';
import Settings from './components/Settings';
import AppWindow from './components/AppWindow';
import SearchBar from './components/SearchBar';

const apps = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️' },
  { id: 'clock', name: 'Clock', icon: '🕰️' },
  { id: 'reminders', name: 'Reminders', icon: '📝' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
];

const AppIcon = ({ app, onClick, style }) => (
  <div className="app-icon" onClick={() => onClick(app.id)} style={style}>
    <span className="app-icon-emoji">{app.icon}</span>
    <span className="app-icon-name">{app.name}</span>
  </div>
);

const Dock = ({ apps, onClick, iconStyle }) => (
  <div className="dock">
    {apps.map(app => (
      <AppIcon key={app.id} app={app} onClick={onClick} style={iconStyle} />
    ))}
  </div>
);

function App() {
  const [activeApp, setActiveApp] = useState(null);
  const [isAppOpen, setIsAppOpen] = useState(false);
  const [settings, setSettings] = useState({
    backgroundColor: '#1e1e1e',
    backgroundImage: '',
    iconSize: 'medium',
    isDarkMode: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('dashboardSettings')) || {};
    setSettings({ ...settings, ...savedSettings });
  }, []);

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

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'calculator': return <Calculator onClose={closeApp} />;
      case 'weather': return <Weather onClose={closeApp} />;
      case 'timer': return <Timer onClose={closeApp} />;
      case 'stopwatch': return <Stopwatch onClose={closeApp} />;
      case 'clock': return <Clock onClose={closeApp} />;
      case 'reminders': return <Reminders onClose={closeApp} />;
      case 'settings': return <Settings onClose={closeApp} updateSettings={updateSettings} />;
      default: return null;
    }
  };

  const dashboardStyle = {
    backgroundColor: settings.backgroundImage ? 'transparent' : settings.backgroundColor,
    backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const appIconStyle = {
    fontSize: settings.iconSize === 'small' ? '24px' : settings.iconSize === 'large' ? '48px' : '36px',
  };

  return (
    <div className={`dashboard ${settings.isDarkMode ? 'dark-mode' : 'light-mode'}`} style={dashboardStyle}>
      <SearchBar onSearch={handleSearch} />
      <main className="dashboard-main">
        {!activeApp && (
          <div className="app-grid">
            {filteredApps.map((app) => (
              <AppIcon key={app.id} app={app} onClick={launchApp} style={appIconStyle} />
            ))}
          </div>
        )}
        <AppWindow isOpen={isAppOpen}>
          {renderActiveApp()}
        </AppWindow>
      </main>
      <Dock apps={apps} onClick={launchApp} iconStyle={appIconStyle} />
    </div>
  );
}

export default App;
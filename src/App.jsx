// src/App.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

const initialApps = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️' },
  { id: 'clock', name: 'Clock', icon: '🕰️' },
  { id: 'reminders', name: 'Reminders', icon: '📝' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
];

const AppIcon = ({ app, onClick, style, ...props }) => (
  <div className="app-icon" onClick={() => onClick(app.id)} style={style} {...props}>
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
  const [apps, setApps] = useState(initialApps);
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

    const savedAppOrder = JSON.parse(localStorage.getItem('appOrder'));
    if (savedAppOrder) {
      setApps(savedAppOrder);
    }
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newApps = Array.from(apps);
    const [reorderedItem] = newApps.splice(result.source.index, 1);
    newApps.splice(result.destination.index, 0, reorderedItem);

    setApps(newApps);
    localStorage.setItem('appOrder', JSON.stringify(newApps));
  };

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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app-grid" direction="horizontal">
              {(provided) => (
                <div
                  className="app-grid"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredApps.map((app, index) => (
                    <Draggable key={app.id} draggableId={app.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <AppIcon app={app} onClick={launchApp} style={appIconStyle} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
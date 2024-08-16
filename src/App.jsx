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
import Taskbar from './components/Taskbar';

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

function App() {
  const [apps, setApps] = useState(initialApps);
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);
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

  const launchApp = (appId) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
    setActiveAppId(appId);
  };

  const closeApp = (appId) => {
    setOpenApps(openApps.filter(id => id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(openApps.length > 1 ? openApps[openApps.length - 2] : null);
    }
  };

  const minimizeApp = () => {
    setActiveAppId(null);
  };

  const focusApp = (appId) => {
    setActiveAppId(appId);
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

  const renderApp = (appId) => {
    switch (appId) {
      case 'calculator': return <Calculator onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'weather': return <Weather onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'timer': return <Timer onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'stopwatch': return <Stopwatch onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'clock': return <Clock onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'reminders': return <Reminders onClose={() => closeApp(appId)} onMinimize={minimizeApp} />;
      case 'settings': return <Settings onClose={() => closeApp(appId)} onMinimize={minimizeApp} updateSettings={updateSettings} />;
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
        {openApps.length === 0 && (
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
        {openApps.map(appId => (
          <AppWindow
            key={appId}
            isOpen={true}
            isActive={activeAppId === appId}
            onFocus={() => focusApp(appId)}
          >
            {renderApp(appId)}
          </AppWindow>
        ))}
      </main>
      <Taskbar
        openApps={openApps.map(id => apps.find(app => app.id === id))}
        activeAppId={activeAppId}
        onAppClick={focusApp}
        onAppClose={closeApp}
      />
    </div>
  );
}

export default App;
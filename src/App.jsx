// src/App.jsx
import { useState } from 'react'
import './App.css'
import Calculator from './components/Calculator'

const apps = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️' },
  { id: 'clock', name: 'Clock', icon: '🕰️' },
  // Ill add more apps here as they are developed 
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
  const [activeApp, setActiveApp] = useState(null)

  const launchApp = (appId) => {
    setActiveApp(appId)
  }

  const closeApp = () => {
    setActiveApp(null)
  }

  return (
    <div className="dashboard">
      <SearchBar />
      <main className="dashboard-main">
        {activeApp ? (
          <div className="app-container">
            {activeApp === 'calculator' && <Calculator onClose={closeApp} />}
            {/* Ill add other app components here as they are developed */}
          </div>
        ) : (
          <div className="app-grid">
            {apps.map((app) => (
              <AppIcon key={app.id} app={app} onClick={launchApp} />
            ))}
          </div>
        )}
      </main>
      <Dock apps={apps} onClick={launchApp} />
    </div>
  )
}

export default App
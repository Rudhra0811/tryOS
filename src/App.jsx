import { useState } from 'react'
import './App.css'
import Calculator from './components/Calculator'
import Weather from './components/Weather'
import Timer from './components/Timer'

const apps = [
  { id: 'calculator', name: 'Calculator', icon: '🧮' },
  { id: 'weather', name: 'Weather', icon: '🌤️' },
  { id: 'timer', name: 'Timer', icon: '⏲️' },
  { id: 'stopwatch', name: 'Stopwatch', icon: '⏱️' },
  { id: 'clock', name: 'Clock', icon: '🕰️' },
];

function App() {
  const [activeApp, setActiveApp] = useState(null)

  const launchApp = (appId) => {
    setActiveApp(appId)
  }

  const closeApp = () => {
    setActiveApp(null)
  }

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

  return (
    <div className="dashboard">
      <SearchBar />
      <main className="dashboard-main">
        {activeApp ? (
          <div className="app-container">
            {activeApp === 'calculator' && <Calculator onClose={closeApp} />}
            {activeApp === 'weather' && <Weather onClose={closeApp} />}
            {activeApp === 'timer' && <Timer onClose={closeApp} />}
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
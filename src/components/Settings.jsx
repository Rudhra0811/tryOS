import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ onClose, updateSettings }) => {
  const [backgroundColor, setBackgroundColor] = useState('#1e1e1e');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [iconSize, setIconSize] = useState('medium');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('dashboardSettings')) || {};
    setBackgroundColor(savedSettings.backgroundColor || '#1e1e1e');
    setBackgroundImage(savedSettings.backgroundImage || '');
    setIconSize(savedSettings.iconSize || 'medium');
    setIsDarkMode(savedSettings.isDarkMode !== undefined ? savedSettings.isDarkMode : true);
  }, []);

  const saveSettings = () => {
    const settings = {
      backgroundColor,
      backgroundImage,
      iconSize,
      isDarkMode
    };
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    updateSettings(settings);
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="settings">
      <div className="settings-titlebar">
        <div className="titlebar-button red" onClick={onClose}></div>
        <div className="titlebar-button yellow"></div>
        <div className="titlebar-button green"></div>
      </div>
      <div className="settings-content">
        <h2>Dashboard Settings</h2>
        
        <div className="setting-group">
          <label>Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>

        <div className="setting-group">
          <label>Background Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageUpload}
          />
          {backgroundImage && (
            <button onClick={() => setBackgroundImage('')}>Remove Image</button>
          )}
        </div>

        <div className="setting-group">
          <label>App Icon Size:</label>
          <select
            value={iconSize}
            onChange={(e) => setIconSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="setting-group">
          <label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
            />
            Dark Mode
          </label>
        </div>

        <button className="save-button" onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
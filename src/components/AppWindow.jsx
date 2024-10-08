// src/components/AppWindow.jsx
import React, { useState, useEffect } from 'react';
import './AppWindow.css';

const AppWindow = ({ children, isOpen, isActive, onFocus }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('app-window-enter');
      setTimeout(() => setAnimationClass('app-window-enter-active'), 10);
    } else {
      setAnimationClass('app-window-exit');
      setTimeout(() => setAnimationClass('app-window-exit-active'), 10);
    }
  }, [isOpen]);

  return (
    <div
      className={`app-window ${animationClass} ${isActive ? 'active' : ''}`}
      onClick={onFocus}
    >
      {children}
    </div>
  );
};

export default AppWindow;
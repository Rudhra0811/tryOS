import React from 'react';
import './Taskbar.css';

const Taskbar = ({ openApps, activeAppId, onAppClick, onAppClose }) => {
    return (
        <div className="taskbar">
            {openApps.map(app => (
                <div
                    key={app.id}
                    className={`taskbar-item ${activeAppId === app.id ? 'active' : ''}`}
                    onClick={() => onAppClick(app.id)}
                >
                    <span className="taskbar-item-icon">{app.icon}</span>
                    <span className="taskbar-item-name">{app.name}</span>
                    <button className="taskbar-item-close" onClick={(e) => {
                        e.stopPropagation();
                        onAppClose(app.id);
                    }}>×</button>
                </div>
            ))}
        </div>
    );
};

export default Taskbar;
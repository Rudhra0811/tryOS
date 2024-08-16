// src/components/Camera.jsx
import React, { useRef, useEffect } from 'react';
import './Camera.css';

const Camera = ({ onClose, onMinimize }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing the camera:", err);
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="camera-app">
            <div className="camera-header">
                <h2>Camera</h2>
                <button onClick={onMinimize}>-</button>
                <button onClick={onClose}>×</button>
            </div>
            <div className="camera-content">
                <video ref={videoRef} autoPlay />
            </div>
        </div>
    );
};

export default Camera;
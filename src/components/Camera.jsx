// src/components/Camera.jsx
import React, { useRef, useState, useEffect } from 'react';
import './Camera.css';

const Camera = ({ onClose, onMinimize }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

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

    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL and set as capturedImage
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
    };

    const retake = () => {
        setCapturedImage(null);
    };

    return (
        <div className="camera-app">
            <div className="camera-header">
                <h2>Camera</h2>
                <button onClick={onMinimize}>-</button>
                <button onClick={onClose}>×</button>
            </div>
            <div className="camera-content">
                {capturedImage ? (
                    <div className="captured-image">
                        <img src={capturedImage} alt="Captured" />
                        <button onClick={retake}>Retake</button>
                    </div>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay />
                        <button onClick={capturePhoto}>Capture</button>
                    </>
                )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default Camera;
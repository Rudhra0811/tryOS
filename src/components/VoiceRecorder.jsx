// src/components/VoiceRecorder.jsx
import React, { useState, useRef, useEffect } from 'react';
import './VoiceRecorder.css';

const VoiceRecorder = ({ onClose, onMinimize }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings')) || [];
        setRecordings(savedRecordings);
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const newRecording = {
                    id: Date.now(),
                    url: audioUrl,
                    name: `Recording ${recordings.length + 1}`,
                };
                const updatedRecordings = [...recordings, newRecording];
                setRecordings(updatedRecordings);
                localStorage.setItem('voiceRecordings', JSON.stringify(updatedRecordings));
                audioChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing the microphone:", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const deleteRecording = (id) => {
        const updatedRecordings = recordings.filter(recording => recording.id !== id);
        setRecordings(updatedRecordings);
        localStorage.setItem('voiceRecordings', JSON.stringify(updatedRecordings));
    };

    return (
        <div className="voice-recorder-app">
            <div className="voice-recorder-header">
                <h2>Voice Recorder</h2>
                <button onClick={onMinimize}>-</button>
                <button onClick={onClose}>×</button>
            </div>
            <div className="voice-recorder-content">
                <button onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <div className="recordings-list">
                    {recordings.map(recording => (
                        <div key={recording.id} className="recording-item">
                            <audio controls src={recording.url}>
                                Your browser does not support the audio element.
                            </audio>
                            <span>{recording.name}</span>
                            <button onClick={() => deleteRecording(recording.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VoiceRecorder;
import React, { useState, useEffect } from 'react';
import './Reminders.css';

const Reminders = ({ onClose }) => {
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
            setReminders(JSON.parse(savedReminders));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }, [reminders]);

    const addReminder = (e) => {
        e.preventDefault();
        if (newReminder.trim() !== '') {
            const newReminderObj = {
                id: Date.now(),
                text: newReminder,
                completed: false,
                dueDate: dueDate ? new Date(dueDate).toISOString() : null
            };
            setReminders([...reminders, newReminderObj]);
            setNewReminder('');
            setDueDate('');
        }
    };

    const toggleReminder = (id) => {
        setReminders(reminders.map(reminder =>
            reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
        ));
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(reminder => reminder.id !== id));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortedReminders = [...reminders].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return (
        <div className="reminders">
            <div className="reminders-titlebar">
                <div className="titlebar-button red" onClick={onClose}></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="reminders-content">
                <h2>Reminders</h2>
                <form onSubmit={addReminder} className="reminder-form">
                    <input
                        type="text"
                        value={newReminder}
                        onChange={(e) => setNewReminder(e.target.value)}
                        placeholder="Add a new reminder"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
                <ul className="reminders-list">
                    {sortedReminders.map(reminder => (
                        <li key={reminder.id} className={reminder.completed ? 'completed' : ''}>
                            <div>
                                <span onClick={() => toggleReminder(reminder.id)}>{reminder.text}</span>
                                <p className="due-date">{formatDate(reminder.dueDate)}</p>
                            </div>
                            <button onClick={() => deleteReminder(reminder.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Reminders;
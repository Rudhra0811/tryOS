import React, { useState, useEffect } from 'react';
import './Reminders.css';

const Reminders = ({ onClose }) => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

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
      setReminders([...reminders, { id: Date.now(), text: newReminder, completed: false }]);
      setNewReminder('');
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
          <button type="submit">Add</button>
        </form>
        <ul className="reminders-list">
          {reminders.map(reminder => (
            <li key={reminder.id} className={reminder.completed ? 'completed' : ''}>
              <span onClick={() => toggleReminder(reminder.id)}>{reminder.text}</span>
              <button onClick={() => deleteReminder(reminder.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;
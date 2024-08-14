// src/components/Calculator.jsx
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = ({ onClose }) => {
    const [display, setDisplay] = useState('0');

    const handleButtonClick = (value) => {
        setDisplay(prevDisplay => prevDisplay === '0' ? value : prevDisplay + value);
    };

    const calculateResult = () => {
        try {
            setDisplay(eval(display).toString());
        } catch (error) {
            setDisplay('Error');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
    };

    const buttons = [
        ['(', ')', 'mc', 'm+', 'm-', 'mr', 'AC', '+/-', '%', '÷'],
        ['2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '×'],
        ['¹/x', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
        ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
        ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
    ];

    return (
        <div className="calculator-scientific">
            <div className="calculator-titlebar">
                <div className="titlebar-button red"></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="calculator-display">{display}</div>
            <div className="calculator-keypad">
                {buttons.map((row, rowIndex) => (
                    <div key={rowIndex} className="keypad-row">
                        {row.map((button, index) => (
                            <button
                                key={index}
                                className={`calculator-key ${button === '=' ? 'key-equals' : ''} ${['÷', '×', '-', '+', '='].includes(button) ? 'operator-key' : ''}`}
                                onClick={() => {
                                    if (button === '=') calculateResult();
                                    else if (button === 'AC') clearDisplay();
                                    else handleButtonClick(button);
                                }}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calculator;
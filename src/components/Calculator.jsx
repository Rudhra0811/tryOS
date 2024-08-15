// src/components/Calculator.jsx
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit) => {
        if (waitingForOperand) {
            setDisplay(String(digit));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(digit) : display + digit);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const performOperation = (nextOperator) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const currentValue = prevValue || 0;
            const newValue = calculate(currentValue, inputValue, operator);

            setPrevValue(newValue);
            setDisplay(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 'Error';
            default: return b;
        }
    };

    const handleEquals = () => {
        if (!operator || prevValue === null) return;

        const inputValue = parseFloat(display);
        const result = calculate(prevValue, inputValue, operator);
        setDisplay(String(result));
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    return (
        <div className="calculator-scientific">
            <div className="calculator-titlebar">
                <div className="titlebar-button red" onClick={onClose}></div>
                <div className="titlebar-button yellow"></div>
                <div className="titlebar-button green"></div>
            </div>
            <div className="calculator-display">{display}</div>
            <div className="calculator-keypad">
                {/* Scientific functions - not functional in this basic version */}
                <button className="calculator-key">2ⁿᵈ</button>
                <button className="calculator-key">x²</button>
                <button className="calculator-key">x³</button>
                <button className="calculator-key">xʸ</button>
                <button className="calculator-key">eˣ</button>
                <button className="calculator-key">10ˣ</button>

                {/* Basic operations */}
                <button className="calculator-key" onClick={clear}>AC</button>
                <button className="calculator-key" onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>
                <button className="calculator-key" onClick={() => setDisplay(String(parseFloat(display) / 100))}>%</button>
                <button className="calculator-key operator-key" onClick={() => performOperation('÷')}>÷</button>

                <button className="calculator-key" onClick={() => inputDigit(7)}>7</button>
                <button className="calculator-key" onClick={() => inputDigit(8)}>8</button>
                <button className="calculator-key" onClick={() => inputDigit(9)}>9</button>
                <button className="calculator-key operator-key" onClick={() => performOperation('×')}>×</button>

                <button className="calculator-key" onClick={() => inputDigit(4)}>4</button>
                <button className="calculator-key" onClick={() => inputDigit(5)}>5</button>
                <button className="calculator-key" onClick={() => inputDigit(6)}>6</button>
                <button className="calculator-key operator-key" onClick={() => performOperation('-')}>-</button>

                <button className="calculator-key" onClick={() => inputDigit(1)}>1</button>
                <button className="calculator-key" onClick={() => inputDigit(2)}>2</button>
                <button className="calculator-key" onClick={() => inputDigit(3)}>3</button>
                <button className="calculator-key operator-key" onClick={() => performOperation('+')}>+</button>

                <button className="calculator-key key-0" onClick={() => inputDigit(0)}>0</button>
                <button className="calculator-key" onClick={inputDecimal}>.</button>
                <button className="calculator-key operator-key" onClick={handleEquals}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
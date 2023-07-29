import React, {useState, useCallback, useEffect } from 'react';

function Calculator() {

    const [op, setOp] = useState(false);
    const [value1, setValue1] = useState(0);
    const [operator, setOperator] = useState('');
    const [value2, setValue2] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [value1, value2, operator]);


    const handleKeyPress = useCallback((event) => {
        const { key } = event;
        const isNumber = /^\d$/.test(key);
        const isOperator = /^[-+*/%=]$/.test(key);

        if (isNumber) {
            handleClick(key);
        } else if (isOperator) {
            if (key === '=') {
                calculate();
            } else {
                handleClickOperators(key);
            }
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Escape') {
            handleClear();
        } else if (key === 'Backspace') {

            if (op) {
                if (value2.toString().length <= 1) {
                    setValue2(0);
                } else {
                    const updatedValue = typeof value2 === 'number' ? value2.toString().slice(0, -1) : value2.slice(0, -1);
                    setValue2(updatedValue);
                }
            } else {
                if (value1.toString().length <= 1) {
                    setValue1(0);
                } else {
                    const updatedValue = typeof value1 === 'number' ? value1.toString().slice(0, -1) : value1.slice(0, -1);
                    setValue1(updatedValue);
                }
            }

        }
    }, [value1, value2, operator, op]);

    const handleClear = useCallback(() => {
        setValue1(0);
        setOperator('');
        setValue2(0);
    }, [value1]);

    const changeSign = useCallback(() => {
        setValue1(value1 * -1);
    }, [value1]);

    const handleClick = useCallback((id) => {
        setOp(false);
        if (id === '.') {
            if (!value1.toString().includes('.')) {
                setValue1(value1 + id);
            }
        } else if (value1 === 0) {
            setValue1(id);
        } else {
            setValue1(value1 + id);
        }
    }, [value1]);

    const handleClickOperators = useCallback( (id) => {
        if (operator) {
            if (value2 && value1) {
                let result;
                if (operator === '%') {
                    result = (+value2 * +value1) / 100;
                } else {
                    result = eval(`${value2} ${operator} ${value1}`);
                }
                setValue2(result)
            }

        } else {
            setValue2(value1)
        }

        setOperator(id);
        setOp ( true);
        setValue1(0);

    }, [value1, operator]);

    const calculate = useCallback(() => {
        if (operator === "/") {
            setValue1(+value2 / +value1);
        } else if (operator === "*") {
            setValue1(+value2 * +value1);
        } else if (operator === "-") {
            setValue1(+value2 - +value1);
        } else if (operator === "+") {
            setValue1(+value2 + +value1);
        } else if (operator === "%") {
            setValue1((+value2 * +value1) / 100);
        }
        setOperator('')

    }, [value1, value2, operator])

    return (
        <div style={{margin: '80px auto', width: '500px'}}>

            <div className='value'>
                <p style={{margin: 0, fontSize: '40px'}}>
                    {op? value2: value1}
                </p>
            </div>

            <table>
                <tr>
                    <td onClick={() => handleClear()}>AC</td>
                    <td onClick={() => changeSign()}>+/-</td>
                    <td onClick={() => handleClickOperators('%')}>%</td>
                    <td onClick={() => handleClickOperators('/')}>/</td>
                </tr>
                <tr>
                    <td onClick={() => handleClick('7')}>7</td>
                    <td onClick={() => handleClick('8')}>8</td>
                    <td onClick={() => handleClick('9')}>9</td>
                    <td onClick={() => handleClickOperators('*')}>X</td>
                </tr>
                <tr>
                    <td onClick={() => handleClick('4')}>4</td>
                    <td onClick={() => handleClick('5')}>5</td>
                    <td onClick={() => handleClick('6')}>6</td>
                    <td onClick={() => handleClickOperators('-')}>-</td>
                </tr>
                <tr>
                    <td onClick={() => handleClick('1')}>1</td>
                    <td onClick={() => handleClick('2')}>2</td>
                    <td onClick={() => handleClick('3')}>3</td>
                    <td onClick={() => handleClickOperators('+')}>+</td>
                </tr>

                <tr>
                    <td colSpan='2' onClick={() => handleClick('0')}>0</td>
                    <td onClick={() => handleClick('.')}>.</td>
                    <td onClick={() => calculate()}>=</td>
                </tr>
            </table>

        </div>
    );
}

export default Calculator;
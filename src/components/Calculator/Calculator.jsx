import React, { useState } from 'react'
import styles from './Calculator.module.css'
import NumberButton from '../NumberButton/NumberButton'
import OperationButton from '../OperationButton/OperationButton'

const Calculator = () => {
  const [onDisplay, setOnDisplay] = useState('0')
  const [history, setHistory] = useState('')
  const [storedNumber, setStoredNumber] = useState('0')
  const [currentNumber, setCurrentNumber] = useState('0')
  const [operator, setOperator] = useState(null)

  const addToDisplay = (value) => {
    if (currentNumber === '0') {
      setOnDisplay(() => value)
      setCurrentNumber(() => value)
    } else if (onDisplay.length < 9 && onDisplay !== 'ERROR') {
      setOnDisplay((oldDisplay) => (oldDisplay + value))
      setCurrentNumber((oldNumber) => (oldNumber + value))
    }
  }

  const calculate = () => {
    setOnDisplay(() => storedNumber)
    setCurrentNumber(() => '0')
  }

  const operate = (symbol) => {
    if (currentNumber === '0' || onDisplay === 'ERROR') {
      return
    }

    if (symbol === '+/-') {
      setOnDisplay((oldDisplay) => `-${oldDisplay}`)
      setCurrentNumber((oldNumber) => `-${oldNumber}`)
      return
    }

    if (operator == null) {
      setOperator(() => symbol)
      setHistory(() => `${currentNumber} ${symbol}`)
      setStoredNumber(() => currentNumber)
      setCurrentNumber(() => '0')
      return
    }

    let result
    if (operator === '+') {
      result = +storedNumber + +currentNumber
    } else if (operator === '-') {
      result = +storedNumber - +currentNumber
    } else if (operator === 'x') {
      result = +storedNumber * +currentNumber
    } else if (operator === '÷') {
      result = +storedNumber / +currentNumber
    } else if (operator === '%') {
      result = +storedNumber % +currentNumber
    }

    if (result < 0 || result > 999999999) {
      setOnDisplay(() => 'ERROR')
      setHistory(() => 'ERROR')
      return
    }

    let resultString = `${result}`
    if (resultString.includes('.') && resultString.length > 9) resultString = `${parseFloat(resultString).toFixed(2)}`

    setOnDisplay(() => resultString)
    if (symbol === '=') {
      setOperator(() => null)
      setCurrentNumber(() => resultString)
    } else {
      setOperator(() => symbol)
      setCurrentNumber(() => '0')
    }
    setHistory(() => (`${resultString} ${symbol}`))
    setStoredNumber(() => resultString)
  }

  const clear = () => {
    setOnDisplay(() => '0')
    setHistory(() => '')
    setStoredNumber(() => '0')
    setCurrentNumber(() => '0')
  }

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.calculatorDisplay}>
        <div data-testid="history" className={styles.calculatorHistory}>{history}</div>
        <div data-testid="onDisplay" className={styles.onDisplay}>{onDisplay}</div>
      </div>
      <div className={styles.calculatorKeyboard}>
        <OperationButton symbol="C" operate={clear} />
        <OperationButton symbol="%" operate={operate} />
        <OperationButton data-testid="divisionSign" symbol="÷" operate={operate} />
        <NumberButton data-testid="number7" number="7" addToDisplay={addToDisplay} />
        <NumberButton number="8" addToDisplay={addToDisplay} />
        <NumberButton data-testid="number9" number="9" addToDisplay={addToDisplay} />
        <OperationButton data-testid="multiplication" symbol="x" operate={operate} />
        <NumberButton number="4" addToDisplay={addToDisplay} />
        <NumberButton data-testid="number5" number="5" addToDisplay={addToDisplay} />
        <NumberButton number="6" addToDisplay={addToDisplay} />
        <OperationButton symbol="-" operate={operate} />
        <NumberButton data-testid="number1" number="1" addToDisplay={addToDisplay} />
        <NumberButton data-testid="number2" number="2" addToDisplay={addToDisplay} />
        <NumberButton number="3" addToDisplay={addToDisplay} />
        <OperationButton data-testid="addSign" symbol="+" operate={operate} />
        <OperationButton data-testid="negativeSign" symbol="+/-" operate={operate} />
        <NumberButton number="0" addToDisplay={addToDisplay} />
        <NumberButton number="." addToDisplay={addToDisplay} />
        <OperationButton data-testid="equalSign" symbol="=" operate={operate} />
      </div>
    </div>
  )
}

export default Calculator

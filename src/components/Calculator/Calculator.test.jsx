import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from './Calculator'

describe('Calculadora', () => {
  it('Guarda en el historial', async () => {
    render(<Calculator />)
    const multiplication = screen.getByTestId('multiplication')
    const number7 = screen.getByTestId('number7')
    const history = screen.getByTestId('history')
    await userEvent.click(number7)
    await userEvent.click(multiplication)
    expect(history).toHaveTextContent('7 x')
  })

  it('No despliega resultados negativos', async () => {
    render(<Calculator />)
    const multiplication = screen.getByTestId('multiplication')
    const number7 = screen.getByTestId('number7')
    const negativeSign = screen.getByTestId('negativeSign')
    const equalSign = screen.getByTestId('equalSign')
    const display = screen.getByTestId('onDisplay')
    await userEvent.click(number7)
    await userEvent.click(negativeSign)
    await userEvent.click(multiplication)
    await userEvent.click(number7)
    await userEvent.click(equalSign)
    expect(display).toHaveTextContent('ERROR')
  })

  it('No despliega más de 9 dígitos', async() => {
    render(<Calculator />)
    const number9 = screen.getByTestId('number9')
    const number1 = screen.getByTestId('number1')
    const addSign = screen.getByTestId('addSign')
    const equalSign = screen.getByTestId('equalSign')
    const display = screen.getByTestId('onDisplay')
    // Presionar 9 veces el número 9
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)
    await userEvent.click(number9)

    await userEvent.click(addSign)
    await userEvent.click(number1)
    await userEvent.click(equalSign)
    expect(display).toHaveTextContent('ERROR')
  })

  it('Aproxima a dos cifras decimales, si el resultado sobrepasa los 9 dígitos', async () => {
    render(<Calculator />)
    const number2 = screen.getByTestId('number2')
    const number7 = screen.getByTestId('number7')
    const divisionSign = screen.getByTestId('divisionSign')
    const equalSign = screen.getByTestId('equalSign')
    const display = screen.getByTestId('onDisplay')
    await userEvent.click(number2)
    await userEvent.click(number2)
    await userEvent.click(divisionSign)
    await userEvent.click(number7)
    await userEvent.click(equalSign)
    expect(display).toHaveTextContent('3.14')
  })

  it('Realiza diferentes operaciones consecutivas', async () => {
    render(<Calculator />)
    const number1 = screen.getByTestId('number1')
    const number2 = screen.getByTestId('number2')
    const number7 = screen.getByTestId('number7')
    const number5 = screen.getByTestId('number5')
    const addSign = screen.getByTestId('addSign')
    const multiplication = screen.getByTestId('multiplication')
    const divisionSign = screen.getByTestId('divisionSign')
    const equalSign = screen.getByTestId('equalSign')
    const display = screen.getByTestId('onDisplay')
    // (21 / 7) * 5 + 1
    await userEvent.click(number2)
    await userEvent.click(number1)
    await userEvent.click(divisionSign)
    await userEvent.click(number7)
    await userEvent.click(multiplication)
    await userEvent.click(number5)
    await userEvent.click(addSign)
    await userEvent.click(number1)
    await userEvent.click(equalSign)
    expect(display).toHaveTextContent('16')
  })
})

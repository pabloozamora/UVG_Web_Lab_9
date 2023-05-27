/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './NumberButton.module.css'

const NumberButton = ({ number, addToDisplay, ...props }) => (
  <div
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={styles.numberButtonContainer}
    onClick={() => addToDisplay(number)}
  >
    {number}
  </div>
)

NumberButton.propTypes = {
  number: PropTypes.string.isRequired,
  addToDisplay: PropTypes.func.isRequired,
}

export default NumberButton

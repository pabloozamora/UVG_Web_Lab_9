/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './OperationButton.module.css'

const OperationButton = ({ symbol, operate, ...props }) => (
  <div
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={symbol === 'C' ? styles.CButtonContainer : styles.operationButtonContainer}
    onClick={() => operate(symbol)}
  >
    {symbol}
  </div>
)

OperationButton.propTypes = {
  symbol: PropTypes.string.isRequired,
  operate: PropTypes.func.isRequired,
}

export default OperationButton

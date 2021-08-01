import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ value, handleChange }) => (
  <input value={value} onChange={handleChange} type="input" />
);

Input.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

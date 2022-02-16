import React from 'react';
import PropTypes from 'prop-types';

export const MatchFailed = ({ value, handleChange, placeholder, className }) => (
  <div > Failed To Match </div>
);

MatchFailed.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

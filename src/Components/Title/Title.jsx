import React from 'react';
import PropTypes from 'prop-types';

export const Title = ({ text, className }) => (
    <div className={className}>{text}</div>
);

Title.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

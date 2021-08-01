import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const RoomMatch = ({matchedAId}) => {
    axios
    .get(`https://api.jikan.moe/v3/anime/${matchedAId}`)
    .then((res) => {
      console.log(res);
    })
  return (
  <h1> You have matched: {matchedAId} </h1>
  )
};


RoomMatch.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

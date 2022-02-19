import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Card } from '../Card/Card';
import { Title } from '../Title/Title';

export const RoomMatch = ({matchedAId}) => {
  const [matchedAnime, setMatchedAnime] = useState([]);

    axios
    .get(`https://api.jikan.moe/v4/anime/${matchedAId}`)
    .then((res) => {
      setMatchedAnime(res.data.data);
    })
  return matchedAnime.title ? (
    <div className='matchedAnime'>
      <Title className='matchedAnime--title' text='Animeya' />
      <Card anime={matchedAnime} num={0} subtitle={"Match Found!"} /> 
    </div> )
  : ( <div>loading...</div>
  )
};


RoomMatch.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

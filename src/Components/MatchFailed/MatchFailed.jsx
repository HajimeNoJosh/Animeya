import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Title } from '../Title/Title';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';

export const MatchFailed = ({ room }) => {
  const [rightSwipes, setRightSwipes] = useState([])
  const room_id = room.id

  useEffect(() => {
    const getRightSwipes = () => {
      axios
        .get(`https://animeya.herokuapp.com/get_all_right_swipes/${room_id}`)
        .then((res) => {
          if (rightSwipes.length === 0) {
            if (res) {
              setRightSwipes(res.data)
            } else {
              setRightSwipes(['Failed to match'])
            }
          }
        })
    }
    if (rightSwipes.length === 0) {
      getRightSwipes()
    }
    });

    const restart = () => {
      window.location.replace('/');
  }

  return (
  <div className="matchedFailed"> 
    <Title text="Animeya" className="matchedFailed--title" />
    <div className='matchedFailed--subtitle'>
      Match Failed
    </div>
    <div className='matchedFailed--paragraph'>
      Sorry, no one could agree on any anime.
    </div>
    <Button className="matchedFailed--restart-button" text={"Restart"} onClick={restart} />
    <div className='matchedFailed--paragraph'>
      OR
    </div>
    <div className='matchedFailed--paragraph'>
      Check out these anime that people did like!
    </div>
    {rightSwipes.map((anime, index) => (
        <Card anime={anime} num={index} key={anime.anime_title} />))}
  </div>
)};

MatchFailed.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

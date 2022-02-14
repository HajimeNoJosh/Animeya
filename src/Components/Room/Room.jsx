import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';

export const Room = ({
  num,
  anime,
  setNum,
  room_id,
  user_token,
  setMatchedAId,
  cable
}) => {
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    cable.subscriptions.create({
      channel: 'RoomsChannel',
      room_id: room_id, },
      {
        connected() {
          console.log('connected')
        },
        received(data) {
          if (data.message === "matched") {
            setMatchedAId(data.anime_id)
            history.push(`/room/match`);
          }
        }
      })
  });

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const liked = () => {
   const anime_id = anime[num].mal_id
    axios
      .post(`http://localhost:3000/right_swipe`, { room_id, user_token, anime_id })
    setNum(num+1)
    console.log(anime[num])
  }

  const disliked = () => {
    setNum(num+1)
  }

  return anime[num] ? (
    <div className='animelist'>
        <ul className="animelist--input" key={num}>
        {anime[num].title_english ? <li className="input-label">{anime[num].title_english}</li>
         : <li className="input-label">{anime[num].title}</li>}
        <li className="input-label">{anime[num].synopsis}</li>
        {anime[num].airing ? <li className="input-label">True</li> 
        : <li className="input-label">False</li>}
        <li className="input-label">{anime[num].episodes}</li>
        <li className="input-label">{anime[num].score}</li>
        <img src={anime[num].images.jpg.large_image_url} alt={anime[num].title_english} width="500" height="600"></img>
        </ul>
      <Button text = 'Like' onClick={liked} />
      <Button text = 'Dislike' onClick={disliked} />
    </div>
  ) : (
    <div>loading...</div>
  );
}

Room.propTypes = {
  owner: PropTypes.object,
  visitors: PropTypes.object,
  anime: PropTypes.array,
  setOwner: PropTypes.func,
  setVisitors: PropTypes.func,
  setRoom: PropTypes.func,
  room: PropTypes.object,
  roomId: PropTypes.number,
  myId: PropTypes.number,
};

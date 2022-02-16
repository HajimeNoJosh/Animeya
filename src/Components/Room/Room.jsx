import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

export const Room = ({
  num,
  anime,
  setNum,
  room_id,
  user_token,
  setMatchedAId,
  cable,
  userType,
  allUsersDone
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
          } else if (allUsersDone) {
            history.push(`/room/failedToMatch`);
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
      if (anime[num + 1] == null) {
        const status = "Finished"
        if (userType === 'owner') {
          axios
            .patch(`http://localhost:3000/update_owner_status`, { user_token, status, room_id })
        } else if (userType === 'visitor') {
          axios
            .patch(`http://localhost:3000/update_visitor_status`, { user_token, status, room_id })
      }
        history.push(`/room/matching`)
      }
  }

  const disliked = () => {
    setNum(num+1)
    if (anime[num + 1] == null) {
      const status = "Finished"
      if (userType === 'owner') {
        axios
          .patch(`http://localhost:3000/update_owner_status`, { user_token, status, room_id })
      } else if (userType === 'visitor') {
        axios
          .patch(`http://localhost:3000/update_visitor_status`, { user_token, status, room_id })
    }
      history.push(`/room/matching`)
    }
  }

  return anime[num] ? (
    <div className="card">
      <div className='card--title'>
        ANIMEYA
      </div>
      <div className="card--content">
        <img className="card--content-image" src={anime[num].images.jpg.large_image_url} alt={anime[num].title_english}></img>
        <ul className="card--content-ul" key={num}>
          {
          anime[num].title_english ? 
          <li className="card--content-title">{anime[num].title_english}</li>
          : <li className="card--content-title">{anime[num].title}</li>
          }
          <li className="card--content-rating">Rating: {anime[num].score}</li>
          {/* <li className="card--content-synopsis">{anime[num].synopsis}</li>
          {anime[num].airing ? 
          <li className="card--content-airing">True</li> 
          : <li className="card--content-airing">False</li>}
          <li className="card--content-episodes">{anime[num].episodes}</li> */}
        </ul>
      </div>
      <div className="card--buttons">
        <Button className="card--buttons-dislike" text={<img className="card--image-dislike" src={dislike} height="50%" width="50%" />} onClick={disliked} />
        <Button className="card--buttons-like" text={<img className="card--image-like" src={like} height="70%" width="70%" />} onClick={liked} />
      </div>
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

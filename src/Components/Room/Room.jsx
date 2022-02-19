import React, { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import TinderCard from 'react-tinder-card'

import { Button } from '../Button/Button';
import { Card } from '../Card/Card'
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
  const [currentAnime, setCurrentAnime] = useState(anime[num])

  const childRefs = useMemo(
    () =>
      Array(anime.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

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

  const liked = () => {
   const anime_id = anime[num].mal_id
   setNum(num+1)
    axios
      .post(`http://localhost:3000/right_swipe`, { room_id, user_token, anime_id })
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
      } else {
        setCurrentAnime(anime[num])
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
    } else {
      setCurrentAnime(anime[num])
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    setNum(num-1)
    setCurrentAnime(anime[num])
  }

  const onSwipe = (direction) => {
    if (direction === 'left') {
      disliked()
    } else if (direction === 'right') {
      liked()
    }
    setNum(num+1)
  }

  return currentAnime ? (
    <div className="room">
      <TinderCard ref={childRefs[num]} className='swipe' key={currentAnime.title} onCardLeftScreen={() => outOfFrame(currentAnime.title)} onSwipe={onSwipe}><Card anime={currentAnime} num={num} /></TinderCard>     
      <div className="room--buttons">
        <Button className="room--buttons-dislike" text={<img className="card--image-dislike" src={dislike} height="50%" width="50%" alt='dislike' />} onClick={disliked} />
        <Button className="room--buttons-like" text={<img className="card--image-like" src={like} height="70%" width="70%" alt='like' />} onClick={liked} />
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

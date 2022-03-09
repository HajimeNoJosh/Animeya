import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Button } from '../Button/Button';
import { Title } from '../Title/Title';
import { Card } from '../Card/Card';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';

export const Room = ({
  room,
  num,
  anime,
  user_token,
  userType,
  setStateObj
}) => {
  // const { token } = useParams();
  const history = useHistory();
  const room_id = room.id
  const currentAnime = anime[num];

  const liked = () => {
   const anime_id = anime[num].mal_id
   const score = anime[num].score
   const anime_title = anime[num].title_english ? anime[num].title_english : anime[num].title
   const image = anime[num].images.jpg.large_image_url

    axios
      .post(`https://animeya.herokuapp.com/right_swipe`, { room_id, user_token, anime_id, anime_title, score, image})
      setStateObj(prevState => ({...prevState, num: num += 1}))
      if (anime[num + 1] == null) {
        const status = "Finished"
        if (userType === 'owner') {
          axios
            .patch(`https://animeya.herokuapp.com/update_owner_status`, { user_token, status, room_id })
        } else if (userType === 'visitor') {
          axios
            .patch(`https://animeya.herokuapp.com/update_visitor_status`, { user_token, status, room_id })
      }
        history.push(`/room/matching`)
      }
  }

  const disliked = () => {
    setStateObj(prevState => ({...prevState, num: num += 1}))
    if (anime[num + 1] == null) {
      const status = "Finished"
      if (userType === 'owner') {
        axios
          .patch(`https://animeya.herokuapp.com/update_owner_status`, { user_token, status, room_id })
      } else if (userType === 'visitor') {
        axios
          .patch(`https://animeya.herokuapp.com/update_visitor_status`, { user_token, status, room_id })
    }
      history.push(`/room/matching`)
    }
  }

  return anime[num] ? (
    <div className="room">
      <Title text="Animeya" className={"room--title"} />
      <Card anime={currentAnime} num={num} />
      <div className="room--buttons">
        <Button className="room--buttons-dislike" text={<img className="card--image-dislike" src={dislike} height="50%" width="50%" alt="button-dislike"  />} onClick={disliked} />
        <Button className="room--buttons-like" text={<img className="card--image-like" src={like} height="70%" width="70%" alt="button-like" />} onClick={liked} />
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

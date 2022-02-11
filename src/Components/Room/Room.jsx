import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Room = ({
  num,
  anime,
  setNum,
  room_id,
  user_token,
  room,
  setMatchedAId,
  cable
}) => {
  const { token } = useParams();
  const [image, setImage] = useState('');
  const [detailedAnime, setDetailedAnime] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (!isEmpty(anime)) { 
      axios
        .get(`https://api.jikan.moe/v3/anime/${anime[num].mal_id}`)
        .then((res) => {
          let newImageUrl = res.data.image_url.slice(0, -4) + 'l.jpg' 
          setImage(newImageUrl)
          setDetailedAnime(res.data)
        })
    }
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
    console.log(detailedAnime)
  }

  const disliked = () => {
    setNum(num+1)
  }

  return !isEmpty(detailedAnime) ? (
    <div>
      Invite your friends: http://localhost:3001/#/join/{token}
        <ul className="travelcompany-input" key={num}>
        {detailedAnime.title_english ? <li className="input-label">{detailedAnime.title_english}</li>
         : <li className="input-label">{detailedAnime.title}</li>}
        <li className="input-label">{detailedAnime.synopsis}</li>
        {detailedAnime.airing ? <li className="input-label">True</li> 
        : <li className="input-label">False</li>}
        <li className="input-label">{detailedAnime.episodes}</li>
        <li className="input-label">{detailedAnime.score}</li>
        <img src={image} alt="Girl in a jacket" width="500" height="600"></img>
        </ul>
      <button onClick={liked}>Like</button>
      <button onClick={disliked}>Dislike</button>
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

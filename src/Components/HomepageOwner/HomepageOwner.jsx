import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { Homepage } from '../Homepage/Homepage';

export const HomepageOwner = ({ setRoomId, setRoom, setMyToken, setAnime, myId, setUserType }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/owner`, { username })
      .then((res) => {
        setMyToken(res.data.token)
        setUserType('owner');
        axios
        .get(`http://localhost:3000/owner/room/${res.data.id}`)
        .then((r) => {
          setRoomId(r.data.id);
          setRoom(r.data);
          axios.get(`http://localhost:3000/room/join/${r.data.token}`).then((animeR) => {
            console.log(animeR)
            setAnime(animeR.data.data);
            history.push(`/room/sharelink`);
          });
        });
      })
  };

  return (
    <Homepage handleSubmit={handleSubmit} handleChange={handleChange} value={username} buttonText={"Create Room"} />
  );
};

HomepageOwner.propTypes = {
  setRoomId: PropTypes.func,
};

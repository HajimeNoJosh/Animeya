import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useHistory, useParams } from 'react-router-dom';
import { Homepage } from '../Homepage/Homepage';

export const HomepageVisitor = ({ setRoomId, setRoom, setMyToken, setAnime }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');

  const { token } = useParams();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/visitor`, { username, token })
      .then((r) => {
        setMyToken(r.data.token)
      })
    axios.get(`http://localhost:3000/room/${token}`).then((r) => {
      setRoom(r.data);
      setRoomId(r.data.id);
      history.push(`/room/${token}`);
    });

    axios.get(`http://localhost:3000/room/join/${token}`).then((r) => {
      setAnime(r.data.data);
    });
  };

  return (
    <Homepage handleSubmit={handleSubmit} handleChange={handleChange} value={username} />
  );
};

HomepageVisitor.propTypes = {
  setRoomId: PropTypes.func,
};

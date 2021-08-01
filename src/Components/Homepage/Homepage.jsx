import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Homepage = ({ setRoomId, setRoom, setMyToken, setAnime, myId }) => {
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
        axios
        .get(`http://localhost:3000/owner/room/${res.data.id}`)
        .then((r) => {
          setRoomId(r.data.id);
          setRoom(r.data);
          axios.get(`http://localhost:3000/room/join/${r.data.token}`).then((animeR) => {
            setAnime(animeR.data.raw.results);
            history.push(`/room/${r.data.token}`);
          });
        });
      })

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input value={username} handleChange={handleChange} />
        <Button />
      </form>
    </div>
  );
};

Homepage.propTypes = {
  setRoomId: PropTypes.func,
};

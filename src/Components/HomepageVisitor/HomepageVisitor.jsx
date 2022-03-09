import React from 'react';

import { useHistory } from 'react-router-dom';
import { Homepage } from '../Homepage/Homepage';

export const HomepageVisitor = ({ token, username, setUsername, setStateObj }) => {
  const history = useHistory();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStateObj(prevState => ({...prevState, stateStatus: 'creating visitor'}))
    history.push(`/room/${token}`);
  };

  return (
    <Homepage handleSubmit={handleSubmit} handleChange={handleChange} value={username} buttonText={"Join Room"} />
  );
};

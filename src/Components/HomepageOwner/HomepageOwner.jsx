import React from 'react';
import { useHistory } from 'react-router-dom';

import { Homepage } from '../Homepage/Homepage';

export const HomepageOwner = ({ setStateObj, username, setUsername }) => {
  const history = useHistory();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStateObj(prevState => ({...prevState, stateStatus: 'creating owner'}))
    history.push(`/room/sharelink`);
  };

  return (
    <Homepage buttonId={"homepage_owner"} handleSubmit={handleSubmit} handleChange={handleChange} value={username} buttonText={"Create Room"} />
  );
};

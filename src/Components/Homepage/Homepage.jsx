import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Title } from '../Title/Title';

export const Homepage = ({ handleSubmit, username, handleChange, buttonText }) => {
  return (
    <div className='homepage'>
      <Title text="Animeya" className="homepage--title" />
      <div className='homepage--subtitle'>
        Find your perfect match!
      </div>
      <form className='homepage--form' onSubmit={handleSubmit}>
        <div className='homepage--form-input-title'>Username</div>
        <Input className='homepage--form-input' value={username} handleChange={handleChange} />
        <Button text={buttonText} className='homepage--form-button' />
      </form>
    </div>
  );
};

Homepage.propTypes = {
  setRoomId: PropTypes.func,
};

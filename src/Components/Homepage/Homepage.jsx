import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Homepage = ({ handleSubmit, username, handleChange }) => {
  return (
    <div className='homepage'>
      <div className='homepage--title'>
        ANIMEYA
      </div>
      <div className='homepage--subtitle'>
        Find your perfect match!
      </div>
      <form className='homepage--form' onSubmit={handleSubmit}>
        <div className='homepage--form-input-title'>Username</div>
        <Input className='homepage--form-input' value={username} handleChange={handleChange} />
        <Button text='Sign Up' className='homepage--form-button' />
      </form>
    </div>
  );
};

Homepage.propTypes = {
  setRoomId: PropTypes.func,
};

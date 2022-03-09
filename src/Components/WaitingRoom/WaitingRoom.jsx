import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '../Title/Title';

export const WaitingRoom = ({cable, room, setStateObj, matchedAId}) => {

    return (
    <div className='waitingRoom'>
        <Title text="Animeya" className='waitingRoom--title' />
        <div className='waitingRoom--subtitle'>
            Please Wait
        </div>
        <div className='waitingRoom--paragraph'>
            Please wait until all the members of your party have finished liking or disliking their anime.
        </div>
    </div>
    )
};


WaitingRoom.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

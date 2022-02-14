import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '../Button/Button';
import { useHistory } from 'react-router-dom';

export const ShareLink = ({roomToken}) => {
    const history = useHistory();

    const pushToRoom = () => {
        history.push(`/room/${roomToken}`);
    }

    const copyLink = () => {
        const input = document.createElement('input');
        input.setAttribute('value', `http://localhost:3001/#/join/${roomToken}`);
        document.body.appendChild(input);
        input.select();
        const result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    }

    return (
    <div className='sharelink'> 
        <div className='homepage--title sharelink--title'>
        ANIMEYA
        </div>
        <div className='homepage--subtitle sharelink--subtitle'>
            Share Link
        </div>
        <h1> http://localhost:3001/#/join/{roomToken} </h1>
        <Button text='Copy Link' onClick={copyLink} className='sharelink--button sharelink--button-copy' />
        <Button text='Start' onClick={pushToRoom} className='sharelink--button sharelink--button-start' />
    </div>
    )
};


ShareLink.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

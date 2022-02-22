import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Button } from '../Button/Button';
import { Title } from '../Title/Title';

export const ShareLink = ({roomToken}) => {
    const history = useHistory();
    const base_url = window.location.origin;

    const pushToRoom = () => {
        history.push(`/room/${roomToken}`);
    }

    const copyLink = () => {
        const input = document.createElement('input');
        input.setAttribute('value', `${base_url}/#/join/${roomToken}`);
        document.body.appendChild(input);
        input.select();
        const result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    }

    return (
    <div className='sharelink'> 
        <Title text="Animeya" className="sharelink--title" />
        <div className='sharelink--subtitle'>
            Share Link
        </div>
        <h1> {base_url}/#/join/{roomToken} </h1>
        <Button text='Copy Link' onClick={copyLink} className='sharelink--button sharelink--button-copy' />
        <Button text='Start' onClick={pushToRoom} className='sharelink--button sharelink--button-start' />
    </div>
    )
};


ShareLink.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

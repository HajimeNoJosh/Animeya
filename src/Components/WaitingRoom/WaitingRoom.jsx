import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from '../Button/Button';
import { useHistory } from 'react-router-dom';

export const WaitingRoom = ({cable, room, setAllUsersDone, matchedAId}) => {
    const history = useHistory();

    useEffect(() => {
        cable.subscriptions.create({
        channel: 'RoomsChannel',
        room_id: room.id, },
        {
            connected() {
              console.log('connected')
            },
            received(data) {
                if (data.message === "someone_finished") {
                    const token = room.token
                    axios
                        .get(`http://localhost:3000/status_of_room/${token}`)
                        .then((res) => {
                            if ( res.data === true ) {
                                setAllUsersDone(true)
                                if (matchedAId) {
                                    history.push(`/room/match`);
                                } else {
                                    history.push(`/room/failedToMatch`);
                                }
                            }
                        })
                }
            }
        })
      });

    return (
    <div className='sharelink'> 
        <div className='homepage--title sharelink--title'>
            ANIMEYA
        </div>
        <div className='homepage--subtitle sharelink--subtitle'>
            Waiting
        </div>
    </div>
    )
};


WaitingRoom.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

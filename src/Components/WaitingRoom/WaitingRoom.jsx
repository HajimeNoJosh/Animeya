import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { Title } from '../Title/Title';

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
                        .get(`https://animeya.herokuapp.com/status_of_room/${token}`)
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

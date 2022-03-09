import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, useHistory } from 'react-router-dom';
import actionCable from 'actioncable';
import axios from 'axios';

import '../../sass/main.scss';

import { HomepageOwner } from '../HomepageOwner/HomepageOwner';
import { Room } from '../Room/Room';
import { RoomMatch } from '../RoomMatch/RoomMatch';
import { HomepageVisitor } from '../HomepageVisitor/HomepageVisitor';
import { ShareLink } from '../ShareLink/ShareLink';
import { WaitingRoom } from '../WaitingRoom/WaitingRoom';
import { MatchFailed } from '../MatchFailed/MatchFailed';

const CableApp = {}
CableApp.cable = actionCable.createConsumer('wss://animeya.herokuapp.com/cable') // change to whatever port your server uses

export const App = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');

  const [stateObj, setStateObj] = useState({
    stateStatus: "initial",
    room: {},
    anime: {},
    user: {},
    userType: '',
    matchedAId: 0,
    allUsersDone: false,
    num: 0
  });

  const token = stateObj.room.token;

  useEffect(() => {
    console.log(stateObj.room.id)
    if (stateObj.room.id) {
      CableApp.cable.subscriptions.create({
        channel: 'RoomsChannel',
        room_id: stateObj.room.id, },
        {
          connected() {
            console.log('connected')
          },
          received(data) {
            if (data.message === "matched") {
              setStateObj(prevState => ({...prevState, matchedAId: data.anime_id}))
              history.push(`/room/match`);
            } else if (stateObj.allUsersDone) {
              history.push(`/room/failedToMatch`);
            } else if (data.message === "someone_finished") {
              axios
              .get(`https://animeya.herokuapp.com/status_of_room/${token}`)
              .then((res) => {
                  if ( res.data === true ) {
                    setStateObj(prevState => ({...prevState, allUsersDone: true}))
                    if (stateObj.matchedAId > 0) {
                        history.push(`/room/match`);
                    } else {
                        history.push(`/room/failedToMatch`);
                    }
                  }
              })
            }
          }
        })
    }


    if (stateObj.stateStatus === 'creating owner') {
      axios
      .post(`https://animeya.herokuapp.com/owner`, { username })
      .then((res) => {
        setStateObj(prevState => ({...prevState, user:  res.data}))
        setStateObj(prevState => ({...prevState, userType:  'owner'}))
        axios
        .get(`https://animeya.herokuapp.com/owner/room/${res.data.id}`)
        .then((r) => {
          setStateObj(prevState => ({...prevState, room:   r.data}))
          axios.get(`https://animeya.herokuapp.com/room/join/${r.data.token}`).then((animeR) => {
            setStateObj(prevState => ({...prevState, anime: animeR.data.data}))
          });
        })
        .then(() => {
          setStateObj(prevState => ({...prevState, stateStatus: 'Joining Room'}))
        })
      });
    } else if (stateObj.stateStatus === 'creating visitor') {
        axios
        .post(`https://animeya.herokuapp.com/visitor`, { username, token })
        .then((r) => {
          setStateObj(prevState => ({...prevState, user: r.data}))
          setStateObj(prevState => ({...prevState, userType: 'visitor'}))
        })
      axios.get(`https://animeya.herokuapp.com/room/${token}`).then((r) => {
        setStateObj(prevState => ({...prevState, room: r.data}))
        
      });

      axios.get(`https://animeya.herokuapp.com/room/join/${token}`).then((r) => {
        setStateObj(prevState => ({...prevState, anime: r.data.data})) 
      })
      .then(() => {
        setStateObj(prevState => ({...prevState, stateStatus: 'Joining Room'})) 
      })
    }
  }, [stateObj, username, token, history])


  

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <HomepageOwner setUsername={setUsername} username={username} setStateObj={setStateObj} />
        </Route>
        <Route path="/join/:token/">
          <HomepageVisitor setUsername={setUsername} username={username} setStateObj={setStateObj}/>
        </Route>
        <Route exact path="/room/sharelink/">
          <ShareLink roomToken={stateObj.room.token} />
        </Route>
        <Route exact path="/room/:token/">
          <Room
            setStateObj={setStateObj}
            room={stateObj.room}
            anime={stateObj.anime}
            user_token={stateObj.user.token}
            num={stateObj.num}
            userType={stateObj.userType}
            allUsersDone={stateObj.allUsersDone}
          />
        </Route>
        <Route exact path="/room/matching/">
          <WaitingRoom 
          matchedAId={stateObj.matchedAId} 
          setStateObj={setStateObj}
          cable={CableApp.cable} 
          room={stateObj.room} />
        </Route>
        <Route exact path="/room/match/">
          <RoomMatch matchedAId={stateObj.matchedAId} />
        </Route>
        <Route exact path="/room/failedToMatch/">
          <MatchFailed room={stateObj.room} />
        </Route>

        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </HashRouter>
  );
};
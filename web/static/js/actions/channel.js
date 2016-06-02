import { Presence } from 'phoenix';
import Reveal from 'reveal.js';
import {
  CHANNEL_NAME, CHANNEL_PUSH, CHANNEL_RECEIVE, CHANNEL_JOIN_SUCCESS, CHANNEL_JOIN_FAILURE
} from '../constants/channels';
import * as userActions from './users';
import * as phoenixActions from '../services/phoenix';

const presences = {};

window.presences = presences;

function channelJoinSuccess(channel, response) {
  return {
    type: CHANNEL_JOIN_SUCCESS,
    payload: { channel, response }
  };
}

function channelJoinFailure(channel, response) {
  return {
    type: CHANNEL_JOIN_FAILURE,
    payload: { channel, response }
  };
}

export function receiveData(payload) {
  return {
    type: CHANNEL_RECEIVE,
    payload
  };
}

export function joinChannel() {
  return function joiner(dispatch, getState) {
    const { auth } = getState();
    phoenixActions.connect();
    const channel = phoenixActions.getChannel(CHANNEL_NAME, auth);

    channel.join()
      .receive('ok', resp => { dispatch(channelJoinSuccess(channel, resp)); })
      .receive('error', resp => { dispatch(channelJoinFailure(channel, resp)); });

    // detect if user has joined for the 1st time or from another tab/device
    const onJoin = (id, current, _newPres) => {
      if (!current) {
        dispatch(userActions.userJoined(id));
      }
    };
    // detect if user has left from all tabs/devices, or is still present
    const onLeave = (id, current, _leftPres) => {
      if (current.metas.length === 0) {
        dispatch(userActions.userLeft(id));
      }
    };

    // receive initial presence data from server, sent after join
    channel.on('presences', source => {
      Presence.syncState(presences, source, onJoin, onLeave);
    });
    // receive 'presence_diff' from server, containing join/leave events
    channel.on('presence_diff', diff => {
      Presence.syncDiff(presences, diff, onJoin, onLeave);
    });
    channel.on('shout', data => {
      dispatch(receiveData(data));
    });
    channel.on('slidechanged', state => {
      Reveal.setState(state);
    });
  };
}

export function sendMessage(message) {
  return function sender(dispatch, getState) {
    const { auth, connection: { channel } } = getState();
    channel.push('shout', { username: auth, message });
  };
}

export function sendData(message) {
  return {
    type: CHANNEL_PUSH,
    payload: { message }
  };
}

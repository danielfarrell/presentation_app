import {
  CHANNEL_PUSH, CHANNEL_RECEIVE, CHANNEL_JOIN_SUCCESS, CHANNEL_JOIN_FAILURE
} from '../constants/channels';

export function channelJoinSuccess(channel, response) {
  return {
    type: CHANNEL_JOIN_SUCCESS,
    payload: { channel, response }
  };
}

export function channelJoinFailure(channel, response) {
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

export function sendData(message) {
  return {
    type: CHANNEL_PUSH,
    payload: { message }
  };
}

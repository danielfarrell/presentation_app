import { USER_JOINED, USER_LEFT } from '../constants/users';

export function userJoined(username) {
  return {
    type: USER_JOINED,
    payload: { username }
  };
}

export function userLeft(username) {
  return {
    type: USER_LEFT,
    payload: { username }
  };
}

import { List } from 'immutable';
import {
  USER_JOINED, USER_LEFT
} from '../constants/users';

const initialState = List();

export default function channel(state = initialState, action) {
  switch (action.type) {
    case USER_JOINED: {
      return state.push(action.payload.username);
    }

    case USER_LEFT: {
      const userIdx = state.indexOf(action.payload.username);
      return state.splice(userIdx, 1);
    }

    default:
      return state;
  }
}

import {
  USER_JOINED, USER_LEFT
} from '../constants/users';

const initialState = [];

export default function channel(state = initialState, action) {
  switch (action.type) {
    case USER_JOINED: {
      const users = JSON.parse(JSON.stringify(state));
      users.push(action.payload.username);
      return users;
    }

    case USER_LEFT: {
      const users = JSON.parse(JSON.stringify(state));
      const userIdx = users.indexOf(action.payload.username);
      users.splice(userIdx, 1);
      return users;
    }

    default:
      return state;
  }
}

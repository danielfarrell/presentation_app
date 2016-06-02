import {
  USERNAME_KEY, CHOOSE_USERNAME
} from '../constants/auth';

const username = localStorage.getItem(USERNAME_KEY);
const initialState = username;

export default function auth(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_USERNAME: {
      localStorage.setItem(USERNAME_KEY, action.payload.username);
      return action.payload.username;
    }

    default:
      return state;
  }
}

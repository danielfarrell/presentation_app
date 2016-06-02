import { CHOOSE_USERNAME } from '../constants/auth';

export function chooseUsername(username) {
  return {
    type: CHOOSE_USERNAME,
    payload: { username }
  };
}

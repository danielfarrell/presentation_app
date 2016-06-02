import {
  UI_KEY, UI_MINIMIZE
} from '../constants/ui';

const initialState = JSON.parse(localStorage.getItem(UI_KEY)) || { minimized: true };

export default function ui(state = initialState, action) {
  switch (action.type) {
    case UI_MINIMIZE: {
      localStorage.setItem(UI_KEY, JSON.stringify(action.payload));
      return action.payload;
    }

    default:
      return state;
  }
}

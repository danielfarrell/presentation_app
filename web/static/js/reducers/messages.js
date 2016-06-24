import { List, fromJS } from 'immutable';
import {
  CHANNEL_JOIN_SUCCESS, CHANNEL_LEAVE, CHANNEL_RECEIVE
} from '../constants/channels';

const initialState = List();

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANNEL_JOIN_SUCCESS: {
      const { response } = action.payload;

      return fromJS(response) || List();
    }

    case CHANNEL_LEAVE: {
      return initialState;
    }

    case CHANNEL_RECEIVE: {
      return state.push(fromJS(action.payload));
    }

    default:
      return state;
  }
}

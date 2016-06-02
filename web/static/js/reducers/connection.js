import {
  CHANNEL_JOIN_SUCCESS, CHANNEL_LEAVE, CHANNEL_RECEIVE
} from '../constants/channels';

const initialState = {
  channel: null,
  presences: {},
  messages: []
};

export default function connectionReducer(state = initialState, action) {
  switch (action.type) {
    case CHANNEL_JOIN_SUCCESS: {
      const { channel, response } = action.payload;

      return {
        channel,
        messages: (response || [])
      };
    }

    case CHANNEL_LEAVE: {
      return initialState;
    }

    case CHANNEL_RECEIVE: {
      const messageList = state.messages;
      messageList.push(action.payload);
      return { ...state, messages: messageList };
    }

    default:
      return state;
  }
}

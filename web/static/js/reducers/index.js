import { combineReducers } from 'redux';

// reducers
import auth from './auth';
import messages from './messages';
import ui from './ui';
import users from './users';

const rootReducer = combineReducers({
  auth,
  messages,
  ui,
  users
});

export default rootReducer;

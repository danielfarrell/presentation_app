import { combineReducers } from 'redux';

// reducers
import auth from './auth';
import connection from './connection';
import ui from './ui';
import users from './users';

const rootReducer = combineReducers({
  auth,
  connection,
  ui,
  users
});

export default rootReducer;

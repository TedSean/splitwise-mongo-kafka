import { combineReducers } from 'redux';
import loginUserReducer from './loginUserReducer';
import signUpUserReducer from './signUpUserReducer';
import userProfileReducer from './userProfileReducer';

export default combineReducers({
  login: loginUserReducer,
  signup: signUpUserReducer,
  userProfile: userProfileReducer,
});

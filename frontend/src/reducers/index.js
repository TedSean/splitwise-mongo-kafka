import { combineReducers } from 'redux';
import loginUserReducer from './account/loginUserReducer';
import signUpUserReducer from './account/signUpUserReducer';
import userProfileReducer from './user/userProfileReducer';
import getAllUsersReducer from './group/getAllUsersReducer';
import createGroupReducer from './group/createGroupReducer';

export default combineReducers({
  login: loginUserReducer,
  signup: signUpUserReducer,
  userProfile: userProfileReducer,
  getAllUsersReducer,
  createGroupReducer,
});

import { combineReducers } from 'redux';
import loginUserReducer from './account/loginUserReducer';
import signUpUserReducer from './account/signUpUserReducer';
import userProfileReducer from './user/userProfileReducer';
import getAllUsersReducer from './group/getAllUsersReducer';
import createGroupReducer from './group/createGroupReducer';
import getGroupInvitesReducer from './group/getGroupInvitesReducer';
import getGroupMembershipsReducer from './group/getGroupMembershipsReducer';
import acceptInviteReducer from './group/acceptInviteReducer';
import rejectInviteReducer from './group/rejectInviteReducer';

export default combineReducers({
  login: loginUserReducer,
  signup: signUpUserReducer,
  userProfile: userProfileReducer,
  getAllUsersReducer,
  createGroupReducer,
  getGroupInvitesReducer,
  getGroupMembershipsReducer,
  acceptInviteReducer,
  rejectInviteReducer,
});

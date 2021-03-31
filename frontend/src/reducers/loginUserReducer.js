import { USER_LOGIN, USER_LOGOUT } from '../actions/constantTypes';

const initState = {
  user: {},
};

const loginUserReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default loginUserReducer;

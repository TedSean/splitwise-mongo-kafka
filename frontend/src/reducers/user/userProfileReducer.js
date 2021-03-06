import { GET_USER, UPDATE_USER, UPDATE_USER_AVATAR } from '../../actions/constant-types';

const initState = {
  user: {},
};

const userProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userProfileReducer;

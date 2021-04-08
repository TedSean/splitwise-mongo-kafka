import { GET_ALL_USERS } from '../../actions/constant-types';

const initState = {
  users: {},
};

const getAllUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default getAllUsersReducer;

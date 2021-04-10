import { GET_GROUP_DETAILS } from '../../actions/constant-types';

const initState = {
  groupDetails: {},
};

const getAllUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: action.payload,
      };
    default:
      return state;
  }
};

export default getAllUsersReducer;

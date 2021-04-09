import { ACCEPT_INVITE } from '../../actions/constant-types';

const initState = {
  message: null,
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case ACCEPT_INVITE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default createGroupReducer;

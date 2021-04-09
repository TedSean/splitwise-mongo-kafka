import { REJECT_INVITE } from '../../actions/constant-types';

const initState = {
  message: null,
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case REJECT_INVITE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default createGroupReducer;

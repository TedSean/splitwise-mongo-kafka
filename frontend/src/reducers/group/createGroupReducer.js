import { CREATE_GROUP } from '../../actions/constant-types';

const initState = {
  message: null,
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default createGroupReducer;

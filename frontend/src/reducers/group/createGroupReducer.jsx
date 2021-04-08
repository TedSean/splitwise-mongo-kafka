import { CREATE_GROUP } from '../../actions/constant-types';

const initState = {
  group: {},
};

const createGroupReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        group: action.payload,
      };
    default:
      return state;
  }
};

export default createGroupReducer;

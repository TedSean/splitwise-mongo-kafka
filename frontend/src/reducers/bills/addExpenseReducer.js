import { ADD_EXPENSE } from '../../actions/constant-types';

const initState = {
  message: null,
};

const addExpenseReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default addExpenseReducer;

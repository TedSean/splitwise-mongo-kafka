import { USER_SIGNUP } from '../actions/constantTypes';

const initState = {
  user: {},
};

const signUpUserReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default signUpUserReducer;

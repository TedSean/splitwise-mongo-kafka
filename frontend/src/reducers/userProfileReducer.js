/* eslint-disable import/no-anonymous-default-export */
import { GET_USER, UPDATE_USER } from '../actions/constantTypes';

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
    default:
      return state;
  }
};

export default userProfileReducer;

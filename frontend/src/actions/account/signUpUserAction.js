import axios from 'axios';
import { USER_SIGNUP } from '../constant-types';
import apiHost from '../../apiHost';

const userSignUp = (userInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.post(`${apiHost}/api/signup`, userInfo)
    .then((response) => dispatch({
      type: USER_SIGNUP,
      payload: response.data,
    }))
    .catch((error) => dispatch({
      type: USER_SIGNUP,
      payload: error.response.data,
    }));
};

export default userSignUp;

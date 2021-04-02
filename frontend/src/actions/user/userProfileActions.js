import axios from 'axios';
import { GET_USER, UPDATE_USER } from '../constant-types';
import apiHost from '../../apiHost';

const getUser = () => (dispatch) => {
  axios.get(`${apiHost}/api/profile`, {
    headers: {
      authorization: localStorage.getItem('idToken'),
    },
  })
    .then((response) => response.data)
    .then((user) => dispatch({
      type: GET_USER,
      payload: user,
    }))
    .catch((error) => {
      console.log(error);
      return dispatch({
        type: GET_USER,
        payload: error.response.data,
      });
    });
};

const updateUser = (userProfileInfo) => (dispatch) => {
  console.log(userProfileInfo);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.put(`${apiHost}/api/profile`, userProfileInfo)
    .then((response) => response.data)
    .then((user) => dispatch({
      type: UPDATE_USER,
      payload: user,
    }))
    .catch((error) => {
      console.log(error);
      return dispatch({
        type: UPDATE_USER,
        payload: error.response.data,
      });
    });
};

export { getUser, updateUser };

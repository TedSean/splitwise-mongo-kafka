import axios from 'axios';
import { CREATE_GROUP, GET_ALL_USERS } from '../constant-types';
import apiHost from '../../apiHost';

const getAllUsers = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/groups/users`)
    .then((response) => response.data.users)
    .then((users) => dispatch({
      type: GET_ALL_USERS,
      payload: users,
    }))
    .catch((error) => dispatch({
      type: GET_ALL_USERS,
      payload: error.response.data,
    }));
};

const createGroup = (groupInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/groups`, groupInfo)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: CREATE_GROUP,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: CREATE_GROUP,
      payload: error.response.data.message,
    }));
};

export { getAllUsers, createGroup };

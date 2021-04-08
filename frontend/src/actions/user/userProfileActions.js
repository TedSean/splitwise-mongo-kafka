import axios from 'axios';
import { GET_USER, UPDATE_USER, UPDATE_USER_AVATAR } from '../constant-types';
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
    .catch((error) => dispatch({
      type: GET_USER,
      payload: error.response.data,
    }));
};

const updateUser = (userProfileInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.put(`${apiHost}/api/profile`, userProfileInfo)
    .then((response) => response.data)
    .then((user) => dispatch({
      type: UPDATE_USER,
      payload: user,
    }))
    .catch((error) => dispatch({
      type: UPDATE_USER,
      payload: error.response.data,
    }));
};

const updateUserImage = (userImageInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  const formData = new FormData();
  formData.append('image', userImageInfo);
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  axios.put(`${apiHost}/api/images/user`, formData, uploadConfig)
    .then((response) => response.data)
    .then((image) => dispatch({
      type: UPDATE_USER_AVATAR,
      payload: image,
    }))
    .catch((error) => dispatch({
      type: UPDATE_USER_AVATAR,
      payload: error.response.data,
    }));
};

export { getUser, updateUser, updateUserImage };

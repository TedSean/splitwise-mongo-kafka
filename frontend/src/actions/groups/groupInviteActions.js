import axios from 'axios';
import { ACCEPT_INVITE, REJECT_INVITE } from '../constant-types';
import apiHost from '../../apiHost';

const acceptInvite = (groupName) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/groups/accept`, groupName)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: ACCEPT_INVITE,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: ACCEPT_INVITE,
      payload: error.response.data.message,
    }));
};

const rejectInvite = (groupName) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/groups/reject`, groupName)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: REJECT_INVITE,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: REJECT_INVITE,
      payload: error.response.data.message,
    }));
};

export { acceptInvite, rejectInvite };

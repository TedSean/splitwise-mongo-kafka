import axios from 'axios';
import { GET_GROUP_INVITES, GET_GROUP_MEMBERSHIPS } from '../constant-types';
import apiHost from '../../apiHost';

const getGroupInvites = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/groups/invites`)
    .then((response) => response.data.groupInvites)
    .then((groupInvites) => dispatch({
      type: GET_GROUP_INVITES,
      payload: groupInvites,
    }))
    .catch((error) => dispatch({
      type: GET_GROUP_INVITES,
      payload: error.response.data,
    }));
};

const getGroupMemberships = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/groups/memberships`)
    .then((response) => response.data.groupMemberships)
    .then((groupMemberships) => dispatch({
      type: GET_GROUP_MEMBERSHIPS,
      payload: groupMemberships,
    }))
    .catch((error) => dispatch({
      type: GET_GROUP_MEMBERSHIPS,
      payload: error.response.data,
    }));
};

export { getGroupInvites, getGroupMemberships };

import axios from 'axios';
import { GET_GROUP_DETAILS } from '../constant-types';
import apiHost from '../../apiHost';

const getGroupDetails = (groupName) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.get(`${apiHost}/api/groups/${groupName}`)
    .then((response) => response.data.groupDetails)
    .then((groupDetails) => dispatch({
      type: GET_GROUP_DETAILS,
      payload: groupDetails,
    }))
    .catch((error) => dispatch({
      type: GET_GROUP_DETAILS,
      payload: error.response.data,
    }));
};

export default getGroupDetails;

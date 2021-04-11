import axios from 'axios';
import { ADD_EXPENSE } from '../constant-types';
import apiHost from '../../apiHost';

const addExpenseAction = (expenseInfo) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
  axios.post(`${apiHost}/api/bills`, expenseInfo)
    .then((response) => response.data.message)
    .then((message) => dispatch({
      type: ADD_EXPENSE,
      payload: message,
    }))
    .catch((error) => dispatch({
      type: ADD_EXPENSE,
      payload: error.response.data.message,
    }));
};

export default addExpenseAction;

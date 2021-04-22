import axios from 'axios';
import { Dispatch } from 'redux';
import MySwal from 'utils/swal';
import * as types from './types';

export const getUser = () => async (dispatch: Dispatch<types.UsersDispatchTypes>) => {
  try {
    const response = await axios.get('/api/user/me');

    dispatch({
      type: types.GET_USER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_ERROR,
    });
  }
};

export const updateBalance = (balance: number) => (
  dispatch: Dispatch<types.UsersDispatchTypes>,
) => {
  dispatch({
    type: types.UPDATE_BALANCE,
    payload: balance,
  });
};

export const withdrawIntent = (username: string, robux: number) => async (
  dispatch: Dispatch<types.UsersDispatchTypes>,
) => {
  try {
    const response = await axios.post('/api/withdraw/intent', {
      username,
      robux,
    });

    MySwal.fire({
      icon: 'success',
      title: '<h1 class="text-white">Success</h1>',
      html: `<p class="text-white">You have withdrawn R$ ${robux}</p>`,
    });

    dispatch({
      type: types.USER_WITHDRAW,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_WITHDRAW_ERROR,
    });

    MySwal.fire({
      icon: 'error',
      title: '<h1 class="text-white">Error</h1>',
      html: `<p class="text-white">${
        err.response?.data?.message ||
        'An error occurred while trying to send your R$. Please try again.'
      }</p>`,
    });
  }
};

export const getHistory = () => async (dispatch: Dispatch<types.UsersDispatchTypes>) => {
  try {
    const response = await axios.get('/api/user/history');

    dispatch({
      type: types.GET_HISTORY,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.HISTORY_ERROR,
    });
  }
};

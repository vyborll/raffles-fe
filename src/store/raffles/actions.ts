import axios from 'axios';
import { Dispatch } from 'redux';
import * as types from './types';

export const getRaffles = () => async (dispatch: Dispatch<types.RafflesDispatchTypes>) => {
  try {
    const response = await axios.get('/api/raffles/get');

    dispatch({
      type: types.GET_RAFFLES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.RAFFLES_ERROR,
    });
  }
};

export const updateRaffle = (options: {
  id: string;
  users_entered: number;
  latest_entries: [];
}) => (dispatch: Dispatch<types.RafflesDispatchTypes>) => {
  dispatch({
    type: types.UPDATE_RAFFLE,
    payload: options,
  });
};

export const updateRaffleStatus = (id: string, status: 'ACTIVE' | 'ENDED') => (
  dispatch: Dispatch<types.RafflesDispatchTypes>,
) => {
  dispatch({
    type: types.UPDATE_STATUS,
    payload: {
      id,
      status,
    },
  });
};

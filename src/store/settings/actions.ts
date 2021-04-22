import axios from 'axios';
import { Dispatch } from 'redux';
import * as types from './types';

export const setTotals = (totals: { users: number; paid: number }) => (
  dispatch: Dispatch<types.SettingsDispatchTypes>,
) => {
  dispatch({ type: types.SET_TOTALS, payload: { ...totals } });
};

export const getSettings = () => async (dispatch: Dispatch<types.SettingsDispatchTypes>) => {
  try {
    const response = await axios.get('/api/settings/get');

    dispatch({
      type: types.GET_SETTINGS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.SETTINGS_ERROR,
    });
  }
};

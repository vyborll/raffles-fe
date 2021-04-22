import { Reducer } from 'redux';
import * as types from './types';

interface SettingsState {
  loading: boolean;
  broadcast: {
    message: string;
    show: boolean;
  };
  totals: {
    users: number;
    paid: number;
  };
}

const initialState = {
  loading: true,
  broadcast: {
    message: '',
    show: false,
  },
  totals: {
    users: 0,
    paid: 0,
  },
};

const reducer: Reducer<SettingsState, types.SettingsDispatchTypes> = (
  state = initialState,
  action: types.SettingsDispatchTypes,
) => {
  switch (action.type) {
    case types.GET_SETTINGS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case types.SET_TOTALS:
      return {
        ...state,
        totals: { ...action.payload },
      };
    case types.SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;

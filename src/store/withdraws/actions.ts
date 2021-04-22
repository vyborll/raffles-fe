import { Dispatch } from 'redux';
import * as types from './types';

export const setGroup = (id: string) => (dispatch: Dispatch<types.WithdrawsDispatchTypes>) => {
  dispatch({ type: types.SET_GROUP, payload: { id } });
};

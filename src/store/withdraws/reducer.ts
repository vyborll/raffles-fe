import { Reducer } from 'redux';
import * as types from './types';

interface WithdrawsState {
  loading: boolean;
  group: types.IGroup;
}

const initialState = {
  loading: true,
  group: {
    id: '',
  },
};

const reducer: Reducer<WithdrawsState, types.WithdrawsDispatchTypes> = (
  state = initialState,
  action: types.WithdrawsDispatchTypes,
) => {
  switch (action.type) {
    case types.SET_GROUP:
      return {
        ...state,
        loading: false,
        group: { ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;

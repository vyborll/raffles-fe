import { Reducer } from 'redux';
import * as types from './types';

interface UsersState {
  loading: boolean;
  loggedIn: boolean;
  user: types.IUser;
  history: types.IHistory[];
}

const initialState = {
  loading: true,
  loggedIn: false,
  user: {
    googleId: '',
    discord: { id: '' },
    email: '',
    name: '',
    avatar: '',
    balance: 0,
    earned: 0,
    spent: 0,
    frozen: false,
    youtube_bonus: false,
    discord_bonus: false,
    ref: {
      id: '',
      by: '',
      total: 0,
      earned: 0,
    },
    createdIp: '',
    lastIp: '',
    createdAt: '',
  },
  history: [],
};

const reducer: Reducer<UsersState, types.UsersDispatchTypes> = (
  state = initialState,
  action: types.UsersDispatchTypes,
) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: { ...action.payload },
      };
    case types.UPDATE_BALANCE:
      return {
        ...state,
        user: {
          ...state.user,
          balance: action.payload,
        },
      };
    case types.USER_WITHDRAW:
      return {
        ...state,
        user: {
          ...state.user,
          balance: action.payload.balance,
          earned: action.payload.earned,
        },
      };
    case types.LOGOUT_USER:
      return initialState;
    case types.GET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case types.USER_ERROR:
      return {
        ...state,
        loading: false,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;

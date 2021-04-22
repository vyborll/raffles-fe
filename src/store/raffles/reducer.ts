import { Reducer } from 'redux';
import * as types from './types';

interface RafflesState {
  loading: boolean;
  raffle: types.IRaffle | {};
  data: types.IRaffle[];
}

const initialState = {
  loading: true,
  raffle: {},
  data: [],
};

const reducer: Reducer<RafflesState, types.RafflesDispatchTypes> = (
  state = initialState,
  action: types.RafflesDispatchTypes,
) => {
  switch (action.type) {
    case types.GET_RAFFLES:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.UPDATE_RAFFLE:
      const i = state.data.findIndex((r) => r._id === action.payload.id);
      state.data[i].users_entered = action.payload.users_entered;
      state.data[i].latest_entries = action.payload.latest_entries;

      return {
        ...state,
        data: [...state.data],
      };
    case types.UPDATE_STATUS:
      const rId = state.data.findIndex((r) => r._id === action.payload.id);
      state.data[rId].status = action.payload.status;

      return {
        ...state,
        data: [...state.data],
      };
    case types.RAFFLES_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
